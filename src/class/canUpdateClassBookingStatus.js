
/* @flow */

import moment from 'moment'

export default (startDateTime, minThreshold = 15) => {
    const diff = moment.utc(startDateTime).diff(moment.utc(), 'minutes')

    return diff > minThreshold
}
