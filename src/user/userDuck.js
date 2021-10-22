/* @flow */

import immutable from 'immutable'
import {logout} from '../login/actionCreators'
import R from 'ramda'
import {createAction, handleActions} from 'redux-actions'

export const setUserDetails = createAction('bxr/user/SET_USER_DETAILS')
export const setUserDetailsProperty = createAction('bxr/user/SET_USER_DETAILS_PROPERTY')
export const setIsUserLoggedIn = createAction('bxr/user/SET_IS_USER_LOGGED_IN')
export const setUserCredentials = createAction('bxr/user/SET_USER_CREDENTIALS')
export const setUserPurchases = createAction('bxr/user/SET_USER_PURCHASES')
export const setUserMembership = createAction('bxr/user/SET_USER_MEMBERSHIP')
export const setUserCreditCard = createAction('bxr/user/SET_USER_CREDITCARD')


/**
 * creditCard data field
 *      <cardType>Visa</cardType>
 *      <lastFour>1111</lastFour>
 *      <cardHolder>Eric Test</cardHolder>
 *      <expMonth>01</expMonth>
 *      <expYear>2030</expYear>
 *      <address>123 ABC Ct</address>
 *      <city>San Luis Obispo</city>
 *      <state>CA</state>
 *      <postalCode>93401</postalCode>
 */


const getInitialState = R.always(immutable.fromJS({
    userDetails: {},
    userPurchases: {},
    userMembership: {},
    userCredentials: {},
    userCreditCard: {},
    isUserLoggedIn: false,
}))

const handleSetProperty = (property) => (state, {payload}) => state.set(property, payload)

const handleSetListProperties = (property) => (state, {payload}) => {
    const classes = payload.reduce(
        (classMap, item, index) => classMap.set(`userPurchases${index}`, immutable.fromJS(item)),
        immutable.Map(),
    )

    return state.set(property, classes)
}

export default handleActions({
    [logout]: getInitialState,
    [setUserDetails]: (state, {payload}) => {
        const localPhotoURL = state.getIn(['userDetails', 'localPhotoURL'])

        return state.set('userDetails', payload.set('localPhotoURL', localPhotoURL))
    },
    [setUserCredentials]: handleSetProperty('userCredentials'),
    [setUserDetailsProperty]: (state, {payload}) => state.setIn(['userDetails', payload.name], payload.value),
    [setIsUserLoggedIn]: (state, {payload}) => state.set('isUserLoggedIn', payload),
    [setUserPurchases]: handleSetListProperties('userPurchases', ['sale', 'iD']),
    [setUserMembership]: handleSetProperty('userMembership'),
    [setUserCreditCard]: handleSetProperty('userCreditCard'),
}, getInitialState())
