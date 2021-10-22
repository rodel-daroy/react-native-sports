/* @flow */

import canUpdateClassBookingStatus from '../class/canUpdateClassBookingStatus'
import {getClassRequests} from '../class/selectors'
import getScheduleType from './getScheduleType'
import {getTrainerRequests} from '../trainer/selectors'
import {NetworkRequests} from '../RNFReact'
import R from 'ramda'
import {userId} from '../user/userSelector'
import {
    BOOKED,
    CANCELED,
    CLOSED,
} from '../common/booking/bookingStatusConstants'
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
    GET_SCHEDULE,
    SCHEDULE_DATE_FILTER_NAME,
    TYPE_CLASS,
} from './constants'

const {
    selectors: {
        networkRequestSucceededSelector,
        networkRequestStartedSelector,
    },
    statusConstants: {REQUEST_STARTED},
} = NetworkRequests

const getIdentificationKey = (item) => item.get('type') === TYPE_CLASS ? 'classID' : 'appointmentID'
const getRequests = (item, classRequests, trainerRequests) =>
    item.get('type') === TYPE_CLASS ? classRequests : trainerRequests

const setRequestStatus = ({classRequests, trainerRequests}) => ((item) => {
    const requests = getRequests(item, classRequests, trainerRequests)
    const identificationKey = getIdentificationKey(item)
    const isLoading = requests && requests.get(item.get(identificationKey)) === REQUEST_STARTED

    return item.set('isLoading', Boolean(isLoading))
})

const isNotCancelled = (booking) => R.not(booking.get('lateCancelled') === 'true')

export const getSchedules = (state) => state.getIn(['schedule', 'schedules']).filter(isNotCancelled)

export const getSchedulesClassId = createSelector(
    getSchedules,
    (schedules) => schedules.map((schedule) => schedule.get('classID')),
)

const updateBookingStatus = (booking) => {
    if (booking.get('isCanceled') === 'true') {
        return booking.set('bookingStatus', CANCELED)
    }

    const bookingStatus = canUpdateClassBookingStatus(booking.get('startDateTime')) ? BOOKED : CLOSED

    return booking.set('bookingStatus', bookingStatus)
}

const setBookingType = (booking) => booking.set('type', getScheduleType(booking))

export const schedulesSelector = createSelector(
    getSchedules,
    getClassRequests,
    getTrainerRequests,
    (schedules, classRequests, trainerRequests) => schedules
        .map(R.compose(
            updateBookingStatus,
            setRequestStatus({classRequests, trainerRequests}),
            setBookingType,
        ))
        .filter((schedule) => schedule.get('type')),
)
export const scheduleListScreenSelector = createStructuredSelector({
    clientId: userId,
    weeksFromNow: weeksFromNowSelector(SCHEDULE_DATE_FILTER_NAME),
    currentFilterIndex: currentFilterIndexSelector(SCHEDULE_DATE_FILTER_NAME),
    filters: filtersSelector(SCHEDULE_DATE_FILTER_NAME),
    list: schedulesSelector,
    isGettingList: networkRequestStartedSelector(GET_SCHEDULE),
    getListSuccess: networkRequestSucceededSelector(GET_SCHEDULE),
})
