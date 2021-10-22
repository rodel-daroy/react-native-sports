/* @flow */

import {createAction} from 'redux-actions'

const payloadCreator = (requestName, id) => ({requestName, id})

const baseActionName = 'rnf-react/NetWorkRequest/'

export const setNetworkRequestStarted = createAction(`${baseActionName}SET_NETWORK_REQUEST_STARTED`, payloadCreator)
export const setNetworkRequestSucceeded = createAction(`${baseActionName}SET_NETWORK_REQUEST_SUCCEEDED`, payloadCreator)
export const setNetworkRequestFailed = createAction(`${baseActionName}SET_NETWORK_REQUEST_FAILED`, payloadCreator)
