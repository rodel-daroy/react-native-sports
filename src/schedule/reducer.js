/* @flow */

import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import {logout} from '../login/actionCreators'
import R from 'ramda'
import {setClassIsUnBooked} from '../class/actionCreators'
import {setTrainerIsUnbooked} from '../trainer/actionCreators'
import {
    removeSchedule,
    setSchedules,
} from './actionCreators'

const getInitialState = R.always(immutable.fromJS({
    schedules: {},
}))

const handleRemoveSchedule = (state, {payload}) => state.deleteIn(['schedules', payload])

const handleSetSchedule = (state, {payload}) => {
    const classes = payload.reduce(
        (classMap, item) => classMap.set(item.get('iD'), immutable.fromJS(item)),
        immutable.Map(),
    )

    return state.set('schedules', classes)
}

const keyNotEqual = (key) => (id) => (item) => item.get(key) !== id

const handleSetClassIsUnbooked = (state, {payload}) => state.update('schedules', (schedules) =>
    schedules.filter(keyNotEqual('classID')(payload)))

const handleSetTrainerIsUnbooked = (state, {payload}) => state.update('schedules', (schedules) =>
    schedules.filter(keyNotEqual('appointmentID')(payload)))

export default handleActions({
    [logout]: getInitialState,
    [removeSchedule]: handleRemoveSchedule,
    [setTrainerIsUnbooked]: handleSetTrainerIsUnbooked,
    [setClassIsUnBooked]: handleSetClassIsUnbooked,
    [setSchedules]: handleSetSchedule,
}, getInitialState())
