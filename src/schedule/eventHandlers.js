/* @flow */

import Alert from '../common/Alert' // eslint-disable-line import/no-unresolved
import apiClient from '../api/apiClient'
import {batchActions} from 'redux-batched-actions'
import {bindActionCreators} from 'redux'
import {hydrateTrainersSchedule} from '../trainer/actionCreators'
import immutable from 'immutable'
import isErrorResponse from '../api/isErrorResponse'
import moment from 'moment'
import {setSchedules} from './actionCreators'
import {
    CANCELLATION_POLICY_NOTICE,
    GET_SCHEDULE,
    SCHEDULE_DATE_FILTER_NAME,
    TYPE_CLASS,
} from './constants'
import {Linking, NetworkRequests} from '../RNFReact'
import {
    onGetList as onGetClassList,
    onRemoveClassButtonTapped,
    onViewClassDetailButtonTapped,
} from '../class/eventHandlers'
import {
    onUnbookTrainerScheduleTapped,
    onViewTrainerWasTapped,
} from '../trainer/eventHandlers'
import {
    setCurrentFilterIndex,
    setWeeksFromNow,
} from '../dateFilter/actionCreators'

const {
    actionCreators: {
        setNetworkRequestFailed,
        setNetworkRequestStarted,
        setNetworkRequestSucceeded,
    },
} = NetworkRequests


const getListFromResponse = (response) => {
    const schedules = response.getIn(['response', 'visits', 'visit']) || immutable.List([])

    return immutable.List.isList(schedules) ? schedules : immutable.List([schedules])
}

const onGetList = ({clientId, filterIndex = 0, weeksFromNow}) => async (dispatch) => {
    try {
        dispatch(setNetworkRequestStarted(GET_SCHEDULE))
        const daysToAdd = filterIndex + (weeksFromNow * 7)
        const date = moment.utc(new Date()).add(daysToAdd, 'day')
            .format('YYYY-MM-DD')

        const getScheduleResponse = await apiClient.getClientSchedules({
            schedulingWindow: true,
            startDateTime: date,
            endDateTime: date,
            clientId,
        })

        if (isErrorResponse(getScheduleResponse)) {
            throw getScheduleResponse
        }

        dispatch(batchActions([
            setNetworkRequestSucceeded(GET_SCHEDULE),
            setSchedules(getListFromResponse(getScheduleResponse)),
        ]))
    } catch (exception) {
        dispatch(setNetworkRequestFailed(GET_SCHEDULE))
    }
}

const getClassDetail = (currentClass) => ({
    classId: currentClass.get('classID'),
    className: currentClass.get('name'),
    startDateTime: currentClass.get('startDateTime'),
})

const onDateFilterChange = ({clientId, filterIndex, weeksFromNow}) => (dispatch) => {
    dispatch(setCurrentFilterIndex({fieldName: SCHEDULE_DATE_FILTER_NAME, value: filterIndex}))
    dispatch(onGetList({clientId, filterIndex, weeksFromNow}))
}

const onDateCoverageChange = ({clientId, weeksFromNow}) => (dispatch) => {
    dispatch(batchActions([
        setCurrentFilterIndex({fieldName: SCHEDULE_DATE_FILTER_NAME, value: 0}),
        setWeeksFromNow({fieldName: SCHEDULE_DATE_FILTER_NAME, value: weeksFromNow}),
    ]))
    dispatch(onGetList({clientId, weeksFromNow}))
}

const onUnBookButtonTapped = ({clientId, item}, navigation) => (dispatch) => {
    if (item.get('type') !== TYPE_CLASS) {
        dispatch(onUnbookTrainerScheduleTapped({
            appointmentId: item.get('appointmentID'),
            startTime: item.get('startDateTime'),
        }, navigation))

        return
    }

    dispatch(onRemoveClassButtonTapped({
        clientId,
        ...getClassDetail(item),
    }))
}

const formatDate = (date) => moment.utc(date).format('YYYY-MM-DD')

const buildTrainerFromSchedule = (schedule) => immutable.Map({
    staff: schedule.get('staff'),
    iD: '0',
    fromMySchedule: true,
    startDateTime: schedule.get('startDateTime'),
    endDateTime: schedule.get('endDateTime'),
    appointmentID: schedule.get('appointmentID'),
})

const onViewDetailButtonTapped = ({clientId, item}, navigation) => (dispatch) => {
    if (item.get('type') !== TYPE_CLASS) {
        const trainer = buildTrainerFromSchedule(item)

        // dispatch(batchActions([
        //     hydrateTrainersSchedule(immutable.List([trainer])),
        //     onViewTrainerWasTapped(trainer),
        // ]))

        return
    }

    const classId = item.get('classID')
    const startDateTime = formatDate(item.get('startDateTime'))
    const endDateTime = formatDate(item.get('endDateTime'))

    dispatch(onGetClassList({clientId, classId, startDateTime, endDateTime}))
    dispatch(onViewClassDetailButtonTapped(classId, navigation))
}

export const onLateCancellation = ({onCancel, onConfirm}) => (dispatch) => {
    Alert.alert(
            'Late Cancellation',
            CANCELLATION_POLICY_NOTICE,
        [
            {text: 'Confirm Cancellation', onPress: () => dispatch(onConfirm())},
            {text: 'View Cancellation Policy', onPress: () => {
                Linking.openURL('http://bxrlondon.com/cancellation-policy/')
                dispatch(onCancel())
            }},
            {text: 'Dismiss', style: 'cancel', onPress: () => dispatch(onCancel())},
        ],
    )
}

export const scheduleListScreenEventHandlers = (dispatch) => bindActionCreators({
    onUnBookButtonTapped,
    onViewDetailButtonTapped,
    onDateFilterChange,
    onDateCoverageChange,
    onGetList,
}, dispatch)
