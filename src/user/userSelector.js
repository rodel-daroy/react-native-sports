
/* @flow */

import immutable from 'immutable'
import {NetworkRequests} from '../RNFReact'
import {
    createSelector,
    createStructuredSelector,
} from 'reselect'
import {
    GET_USER_ACCOUNT_BALANCES,
    GET_USER_MEMBERSHIPS,
    GET_USER_PURCHASES,
} from '../profile/constants'

const {
    selectors: {
        networkRequestStartedSelector,
        networkRequestSucceededSelector,
    },
} = NetworkRequests

const isAmountNotZero = (purchase) => purchase.get('amountPaid') !== '0.0000'
const getSaleDateTime = (purchase) => purchase.getIn(['sale', 'saleDateTime'])
const descending = (a, b) => {
    if (a === b) {
        return 0
    }

    return a > b ? -1 : 1
}

export const userDetails = (state) => {
    const user = state.getIn(['user', 'userDetails'])

    return user.get('localPhotoURL') ?
        user.set('photoURL', user.get('localPhotoURL')) :
        user
}

export const userMembership = (state) => state.getIn(['user', 'userMembership'], immutable.Map())

export const userPurchases = (state) => state.getIn(['user', 'userPurchases'], immutable.Map())

export const hasMembership = createSelector(
    userMembership,
    (membership) => Boolean(membership.get('name')),
)

export const isMember = createSelector(
    userMembership,
    (membership) => Boolean(membership.get('name')),
)

export const isSweatMember = createSelector(
    userMembership,
    (membership) => membership.get('name', '').toLowerCase()
        .includes('sweat'),
)

export const membershipTypeSelector = createSelector(
    isMember,
    isSweatMember,
    (member, sweatMember) => {
        if (sweatMember) {
            return 'SWEAT_MEMBER'
        } else if (member) {
            return 'BXR_MEMBER'
        }

        return 'NON_MEMBER'
    },
)

export const userId = createSelector(
    userDetails,
    (userDetails) => userDetails.get('iD'),
)

export const sortedUserPurchases = createSelector(
    userPurchases,
    (purchases) => purchases.sortBy(getSaleDateTime, descending),
)

export const nonZeroUserPurchases = createSelector(
    sortedUserPurchases,
    (purchases) => purchases.filter(isAmountNotZero),
)

export const userCreditCard = (state) =>  state.getIn(['user', 'userCreditCard'], immutable.Map())

export const mapStateToProps = createStructuredSelector({
    userDetails,
    userPurchases: nonZeroUserPurchases,
    userMembership,
    isGettingAccountBalance: networkRequestStartedSelector(GET_USER_ACCOUNT_BALANCES),
    getPurchasesSuccess: networkRequestSucceededSelector(GET_USER_PURCHASES),
    isGettingPurchases: networkRequestStartedSelector(GET_USER_PURCHASES),
    isGettingMembership: networkRequestStartedSelector(GET_USER_MEMBERSHIPS),
    userCreditCard,
})
