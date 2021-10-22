/* @flow */

import moment from 'moment'

const ISO_DATE_FORMAT = 'YYYY-MM-DD'

type ChartDateParams = {
    date: Date,
    daysAfter: number,
}

type DateRange = {
    fromDate: string,
    toDate: string,
}

export default (params: ChartDateParams): ?DateRange => { // eslint-disable-line complexity
    if (!params || !params.date) {
        return null
    }

    const startDate = moment(params.date).format(ISO_DATE_FORMAT) // eslint-disable-line moment-utc/no-moment-without-utc

    return ({
        startDateTime: startDate,
        endDateTime: params.daysAfter ? moment(params.date).add(params.daysAfter, 'days') // eslint-disable-line moment-utc/no-moment-without-utc
            .format(ISO_DATE_FORMAT) : startDate,
    })
}
