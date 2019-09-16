import * as React from 'react';
import { Component } from 'react';

import * as L from 'leaflet';
import { Map, TileLayer, Polyline, Marker } from 'react-leaflet';
import { Icon, IconImage } from '@components/Icon/Icon';

import {
  getRoute,
  setHasArrived,
  setMeasurementStatus
} from '@redux/map/actions';
import { connect } from 'react-redux';
import { RootState } from '@redux/reducer';

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
  hasArrived: boolean;
  measurementStarted: boolean;
};

type Props = OwnProps & MapState & typeof mapDispatch;

class MapComponent extends Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      zoom: 14,
      fullscreen: false
    };

    this.handleFullscreen = this.handleFullscreen.bind(this);
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
    if (this.props.track.length === 0) return null;

    return <Polyline positions={this.props.track} color="green" weight={8} />;
  }

  addCurrentMarker() {
    const { current } = this.props;
    if (!current) return;

    const o = JSON.parse(current);

    return (
      <Marker
        key={Math.random()}
        icon={L.icon({
          iconUrl: 'images/car-icon.png'
        })}
        position={L.latLng(o[0], o[1])}
      />
    );
  }

  render() {
    const { zoom } = this.state;
    const { measurementStarted, hasArrived } = this.props;

    const center =
      this.props.track.length > 0
        ? this.props.track[0]
        : [56.472596, 84.950367];

    return (
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
          <div className="map__controls">
            <Controls
              measurementStarted={measurementStarted}
              hasArrived={hasArrived}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ map }: RootState) => map;
const mapDispatch = { getRoute, setHasArrived, setMeasurementStatus };

export default connect(
  mapState,
  mapDispatch
)(MapComponent);
