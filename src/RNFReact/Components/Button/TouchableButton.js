/* @flow */

import buttonStyleFromTheme from './buttonStyleFromTheme'
import buttonTitleStyleFromTheme from './buttonTitleStyleFromTheme'
import createComponent from '../../createComponent'
import Message from '../Message'
import StyleSheet from '../../StyleSheet'
import Text from '../Text'
import Touchable from '../Touchable'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export const propTypes = {
    rounded: PropTypes.bool,
    success: PropTypes.bool,
    info: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    transparent: PropTypes.bool,
    ...Touchable.propTypes,
}

const renderChildren = (children, message, theme, properties) => {
    if (message) {
        return (
            <Message
                message={message}
                style={buttonTitleStyleFromTheme(theme, properties)}
            />
        )
    }

    if (typeof children === 'string') {
        return (
            <Text style={buttonTitleStyleFromTheme(theme, properties)}>
                {properties.children}
            </Text>
        )
    }

    return properties.children
}

export default createComponent({displayName: 'TouchableButton', injectTheme: true, propTypes}, ({
    style,
    message,
    ...props
}, {theme}) => (
    <Touchable
        style={[styles.button, buttonStyleFromTheme(theme, props), style]}
        {...props}
    >
        {renderChildren(props.children, message, theme, props)}
    </Touchable>
))
