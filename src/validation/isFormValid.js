/* @flow */

import R from 'ramda'

const isValid = R.equals(true)
const isEveryFieldValid = (fields) => fields.every(isValid)

export default (formFields: ?Map<string, boolean>): boolean => formFields ? isEveryFieldValid(formFields) : false
