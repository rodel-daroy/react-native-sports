/* @flow */

import {Alert} from "react-native";
import apiClient from '../api/apiClient'
import {batchActions} from 'redux-batched-actions'
import BeamEngine from 'react-native-beam'
import {bindActionCreators} from 'redux'
import clientPreferencesToBeamSegments from './clientPreferencesToBeamSegments'
import getErrorMessage from '../api/getErrorMessage'
import {hydrateUpdatePasswordFields} from '../login/actionCreators'
import imagePicker from '../common/imagePicker'
import immutable from 'immutable'
import immutableMapToList from '../common/immutableMapToList'
import isErrorResponse from '../api/isErrorResponse'
import moment from 'moment'
import {NetworkRequests} from '../RNFReact'
import R from 'ramda'
import runAfterInteractions from '../common/runAfterInteractions' // eslint-disable-line import/no-unresolved
import {
    clearManageProfileFields,
    hydratePreferencesFields,
    setManageProfileFields,
    setTempCreditCardNumber,
    setTempCreditCardName,
    setTempCreditCardExpiryMonth,
    setTempCreditCardExpiryYear,
} from './actionCreators'
import {
    GET_USER_ACCOUNT_BALANCES,
    GET_USER_MEMBERSHIPS,
    GET_USER_PURCHASES,
    PREFERENCES_REQUEST,
    PUT_MANAGE_PROFILE,
    CREDITCARD_GET_REQUEST,
    CREDITCARD_SAVE,
} from './constants'
import {
    popToRootScene,
} from '../sceneNavigation/sceneNavigationDuck'
import {
    saveUserAvatar,
    saveUserDetails,
    saveUserMemberships,
} from '../user/userRepository'
import {
    setUserDetails,
    setUserDetailsProperty,
    setUserMembership,
    setUserPurchases,
    setUserCreditCard,
} from '../user/userDuck'
import {setCardExpiryMonth, setCardExpiryYear} from "../trainer/actionCreators";

const {
    actionCreators: {
        setNetworkRequestFailed,
        setNetworkRequestStarted,
        setNetworkRequestSucceeded,
    },
} = NetworkRequests

const onGetMembershipExpirationDate = async ({clientId, programId, membershipId}) => {
    const clientServiceResponse = await apiClient.getClientServices({
        clientId,
        programIds: [programId],
    })

    if (isErrorResponse(clientServiceResponse)) {
        return null
    }

    const clientService =
        immutableMapToList(clientServiceResponse.getIn(['response', 'clientServices', 'clientService']))

    return clientService
            .find((item) => item.get('iD', '') === membershipId, null, immutable.Map())
            .get('expirationDate', null)
}

const onGetUserMembershipSuccess = (response, clientId) => async (dispatch) => {
    const userMembership = response.getIn(['response', 'clientMemberships', 'clientMembership']) || immutable.Map()

    const expirationDate = await onGetMembershipExpirationDate({
        clientId,
        programId: userMembership.getIn(['program', 'iD'], ''),
        membershipId: userMembership.get('iD', ''),
    })

    const updatedMembership = userMembership.set('expirationDate', expirationDate)

    saveUserMemberships(updatedMembership)
    dispatch(setUserMembership(updatedMembership))
}

export const getUserMemberships = (clientId) => async (dispatch) => {
    dispatch(setNetworkRequestStarted(GET_USER_MEMBERSHIPS))
    try {
        const userMembershipsResponse = await apiClient.getActiveClientMemberships({
            clientId,
        })

        if (isErrorResponse(userMembershipsResponse)) {
            alert(getErrorMessage(userMembershipsResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(GET_USER_MEMBERSHIPS))
        } else {
            dispatch(setNetworkRequestSucceeded(GET_USER_MEMBERSHIPS))
            dispatch(onGetUserMembershipSuccess(userMembershipsResponse, clientId))
        }
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(GET_USER_MEMBERSHIPS))
    }
}

const onGetUserPurchasesSuccess = (response) => (dispatch) => {
    const userPurchases = response.getIn(['response', 'purchases', 'saleItem']) || immutable.List([])
    const listUserPurchases = immutable.List.isList(userPurchases) ? userPurchases : immutable.List([userPurchases])

    dispatch(setUserPurchases(listUserPurchases))
}

export const getUserPurchases = (clientId) => async (dispatch) => {
    dispatch(setNetworkRequestStarted(GET_USER_PURCHASES))
    try {
        const userPurchases = await apiClient.getClientPurchases({
            clientId,
            startDate: moment(new Date()).subtract(100, 'year').format('YYYY-MM-DD'),
        })

        if (isErrorResponse(userPurchases)) {
            alert(getErrorMessage(userPurchases.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(GET_USER_PURCHASES))
        } else {
            dispatch(setNetworkRequestSucceeded(GET_USER_PURCHASES))
            dispatch(onGetUserPurchasesSuccess(userPurchases))
        }
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(GET_USER_PURCHASES))
    }
}

const onGetUserAccountBalanceSuccess = (userDetails) => (dispatch) => {
    const accountBalance = userDetails.getIn(['response', 'clients', 'client', 'accountBalance'])

    dispatch(setUserDetailsProperty({
        name: 'accountBalance',
        value: accountBalance,
    }))
}

export const getUserAccountBalances = (clientId) => async (dispatch) => {
    dispatch(setNetworkRequestStarted(GET_USER_ACCOUNT_BALANCES))
    try {
        const userDetailsResponse = await apiClient.getClientAccountBalances({
            clientId,
        })

        if (isErrorResponse(userDetailsResponse)) {
            alert(getErrorMessage(userDetailsResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(GET_USER_ACCOUNT_BALANCES))
        } else {
            dispatch(setNetworkRequestSucceeded(GET_USER_ACCOUNT_BALANCES))
            dispatch(onGetUserAccountBalanceSuccess(userDetailsResponse))
        }
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(GET_USER_ACCOUNT_BALANCES))
    }
}

export const onManageProfileFieldChange = (field: string, value: string) => (dispatch) => {
    const action = setManageProfileFields(immutable.fromJS({
        field,
        value,
    }))

    dispatch(action)
}

const onClearManageProfileFields = () => (dispatch) => dispatch(clearManageProfileFields())

const onManageProfileSuccess = (response) => async (dispatch) => {
    const userDetails = response.getIn(['response', 'clients', 'client'])

    if (userDetails) {
        dispatch(setUserDetails(userDetails))
        await saveUserDetails(userDetails)
    }

    dispatch(onClearManageProfileFields())

    runAfterInteractions(() => {
        dispatch(popToRootScene())
    })
}

const formatUpdateProfileBody = (fields) => ({
    iD: fields.get('iD'),
    addressLine1: fields.get('addressLine1'),
    city: fields.get('city'),
    postalCode: fields.get('postalCode'),
    mobilePhone: fields.get('mobilePhone'),
    homePhone: fields.get('homePhone'),
    clientIndexes: fields.get('clientIndexes'),
    state: fields.get('state'),
    isUpdate: true,
})

const updateProfile = R.compose(apiClient.addOrUpdateClients, formatUpdateProfileBody)

export const onSubmitManageProfile = (manageProfileFields) => async (dispatch) => {
    dispatch(setNetworkRequestStarted(PUT_MANAGE_PROFILE))
    try {
        const manageProfileResponse = await updateProfile(manageProfileFields)

        if (isErrorResponse(manageProfileResponse)) {
            alert(getErrorMessage(manageProfileResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(PUT_MANAGE_PROFILE))
        } else {
            dispatch(setNetworkRequestSucceeded(PUT_MANAGE_PROFILE))
            dispatch(onManageProfileSuccess(manageProfileResponse))
        }
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(PUT_MANAGE_PROFILE))
    }
}

export const onChangePasswordButtonTapped = ({iD, username}, navigation) => async (dispatch) => {
    dispatch(hydrateUpdatePasswordFields(immutable.Map({
        clientId: iD,
        email: username,
        isNewSignUp: false,
    })))

    dispatch(batchActions([navigation.push('updatePassword')]))
}

const onGetPreferencesFieldsSuccess = (response) => (dispatch) => {
    const clientIndexList = response.getIn(['response', 'clientIndexes', 'clientIndex'])

    dispatch(hydratePreferencesFields(clientIndexList))
}

export const onGetPreferencesFields = () => async (dispatch) => {
    dispatch(setNetworkRequestStarted(PREFERENCES_REQUEST))
    try {
        const getPreferencesResponse = await apiClient.getClientIndexes()

        if (isErrorResponse(getPreferencesResponse)) {
            alert(getErrorMessage(getPreferencesResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(PREFERENCES_REQUEST))
        } else {
            dispatch(setNetworkRequestSucceeded(PREFERENCES_REQUEST))
            dispatch(onGetPreferencesFieldsSuccess(getPreferencesResponse))
        }
    } catch (exception) {
        dispatch(setNetworkRequestFailed(PREFERENCES_REQUEST))
    }
}

export const onUpdatePreferences = (clientIndexes, preferenceID: number, valueID: number) => (dispatch) => {
    const updatedPreferences = clientIndexes.set(preferenceID, valueID)

    const action = setManageProfileFields(immutable.fromJS({
        field: 'clientIndexes',
        value: updatedPreferences,
    }))

    dispatch(action)
}

const onGetClientPreferencesSuccess = (clientResponse) => (dispatch, getState) => {
    const clientIndexes = clientResponse.getIn([
        'response',
        'clients',
        'client',
        'clientIndexes',
        'clientIndex',
    ], immutable.List())

    const clientIndexList = immutable.List.isList(clientIndexes) ? clientIndexes : immutable.List([clientIndexes])

    const value = clientIndexList.reduce((newClientIndex, item) =>
        newClientIndex.set(item.get('iD'), item.getIn(['values', 'clientIndexValue', 'iD'])),
        immutable.Map(),
    )

    const clientPreferences = getState().getIn(['profile', 'managePreferenceFields'])

    dispatch(batchActions([
        setNetworkRequestSucceeded(PREFERENCES_REQUEST),
        setUserDetailsProperty({
            name: 'clientIndexes',
            value,
        }),
    ]))

    const userSegments = clientPreferencesToBeamSegments(value, clientPreferences)

    if (userSegments) {
        // BeamEngine.setUserDemographics(userSegments)
    }
}

export const onGetClientPreferences = (clientId) => async (dispatch) => {
    dispatch(setNetworkRequestStarted(PREFERENCES_REQUEST))
    try {
        const clientResponse = await apiClient.getClients({
            clientId,
            fields: ['Clients.ClientIndexes'],
        })

        if (isErrorResponse(clientResponse)) {
            alert(getErrorMessage(clientResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(PREFERENCES_REQUEST))
        } else {
            dispatch(onGetClientPreferencesSuccess(clientResponse))
        }
    } catch (exception) {
        dispatch(setNetworkRequestFailed(PREFERENCES_REQUEST))
    }
}

const onUpdateProfileAvatar = (username) => (dispatch) =>
    imagePicker((source) => {
        saveUserAvatar(source, username)
        dispatch(setUserDetailsProperty({name: 'localPhotoURL', value: source}))
    })

export const onGetCreditCard = (clientId) => async (dispatch) => {
    dispatch(setNetworkRequestStarted(CREDITCARD_GET_REQUEST));
    try{
        const clientResponse = await apiClient.getClients({
            clientId,
            fields: ['Clients.ClientCreditCard'],
        });
        if (isErrorResponse(clientResponse)) {
            alert(getErrorMessage(clientResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestFailed(CREDITCARD_GET_REQUEST))
        } else {
            const clientCreditCard = clientResponse.getIn(['response', 'clients', 'client', 'clientCreditCard']);
            dispatch(batchActions([
                setUserCreditCard(clientCreditCard),
                setNetworkRequestSucceeded(CREDITCARD_GET_REQUEST),
            ]));
        }
    } catch (e) {
        dispatch(setNetworkRequestFailed(CREDITCARD_GET_REQUEST))
    }
};

export const onAddCreditCard = (navigation) => async (dispatch) => {
    dispatch(batchActions([navigation.push('profileAddCreditCard')]))
};
export const onChangeCreditCard = (navigation) => async (dispatch) => {
    dispatch(batchActions([navigation.push('profileChangeCreditCard')]))
};

export const onSetTempCreditCardNumber = (value) => async (dispatch) => {
    dispatch(setTempCreditCardNumber(value));
};
export const onSetTempCreditCardName = (value) => async (dispatch) => {
    dispatch(setTempCreditCardName(value));
};
export const onSetTempCardExpiryDate = (value) => async (dispatch) => {
    let month = value.split('/')[0];
    let year = value.split('/')[1];
    if (year === undefined) year = "";
    dispatch(onSetTempCreditCardExpiryMonth(month));
    dispatch(onSetTempCreditCardExpiryYear(year));
};
export const onSetTempCreditCardExpiryMonth = (value) => async (dispatch) => {
    dispatch(setTempCreditCardExpiryMonth(value));
};
export const onSetTempCreditCardExpiryYear = (value) => async (dispatch) => {
    dispatch(setTempCreditCardExpiryYear(value));
};

export const onSaveCreditCard = (clientId, cardNumber, cardName, address, city, state, postalCode, expMonth, expYear, navigation) => async (dispatch) => {
    dispatch(setNetworkRequestStarted(CREDITCARD_SAVE));
    try{
        const clientResponse = await apiClient.addOrUpdateClients({
            iD: clientId,
            clientCreditCard: {
                cardNumber,
                cardName,
                address,
                city,
                state,
                postalCode,
                expMonth,
                expYear,
            }
        });
        if (isErrorResponse(clientResponse)) {
            alert(clientResponse.getIn(['response', 'message']));
            dispatch(setNetworkRequestFailed(CREDITCARD_SAVE))
        } else {
            const clientCreditCard = clientResponse.getIn(['response', 'clients', 'client', 'clientCreditCard']);
            dispatch(batchActions([
                setUserCreditCard(clientCreditCard),
                setNetworkRequestSucceeded(CREDITCARD_SAVE),
                navigation.goBack(),
            ]));
        }
    } catch (e) {
        dispatch(setNetworkRequestFailed(CREDITCARD_SAVE))
    }
};

export const onRemoveCreditCard = (clientId, navigation) => async (dispatch) => {
    Alert.alert(
        'Remove Card',
        'Are you sure you want to remove this card from your account?',
        [
            {text: 'Yes', onPress: () => dispatch(onSaveCreditCard(clientId, "", "", "", "", "", "", "", "", navigation))},
            {text: 'Dismiss', onPress: () => null}
        ]
    );
};

export const onUpdateCreditCard = (navigation) => async (dispatch) => {
    dispatch(batchActions([navigation.push('profileAddCreditCard')]));
}

export const manageProfileEventHandlers = (dispatch) => bindActionCreators({
    onGetPreferencesFields,
    onGetClientPreferences,
    onAvatarChange: onUpdateProfileAvatar,
    onChange: onManageProfileFieldChange,
    onChangePasswordButtonTapped,
    onSubmit: onSubmitManageProfile,
    onUpdatePreferences,
    onClearManageProfileFields,
    onGetCreditCard,
    onAddCreditCard,
    onChangeCreditCard,
}, dispatch)

export const manageCreditCardEventHandlers = (dispatch) => bindActionCreators({
    onSetTempCreditCardNumber,
    onSetTempCreditCardName,
    onSetTempCardExpiryDate,
    onSetTempCreditCardExpiryMonth,
    onSetTempCreditCardExpiryYear,
    onSaveCreditCard,
    onRemoveCreditCard,
    onUpdateCreditCard,
}, dispatch);
