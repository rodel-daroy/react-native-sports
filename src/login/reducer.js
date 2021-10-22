/* @flow */

import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import R from 'ramda'
import {
    clearForgotPasswordFields,
    clearLoginFields,
    clearUpdatePasswordFields,
    hydrateLoginFields,
    hydrateUpdatePasswordFields,
    logout,
    setForgotPasswordField,
    setLoginField,
    setUpdatePasswordFields,
} from './actionCreators'

const getInitialState = R.always(immutable.fromJS({
    loginFields: {
        email: null, //'dev@brando-media.com',
        password: null, //'Br$nd0321!',
        isShowPassword: true,
        isExternalLoginLink: null,
    },
    forgotPasswordFields: {
        firstName: null,
        lastName: null,
        email: null,
    },
    updatePasswordFields: {
        clientId: null,
        email: null,
        password: null,
        confirmPassword: null,
        isNewSignUp: null,
    },
}))

const createHandleFields = (formName) => (state, {payload}) =>
    state.setIn([formName, payload.get('field')], payload.get('value'))

const createHandleClearFields = (formName) => (state) =>
    state.set(formName, getInitialState().get(formName))

const createHandleHydrateForm = (formName) =>
    (state, {payload}) => state.mergeIn([formName], payload)

export default handleActions({
    [setLoginField]: createHandleFields('loginFields'),
    [setForgotPasswordField]: createHandleFields('forgotPasswordFields'),
    [setUpdatePasswordFields]: createHandleFields('updatePasswordFields'),
    [clearLoginFields]: createHandleClearFields('loginFields'),
    [clearForgotPasswordFields]: createHandleClearFields('forgotPasswordFields'),
    [clearUpdatePasswordFields]: createHandleClearFields('updatePasswordFields'),
    [hydrateUpdatePasswordFields]: createHandleHydrateForm('updatePasswordFields'),
    [hydrateLoginFields]: createHandleHydrateForm('loginFields'),
    [logout]: getInitialState,
}, getInitialState())
