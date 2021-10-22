/* @flow */

import {createSelector} from 'reselect'
import immutable from 'immutable'
import isFormValid from './isFormValid'

const isFunc = (func) => typeof func === 'function'

export const fieldValidationStatusSelector = (validators, formSelector) => createSelector(
    formSelector,
    (fields) => fields.map((item, index) =>
        isFunc(validators[index]) ? validators[index](fields) : true,
    ),
)

export const formValidationStatusSelector = (validators, formSelector) => createSelector(
    fieldValidationStatusSelector(validators, formSelector),
    isFormValid,
)

export default (validators, formSelector) => createSelector(
    fieldValidationStatusSelector(validators, formSelector),
    (fieldValidationStatus) => immutable.Map({
        fields: fieldValidationStatus,
        isComplete: isFormValid(fieldValidationStatus),
    }),
)
