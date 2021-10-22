/* @flow */

import immutable from 'immutable'
import moment from 'moment'
import roundDateTimeToFifteenMinutes from './roundDateTimeToFifteenMinutes'

const isAppointmentAvailable = (appointment: Object): boolean =>
    appointment.get('startDateTime') !== appointment.get('bookableEndDateTime')

const roundAppointmentSlotsToFifteenMinutes = (appointment, index, iterable) =>
    appointment.withMutations((newAppointment) => {
        const isFirstAppointment = appointment === iterable.first()
        const isLastAppointment = appointment === iterable.last()

        newAppointment.update('startDateTime',
            (startTime: string) => roundDateTimeToFifteenMinutes(startTime, {shouldRoundUp: isFirstAppointment}))
        newAppointment.update('bookableEndDateTime',
            (startTime: string) => roundDateTimeToFifteenMinutes(startTime, {shouldRoundDown: isLastAppointment}))
    })

export default (rawSchedule: ?Object, preferredDate: ?Object): Object => {
    if (!rawSchedule) {
        return immutable.fromJS([])
    }

    const isSameDate = (appointment: Object) =>
        preferredDate ? moment.utc(appointment.get('startDateTime')).isSame(preferredDate, 'day') : true

    return rawSchedule
        .filter(isSameDate)
        // .filter(isAppointmentAvailable)
        .toList()
        .map(roundAppointmentSlotsToFifteenMinutes)
}
