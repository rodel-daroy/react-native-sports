/* @flow */

import createComponent from '../../createComponent'
import React from 'react'
import {TextInput} from 'react-native'

const emptyFunction = () => null

export default createComponent({displayName: 'TextInput'}, ({
    onChange,
    onChangeText = emptyFunction,
    ...props
}) => {
    if (onChange) {
        console.warn('Warning: onChange api has been deprecated, please use onChangeText') // eslint-disable-line no-console
    }

    return (
        <TextInput
            {...props}
            onChange={onChange ? onChange : (event) => onChangeText(event.nativeEvent.text)}
            underlineColorAndroid='transparent'
        />
    )
})
