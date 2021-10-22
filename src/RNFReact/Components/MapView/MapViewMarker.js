/* @flow */

import createComponent from '../../createComponent'
import Image from '../Image'
import MapView from 'react-native-maps'
import MapViewCallout from './MapViewCallout' // eslint-disable-line import/no-unresolved

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    customMarkerStyle: PropTypes.object,
    marker: PropTypes.object,
    onCalloutPress: PropTypes.func,
    renderCustomerMarkerDetails: PropTypes.func,
}

export default createComponent({displayName: 'MapViewMarker', propTypes}, ({
    customMarkerStyle,
    marker,
    markerIndex,
    renderCustomerMarkerDetails,
    onCalloutPress,
}) => (
    <MapView.Marker
        coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
        }}
        title={marker.name}
    >
        {marker.imageUrl ? (
            <Image
                source={marker.imageUrl}
                style={customMarkerStyle}
            />
            ) : null}
        {renderCustomerMarkerDetails ? (
            <MapViewCallout
                onPress={onCalloutPress}
                style={{flex: 1, position: 'relative'}}
            >
                {renderCustomerMarkerDetails(marker, markerIndex)}
            </MapViewCallout>
            ) : null}
    </MapView.Marker>
))
