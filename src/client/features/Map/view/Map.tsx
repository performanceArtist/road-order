import * as React from 'react';
import { Component } from 'react';
import * as L from 'leaflet';
import { Map, TileLayer, Polyline, Marker } from 'react-leaflet';
import { connect } from 'react-redux';

import { Icon, IconImage } from '@elements/Icon/Icon';
import { Button } from '@shared/view';
import { GPSTrack } from '@shared/types';
import { actions as modalActions } from '@features/Modal/redux';
const { openModal } = modalActions;
import { RootState } from '@root/client/redux/driver/reducer';

import {
  getRoute,
  getRoutePath,
  setHasArrived,
  setMeasurementStatus,
  move
} from '../redux/actions';
import * as taskSelectors from '@features/TaskPanel/redux/selectors';

import Controls from './Controls';
import { ServerTask } from '@shared/types';

interface State {
  zoom: number;
  fullscreen: boolean;
}

type MapState = {
  track: GPSTrack;
  route?: GPSTrack;
  routePath: GPSTrack;
  hasArrived: boolean;
  measurementStarted: boolean;
  currentTaskId: number | null;
  task?: ServerTask;
};

type Props = MapState & typeof mapDispatch;

const mapState = (state: RootState): MapState => {
  return {
    ...state.map,
    currentTaskId: taskSelectors.selectCurrentTaskId(state),
    task: taskSelectors.selectCurrentTask(state)
  };
};

const mapDispatch = {
  getRoute,
  getRoutePath,
  setHasArrived,
  setMeasurementStatus,
  move,
  openModal
};

type LeafletDiv = HTMLDivElement & { leafletElement: any };

class MapComponent extends Component<Props, State> {
  private ref = React.createRef<LeafletDiv>();
  private timeout: NodeJS.Timer | null = null;

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
    const { task, getRoute, getRoutePath, hasArrived } = this.props;

    if (task && hasArrived) {
      getRoute(task.route);
    }

    if (task && task.route && !hasArrived) {
      const path = task.is_direction_forward
        ? [task.current_position, task.route[0]]
        : [task.current_position, task.route[task.route.length - 1]];
      getRoutePath(path);
    }
  }

  handleFullscreen() {
    this.setState(
      { fullscreen: !this.state.fullscreen },
      () => this.ref.current && this.ref.current.leafletElement.invalidateSize()
    );
  }

  drawRoute(route: GPSTrack, color = 'green', z = false) {
    if (route.length === 0) return null;

    this.ref.current && this.ref.current.leafletElement.invalidateSize();
    return <Polyline positions={route} color={color} weight={8} z={z} />;
  }

  addCurrentMarker() {
    const { task } = this.props;
    if (!task) return;

    return (
      <Marker
        key={Math.random()}
        icon={L.icon({
          iconUrl: 'images/car-icon.png'
        })}
        position={L.latLng(task.current_position[0], task.current_position[1])}
      />
    );
  }

  startSimulation() {
    const { track, task, move } = this.props;
    if (!task) return;

    this.timeout = setInterval(() => {
      if (track.length === 0) {
        this.timeout && clearInterval(this.timeout);
        return;
      }

      move(task.current_position);
    }, 150);
  }

  stopSimulation() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  render() {
    const { zoom, fullscreen } = this.state;
    const {
      setMeasurementStatus,
      openModal,
      measurementStarted,
      hasArrived,
      track,
      routePath,
      currentTaskId,
      task
    } = this.props;

    const center = task
      ? task.current_position
      : track[0] || [56.472596, 84.950367];

    return (
      <div className={fullscreen ? 'map map_fullscreen' : 'map'}>
        <div className="map__map">
          <Map center={center} zoom={zoom} ref={this.ref as any} maxZoom={19}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.drawRoute(track, 'red', true)}
            {this.drawRoute(routePath, 'yellow')}
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
            <Button onClick={this.stopSimulation} disabled={track.length === 0}>
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
                currentTaskId && openModal('Cancel', { taskId: currentTaskId })
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(MapComponent);
