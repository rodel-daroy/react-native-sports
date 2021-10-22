/* @flow */

import createComponent from '../../createComponent'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import iconStyleFromTheme from './iconStyleFromTheme'
import IoniconIcon from 'react-native-vector-icons/Ionicons'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons'
import React from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from '../../defaultTheme';

const propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    name: PropTypes.string,
}

const convertIconSetToComponent = (iconSet, iconProps) => { // eslint-disable-line complexity
    switch (iconSet) {
    case 'EvilIcons':
        return <EvilIconsIcon {...iconProps} />
    case 'Ionicons':
        return <IoniconIcon {...iconProps} />
    case 'MaterialIcons':
        return <MaterialIconsIcon {...iconProps} />
    case 'Octicons':
        return <OcticonsIcon {...iconProps} />
    case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons {...iconProps}  />
    default:
        return <FontAwesomeIcon {...iconProps} />
    }
}

export default createComponent({displayName: 'Icon', injectTheme: true, propTypes}, ({
    iconSet,
    style,
    ...props
}, {theme}) => {
    const iconProps = {
        name: props.name,
        style: style,
        ...props
    }

    return convertIconSetToComponent(iconSet, iconProps)
})
