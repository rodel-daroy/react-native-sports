/* @flow */

import createComponent from '../createComponent'
import {createStructuredSelector} from 'reselect'
import {isNetworkBusySelector} from './selectors'
import React from 'react'
import {StatusBar} from 'react-native'

const mapStateToProps = createStructuredSelector({
    isVisible: isNetworkBusySelector,
})

export default createComponent({
    displayName: 'NetworkActivityIndicator',
    pure: true,
    mapStateToProps,
}, ({isVisible}) => (
    <StatusBar
        barStyle='light-content'
        networkActivityIndicatorVisible={isVisible}
    />
 ))
