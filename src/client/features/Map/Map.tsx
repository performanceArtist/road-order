import * as React from 'react';
import { Component } from 'react';

import { Map, TileLayer, Polyline } from 'react-leaflet';
import { Icon, IconImage } from '@components/Icon/Icon';

import { getRoute } from '@redux/map/actions';
import { connect } from 'react-redux';
import { RootState } from '@redux/reducer';

interface State {
  zoom: number;
  fullscreen: boolean;
}

type OwnProps = {
  from?: [number, number];
  to?: [number, number];
};

type MapState = {
  track: Array<[number, number]>;
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

  render() {
    const { zoom } = this.state;
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
