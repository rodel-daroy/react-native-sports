/* @flow */

import {
    TYPE_CLASS,
    TYPE_TRAINING,
} from './constants'

const isClassType = (schedule) => schedule.get('classID') !== '0'
const isTrainingType = (schedule) => schedule.get('appointmentID') !== '0'

export default (schedule) => {
    if (isTrainingType(schedule)) {
        return TYPE_TRAINING
    } else if (isClassType(schedule)) {
        return TYPE_CLASS
    }

    return null
}
