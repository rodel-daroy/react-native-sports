/* @flow */

import createComponent from '../../createComponent'
import {} from 'react-native'
import React from 'react'
import StyleSheet from '../../StyleSheet'
import Text from '../../Components/Text'

const {Header} = {}

const styles = StyleSheet.create({
    headerTitle: {
        color: 'rgb(0, 0, 0)',
    },
})

export default createComponent({
    displayName: 'Header Title',
}, ({
    title,
    titleStyle,
}) =>
     (
         <Header.Title>
             <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
         </Header.Title>
    ),
)
