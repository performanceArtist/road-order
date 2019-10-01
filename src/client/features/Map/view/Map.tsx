import * as React from 'react';
import { Component } from 'react';
import * as L from 'leaflet';
import { Map, TileLayer, Polyline, Marker } from 'react-leaflet';
import { connect } from 'react-redux';

import { Icon, IconImage } from '@elements/Icon/Icon';
import Button from '@elements/Button/Button';
import { actions as modalActions } from '@features/Modal/redux';
const { openModal } = modalActions;
import { RootState } from '@redux/user/reducer';

import {
  getRoute,
  setHasArrived,
  setMeasurementStatus,
  move
} from '../redux/actions';

import Controls from './Controls';

interface State {
  zoom: number;
  fullscreen: boolean;
}

type OwnProps = {
  from?: [number, number];
  to?: [number, number];
  current: [number, number];
};

type MapState = {
  track: Array<[number, number]>;
  carPosition: [number, number];
  hasArrived: boolean;
  measurementStarted: boolean;
  currentTaskId: string;
};

type Props = OwnProps & MapState & typeof mapDispatch;

const mapState = ({ map, tasks }: RootState) => ({
  ...map,
  currentTaskId: tasks.currentTaskId
});

const mapDispatch = {
  getRoute,
  setHasArrived,
  setMeasurementStatus,
  move,
  openModal
};

class MapComponent extends Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      zoom: 14,
      fullscreen: false
    };

    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.startSimulation = this.startSimulation.bind(this);
    this.stopSimulation = this.stopSimulation.bind(this);
  }

  componentDidMount() {
    const { from, to } = this.props;

    if (!from || !to) return;

    this.props.getRoute(from, to);
  }

  handleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen }, () =>
      this.ref.current.leafletElement.invalidateSize()
    );
  }

  drawRoute() {
    const { track } = this.props;
    if (track.length === 0) return null;

    return <Polyline positions={track} color="green" weight={8} />;
  }

  addCurrentMarker() {
    const tryParse = () => {
      try {
        const current = JSON.parse(this.props.current);
        return current;
      } catch (error) {
        return null;
      }
    };

    const current = this.props.carPosition || tryParse();
    if (!current) return;

    return (
      <Marker
        key={Math.random()}
        icon={L.icon({
          iconUrl: 'images/car-icon.png'
        })}
        position={L.latLng(current[0], current[1])}
      />
    );
  }

  startSimulation() {
    this.timeout = setInterval(() => {
      if (this.props.track.length === 0) {
        clearInterval(this.timeout);
        return;
      }

      this.props.move(this.props.carPosition);
    }, 150);
  }

  stopSimulation() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  render() {
    const { zoom } = this.state;
    const {
      setMeasurementStatus,
      openModal,
      measurementStarted,
      hasArrived,
      track,
      carPosition,
      currentTaskId
    } = this.props;

    const center = carPosition || track[0] || [56.472596, 84.950367];

    return (
      <>
        <div className={this.state.fullscreen ? 'map map_fullscreen' : 'map'}>
          <div className="map__map">
            <Map center={center} zoom={zoom} ref={this.ref} maxZoom={19}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {this.drawRoute()}
              {this.addCurrentMarker()}
            </Map>
            <div className="map__fullscreen-button">
              <Icon image={IconImage.EXPAND} onClick={this.handleFullscreen} />
            </div>
            <div className="map__simulation-buttons">
              <Button
                onClick={this.startSimulation}
                disabled={track.length === 0}
              >
                Начать движение
              </Button>
              <Button
                onClick={this.stopSimulation}
                disabled={track.length === 0}
              >
                Остановиться
              </Button>
            </div>
            <div className="map__controls">
              <Controls
                measurementStarted={measurementStarted}
                hasArrived={hasArrived}
                onMeasurementClick={() => {
                  setMeasurementStatus(true);
                  window.location.href = '/road';
                }}
                onCancelClick={() =>
                  currentTaskId &&
                  openModal('Cancel', { taskId: currentTaskId })
                }
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapComponent);
