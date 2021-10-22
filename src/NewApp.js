import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {RootStack, LoginStack, IntroStack, loadingScreen} from './screens';
import {AsyncStorage} from './RNFReact';
import {USER_HAS_SEEN_APP_INTRO} from './asyncStorageConstants';

export default class App extends Component{

    render() {
        const Navigation = createAppContainer(
            createSwitchNavigator({
                Loading: loadingScreen,
                Intro: IntroStack,
                Login: LoginStack,
                root: RootStack
            }, {
                initialRouteName: 'Loading'
            })
        );
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>
        )
    }
}

