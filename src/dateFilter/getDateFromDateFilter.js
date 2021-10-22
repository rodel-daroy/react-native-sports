/* @flow */

import moment from 'moment'

export default (daysfromNow = 0, weeksFromNow = 0, dateFormat) => {
    const format = dateFormat || 'YYYY-MM-DD'

    const daysToAdd = daysfromNow + (weeksFromNow * 7)
    const dateToQuery = moment.utc(new Date()).add(daysToAdd, 'day')
        .format(format)

    return dateToQuery
}
