/* @flow */

import createComponent from '../../createComponent'
import Icon from '../Icon/'
import Touchable from '../Touchable'
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
    ...Touchable.propTypes,
    ...Icon.propTypes,
}

export default createComponent({displayName: 'TouchableIcon', propTypes}, ({
    color,
    name,
    onPress,
    size,
    style,
    ...props
}) => (
    <Touchable
        onPress={onPress}
        {...props}
    >
        <Icon
            color={color}
            name={name}
            size={size}
            style={style}
        />
    </Touchable>
))
