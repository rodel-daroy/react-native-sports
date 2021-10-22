/* @flow*/

import COLOR_CONSTANTS from '../../colorConstants'
import isNotEmpty from '../../validation/isNotEmpty'
import {
    createComponent,
    StyleSheet,
    TextInput,
    View,
} from '../../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    textInput: {
        color: 'rgb(255, 255, 255)',
        height: 40,
        paddingLeft: 10,
        borderWidth: 0,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-Light',
        fontSize: 15,
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, .1)',
        borderColor: 'rgb(200, 200 ,200)',
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 10,
    },
    underlinedContainer: {
        backgroundColor: 'transparent',
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 0,
        borderBottomWidth: 1,
        marginTop: 10,
    },
    completedBorder: {
        borderColor: COLOR_CONSTANTS.BXR_PRIMARY,
    },
    invalidBorder: {
        borderColor: COLOR_CONSTANTS.BXR_ERROR,
    },
})

const propTypes = {
    fieldName: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    underlined: PropTypes.bool,
    value: PropTypes.string,
}

const getContainerStyle = (underlined: boolean): Object => underlined ?
    styles.underlinedContainer :
    styles.container
const getFieldStyle = (value: string, isValid: boolean): ?Object => {
    if (!isNotEmpty(value)) {
        return null
    }

    return isValid ? styles.completedBorder : styles.invalidBorder
}

export default createComponent({displayName: 'TextInput', propTypes}, ({
    autoCapitalize,
    fieldName,
    isValid,
    onValueChange,
    placeholder,
    underlined,
    value,
    ...props
}) => (
    <View
        style={[
            getContainerStyle(underlined),
            getFieldStyle(value, isValid),
        ]}
    >
        <TextInput
            {...props}
            autoCapitalize={autoCapitalize}
            onChangeText={(text) => onValueChange(fieldName, text)}
            placeholder={placeholder}
            placeholderTextColor='rgb(150, 150, 150)'
            style={styles.textInput}
            value={value}
        />
    </View>
))
