/* @flow */

import moment from 'moment'

export default (weeksFromNow) => {
    const daysToAdd = weeksFromNow && !isNaN(weeksFromNow) ? weeksFromNow * 7 : 0
    const startDate = moment.utc().add(daysToAdd, 'day')
        .format('DD/MM')
    const endDate = moment.utc().add(daysToAdd + 6, 'day')
        .format('DD/MM')

    return `${startDate} - ${endDate}`
}
