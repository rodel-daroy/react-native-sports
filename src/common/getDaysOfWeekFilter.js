/* @flow */

import immutable from 'immutable'
import moment from 'moment'

const filters = immutable.List([
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
])

export const getCurrentDayIndex = () => moment.utc().weekday() - 1

export default (currentDayIndex = 0, weeksFromNow = 0) => immutable.Range(0, filters.count()).map((item) => {
    if (item === 0 && weeksFromNow === 0) {
        return 'TODAY'
    }

    const currentIndex = currentDayIndex + item

    if (currentIndex >= filters.count()) {
        return filters.get(currentIndex - filters.count())
    }

    return filters.get(currentIndex)
})
