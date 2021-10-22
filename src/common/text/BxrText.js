/* @flow */

import COLOR_CONSTANTS from '../../colorConstants'
import {
  createComponent,
  Platform,
  StyleSheet,
  Text,
} from '../../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Montserrat-Light',
        color: COLOR_CONSTANTS.BXR_TEXT,
    },
    bold: {
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
    },
})

const getFont = (style) => {
    if (style && style.fontWeight === 'bold') {
        return styles.bold
    }

    return styles.text
}

const propTypes = {
    message: PropTypes.object,
}

export default createComponent({displayName: 'BxrText', injectIntl: true, propTypes}, ({
  message,
  values,
  children,
  style,
  ...props
}, {intl}) => (
    <Text
        style={[getFont, styles.text, style]}
        {...props}
    >
        {message ? intl.formatMessage(message, values) : children}
    </Text>
))
