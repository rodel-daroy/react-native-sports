/* @flow */
/* @global __DEV__ */

import {batchActions} from 'redux-batched-actions'
import BeamEngine from 'react-native-beam'
import {getUserMemberships} from './profile/eventHandlers'
import immutable from 'immutable'
import isModalVisible from './common/isModalVisible'
import {isUserLoggedInSelector} from './home/homeSelector'
import queryString from 'qs'
import store from './store'
import {USER_HAS_SEEN_APP_INTRO} from './asyncStorageConstants'
import {userDetails} from './user/userSelector'
import {
    AppState,
    AsyncStorage,
    Linking,
    Platform,
} from './RNFReact'
import {handleSubmitLogin, handleUpdateUserDetails} from './login/loginEventHandlers'
import {hydrateLoginFields, hydrateUpdatePasswordFields} from './login/actionCreators'
import {
    loadUserCredentials,
    loadUserDetails,
    loadUserMemberships,
    saveUserCredentials,
} from './user/userRepository'
import {
    pushScene,
    replaceScene,
} from './sceneNavigation/sceneNavigationDuck'
import {
    setIsUserLoggedIn,
    setUserCredentials,
    setUserDetails,
    setUserMembership,
} from './user/userDuck'

// eslint-disable-next-line max-len
const UNAUTHORIZED_EXTERNAL_URL_ERROR = 'Unfortunately there’s been a problem creating your account. Please contact BXR directly to resolve the problem'

const jsonToImmutable = (json) => immutable.fromJS(JSON.parse(json))

const revalidateUserSuccess = (userCredentials) => async (dispatch) => {
    const formattedUserCredentials = jsonToImmutable(userCredentials)

    dispatch(handleSubmitLogin(formattedUserCredentials, handleUpdateUserDetails))
    dispatch(setUserCredentials(formattedUserCredentials))
    await saveUserCredentials(formattedUserCredentials)

    dispatch(replaceScene({
        replaceIn: 'rootStack',
        route: 'home',
    }))
}

const revalidateUser = async () => {
    try {
        const userCredentials = await loadUserCredentials()

        if (!userCredentials) {
            store.dispatch(batchActions([
                setIsUserLoggedIn(false),
                replaceScene({
                    replaceIn: 'rootStack',
                    route: 'login',
                }),
            ]))

            return
        }

        store.dispatch(revalidateUserSuccess(userCredentials))
    } catch (exception) {
        return
    }
}

const restoreUserDetails = async () => {  // eslint-disable-line complexity
    try {
        const [
            userDetails,
            userMembership,
        ] = await Promise.all([
            loadUserDetails(),
            loadUserMemberships(),
        ])

        if (!userDetails) {
            return
        }

        const loadedUserMemberships = userMembership || {}

        store.dispatch(batchActions([
            setIsUserLoggedIn(true),
            setUserDetails(jsonToImmutable(userDetails)),
            setUserMembership(jsonToImmutable(loadedUserMemberships)),
        ]))
    } catch (exception) {
        return
    }
}

const showAppIntroIfUnseen = async () => {
    try {
        const userHasSeenAppIntro = await AsyncStorage.getItem(USER_HAS_SEEN_APP_INTRO)

        if (userHasSeenAppIntro) {
            return
        }

        store.dispatch(
            pushScene({
                route: 'appIntro',
                pushInto: 'modalStack',
            }),
        )
    } catch (exception) {
        return
    }
}

const onAppStateChange = (appState) => {
    const state = store.getState()

    if (appState !== 'active' || !isUserLoggedInSelector(state)) {
        return
    }
    const userId = userDetails(state).get('iD')

    store.dispatch(getUserMemberships(userId))
}

const isValidExternalUrl = (queryObject) => queryObject && queryObject.screen
const isValidUpdatePasswordLink = (userDetails) => userDetails.clientId && userDetails.userName

const redirectToUpdatePassword = (userDetails) => (dispatch, getState) => {
    if (isModalVisible('updatePassword', getState())) {
        return
    } else if (!isValidUpdatePasswordLink(userDetails)) {
        alert(UNAUTHORIZED_EXTERNAL_URL_ERROR) // eslint-disable-line no-alert

        return
    }

    dispatch(batchActions([
        hydrateUpdatePasswordFields(immutable.Map({
            clientId: userDetails.clientId,
            email: userDetails.userName,
            isNewSignUp: true,
        })),
        pushScene({
            route: 'updatePassword',
            pushInto: 'modalStack',

        }),
    ]))
}

const redirectToLoginScreen = (query) => (dispatch) => {
    if (isModalVisible('login', store.getState())) {
        return
    }

    if (query.userName) {
        dispatch(hydrateLoginFields(immutable.fromJS({
            email: query.userName,
            isExternalLoginLink: true,
        })))
    }

    dispatch(replaceScene({
        route: 'login',
        replaceIn: 'rootStack',
    }))
}

const onExternalLinkIsValid = (query) => (dispatch) => {
    if (query.screen === 'updatePassword') {
        dispatch(redirectToUpdatePassword(query))
    } else {
        dispatch(redirectToLoginScreen(query))
    }
}

export const handleExternalRedirectionLink = (event) => { // eslint-disable-line complexity
    if (isUserLoggedInSelector(store.getState())) {
        return
    }

    if (event && event.url) {
        const urlQueryString = event.url.split('?')[1]
        const query = queryString.parse(urlQueryString)

        if (!isValidExternalUrl(query)) {
            alert(UNAUTHORIZED_EXTERNAL_URL_ERROR) // eslint-disable-line no-alert

            return
        }

        store.dispatch(onExternalLinkIsValid(query))
    } else {
        alert(UNAUTHORIZED_EXTERNAL_URL_ERROR) // eslint-disable-line no-alert
    }
}

const handleInitialUrl = async () => {
    try {
        const url = await Linking.getInitialURL()

        if (url) {
            handleExternalRedirectionLink({url})
        }
    } catch (error) {
        console.log(`An error occurred getting the initial app URL: ${error}`) // eslint-disable-line no-console
    }
}

export const showAppIntro = () => {
    showAppIntroIfUnseen()
}

export const onAppLaunch = async () => {
    const beamServerUrl = __DEV__ ? 'http://localhost:8080' : 'https://beam2.beamplatform.io' // eslint-disable-line no-undef

    // BeamEngine.start({
    //     [BeamEngine.APPLICATION_IDENTIFIER]: '8TwF5MBK',
    //     [BeamEngine.ORGANISATION_IDENTIFIER]: 'ee36cf60-b306-4908-88bd-84d4922c92b1',
    //     [BeamEngine.BASIC_AUTH_TOKEN]: 'YXBwbGljYXRpb25JRC04VHdGNU1CSzpiMDEwZTcyMGNiODg2OWNhNTY4NTNiOWFjY2EyMGQ4NA==',
    //     [BeamEngine.SERVER_URL]: beamServerUrl,
    //     [BeamEngine.ENABLE_RICH_NOTIFICATIONS]: true,
    //     [BeamEngine.TEAM_NUMBER]: 35492585,
    // })
    // BeamEngine.requestNotificationPermissions()

    showAppIntro()
    await Promise.all([
        restoreUserDetails(),
        revalidateUser(),
    ])

    handleInitialUrl()
    Linking.addEventListener('url', handleExternalRedirectionLink)
    AppState.addEventListener('change', onAppStateChange)
}
