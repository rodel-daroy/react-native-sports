/* @flow */

import {createComponent} from '../RNFReact'
import React from 'react'
import {WebView} from 'react-native'

export default createComponent({displayName: 'WebView'}, (props) => (
    <WebView {...props} />
))
