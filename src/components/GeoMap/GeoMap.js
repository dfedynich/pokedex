import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Map, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};

export default class GeoMap extends PureComponent {
    static propTypes = {
        coords: PropTypes.arrayOf(PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired
        })),
        google: PropTypes.object.isRequired,
        initialCenter: PropTypes.object
    };

    static defaultProps = {
        coords: [{lat: 47.49855629475769, lng: -122.14184416996333},
            {lat: 47.359423, lng: -122.021071},
            {lat: 47.2052192687988, lng: -121.988426208496}],
        initialCenter: {
            lat: 32.7157,
            lng: -117.1611
        }
    };


    renderMarkers = () => {
        return this.props.coords.map((coord, index) => (
                <Marker
                    key={index}
                    id={index}
                    position={{
                        lat: coord.lat,
                        lng: coord.lng
                    }}
                />
            )
        )
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={this.props.initialCenter}
            >
                {this.renderMarkers()}
            </Map>
        );
    }
}