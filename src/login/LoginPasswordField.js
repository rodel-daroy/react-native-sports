/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import isNotEmpty from '../validation/isNotEmpty'
import {
    createComponent,
    HorizontalLayout,
    Icon,
    Platform,
    StyleSheet,
    TextInput,
    Touchable,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const ICON_SETS = 'Ionicons'
const outlinestyle = null
const styles = StyleSheet.create({
    completedBorder: {
        borderBottomColor: 'rgb(255, 255, 255)',
    },
    textInputContainer: {
        borderColor: 'transparent',
        borderBottomColor: COLOR_CONSTANTS.BXR_TEXT,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        padding: 0,
        margin: 15,
    },
    textInput: {
        flex: 1,
        color: COLOR_CONSTANTS.BXR_TEXT,
        height: 40,
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor: 'transparent',
        borderWidth: 0,
        ...outlinestyle,
    },
    invalidBorder: {
        borderColor: 'transparent',
        borderBottomColor: COLOR_CONSTANTS.BXR_ERROR,
    },
})

const getFieldStyle = (value: string, isValid: boolean): ?Object => {
    if (!isNotEmpty(value)) {
        return null
    }

    return isValid ? styles.completedBorder : styles.invalidBorder
}

const propTypes = {
    fieldName: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
}
const getTextColor = (fieldName) => fieldName === 'password' ? {color: COLOR_CONSTANTS.BXR_PRIMARY} : null

export default createComponent({displayName: 'LoginInputField', propTypes}, ({
                                                                                 autoCapitalize,
                                                                                 fieldName,
                                                                                 isValid,
                                                                                 onValueChange,
                                                                                 placeholder,
                                                                                 value,
                                                                                 iconName,
                                                                                 showPassword,
                                                                                 ...props
                                                                             }) => (
    <HorizontalLayout
        style={[
            styles.textInputContainer,
            getFieldStyle(value, isValid),
        ]}
        verticalAlign
    >
        <Icon
            color={COLOR_CONSTANTS.BXR_TEXT}
            iconSet={ICON_SETS}
            name={iconName}
            size={30}
            style={styles.icon}
        />
        <TextInput
            {...props}
            autoCapitalize={autoCapitalize}
            onChangeText={(text) => onValueChange(fieldName, text)}
            placeholder={placeholder}
            placeholderTextColor='rgb(150, 150, 150)'
            style={[styles.textInput, getTextColor(fieldName)]}
            value={value}
            secureTextEntry={showPassword}
        />
        <Touchable onPress={() => onValueChange("isShowPassword", !showPassword)}>
            <Icon
                color={COLOR_CONSTANTS.BXR_TEXT}
                iconSet={ICON_SETS}
                name={showPassword ? 'ios-eye' : 'ios-eye-off'}
                size={30}
                style={styles.icon}
            />
        </Touchable>
    </HorizontalLayout>
))
