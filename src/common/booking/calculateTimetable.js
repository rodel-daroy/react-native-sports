/* @flow */

import immutable from 'immutable'
import moment from 'moment'
import R from 'ramda'
import roundDateTimeToFifteenMinutes from './roundDateTimeToFifteenMinutes'

const getIncrementsBetweenTimeRange = (startTime: Object, endTime: Object): Array<string> => {
    const INCREMENT_IN_MINUTES = 15

    const differentBetweenTimes = endTime.diff(startTime, 'minutes') / INCREMENT_IN_MINUTES
    const rangeInIncrements = R.range(0, differentBetweenTimes + 1)
    const roundedStartTime = moment(roundDateTimeToFifteenMinutes(startTime)) // eslint-disable-line moment-utc/no-moment-without-utc

    return rangeInIncrements.map((item, index) => {
        if (index === 0) {
            return roundedStartTime.format()
        }

        const multiplier = INCREMENT_IN_MINUTES * (index)

        return roundedStartTime
            .clone()
            .add(multiplier, 'minutes')
            .format()
    })
}

export default (availabilitySlots) => {
    if (!availabilitySlots) {
        return immutable.List()
    }

    return availabilitySlots.map((availabilitySlot) => {
        const startTime = moment(availabilitySlot.get('startDateTime')) // eslint-disable-line moment-utc/no-moment-without-utc
        const endTime = moment(availabilitySlot.get('bookableEndDateTime')) // eslint-disable-line moment-utc/no-moment-without-utc

        return getIncrementsBetweenTimeRange(startTime, endTime)
    }).reduce((timetable, appointmentIncrements) => [...timetable, ...appointmentIncrements], [])
}
