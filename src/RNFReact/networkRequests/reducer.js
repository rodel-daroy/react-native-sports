/* @flow */

import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import {
    REQUEST_FAILED,
    REQUEST_STARTED,
    REQUEST_SUCCEEDED,
} from './statusConstants'

import {
    setNetworkRequestFailed,
    setNetworkRequestStarted,
    setNetworkRequestSucceeded,
} from './actionCreators'

const setRequestStateHandler = (requestStatus) => (state, {payload}) => {
    if (payload.id) {
        return state.setIn([payload.requestName, payload.id], requestStatus)
    }

    return state.set(payload.requestName, requestStatus)
}

export default handleActions({
    [setNetworkRequestStarted]: setRequestStateHandler(REQUEST_STARTED),
    [setNetworkRequestFailed]: setRequestStateHandler(REQUEST_FAILED),
    [setNetworkRequestSucceeded]: setRequestStateHandler(REQUEST_SUCCEEDED),
}, immutable.fromJS({}))
