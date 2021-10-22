/* @flow */

import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import {logout} from '../login/actionCreators'
import R from 'ramda'
import {
    setActiveFilter,
    setClasses,
    setClassesType,
    setClassIsBooked,
    setClassIsJoinWaitlist,
    setClassIsRemoveWaitlist,
    setClassIsUnBooked,
    setCurrentClassId,
    setCurrentSweatTrainerId,
    setSweatBalance,
    setTwoWeeksSweatClasses,
 } from './actionCreators'
import {
    BOOKED,
    CANCELED,
    CLOSED,
    OPEN,
    WAITLISTAVAILABLE,
    WAITLISTED,
} from '../common/booking/bookingStatusConstants'

export const CLASS_TYPES = {
    SWEAT_CLASSES: 'SWEAT_CLASSES',
    BXR_CLASSES: 'BXR_CLASSES',
}

const getInitialState = R.always(immutable.fromJS({
    classes: {},
    currentClassId: null,
    classesType: CLASS_TYPES.BXR_CLASSES,
    activeFilter: null,
    twoWeeksSweatClasses: {},
    sweatBalance: 0,
    currentSweatTrainerId: null,
}))

const handleSetClasses = (property) => (state, {payload}) => {
    const classes = payload.reduce(
        (classMap, item) => classMap.set(item.get('iD'), item),
        immutable.Map(),
    )

    return state.set(property, classes)
}

const handleSetProperty = (property) => (state, {payload}) => state.set(property, payload)

const handleSetClassIsJoinWaitlist = (state, {payload}) => {
    const newState = state.setIn(['classes', payload.classId, 'bookingStatus'], WAITLISTED);
    return newState.setIn(['classes', payload.classId, 'waitListEntryID'], payload.waitListEntryID);
}

export default handleActions({
    [logout]: getInitialState,
    [setClasses]: handleSetClasses('classes'),
    [setCurrentClassId]: handleSetProperty('currentClassId'),
    [setClassIsBooked]: (state, {payload}) => state.setIn(['classes', payload, 'bookingStatus'], BOOKED),
    [setClassIsJoinWaitlist]: handleSetClassIsJoinWaitlist,
    [setClassIsRemoveWaitlist]: (state, {payload}) => state.setIn(['classes', payload, 'bookingStatus'], WAITLISTAVAILABLE),
    [setClassIsUnBooked]: (state, {payload}) => state.setIn(['classes', payload, 'bookingStatus'], OPEN),
    [setClassesType]: handleSetProperty('classesType'),
    [setActiveFilter]: handleSetProperty('activeFilter'),
    [setTwoWeeksSweatClasses]: handleSetClasses('twoWeeksSweatClasses'),
    [setSweatBalance]: handleSetProperty('sweatBalance'),
    [setCurrentSweatTrainerId]: handleSetProperty('currentSweatTrainerId'),
}, getInitialState())
