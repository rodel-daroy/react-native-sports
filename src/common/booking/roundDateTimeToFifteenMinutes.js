/* @flow */

import moment from 'moment'

type DateTimeRoundingOptions = {
    shouldRoundDown?: boolean,
    shouldRoundUp?: boolean,
}

const getRoundingFunction = (options: DateTimeRoundingOptions) => {
    if (options.shouldRoundUp) {
        return Math.ceil
    } else if (options.shouldRoundDown) {
        return Math.floor
    }

    return Math.round
}

export default (dateTime: string | Object, options: DateTimeRoundingOptions = {}) => {
    if (!dateTime) {
        return null
    }

    const INCREMENT_IN_MINUTES = 15
    const roundingFunction = getRoundingFunction(options)

    const momentDateTime = moment(dateTime) // eslint-disable-line moment-utc/no-moment-without-utc
    const minutesRoundedToNearestIncrement =
        roundingFunction(momentDateTime.minute() / INCREMENT_IN_MINUTES) * INCREMENT_IN_MINUTES

    return momentDateTime.minute(minutesRoundedToNearestIncrement).format()
}
