/* @flow */

import {createStructuredSelector} from 'reselect'
import isEmail from '../../validation/isEmail'
import isNotEmpty from '../../validation/isNotEmpty'
import isPassword from '../../validation/isPassword'
import {NetworkRequests} from '../../RNFReact'
import validationStatusSelectors from '../../validation/validationStatusSelectors'
import {
    SUBMIT_LOGIN,
    SUBMIT_SEND_CLIENT_NEW_PASSWORD,
    UPDATE_PASSWORD,
} from '../loginConstants'
import {userDetails} from "../../user/userSelector";

const {selectors: {networkRequestStartedSelector}} = NetworkRequests

const loginFormSelector = (state) => state.getIn(['login', 'loginFields'])
const forgotPasswordFormSelector = (state) => state.getIn(['login', 'forgotPasswordFields'])
const updatePasswordFormSelector = (state) => state.getIn(['login', 'updatePasswordFields'])

const loginFormValidations = {
    email: (form) => isNotEmpty(form.get('email')),
    password: (form) => isNotEmpty(form.get('password')),
}

const updatePasswordFormValidations = {
    password: (form) => isNotEmpty(form.get('password')) && isPassword(form.get('password')),
    confirmPassword: (form) => form.get('password') === form.get('confirmPassword'),
}

const forgotPasswordFormValidations = {
    firstName: (form) => isNotEmpty(form.get('firstName')),
    lastName: (form) => isNotEmpty(form.get('lastName')),
    email: (form) => isEmail(form.get('email')),
}

const loginFormStatusSelector = validationStatusSelectors(
    loginFormValidations,
    loginFormSelector,
)

const updatePasswordFormValidationStatusSelector = validationStatusSelectors(
    updatePasswordFormValidations,
    updatePasswordFormSelector,
)

const forgotPasswordFormStatusSelector = validationStatusSelectors(
    forgotPasswordFormValidations,
    forgotPasswordFormSelector,
)

export const loginScreenSelector = createStructuredSelector({
    isLoading: networkRequestStartedSelector(SUBMIT_LOGIN),
    fields: loginFormSelector,
    validationStatus: loginFormStatusSelector,
})

export const updatePasswordScreenSelector = createStructuredSelector({
    isLoading: networkRequestStartedSelector(UPDATE_PASSWORD),
    fields: updatePasswordFormSelector,
    validationStatus: updatePasswordFormValidationStatusSelector,
    userDetails,
})

export const forgotPasswordScreenSelector = createStructuredSelector({
    isLoading: networkRequestStartedSelector(SUBMIT_SEND_CLIENT_NEW_PASSWORD),
    fields: forgotPasswordFormSelector,
    validationStatus: forgotPasswordFormStatusSelector,
})
