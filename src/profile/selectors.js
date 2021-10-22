/* @flow */

import {createStructuredSelector} from 'reselect'
import immutable from 'immutable'
import immutableMapToList from '../common/immutableMapToList'
import isNotEmpty from '../validation/isNotEmpty'
import {NetworkRequests} from '../RNFReact'
import {userDetails, userCreditCard} from '../user/userSelector'
import validationStatusSelectors from '../validation/validationStatusSelectors'
import {
    CREDITCARD_GET_REQUEST,
    PREFERENCES_IDS_FILTER,
    PREFERENCES_REQUEST,
    PUT_MANAGE_PROFILE,
    CREDITCARD_SAVE,
} from './constants'

const {
    selectors: {
        networkRequestStartedSelector,
    },
} = NetworkRequests

const manageProfileFieldsSelector = (state) => state.getIn(['profile', 'manageProfileFields'])

const keyIn = (paths = []) => {
    const keySet = immutable.Set(paths)

    return (_, key) => keySet.has(key)
}

const manageProfileFormSelector = (state) => {
    const accountDetails = userDetails(state, immutable.Map()).filter(keyIn([
        'iD',
        'username',
        'addressLine1',
        'city',
        'postalCode',
        'mobilePhone',
        'homePhone',
        'clientIndexes',
        'state',
    ]))

    const manageProfileFields = manageProfileFieldsSelector(state)

    return accountDetails.merge(manageProfileFields)
}


export const preferencesFormSelector = (state) => {
    const preferencesFields = state.getIn([
        'profile',
        'managePreferenceFields',
    ])

    return preferencesFields
            .filter((index) => PREFERENCES_IDS_FILTER.includes(index.get('iD')))
            .map((item) => {
                const currentValues = immutableMapToList(item.getIn(['values', 'clientIndexValue']))
                const newValues = currentValues.filter((item) => item.get('active') === 'true')

                return item.setIn(['values', 'clientIndexValue'], newValues)
            })
}

const manageProfileFieldsValidation = {
    iD: (form) => isNotEmpty(form.get('iD')),
    // addressLine1: (form) => isNotEmpty(form.get('addressLine1')),
    // city: (form) => isNotEmpty(form.get('city')),
    // postalCode: (form) => isNotEmpty(form.get('postalCode')),
    // mobilePhone: (form) => isNotEmpty(form.get('mobilePhone')),
    // homePhone: (form) => isNotEmpty(form.get('homePhone')),
}

const manageProfileStatusSelector = validationStatusSelectors(
    manageProfileFieldsValidation,
    manageProfileFormSelector,
)

const tempCreditCardInfo = (state) => state.getIn(['profile', 'tempCreditCardInfo']);

export const manageProfileScreenSelector = createStructuredSelector({
    isLoading: networkRequestStartedSelector(PUT_MANAGE_PROFILE),
    fields: manageProfileFormSelector,
    preferencesForm: preferencesFormSelector,
    validationStatus: manageProfileStatusSelector,
    isPreferencesLoading: networkRequestStartedSelector(PREFERENCES_REQUEST),
    userDetails,
    isGettingCreditCard: networkRequestStartedSelector(CREDITCARD_GET_REQUEST),
    userCreditCard,
});

export const manageCreditCardScreenSelector = createStructuredSelector({
    userDetails,
    userCreditCard,
    tempCreditCardInfo,
    isSavingCreditCard: networkRequestStartedSelector(CREDITCARD_SAVE),
});
