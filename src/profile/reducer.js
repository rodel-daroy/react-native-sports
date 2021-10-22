/* @flow */

import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import {logout} from '../login/actionCreators'
import R from 'ramda'
import {
    clearManageProfileFields,
    hydratePreferencesFields,
    setManageProfileFields,
    setTempCreditCardNumber,
    setTempCreditCardName,
    setTempCreditCardExpiryMonth,
    setTempCreditCardExpiryYear,
} from './actionCreators'

const getInitialState = R.always(immutable.fromJS({
    managePreferenceFields: [],
    manageProfileFields: {},
    tempCreditCardInfo: {
        number: '',
        name: '',
        expiryMonth: '',
        expiryYear: '',
    },
}))

const createHandleFields = (formName) => (state, {payload}) =>
    state.setIn([formName, payload.get('field')], payload.get('value'))


const createHandleClearFields = (formName) => (state) =>
    state.set(formName, getInitialState().get(formName))

const handleSetCardInfo = (infoName) => (state, {payload}) => state.setIn(['tempCreditCardInfo', infoName], payload);

export default handleActions({
    [setManageProfileFields]: createHandleFields('manageProfileFields'),
    [hydratePreferencesFields]: (state, {payload}) => state.set('managePreferenceFields', payload),
    [clearManageProfileFields]: createHandleClearFields('manageProfileFields'),
    [logout]: getInitialState,
    [setTempCreditCardNumber]: handleSetCardInfo('number'),
    [setTempCreditCardName]: handleSetCardInfo('name'),
    [setTempCreditCardExpiryMonth]: handleSetCardInfo('expiryMonth'),
    [setTempCreditCardExpiryYear]: handleSetCardInfo('expiryYear'),
}, getInitialState())
