const io = require('socket.io-client');
import { eventChannel } from 'redux-saga';
import {
  take,
  call,
  put,
  fork,
  race,
  cancelled,
  delay
} from 'redux-saga/effects';

import { updateCondor } from '@redux/condor/actions';
import { addMeasurement } from '../measurements/actions';

import { IO } from './actions';
import config from '@root/config';

class Socket {
  private _url: string;
  private _socket: any;

  constructor(url: string) {
    this._url = url;

    this.listenConnectSaga = this.listenConnectSaga.bind(this);
    this.listenDisconnectSaga = this.listenDisconnectSaga.bind(this);
    this.listenServerSaga = this.listenServerSaga.bind(this);
    this.startStopChannel = this.startStopChannel.bind(this);
  }

  private connect = () => {
    this._socket = io(this._url);
    return new Promise(resolve => {
      this._socket.on('connect', () => {
        resolve(this._socket);
      });
    });
  };

  private disconnect = () => {
    this._socket = io(this._url);
    return new Promise(resolve => {
      this._socket.on('disconnect', () => {
        resolve(this._socket);
      });
    });
  };

  private reconnect = () => {
    this._socket = io(this._url);
    return new Promise(resolve => {
      this._socket.on('reconnect', () => {
        resolve(this._socket);
      });
    });
  };

  private createChannel = () =>
    eventChannel(emit => {
      const handler = ({ type, payload }: { type: string; payload: any }) => {
        switch (type) {
          case 'new_diagnostic':
            emit(updateCondor(payload));
            break;
          case 'new_measurement':
            emit(addMeasurement(payload));
            break;
          default:
            break;
        }
      };

      this._socket.on('message', handler);

      return () => {
        this._socket.off('message', handler);
      };
    });

  private *listenDisconnectSaga() {
    while (true) {
      yield call(this.disconnect);
      yield put({ type: IO.SERVER_OFF });
    }
  }

  private *listenConnectSaga() {
    while (true) {
      yield call(this.reconnect);
      yield put({ type: IO.SERVER_ON });
    }
  }

  *listenServerSaga() {
    try {
      yield put({ type: IO.CHANNEL_ON });
      const { timeout } = yield race({
        connected: call(this.connect),
        timeout: delay(2000)
      });
      if (timeout) {
        yield put({ type: IO.SERVER_OFF });
      }

      this._socket = yield call(this.connect);

      yield fork(this.listenDisconnectSaga);
      yield fork(this.listenConnectSaga);
      yield put({ type: IO.SERVER_ON });
      const socketChannel = yield call(this.createChannel);

      while (true) {
        const action = yield take(socketChannel);
        yield put(action);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (yield cancelled()) {
        this._socket.disconnect(true);
        yield put({ type: IO.CHANNEL_OFF });
      }
    }
  }

  startChannel = () => ({ type: IO.START_CHANNEL });
  stopChannel = () => ({ type: IO.STOP_CHANNEL });

  *startStopChannel() {
    while (true) {
      yield take(IO.START_CHANNEL);
      yield race({
        task: call(this.listenServerSaga),
        cancel: take(IO.STOP_CHANNEL)
      });
    }
  }
}

export default new Socket(`http://localhost:${config.server.port || 5000}`);
