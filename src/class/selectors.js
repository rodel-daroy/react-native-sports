/* @flow */

import canUpdateClassBookingStatus from './canUpdateClassBookingStatus'
import {CLASS_TYPES} from './reducer'
import getDateAndTimeDifference from './getDateAndTimeDifference'
import immutable from 'immutable'
import {NetworkRequests} from '../RNFReact'
import stripHTMLTags from '../common/stripHTMLTags'
import {
    BOOKED,
    CANCELED,
    CLOSED,
    OPEN,
    WAITLISTAVAILABLE,
    WAITLISTED,
} from '../common/booking/bookingStatusConstants'
import {
    CLASS_DATE_FILTER_NAME,
    GET_CLASSES,
    GET_SWEAT_REMAINING_BALANCE,
    REQUEST_NAME,
    SWEAT_CLASS_DATE_FILTER_NAME,
    SWEAT_TRAINER_CLASSES_DATE_FILTER,
} from './constants'
import {
    createSelector,
    createStructuredSelector,
} from 'reselect'

import {
    currentFilterIndexSelector,
    filtersSelector,
    weeksFromNowSelector,
} from '../dateFilter/selectors'
import {
    getDurationInMins,
    getMonthAndDay,
    getTime,
} from '../timeAndDateUtil'
import {
    hasMembership,
    isSweatMember,
    userId,
} from '../user/userSelector'

const {
    selectors: {
        networkRequestSucceededSelector,
        networkRequestStartedSelector,
    },
    statusConstants: {REQUEST_STARTED},
} = NetworkRequests

const setRequestStatus = (requests) => ((item) => {
    if (requests && requests.get(item.get('iD')) === REQUEST_STARTED) {
        return item.set('isLoading', true)
    }

    return item
})

export const getClassRequests = (state) => state.getIn(['networkRequest', REQUEST_NAME], immutable.Map())
export const getCurrentClassId = (state) => state.getIn(['class', 'currentClassId'])

const getClasses = createSelector(
    (state) => state.getIn(['class', 'classes'], immutable.List()),
    (classes) => {
        const doesNameIncludePrivateKeyword = (className: string) => className.toLowerCase().includes('private')
        const publicClassesOnly = (classDetails) =>
            !doesNameIncludePrivateKeyword(classDetails.getIn(['classDescription', 'name'], ''))

        return classes.filter(publicClassesOnly)
    },
)

const activeFilter = (state) => state.getIn(['class', 'activeFilter'])

/*const updateBookingStatus = (currentClass) => { // eslint-disable-line complexity
    if (currentClass.get('isCanceled') === 'true') {
        return currentClass.set('bookingStatus', CANCELED)
    }

    const canUpdateBookingStatus = canUpdateClassBookingStatus(currentClass.get('startDateTime'))

    if (!canUpdateBookingStatus) {
        return currentClass.set('bookingStatus', CLOSED)
    }

    let bookingStatus;

    const isWaitlistAvailable = currentClass.get('isWaitlistAvailable');
    const isAvailable = currentClass.get('isAvailable');
    if(currentClass.get('isEnrolled') === "true") { //BOOKED
        bookingStatus = BOOKED;
    } else {
        if(isAvailable === "true") {
            bookingStatus = OPEN;
        } else {
            if(isWaitlistAvailable === "true") {
                bookingStatus = WAITLISTAVAILABLE;
            } else {
                bookingStatus = WAITLISTED;
            }
        }
    }
    return currentClass.set('bookingStatus', bookingStatus)
}*/

const ALL_CLASSES_FILTER = immutable.Map({
    name: 'All Classes',
    iD: '-99',
})

export const availableFilters = createSelector(
    getClasses,
    (classes) => classes.reduce(
        (sessionTypes, classItem) => {
            const sessionType = classItem.getIn(['classDescription', 'sessionType'])
            const initialSessionType = sessionTypes.count() === 0 ?
                sessionTypes.add(ALL_CLASSES_FILTER) : sessionTypes

            return sessionType ? initialSessionType.add(sessionType) : sessionType
        },
        immutable.Set(),
    ).toList(),
)

const isSessionType = (sessionTypeId) => (classItem) => {
    if (sessionTypeId === '-99') {
        return true
    }

    return classItem.getIn(['classDescription', 'sessionType', 'iD']) === sessionTypeId
}


const activeFilterIndex = createSelector(
    availableFilters,
    activeFilter,
    (availableFilters, activeFilter) => {
        const filterIndex = availableFilters.findIndex((program) => program.get('iD') === activeFilter)

        return filterIndex > 0 ? filterIndex : 0
    },
)

const activeSessionTypeId = createSelector(
    availableFilters,
    activeFilterIndex,
    (availableFilters, activeFilterIndex) => availableFilters.getIn([activeFilterIndex, 'iD'], null),
)

export const classesSelector = createSelector(
    getClasses,
    getClassRequests,
    activeSessionTypeId,
    (classes, requests, sessionTypeId) => {
        if (!classes.isEmpty()) {
            return classes
                .filter(isSessionType(sessionTypeId))
                .map(setRequestStatus(requests))
                // .map(updateBookingStatus)
                .sort(getDateAndTimeDifference('startDateTime'))
        }

        return classes
    },
)

export const currentClassSelector = createSelector(
    classesSelector,
    getCurrentClassId,
    (classes, id) => classes.get(id, immutable.Map()),
)

export const getClassDetail = createSelector(
    currentClassSelector,
    weeksFromNowSelector(CLASS_DATE_FILTER_NAME),
    (currentClass, weeksFromNow) => currentClass.merge(immutable.fromJS({
        isReadOnly: weeksFromNow !== 0,
        duration: getDurationInMins(currentClass.get('startDateTime'), currentClass.get('endDateTime')),
        monthDay: getMonthAndDay(currentClass.get('startDateTime')).toUpperCase(),
        time: getTime(currentClass.get('startDateTime')).toUpperCase(),
        classDescription: currentClass.get('classDescription').update('description', stripHTMLTags),
    })),
)

export const isSweatClassesSelector = (state) => state.getIn(['class', 'classesType']) === CLASS_TYPES.SWEAT_CLASSES
export const isSweatTrainerClassesSelector = (state) =>
    state.getIn(['class', 'classesType']) === CLASS_TYPES.SWEAT_TRAINER_CLASSES

const dateFilterName = createSelector(
    isSweatClassesSelector,
    (isSweatClasses) => isSweatClasses ? SWEAT_CLASS_DATE_FILTER_NAME : CLASS_DATE_FILTER_NAME,
)

const weeksFromNow = createSelector(
    dateFilterName,
    (state) => state,
    (dateFilterName, currentState) => weeksFromNowSelector(dateFilterName)(currentState),
)

const currentFilterIndex = createSelector(
    dateFilterName,
    (state) => state,
    (dateFilterName, currentState) => currentFilterIndexSelector(dateFilterName)(currentState),
)

const filters = createSelector(
    dateFilterName,
    (state) => state,
    (dateFilterName, currentState) => filtersSelector(dateFilterName)(currentState),
)

export const twoWeeksSweatClassesSelector = (state) => state.getIn(['class', 'twoWeeksSweatClasses'])
export const sweatBalanceSelector = (state) => state.getIn(['class', 'sweatBalance'], 0)

export const classListScreenSelector = createStructuredSelector({
    clientId: userId,
    weeksFromNow,
    currentFilterIndex,
    filters,
    list: classesSelector,
    isGettingList: networkRequestStartedSelector(GET_CLASSES),
    getListSuccess: networkRequestSucceededSelector(GET_CLASSES),
    hasMembership,
    isSweatClasses: isSweatClassesSelector,
    isSweatMember,
    availableFilters,
    activeFilter,
    activeFilterIndex,
    sweatBalance: sweatBalanceSelector,
    activeSessionTypeId,
    isGettingSweatBalance: networkRequestStartedSelector(GET_SWEAT_REMAINING_BALANCE),
})

export const classDetailScreenSelector = createStructuredSelector({
    clientId: userId,
    currentClass: getClassDetail,
    isGettingList: networkRequestStartedSelector(GET_CLASSES),
    isSweatClasses: isSweatClassesSelector,
})

const currentSweatTrainerIdSelector = (state) => state.getIn(['class', 'currentSweatTrainerId'])

export const sweatTrainersClassesSelector = createSelector(
    getClasses,
    getClassRequests,
    currentSweatTrainerIdSelector,
    (classes, requests, currentSweatTrainerId) => {
        if (!classes.isEmpty()) {
            return classes
                .filter((item) => item.getIn(['staff', 'iD']) === currentSweatTrainerId)
                .map(setRequestStatus(requests))
                // .map(updateBookingStatus)
                .sort(getDateAndTimeDifference('startDateTime'))
        }

        return classes
    },
)

export const sweatTrainersClassesScreenSelector = createStructuredSelector({
    classList: sweatTrainersClassesSelector,
    isGettingList: networkRequestStartedSelector(GET_CLASSES),
    getListSuccess: networkRequestSucceededSelector(GET_CLASSES),
    clientId: userId,
    sweatBalance: sweatBalanceSelector,
    isSweatTrainerClasses: isSweatTrainerClassesSelector,
    weeksFromNow: weeksFromNowSelector(SWEAT_TRAINER_CLASSES_DATE_FILTER),
    list: classesSelector,
    currentSweatTrainerId: currentSweatTrainerIdSelector,
    isGettingSweatBalance: networkRequestStartedSelector(GET_SWEAT_REMAINING_BALANCE),
})
