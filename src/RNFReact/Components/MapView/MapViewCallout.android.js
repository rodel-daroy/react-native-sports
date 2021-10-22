/* @flow */

import {Callout} from 'react-native-maps'
import createComponent from '../../createComponent'
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onCalloutPress: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
}

export default createComponent({displayName: 'MapViewCallout', propTypes}, ({
    children,
    onPress,
}) => (
    <Callout
        onPress={onPress}
        style={{flex: 1, position: 'relative'}}
    >
        {children}
    </Callout>
))
