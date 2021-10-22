/* @flow */


import BxrText from './BxrText'
import React from 'react'
import {createComponent, StyleSheet} from '../../RNFReact'

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
    },
})

export default createComponent({displayName: 'LargeText'}, ({
  style,
  ...props
}) => (
    <BxrText
        style={[styles.text, style]}
        {...props}
    />
))
