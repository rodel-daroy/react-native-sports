/* @flow */

import getErrorMessage from '../api/getErrorMessage'
import {__, curryN} from 'ramda'

const errorCodePath = ['appointments', 'appointment', 'errorCode']
const getErrorCode = (response) => response.getIn(errorCodePath)

export default curryN(2, getErrorMessage)(__, getErrorCode)
