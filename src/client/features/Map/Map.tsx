import * as React from 'react';

import { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { Icon, IconImage } from '@components/Icon/Icon';

interface State {
  lat: number;
  lng: number;
  zoom: number;
  fullscreen: boolean;
}

type Props = {};

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

  handleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen }, () =>
      this.ref.current.leafletElement.invalidateSize()
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
          </Map>
          <div className="map__fullscreen-button">
            <Icon image={IconImage.EXPAND} onClick={this.handleFullscreen} />
          </div>
        </div>
      </div>
    );
  }
}

export default MapComponent;
