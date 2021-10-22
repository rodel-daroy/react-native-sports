/* @flow */

import immutable from 'immutable'

const filters = immutable.List([
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
])

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
