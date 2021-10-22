/* @flow */

import apiClient from '../api/apiClient'
import {batchActions} from 'redux-batched-actions'
import BeamEngine from 'react-native-beam'
import {bindActionCreators} from 'redux'
import getErrorMessage from '../api/getErrorMessage'
import immutable from 'immutable'
import isErrorResponse from '../api/isErrorResponse'
import {NetworkRequests} from '../RNFReact'
import {onShowAbout} from '../home/homeEventHandler'
import {
    clearLoginFields,
    clearUpdatePasswordFields,
    logout,
    setForgotPasswordField,
    setLoginField,
    setUpdatePasswordFields,
} from './actionCreators'
import {
    getUserMemberships,
    onGetClientPreferences,
    onGetPreferencesFields,
} from '../profile/eventHandlers'
import {
    loadUserAvatar,
    removeUserCredentials,
    removeUserDetails,
    removeUserMemberships,
    saveUserCredentials,
    saveUserDetails,
} from '../user/userRepository'
import {
    replaceScene,
} from '../sceneNavigation/sceneNavigationDuck'
import {
    setIsUserLoggedIn,
    setUserDetails,
    setUserDetailsProperty,
} from '../user/userDuck'
import {
    SUBMIT_LOGIN,
    SUBMIT_SEND_CLIENT_NEW_PASSWORD,
    UPDATE_PASSWORD,
} from './loginConstants'

const {
    actionCreators: {
        setNetworkRequestFailed,
        setNetworkRequestStarted,
        setNetworkRequestSucceeded,
    },
} = NetworkRequests

const sendUserDetailsToBeam = (userDetails: Object) => {
    const userIdentifier = userDetails.get('email')

    if (userIdentifier) {
        // BeamEngine.setUserIdentifier(userIdentifier)
    }
}

const refreshClientPreferences = (userId) => async (dispatch) => {
    await dispatch(onGetPreferencesFields())
    dispatch(onGetClientPreferences(userId))
}

export const handleUpdateUserDetails = (loginResponse) => async (dispatch) => { // eslint-disable-line max-statements
    const userDetails = loginResponse.getIn(['response', 'client'])
    const userAvatar = await loadUserAvatar(userDetails.get('username'))

    if (userDetails) {
        const userId = userDetails.get('iD')

        sendUserDetailsToBeam(userDetails)

        dispatch(refreshClientPreferences(userId))
        dispatch(getUserMemberships(userId))
        dispatch(setUserDetails(userDetails))

        if (userAvatar) {
            dispatch(setUserDetailsProperty({name: 'localPhotoURL', value: userAvatar}))
        }

        await saveUserDetails(userDetails)
    }
}

export const handleLogout = () => async (dispatch) => {
    await Promise.all([
        removeUserCredentials(),
        removeUserDetails(),
        removeUserMemberships(),
    ])

    dispatch(batchActions([
        replaceScene({
            replaceIn: 'rootStack',
            route: 'login',
        }),
        logout(),
    ]))
}

export const handleLoginSuccess = (response, userCredentials, navigation) => async (dispatch) => {
    await Promise.all([
        dispatch(handleUpdateUserDetails(response)),
        saveUserCredentials(userCredentials),
    ])

    dispatch(batchActions([
        setIsUserLoggedIn(true),
        clearLoginFields(),
        navigation.navigate('root')
    ]))
}

export const handleSubmitLogin = (loginFields, onLoginSuccess, link, navigation) => async (dispatch) => { // eslint-disable-line max-statements
    dispatch(setNetworkRequestStarted(SUBMIT_LOGIN))

    try {
        const loginResponse = await apiClient.validateLogin({
            userName: loginFields.get('email'),
            password: loginFields.get('password'),
        })

        if (isErrorResponse(loginResponse)) {
            alert(getErrorMessage(loginResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(handleLogout())
            dispatch(batchActions([
                setIsUserLoggedIn(false),
                setNetworkRequestFailed(SUBMIT_LOGIN),
                replaceScene({
                    replaceIn: 'rootStack',
                    route: 'login',
                }),
            ]))
        } else {
            dispatch(setNetworkRequestSucceeded(SUBMIT_LOGIN))
            dispatch(onLoginSuccess(loginResponse, loginFields, navigation))
        }
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(SUBMIT_LOGIN))
    }
}

export const handleLoginFieldChange = (field: string, value: string) => (dispatch) => {
    const action = setLoginField(immutable.fromJS({
        field,
        value,
    }))

    dispatch(action)
}

export const onForgotPasswordFieldChange = (field: string, value: string) => (dispatch) => {
    const action = setForgotPasswordField(immutable.fromJS({
        field,
        value,
    }))

    dispatch(action)
}

export const handleUpdatePasswordFieldChange = (field: string, value: string) => (dispatch) => {
    const action = setUpdatePasswordFields(immutable.fromJS({
        field,
        value,
    }))

    dispatch(action)
}

export const onSubmitForgotPasswordPassword = (userDetails, navigation) => async (dispatch) => { // eslint-disable-line max-statements
    dispatch(setNetworkRequestStarted(SUBMIT_SEND_CLIENT_NEW_PASSWORD))

    try {
        const forgotPasswordResponse = await apiClient.sendClientNewPassword({
            firstName: userDetails.get('firstName'),
            lastName: userDetails.get('lastName'),
            email: userDetails.get('email'),
        })

        if (isErrorResponse(forgotPasswordResponse)) {
            alert(getErrorMessage(forgotPasswordResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(SUBMIT_SEND_CLIENT_NEW_PASSWORD))
        } else {
            dispatch(setNetworkRequestSucceeded(SUBMIT_SEND_CLIENT_NEW_PASSWORD))
            alert('An email was sent to your email address.') // eslint-disable-line no-alert
            dispatch(batchActions([navigation.goBack()]))
        }
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(SUBMIT_SEND_CLIENT_NEW_PASSWORD))
    }
}

export const onForgotPasswordButtonTapped = (navigation) => (dispatch) => {
    dispatch(batchActions([navigation.push('forgotPassword')]))
}

export const getForgotPasswordFormEventHandlers = (dispatch) => bindActionCreators({
    onChange: onForgotPasswordFieldChange,
    onSubmit: onSubmitForgotPasswordPassword,
}, dispatch)

const onUpdatePasswordSuccess = (response, userCredentials, navigation) => async (dispatch, getState) => {
    const userDetails = response.getIn(['response', 'clients', 'client'])

    const clientIndexes = getState().getIn(['user', 'userDetails', 'clientIndexes'])

    if (userDetails) {
        dispatch(getUserMemberships(userDetails.get('iD')))
        dispatch(setUserDetails(userDetails.set('clientIndexes', clientIndexes)))
        await saveUserDetails(userDetails)
    }

    await saveUserCredentials(userCredentials)

    dispatch(batchActions([
        setIsUserLoggedIn(true),
        clearUpdatePasswordFields(),
        navigation.goBack(),
        replaceScene({
            replaceIn: 'rootStack',
            route: 'home',
        }),
    ]))
}

export const handleSubmitUpdatePassword = (clientId, email, updatePasswordFields, navigation) => async (dispatch) => {
    dispatch(setNetworkRequestStarted(UPDATE_PASSWORD))

    try {
        const updatePasswordResponse = await apiClient.updatePassword({
            clientId, //clientId: updatePasswordFields.get('clientId'),
            userName: email, //userName: updatePasswordFields.get('email'),
            email: email,
            password: updatePasswordFields.get('password'),
        })

        if (isErrorResponse(updatePasswordResponse)) {
            alert(getErrorMessage(updatePasswordResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(UPDATE_PASSWORD))
        } else {
            dispatch(setNetworkRequestSucceeded(UPDATE_PASSWORD))
            dispatch(onUpdatePasswordSuccess(updatePasswordResponse, updatePasswordFields, navigation))
        }
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(UPDATE_PASSWORD))
    }
}

export const getLoginFormEventHandlers = (dispatch) => bindActionCreators({
    handleLoginFieldChange,
    handleSubmitLogin: (loginFields, isExternalLoginLink, navigation) =>
        handleSubmitLogin(loginFields, handleLoginSuccess, isExternalLoginLink, navigation),
    onForgotPasswordButtonTapped,
    onShowAbout,
}, dispatch)

export const getUpdatePasswordFormEventHandlers = (dispatch) => bindActionCreators({
    handleUpdatePasswordFieldChange,
    handleSubmitUpdatePassword,
}, dispatch)
