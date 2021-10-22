/* @flow */

import moment from 'moment'

/* eslint-disable moment-utc/no-moment-without-utc */

export const getMonthAndDay = (date: string): string => date ? moment(date).format('MMM DD') : ''

export const getMonthDayYear = (date: string): string => date ? moment(date).format('MMM DD, YYYY') : ''

export const getTime = (date: string): string => date ? moment(date).format('HH:mm') : ''

export const getDurationInMins = (startDate: string, endDate: string) => {
    const start = moment(startDate)
    const end = moment(endDate)

    const durationInMinutes = moment.duration(end.diff(start)).asMinutes()

    return `${durationInMinutes} MINS`
}

/* eslint-enable moment-utc/no-moment-without-utc */
