import * as React from 'react';
import { Component } from 'react';
import * as L from 'leaflet';
import { Map, TileLayer, Polyline, Marker } from 'react-leaflet';
import { connect } from 'react-redux';

import { Icon, IconImage } from '@components/Icon/Icon';
import { Button } from '@shared/view';
import { GPSTrack, GPSCoordinates } from '@shared/types';
import { actions as modalActions } from '@features/Modal/redux';
const { openModal } = modalActions;
import { RootState } from '@root/client/redux/driver/reducer';
import { ServerTask } from '@shared/types';
import * as taskSelectors from '@features/TaskPanel/redux/selectors';

import { mapActions } from '../redux';
const {
  getRoute,
  getRoutePath,
  setHasArrived,
  setMeasurementStarted,
  simulateMeasurement,
  simulateMovement
} = mapActions;
import Controls from './Controls';
import { inRadius } from './helpers';
import Speed from './Speed';

interface State {
  zoom: number;
  fullscreen: boolean;
}

type MapState = {
  track: GPSTrack;
  route: GPSTrack;
  routePath: GPSTrack;
  hasArrived: boolean;
  measurementStarted: boolean;
  currentTaskId: number | null;
  task?: ServerTask;
  carPosition: GPSCoordinates;
  speed: number;
};

type Props = MapState & typeof mapDispatch;

const mapState = (state: RootState): MapState => {
  return {
    ...state.map,
    currentTaskId: taskSelectors.selectCurrentTaskId(state),
    task: taskSelectors.selectCurrentTask(state),
    carPosition: state.condor.coordinates,
    speed: state.condor.speed
  };
};

const mapDispatch = {
  openModal,
  getRoute: getRoute.request,
  getRoutePath: getRoutePath.request,
  setHasArrived,
  setMeasurementStarted,
  simulateMeasurement: simulateMeasurement.request,
  simulateMovement: simulateMovement.request
};

type LeafletDiv = HTMLDivElement & { leafletElement: any };

class MapComponent extends Component<Props, State> {
  private ref = React.createRef<LeafletDiv>();

  constructor(props: Props) {
    super(props);

    this.state = {
      zoom: 14,
      fullscreen: false
    };

    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.startSimulation = this.startSimulation.bind(this);
    this.startMeasurementSimulation = this.startMeasurementSimulation.bind(
      this
    );
  }

  componentDidMount() {
    const { task, getRoutePath, hasArrived } = this.props;

    if (task && task.route && !hasArrived) {
      const path = task.is_direction_forward
        ? [task.current_position, task.route[0]]
        : [task.current_position, task.route[task.route.length - 1]];
      getRoutePath({ points: path });
    }
  }

  componentDidUpdate() {
    const {
      routePath,
      carPosition,
      setHasArrived,
      hasArrived,
      getRoute,
      route,
      task
    } = this.props;

    if (!task) return;

    if (
      !hasArrived &&
      routePath.length !== 0 &&
      inRadius(carPosition, routePath[routePath.length - 1], 0.00001)
    ) {
      setHasArrived(true);
      if (task && route.length === 0) {
        getRoute({ points: task.route });
      }
    }
  }

  handleFullscreen() {
    this.setState(
      { fullscreen: !this.state.fullscreen },
      () => this.ref.current && this.ref.current.leafletElement.invalidateSize()
    );
  }

  drawRoute(route: GPSTrack, color = 'green') {
    if (route.length === 0) return null;

    this.ref.current && this.ref.current.leafletElement.invalidateSize();
    return <Polyline positions={route} color={color} weight={8} />;
  }

  addCurrentMarker() {
    const { carPosition } = this.props;

    return (
      <Marker
        key={Math.random()}
        icon={L.icon({
          iconUrl: 'images/car-icon.png'
        })}
        position={L.latLng(carPosition[0], carPosition[1])}
      />
    );
  }

  startSimulation() {
    const { routePath, simulateMovement } = this.props;

    simulateMovement({ route: routePath });
  }

  startMeasurementSimulation() {
    const { task, track, simulateMeasurement } = this.props;
    if (!task) return;

    simulateMeasurement({ route: track, taskId: task.id });
  }

  render() {
    const { zoom, fullscreen } = this.state;
    const {
      setMeasurementStarted,
      openModal,
      measurementStarted,
      hasArrived,
      track,
      routePath,
      currentTaskId,
      carPosition,
      speed
    } = this.props;

    const center = carPosition || track[0] || [56.472596, 84.950367];

    return (
      <div className={fullscreen ? 'map map_fullscreen' : 'map'}>
        <div className="map__map">
          <Map center={center} zoom={zoom} ref={this.ref as any} maxZoom={19}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hasArrived && this.drawRoute(track, 'red')}
            {!hasArrived && this.drawRoute(routePath, 'yellow')}
            {this.addCurrentMarker()}
          </Map>
          <div className="map__fullscreen-button">
            <Icon image={IconImage.EXPAND} onClick={this.handleFullscreen} />
          </div>
          <div className="map__simulation-buttons" />
          <div className="map__controls">
            <Button
              onClick={this.startSimulation}
              disabled={routePath.length === 0 || hasArrived}
            >
              Начать движение
            </Button>
            <Button
              onClick={this.startMeasurementSimulation}
              disabled={!hasArrived}
            >
              Начать измерение
            </Button>
            <Controls
              measurementStarted={measurementStarted}
              hasArrived={hasArrived}
              onMeasurementClick={() => {
                setMeasurementStarted(true);
                window.location.href = '/road';
              }}
              onCancelClick={() =>
                currentTaskId && openModal('Cancel', { taskId: currentTaskId })
              }
            />
            <div className="map__speed">
              <Speed speed={speed} />
            </div>
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
