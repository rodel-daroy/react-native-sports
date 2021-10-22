/* @flow */

import {Alert} from 'react-native'
import apiClient from '../api/apiClient'
import {batchActions} from 'redux-batched-actions'
import {bindActionCreators} from 'redux'
import canUpdateClassBookingStatus from './canUpdateClassBookingStatus'
import getClientSufficientSweatCredits from './getClientSufficientSweatCredits'
import getDateAndTimeDifference from './getDateAndTimeDifference'
import getDateFromDateFilter from '../dateFilter/getDateFromDateFilter'
import immutable from 'immutable'
import isErrorResponse from '../api/isErrorResponse'
import moment from 'moment'
import {onLateCancellation} from '../schedule/eventHandlers'
import R from 'ramda'
import {setTrainerType} from '../trainer/actionCreators'
import {TRAINER_TYPE} from '../trainer/reducer'
import {BXR_LONDON_ID, SWEAT_BY_BXR_ID} from '../location/constants'
import {
    CLASS_DATE_FILTER_NAME,
    GET_CLASSES,
    GET_SWEAT_REMAINING_BALANCE,
    REQUEST_NAME,
    SWEAT_CLASS_DATE_FILTER_NAME,
    SWEAT_TRAINER_CLASSES_DATE_FILTER,
    SWEAT_WEBSITE,
} from './constants'
import getClassErrorMessage, {getErrorCode} from './getClassErrorMessage'
import {
    isSweatClassesSelector,
    sweatBalanceSelector,
} from './selectors'
import {
    Linking,
    NetworkRequests,
} from '../RNFReact'
import {
    setActiveFilter,
    setClasses,
    setClassIsBooked,
    setClassIsJoinWaitlist,
    setClassIsRemoveWaitlist,
    setClassIsUnBooked,
    setCurrentClassId,
    setSweatBalance,
} from './actionCreators'

import {
    setCurrentFilterIndex,
    setWeeksFromNow,
} from '../dateFilter/actionCreators'
import {
    BOOKED,
    CANCELED,
    CLOSED,
    OPEN,
    WAITLISTAVAILABLE,
    WAITLISTED,
} from '../common/booking/bookingStatusConstants'

const {
    actionCreators: {
        setNetworkRequestFailed,
        setNetworkRequestStarted,
        setNetworkRequestSucceeded,
    },
} = NetworkRequests

const ERROR_BOOKING_FOR_THIS_CLASS_IS_CLOSED = 'Booking for this class is closed.'
const ERROR_UNBOOKING_FOR_THIS_CLASS_IS_CLOSED = 'It is not possible to cancel this class.'
const ERROR_INSUFFICIENT_SERVICE_BALANCE =
    "You don't have any SWEAT credits remaining. Please contact BXR reception to purchase additional SWEAT credits or go to the Purchase SWEATPACKS button on the home screen and buy via this app."

const getErrorResponse = (error) => immutable.Map.isMap(error) ? error.get('response') : undefined // eslint-disable-line no-undefined
const onRequestClassStarted = (id) => setNetworkRequestStarted(REQUEST_NAME, id)
const onRequestClassFailed = (id) => setNetworkRequestFailed(REQUEST_NAME, id)
const onRequestClassSucceeded = (id) => setNetworkRequestSucceeded(REQUEST_NAME, id)

const getClassDetail = (currentClass) => ({
    classId: currentClass.get('iD'),
    className: currentClass.getIn(['classDescription', 'name']),
    startDateTime: currentClass.get('startDateTime'),
    isWaitlistAvailable: currentClass.get('isWaitlistAvailable') === "true"
})

const requestGetClientServices = async ({classId, clientId}) => {
    const getClientServiceResponse = await apiClient.getClientServices({
        classId,
        clientId,
    })

    if (isErrorResponse(getClientServiceResponse)) {
        throw getClientServiceResponse
    }

    const clientServices = getClientServiceResponse.getIn([
        'response',
        'clientServices',
        'clientService',
    ], immutable.List())

    const clientServicesList = immutable.List.isList(clientServices) ? clientServices : immutable.List([clientServices])
    const clientServiceListSortedByExpirationDate = clientServicesList.sort(getDateAndTimeDifference('expirationDate'))

    return getClientSufficientSweatCredits(clientServiceListSortedByExpirationDate)
}

const getTotalRemainingBalance = (sweatCredits): number => R.sum(
    sweatCredits
        .map((item) => parseInt(item.get('remaining', 0), 10))
        .toJS(),
)

export const onUpdateRemainingSweatServices = (clientId, classId, isSweatClasses) => async (dispatch) => {
    if (isSweatClasses) {
        dispatch(setNetworkRequestStarted(GET_SWEAT_REMAINING_BALANCE))
        try {
            const clientServices = await requestGetClientServices({
                classId,
                clientId,
            })

            const totalSweatBalance = getTotalRemainingBalance(clientServices)

            dispatch(setNetworkRequestSucceeded(GET_SWEAT_REMAINING_BALANCE))
            dispatch(setSweatBalance(totalSweatBalance))
        } catch (exception) {
            dispatch(setNetworkRequestFailed(GET_SWEAT_REMAINING_BALANCE))
        }
    }
}

const requestBookClass = async (postBody) => {
    const addClientServiceResponse = await apiClient.addClientsToClasses(postBody)

    if (isErrorResponse(addClientServiceResponse)) {
        throw addClientServiceResponse
    }
    return addClientServiceResponse;
}


const bookClass = ({classId, clientId, isSweatClasses}) => async (dispatch, getState) => { // eslint-disable-line complexity, max-statements
    try {
        dispatch(onRequestClassStarted(classId))
        const clientServices = await requestGetClientServices({classId, clientId})

        if (isSweatClasses && clientServices.count() === 0) {
            Alert.alert(
                'Booking Failed',
                ERROR_INSUFFICIENT_SERVICE_BALANCE,
                [
                    {text: 'View SWEAT website', onPress: () => Linking.openURL(SWEAT_WEBSITE)},
                    {text: 'Dismiss', style: 'cancel', onPress: () => null},
                ],
            )
            dispatch(onRequestClassFailed(classId))

            return
        }

        const clientServiceId = clientServices.getIn([0, 'iD'], 0)

        await requestBookClass({classId, clientId, clientServiceId})
        dispatch(batchActions([
            onRequestClassSucceeded(classId),
            setClassIsBooked(classId),
        ]))

        if (isSweatClasses) {
            const currentBalance = getState().getIn(['class', 'sweatBalance']) - 1

            dispatch(setSweatBalance(currentBalance))
        }
    } catch (exception) {
        dispatch(onRequestClassFailed(classId))
        const errorResponse = getErrorResponse(exception)
        const errorCode = getErrorCode(errorResponse)
        const errorMessage = getClassErrorMessage(errorResponse)
        const alertHeader = errorCode === '600' ? 'Class Full' : 'Booking Error'

        Alert.alert(
            alertHeader,
            errorMessage,
            [
                {text: 'OK', onPress: () => null},
            ],
        )
    }
}

const joinWaitlist = ({classId, clientId, isSweatClasses})=> async (dispatch, getState) => {
    try {
        dispatch(onRequestClassStarted(classId))
        const clientServices = await requestGetClientServices({classId, clientId})
        if (isSweatClasses && clientServices.count() === 0) {
            Alert.alert(
                'Join Waitlist Failed',
                ERROR_INSUFFICIENT_SERVICE_BALANCE,
                [
                    {text: 'View SWEAT website', onPress: () => Linking.openURL(SWEAT_WEBSITE)},
                    {text: 'Dismiss', style: 'cancel', onPress: () => null},
                ],
            )
            dispatch(onRequestClassFailed(classId))
            return
        }
        const clientServiceId = clientServices.getIn([0, 'iD'], 0)
        const requestBookClassResponse = await requestBookClass({classId, clientId, clientServiceId, waitlist: true});

        const waitlistResponse = await apiClient.getWaitlistEntries({clientId});
        if (isErrorResponse(waitlistResponse)) {
            throw waitlistResponse
        }
        let waitListEntryID;
        getWaitlistResponse(waitlistResponse).forEach((item) => {
            if(item.get('classID') === classId) {
                waitListEntryID = item.get('iD')
            }
        });

        dispatch(batchActions([
            onRequestClassSucceeded(classId),
            setClassIsJoinWaitlist({classId: classId, waitListEntryID: waitListEntryID}),
        ]))

        if (isSweatClasses) {
            const currentBalance = getState().getIn(['class', 'sweatBalance']) - 1

            dispatch(setSweatBalance(currentBalance))
        };
        Alert.alert(
            'Success!',
            'You have successfully joined the waitlist.\n We will email you no later than 12 hours before the class start time to confirm if you have managed to receive a spot.',
            [
                {text: 'OK', onPress: () => null},
            ],
        )
    } catch (exception) {
        dispatch(onRequestClassFailed(classId))
        const errorResponse = getErrorResponse(exception)
        const errorCode = getErrorCode(errorResponse)
        const errorMessage = errorCode === '603' ? 'You have already joined this waitlist' : getClassErrorMessage(errorResponse)
        const alertHeader = errorCode === '603' ? '' : 'Join Waitlist Error'
        Alert.alert(
            alertHeader,
            errorMessage,
            [
                {text: 'OK', onPress: () => null},
            ],
        )
    }
}

export const onBookClassButtonTapped = ({classId, clientId, startDateTime, isSweatClasses, className, isWaitlistAvailable}) => (dispatch) => {
    if (!clientId) {
        return
    }

    if (!canUpdateClassBookingStatus(startDateTime)) {
        alert(ERROR_BOOKING_FOR_THIS_CLASS_IS_CLOSED) // eslint-disable-line no-alert

        return
    }

    const dateString = moment(startDateTime).format('MMM DD, YYYY HH:mm') // eslint-disable-line moment-utc/no-moment-without-utc

    const confirmationMessage = `You're going to book for a class for ${dateString}. Would you like to proceed?`

    Alert.alert(
        'Confirm Booking',
        confirmationMessage,
        [
            {text: 'Cancel', onPress: () => null},
            {
                text: 'OK', onPress: () => {
                    dispatch(bookClass({classId, clientId, isSweatClasses}))
                }
            },
        ],
    )

}

const onJoinWaitlistClassButtonTapped = ({classId, clientId, startDateTime, isSweatClasses, className}) => (dispatch) => {
    if (!clientId) {
        return
    }

    if (!canUpdateClassBookingStatus(startDateTime)) {
        alert(ERROR_BOOKING_FOR_THIS_CLASS_IS_CLOSED) // eslint-disable-line no-alert

        return
    }
    const dateString = moment(startDateTime).format('MMM DD, YYYY HH:mm') // eslint-disable-line moment-utc/no-moment-without-utc
    const confirmationMessage = `You're about to join the waitlist for ${className} at ${dateString}.\n Would you like to proceed?`

    Alert.alert(
        'Join the waitlist',
        confirmationMessage,
        [
            {text: 'Cancel', onPress: () => null},
            {
                text: 'OK', onPress: () => {
                    dispatch(joinWaitlist({classId, clientId, isSweatClasses}))
                }
            },
        ],
    )
}

const removeWaitList = (classId, waitListEntryID) => async(dispatch) => {
    try {
        dispatch(onRequestClassStarted(classId))
        const removeWaitlistResponse = await apiClient.removeFromWaitlist({entryIDs: [waitListEntryID]});
        if (isErrorResponse(removeWaitlistResponse)) {
            throw removeWaitlistResponse
        }
        dispatch(batchActions([
            onRequestClassSucceeded(classId),
            setClassIsRemoveWaitlist(classId),
        ]))
        Alert.alert(
            'Success!',
            'You have successfully been removed from this waitlist.',
            [
                {text: 'OK', onPress: () => null}
            ],
        )
    }catch (e) {
        dispatch(onRequestClassFailed(classId))
    }
}

const onWaitlistedButtonTapped = ({clientId, item}) => (dispatch) => {
    const classId = item.get('iD');
    const waitListEntryID = item.get('waitListEntryID');
    if(classId === undefined || waitListEntryID === undefined) return;
    const className = item.getIn(['classDescription', 'name']);
    const confirmationMessage = `Cancel the waitlist ${className}.\n Would you like to proceed?`;
    Alert.alert(
        'Cancel the waitlist',
        confirmationMessage,
        [
            {text: 'Cancel', onPress: () => null},
            {
                text: 'OK', onPress: () => {
                    dispatch(removeWaitList(classId, waitListEntryID))
                }
            }
        ],
    )
}


const requestUnbookClass = async (postBody) => {
    const response = await apiClient.removeClientsFromClasses(postBody)

    if (isErrorResponse(response)) {
        throw response
    }

    return response
}

const isOutsideCancellationWindow = (response) => response
    .getIn(['response', 'classes', 'class', 'clients', 'client', 'messages', 'string'], '')
    .includes('outside allowed window.')

const removeClassBooking = ({classId, clientId, lateCancel = false}, isResponseSuccess = () => true) =>
    async (dispatch, getState) => {// eslint-disable-line complexity, max-statements
        try {
            dispatch(onRequestClassStarted(classId))
            const response = await requestUnbookClass({classId, clientId, lateCancel})

            if (!isResponseSuccess(response)) {
                return
            }

            dispatch(batchActions([
                onRequestClassSucceeded(classId),
                setClassIsUnBooked(classId),
            ]))

            const isSweatClasses = isSweatClassesSelector(getState())
            const sweatBalance = sweatBalanceSelector(getState())

            if (isSweatClasses) {
                dispatch(
                    setSweatBalance(sweatBalance + 1),
                )
            }
        } catch (exception) {
            dispatch(onRequestClassFailed(classId))
            alert(getClassErrorMessage(getErrorResponse(exception))) // eslint-disable-line no-alert
        }
    }

const lateCancellation = ({classId, clientId}) => onLateCancellation({
    onCancel: () => onRequestClassSucceeded(classId),
    onConfirm: () => removeClassBooking({classId, clientId, lateCancel: true}),
})

const onRemoveClassBooking = ({classId, clientId}) => async (dispatch) => {
    dispatch(removeClassBooking({classId, clientId}, (response) => {
        if (!isOutsideCancellationWindow(response)) {
            return true
        }

        dispatch(lateCancellation({classId, clientId}))

        return false
    }))
}

export const onRemoveClassButtonTapped = ({className, classId, clientId, startDateTime}) => async (dispatch) => {
    if (!clientId) {
        return
    }

    if (!canUpdateClassBookingStatus(startDateTime)) {
        alert(ERROR_UNBOOKING_FOR_THIS_CLASS_IS_CLOSED) // eslint-disable-line no-alert

        return
    }

    Alert.alert(
      'Remove Class Booking',
      `Are you sure you want to remove your booking for ${className}?`,
        [
            {text: 'Cancel', onPress: () => null},
            {text: 'OK', onPress: () => dispatch(onRemoveClassBooking({classId, clientId}))},
        ],
    )
}

const getListFromResponse = (response) => {
    const classes = response.getIn(['response', 'classes', 'class'], immutable.List())

    return immutable.List.isList(classes) ? classes : immutable.List([classes])
}

const getClassListById = ({clientId, classId, startDateTime, endDateTime}) => apiClient.getClasses({
    classIds: [classId],
    clientId,
    endDateTime,
    hideCanceledClasses: true,
    schedulingWindow: false,
    startDateTime,
})

export const getClassListByDate = ({clientId, filterIndex, weeksFromNow, isSweatClasses}) => {
    const date = getDateFromDateFilter(filterIndex, weeksFromNow)

    return apiClient.getClasses({
        hideCanceledClasses: true,
        schedulingWindow: true,
        startDateTime: date,
        endDateTime: date,
        locationIds: isSweatClasses ? [SWEAT_BY_BXR_ID] : [BXR_LONDON_ID],
        clientId,
    })
}


export const getClassListByStaff = ({clientId, weeksFromNow, staffId}) => {
    const startDate = getDateFromDateFilter(0, weeksFromNow)
    const endDate = getDateFromDateFilter(0, weeksFromNow + 1)

    return apiClient.getClasses({
        hideCanceledClasses: true,
        schedulingWindow: true,
        startDateTime: startDate,
        endDateTime: endDate,
        locationIds: [SWEAT_BY_BXR_ID],
        staffIds: [staffId],
        clientId,
    })
}

const getClassList = ({
    clientId,
    classId,
    endDateTime,
    filterIndex = 0,
    startDateTime,
    staffIds = null,
    weeksFromNow,
    isSweatClasses,
}) => {
    if (staffIds !== null) {
        return getClassListByStaff({clientId, weeksFromNow, staffIds})
    }

    return R.isNil(classId) ?
        getClassListByDate({clientId, filterIndex, weeksFromNow, isSweatClasses, staffIds}) :
        getClassListById({clientId, classId, startDateTime, endDateTime})
}

const getWaitlistResponse = (response) => {
    const waitlist = response.getIn(['response', 'waitlistEntries', 'waitlistEntry'], immutable.List())
    return immutable.List.isList(waitlist) ? waitlist : immutable.List([waitlist])
}

const updateBookingStatus = (currentClass, waitlist) => { // eslint-disable-line complexity
    if (currentClass.get('isCanceled') === 'true') {
        return currentClass.set('bookingStatus', CANCELED)
    }
    const canUpdateBookingStatus = canUpdateClassBookingStatus(currentClass.get('startDateTime'))
    if (!canUpdateBookingStatus) {
        return currentClass.set('bookingStatus', CLOSED)
    }
    if(currentClass.get('isEnrolled') === "true") { //BOOKED
        return currentClass.set('bookingStatus', BOOKED)
    }
    if(waitlist.some((item) => (item.classID === currentClass.get('iD')))) {
        currentClass = currentClass.set('bookingStatus', WAITLISTED);
        return currentClass.set('waitListEntryID', waitlist.find((item) => (item.classID === currentClass.get('iD'))).waitListEntryID);
    }
    if(currentClass.get('isWaitlistAvailable') === "true") {
        return currentClass.set('bookingStatus', WAITLISTAVAILABLE)
    }
    if(currentClass.get('isAvailable') === "true") {
        return currentClass.set('bookingStatus', OPEN)
    }
    return currentClass;
}

export const onGetList = (query) => async (dispatch) => { // eslint-disable-line complexity, max-statements
    try {
        dispatch(setNetworkRequestStarted(GET_CLASSES))

        const getClassesResponse = await getClassList(query)
        if (isErrorResponse(getClassesResponse)) {
            throw getClassesResponse
        }
        const waitlistResponse = await apiClient.getWaitlistEntries({clientId: query.clientId});
        if (isErrorResponse(waitlistResponse)) {
            throw getClassesResponse
        }
        const waitlist = getWaitlistResponse(waitlistResponse).map((item) => {
            return {classID: item.get('classID'), waitListEntryID: item.get('iD')};
        });

        let classes = getListFromResponse(getClassesResponse).filter((item)=>{
            if(item.get('active') === 'true'){
                return item;
            }
        }).map((item) => updateBookingStatus(item, waitlist));

        dispatch(batchActions([
            setNetworkRequestSucceeded(GET_CLASSES),
            setClasses(classes),
        ]))

        const classId = classes.first() ? classes.first().get('iD') : false

        if (classId) {
            dispatch(onUpdateRemainingSweatServices(query.clientId, classId, query.isSweatClasses))
        }
    } catch (exception) {
        dispatch(setNetworkRequestFailed(GET_CLASSES))
    }
}

const onDateFilterChange = ({
    clientId,
    filterIndex,
    weeksFromNow,
    isSweatClasses,
    sessionTypeId,
}) => (dispatch) => {
    const filterName = isSweatClasses ? SWEAT_CLASS_DATE_FILTER_NAME : CLASS_DATE_FILTER_NAME

    dispatch(setCurrentFilterIndex({fieldName: filterName, value: filterIndex}))
    dispatch(onGetList({
        clientId,
        filterIndex,
        weeksFromNow,
        isSweatClasses,
        sessionTypeId,
    }))
}

const onDateCoverageChange = ({clientId, weeksFromNow, sessionTypeId, isSweatClasses}) => (dispatch) => {
    const filterName = isSweatClasses ? SWEAT_CLASS_DATE_FILTER_NAME : CLASS_DATE_FILTER_NAME

    dispatch(batchActions([
        setCurrentFilterIndex({fieldName: filterName, value: 0}),
        setWeeksFromNow({fieldName: filterName, value: weeksFromNow}),
    ]))
    dispatch(onGetList({clientId, weeksFromNow, sessionTypeId, isSweatClasses}))
}

export const onProgramFilterSelected = ({
    availableFilters,
    activeFilterIndex,
}) => (dispatch) => {
    const selectedProgramId = availableFilters.getIn([activeFilterIndex, 'iD'])

    dispatch(setActiveFilter(selectedProgramId))
}

export const onViewClassDetailButtonTapped = (classId, navigation) => batchActions([
    setCurrentClassId(classId),
    navigation.push('classDetails')
])

const onUnmount = () => setClasses(immutable.Map())

const onViewSweatTrainersWasTapped = (navigation) => async (dispatch) => {
    dispatch(batchActions([
        setTrainerType(TRAINER_TYPE.SWEAT),
        navigation.push('sweatTrainers')
    ]))
}

const onSweatTrainerClassDateCoverageChange = ({clientId, weeksFromNow, staffId}) => (dispatch) => {
    dispatch(batchActions([
        setCurrentFilterIndex({fieldName: SWEAT_TRAINER_CLASSES_DATE_FILTER, value: 0}),
        setWeeksFromNow({fieldName: SWEAT_TRAINER_CLASSES_DATE_FILTER, value: weeksFromNow}),
    ]))
    dispatch(onGetList({
        clientId,
        weeksFromNow,
        staffIds: [staffId],
        isSweatClasses: true,
    }))
}

export const classListScreenEventHandlers = (dispatch) => bindActionCreators({
    onBookButtonTapped: ({clientId, item, isSweatClasses}) => onBookClassButtonTapped({clientId, ...getClassDetail(item), isSweatClasses}),
    onUnBookButtonTapped: ({clientId, item}) => onRemoveClassButtonTapped({clientId, ...getClassDetail(item)}),
    onJoinWaitlistTapped: ({clientId, item, isSweatClasses}) => onJoinWaitlistClassButtonTapped({clientId, ...getClassDetail(item), isSweatClasses}),
    onWaitlistedTapped: ({clientId, item}) => onWaitlistedButtonTapped({clientId, item}),
    onDateFilterChange,
    onDateCoverageChange,
    onGetList,
    onViewDetailButtonTapped: (item, navigation) => onViewClassDetailButtonTapped(getClassDetail(item).classId, navigation),
    onProgramFilterSelected,
    onUnmount,
    onViewSweatTrainersWasTapped,
}, dispatch)

export const classDetailScreenEventHandlers = (dispatch) => bindActionCreators({
    onBookButtonTapped: ({clientId, item, isSweatClasses}) => onBookClassButtonTapped({clientId, ...getClassDetail(item), isSweatClasses}),
    onUnBookButtonTapped: ({clientId, item}) => onRemoveClassButtonTapped({clientId, ...getClassDetail(item)}),
    onJoinWaitlistTapped: ({clientId, item, isSweatClasses}) => onJoinWaitlistClassButtonTapped({clientId, ...getClassDetail(item), isSweatClasses}),
    onWaitlistedTapped: ({clientId, item}) => onWaitlistedButtonTapped({clientId, item}),
}, dispatch)

export const sweatClassTrainerClassesEventHandler = (dispatch) => bindActionCreators({
    onBookSweatTrainerClassTapped: ({clientId, item}) => onBookClassButtonTapped({clientId, ...getClassDetail(item), isSweatClasses: true}),
    onViewDetailButtonTapped: (item, navigation) => onViewClassDetailButtonTapped(getClassDetail(item).classId, navigation),
    onUnBookButtonTapped: ({clientId, item}) => onRemoveClassButtonTapped({clientId, ...getClassDetail(item)}),
    onDateCoverageChange: onSweatTrainerClassDateCoverageChange,
}, dispatch)
