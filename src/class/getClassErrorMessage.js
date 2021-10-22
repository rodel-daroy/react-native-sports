/* @flow */

import getErrorMessage from '../api/getErrorMessage'
import {__, curryN} from 'ramda'

const errorCodePath = ['classes', 'class', 'clients', 'client', 'errorCode']

export const getErrorCode = (response) => response ? response.getIn(errorCodePath) : null

export default curryN(2, getErrorMessage)(__, getErrorCode)
