/* @flow */

import R from 'ramda'

const errorMessages = {
    '315': 'The supplied username and password combination are incorrect.',
    '323': 'We were unable to find a user matching the details you provided. Please check your details and try again.',
    '504': 'Unfortunately we were unable to book this appointment because you already have another appointment at the same time.', // eslint-disable-line max-len
    '600': 'Unfortunately this class is now full. Please contact reception if you would like to be added to the waiting list.', // eslint-disable-line max-len
    '601': 'Unable to book: class requires payment.',
    '602': 'Class is outside scheduling window',
    '603': 'Unable to book: you are already booked onto another class at this time.',
    '604': "Unable to book: you don't meet the prerequisites for this class.",
    '605': 'Unable to book: class capacity exceeded.',
    '606': 'Unable to book: you are already on the waitlist.',
    '607': 'Unable to book: the waitlist is full.',
    '700': 'Unable to book trainer: the given time is not available',
    '503': 'Unable to book trainer: you dont have payment purchases for this trainer',
    '905': 'Unable to book trainer: the service is not available for purchasing',
    'default': 'Unfortunately there was a problem with your request. Check your connection and try again. If the issue persists, please contact BXR reception.', // eslint-disable-line max-len
}

const getErrorCode = (response, customGetErrorFunc = () => null) => response ?
    customGetErrorFunc(response) || response.get('errorCode') : null

export default (response, customGetErrorFunc = () => null) => {
    const errorCode = getErrorCode(response, customGetErrorFunc)

    if (!errorCode) {
        return errorMessages.default
    }

    return R.defaultTo(errorMessages.default, errorMessages[errorCode.toString()])
}
