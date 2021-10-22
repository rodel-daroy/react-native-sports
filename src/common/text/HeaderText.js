/* @flow */

import COLOR_CONSTANTS from '../../colorConstants'
import React from 'react'
import SmallText from './SmallText'
import {
  createComponent,
  StyleSheet,
} from '../../RNFReact'

const styles = StyleSheet.create({
    text: {
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        fontWeight: 'bold',
    },
})

export default createComponent({displayName: 'HeaderText'}, ({
  style,
  children,
  ...props
}) => (
    <SmallText
        style={[styles.text, style]}
        {...props}
    >
        {typeof children === 'string' ? children.toUpperCase() : children}
    </SmallText>
))
