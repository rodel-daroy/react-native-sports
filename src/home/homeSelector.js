/* @flow */

import {createStructuredSelector} from 'reselect'
import {GET_USER_MEMBERSHIPS} from '../profile/constants'
import {NetworkRequests} from 'RNFReact'
import {SUBMIT_LOGIN} from '../login/loginConstants'
import {
    isMember,
    isSweatMember,
    membershipTypeSelector,
    userDetails,
} from '../user/userSelector'

const {
    selectors: {networkRequestSucceededSelector, networkRequestStartedSelector},
} = NetworkRequests

export const isUserLoggedInSelector = (state) => state.getIn(['user', 'isUserLoggedIn'])
export const isMembershipCardOpenSelector = (state) => {
    const scene = state.getIn(['sceneNavigation'])
    const currentScene = scene.getIn(['routes', scene.get('index'), 'key'])

    return currentScene === 'profileRoot'
}

export const mapStateToProps = createStructuredSelector({
    isGettingMembershipSucceded: networkRequestSucceededSelector(GET_USER_MEMBERSHIPS),
    isLoggingIn: networkRequestStartedSelector(SUBMIT_LOGIN),
    isMembershipCardOpen: isMembershipCardOpenSelector,
    isUserLoggedIn: isUserLoggedInSelector,
    userDetails,
    isMember,
    isSweatMember,
    membershipType: membershipTypeSelector,
})
