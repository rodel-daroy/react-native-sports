/* @flow */

import {createSelector} from 'reselect'
import getDaysOfWeekFilter, {getCurrentDayIndex} from './getDaysOfWeekFilter'

export const currentFilterIndexSelector = (filterName) => (state) =>
    state.getIn(['dateFilter', 'currentFilterIndex', filterName], 0)

export const weeksFromNowSelector = (filterName) =>
    (state) => state.getIn(['dateFilter', 'weeksFromNow', filterName], 0)

export const filtersSelector = (filterName) => createSelector(
    weeksFromNowSelector(filterName),
    (weeksFromNow) => getDaysOfWeekFilter(getCurrentDayIndex(), weeksFromNow).toList(),
)
