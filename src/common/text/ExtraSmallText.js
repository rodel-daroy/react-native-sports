/* @flow */


import BxrText from './BxrText'
import React from 'react'
import {createComponent, StyleSheet} from '../../RNFReact'

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
    },
})

export default createComponent({displayName: 'ExtraSmallText'}, ({
  style,
  ...props
}) => (
    <BxrText
        style={[styles.text, style]}
        {...props}
    />
))
