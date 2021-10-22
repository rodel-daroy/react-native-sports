/* @flow */

import {createAction} from 'redux-actions'

export const setLoginField = createAction('bxr/login/SET_LOGIN_FIELD')
export const setForgotPasswordField = createAction('bxr/login/SET_FORGOT_PASSWORD_FIELDS')
export const setUpdatePasswordFields = createAction('bxr/login/SET_UPDATE_PASSWORD_FIELDS')
export const hydrateLoginFields = createAction('bxr/login/HYDRATE_LOGIN_FIELDS')
export const hydrateUpdatePasswordFields = createAction('bxr/login/HYDRATE_UPDATE_PASSWORD_FIELDS')
export const clearUpdatePasswordFields = createAction('bxr/login/CLEAR_UPDATE_PASSWORD_FIELDS')
export const clearLoginFields = createAction('bxr/login/CLEAR_LOGIN_FIELDS')
export const clearForgotPasswordFields = createAction('bxr/login/CLEAR_FORGOT_PASSWORD_FIELDS')
export const logout = createAction('bxr/login/LOGOUT')
