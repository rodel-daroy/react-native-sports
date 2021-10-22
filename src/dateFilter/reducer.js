/* @flow */

import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import R from 'ramda'
import {
    setCurrentFilterIndex,
    setWeeksFromNow,
} from './actionCreators'

const getInitialState = R.always(immutable.fromJS({
    currentFilterIndex: {},
    weeksFromNow: {},
}))

const handleSetProperty = (property) => (state, {payload}) => state.setIn([property, payload.fieldName], payload.value)

export default handleActions({
    [setCurrentFilterIndex]: handleSetProperty('currentFilterIndex'),
    [setWeeksFromNow]: handleSetProperty('weeksFromNow'),
}, getInitialState())
