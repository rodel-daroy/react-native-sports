/* @flow */

import {createAction} from 'redux-actions'

export const setManageProfileFields = createAction('bxr/profile/SET_MANAGE_PROFILE_FIELD')
export const hydratePreferencesFields = createAction('bxr/profile/HYDRATE_PREFERENCES_FIELDS')
export const clearManageProfileFields = createAction('bxr/profile/CLEAR_MANAGE_PROFILE_FIELD')
export const setTempCreditCardNumber = createAction('bxr/profile/SET_TEMP_CARD_NUMBER');
export const setTempCreditCardName = createAction('bxr/profile/SET_TEMP_CARD_NAME');
export const setTempCreditCardExpiryMonth = createAction('bxr/profile/SET_TEMP_CARD_EXPIRY_MONTY');
export const setTempCreditCardExpiryYear = createAction('bxr/profile/SET_TEMP_CARD_EXPIRY_YEAR');
