import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {AppState, AsyncStorage, Linking} from '../RNFReact';
import {USER_HAS_SEEN_APP_INTRO} from '../asyncStorageConstants';
import {loadUserCredentials, loadUserDetails, loadUserMemberships, saveUserCredentials} from '../user/userRepository';
import {isUserLoggedInSelector} from '../home/homeSelector';
import store from '../store';
import queryString from 'qs';
import isModalVisible from '../common/isModalVisible';
import {batchActions} from 'redux-batched-actions';
import {hydrateLoginFields, hydrateUpdatePasswordFields} from '../login/actionCreators';
import immutable from 'immutable';
import {setIsUserLoggedIn, setUserCredentials, setUserDetails, setUserMembership} from '../user/userDuck';
import {handleSubmitLogin, handleUpdateUserDetails} from '../login/loginEventHandlers';
import {userDetails} from '../user/userSelector';
import {getUserMemberships} from '../profile/eventHandlers';

let navigation;
const UNAUTHORIZED_EXTERNAL_URL_ERROR = 'Unfortunately there’s been a problem creating your account. Please contact BXR directly to resolve the problem'
const isValidExternalUrl = (queryObject) => queryObject && queryObject.screen
const isValidUpdatePasswordLink = (userDetails) => userDetails.clientId && userDetails.userName
const jsonToImmutable = (json) => immutable.fromJS(JSON.parse(json))

const revalidateUserSuccess = (userCredentials) => async (dispatch) => {
    const formattedUserCredentials = jsonToImmutable(userCredentials)

    dispatch(handleSubmitLogin(formattedUserCredentials, handleUpdateUserDetails))
    dispatch(setUserCredentials(formattedUserCredentials))
    await saveUserCredentials(formattedUserCredentials)

    dispatch(navigation.navigate('root'));
}

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
        navigation.push('updatePassword')
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

    dispatch(navigation.navigate('Login'))
}

const onExternalLinkIsValid = (query) => (dispatch) => {
    if (query.screen === 'updatePassword') {
        dispatch(redirectToUpdatePassword(query))
    } else {
        dispatch(redirectToLoginScreen(query))
    }
}

const handleExternalRedirectionLink = (event) => { // eslint-disable-line complexity
    if (isUserLoggedInSelector(store.getState())) {
        return
    }

    if (event && event.url) {
        const urlQueryString = event.url.split('?')[1]
        const query = queryString.parse(urlQueryString)

        if (!isValidExternalUrl(query)) {
            alert(UNAUTHORIZED_EXTERNAL_URL_ERROR);

            return
        }

        store.dispatch(onExternalLinkIsValid(query))
    } else {
        alert(UNAUTHORIZED_EXTERNAL_URL_ERROR) // eslint-disable-line no-alert
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

const revalidateUser = async () => {
    try {
        const userCredentials = await loadUserCredentials()

        if (!userCredentials) {
            store.dispatch(batchActions([
                setIsUserLoggedIn(false),
                navigation.navigate('Login'),
            ]))

            return
        }

        store.dispatch(revalidateUserSuccess(userCredentials))
    } catch (exception) {
        return
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

const onAppStateChange = (appState) => {
    const state = store.getState()

    if (appState !== 'active' || !isUserLoggedInSelector(state)) {
        return
    }
    const userId = userDetails(state).get('iD')

    store.dispatch(getUserMemberships(userId))
}

export default class LoadingScreen extends Component{
    componentDidMount() {
        navigation = this.props.navigation;
        this.initApp();
        restoreUserDetails();
        handleInitialUrl();
        Linking.addEventListener('url', handleExternalRedirectionLink)
        AppState.addEventListener('change', onAppStateChange)
    }

    initApp() {
        const that = this;
        AsyncStorage.getItem(USER_HAS_SEEN_APP_INTRO).then(result => {
            this.setState({userHasSeenAppIntro: result});
            if(result === null) {
                that.props.navigation.navigate('Intro');
            } else {
                revalidateUser();
                loadUserCredentials().then(userCredentials => {
                    that.props.navigation.navigate(userCredentials ? 'root' : 'Login');
                });
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'black'}} />
        )
    }
}
