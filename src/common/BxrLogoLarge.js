/* @flow */

import logo2 from '../images/bxrlogo2.png'
import React from 'react'
import {
    createComponent,
    Image,
    StyleSheet,
} from '../RNFReact'

const styles = StyleSheet.create({
    logo: {
        width: 180,
        height: 180,
    },
})

const propTypes = {
}

export default createComponent({displayName: 'BxrLogo', propTypes}, ({
    style,
}) => (
    <Image
        source={logo2}
        style={[styles.logo, style]}
    />
))
