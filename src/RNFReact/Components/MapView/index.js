/* @flow */

import createComponent from '../../createComponent'
import MapView from 'react-native-maps'
import MapViewMarker from './MapViewMarker'
import StyleSheet from '../../StyleSheet'
import Touchable from '../Touchable'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
})

const propTypes = {
    customMarkerStyle: PropTypes.object,
    defaultRegion: PropTypes.object,
    distanceDelta: PropTypes.object,
    markers: PropTypes.array,
    onCalloutPress: PropTypes.func,
    onMarkerDetailPress: PropTypes.func,
    onMapPress: PropTypes.func,
    renderCustomerMarkerDetails: PropTypes.func,
}

export default createComponent({displayName: 'MapView', propTypes}, ({
    customMarkerStyle,
    defaultRegion = {latitude: 52, longitude: -3},
    distanceDelta = {latitudeDelta: 2, longitudeDelta: 2},
    markers = [],
    onCalloutPress,
    onMapPress,
    renderCustomerMarkerDetails,
    ...props
}) => (
    <Touchable
        {...props}
        disabled={!onMapPress}
        onPress={onMapPress}
        style={styles.wrapper}
    >
        <MapView
            region={{
                latitude: defaultRegion.latitude,
                longitude: defaultRegion.longitude,
                latitudeDelta: distanceDelta.latitudeDelta,
                longitudeDelta: distanceDelta.longitudeDelta,
            }}
            style={styles.wrapper}
        >
            {markers.map((marker, index) => (
                <MapViewMarker
                    customMarkerStyle={customMarkerStyle}
                    key={index}
                    marker={marker}
                    markerIndex={index}
                    onCalloutPress={onCalloutPress ? () => onCalloutPress(index) : () => null}
                    renderCustomerMarkerDetails={renderCustomerMarkerDetails}
                />
            ))}
        </MapView>
    </Touchable>
))
