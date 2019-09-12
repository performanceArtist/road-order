import * as React from 'react';
import { Component } from 'react';

import L from 'leaflet';
import { Map, TileLayer, Polyline } from 'react-leaflet';
import { Icon, IconImage } from '@components/Icon/Icon';

import { getRoute } from '@redux/map/actions';
import { connect } from 'react-redux';
import { RootState } from '@redux/reducer';

interface State {
  lat: number;
  lng: number;
  zoom: number;
  fullscreen: boolean;
}

type OwnProps = {
  from?: string;
  to?: string;
  track?: Array<{ latitude: number; longitude: number }>;
};

type MapState = {
  track: { latitude: number; longitude: number };
};

type Props = OwnProps & MapState & typeof mapDispatch;

class MapComponent extends Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      lat: 56.472596,
      lng: 84.950367,
      zoom: 14,
      fullscreen: false
    };

    this.handleFullscreen = this.handleFullscreen.bind(this);
  }

  componentDidMount() {
    const { from, to } = this.props;
    if (!from || !to) return;

    getRoute(from, to);
  }

  handleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen }, () =>
      this.ref.current.leafletElement.invalidateSize()
    );
  }

  drawRoute() {
    if (this.props.track.length === 0) return null;

    return (
      <Polyline
        positions={this.props.track.map(({ latitude, longitude }) =>
          L.latLng(latitude, longitude)
        )}
        color="green"
        weight={8}
      />
    );
  }

  render() {
    const { lat, lng, zoom } = this.state;

    return (
      <div className={this.state.fullscreen ? 'map map_fullscreen' : 'map'}>
        <div className="map__map">
          <Map center={[lat, lng]} zoom={zoom} ref={this.ref} maxZoom={19}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.drawRoute()}
          </Map>
          <div className="map__fullscreen-button">
            <Icon image={IconImage.EXPAND} onClick={this.handleFullscreen} />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ map }: RootState) => ({ track: map.track });
const mapDispatch = { getRoute };

export default connect(
  mapState,
  mapDispatch
)(MapComponent);
