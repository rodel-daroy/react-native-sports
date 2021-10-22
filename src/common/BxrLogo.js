/* @flow */


import React from 'react'
import {
    createComponent,
    Image,
    StyleSheet,
} from '../RNFReact'

const styles = StyleSheet.create({
    logo: {
        width: 125,
        height: 125,
    },
})

const propTypes = {
}

export default createComponent({displayName: 'BxrLogo', propTypes}, ({
    style,
}) => (
    <Image
        source={require('../images/bxrlogo.png')}
        style={[styles.logo, style]}
    />
))
