/* @flow */

import {Callout} from 'react-native-maps'
import createComponent from '../../createComponent'
import Touchable from '../Touchable'
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
        style={{flex: 1, position: 'relative'}}
    >
        <Touchable onPress={onPress}>
            {children}
        </Touchable>
    </Callout>
))
