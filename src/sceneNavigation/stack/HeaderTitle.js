/* @flow */


import {} from 'react-native'
import React from 'react'
import SmallText from '../../common/text/SmallText'
import {createComponent, StyleSheet} from '../../RNFReact'

const {Header} = {}

const styles = StyleSheet.create({
    header: {
    },
    headerText: {
        textAlign: 'center'
    },
    headerTitleText: {
        color: 'rgb(255, 255, 255)',
    },
})

export default createComponent({
    displayName: 'Header Title',
}, ({title}) => (
    <Header.Title style={styles.header} textStyle={styles.headerText}>
        <SmallText style={styles.headerTitleText}>{title}</SmallText>
    </Header.Title>
))
