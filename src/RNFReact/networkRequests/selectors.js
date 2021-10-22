/* @flow */

import {Map} from 'immutable'
import {
    REQUEST_FAILED,
    REQUEST_STARTED,
    REQUEST_SUCCEEDED,
} from './statusConstants'

export const networkRequestStartedSelector =
    (requestName) => (state) => state.getIn(['networkRequest', requestName]) === REQUEST_STARTED

export const networkRequestFailedSelector =
    (requestName) => (state) => state.getIn(['networkRequest', requestName]) === REQUEST_FAILED

export const networkRequestSucceededSelector =
    (requestName) => (state) => state.getIn(['networkRequest', requestName]) === REQUEST_SUCCEEDED

const isRequestStarted = (requestStatus) => requestStatus === REQUEST_STARTED

const findInprogressRequest = (requests) => Boolean(requests.find(isRequestStarted))

const isNetworkBusy = (requestStatus) => Map.isMap(requestStatus) ?
    findInprogressRequest(requestStatus) :
    isRequestStarted(requestStatus)

export const isNetworkBusySelector =
    (state) => Boolean(state.get('networkRequest').find(isNetworkBusy))
