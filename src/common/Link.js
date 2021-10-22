/* @flow */

import {Linking} from 'react-native'
import {
    createComponent,
    Touchable,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    url: PropTypes.string,
}

export default createComponent({displayName: 'Link', propTypes}, ({
    url,
    children,
    ...props
}) => (
    <Touchable
        onPress={() => Linking.openURL(url)}
        {...props}
    >
        {children}
    </Touchable>
))
