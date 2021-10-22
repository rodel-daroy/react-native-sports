/* @flow */

import {createAction} from 'redux-actions'

export const setClasses = createAction('bxr/class/SET_CLASSES')
export const setCurrentClassId = createAction('bxr/class/SET_CURRENT_CLASS_ID')
export const setClassIsBooked = createAction('bxr/class/SET_CLASS_IS_BOOKED')
export const setClassIsJoinWaitlist = createAction('bxr/class/SET_CLASS_IS_JOINWAITLIST')
export const setClassIsRemoveWaitlist = createAction('bxr/class/SET_CLASS_IS_REMOVEWAITLIST')
export const setClassIsUnBooked = createAction('bxr/class/SET_CLASS_IS_UNBOOKED')
export const setClassesType = createAction('bxr/class/SET_CLASSES_TYPE')
export const setActiveFilter = createAction('bxr/class/SET_ACTIVE_FILTER')
export const setTwoWeeksSweatClasses = createAction('bxr/class/SET_TWO_WEEKS_SWEAT_CLASSES')
export const setSweatBalance = createAction('bxr/class/SET_SWEAT_BALANCE')
export const setCurrentSweatTrainerId = createAction('bxr/class/SET_CURRENT_SWEAT_TRAINER_ID')
