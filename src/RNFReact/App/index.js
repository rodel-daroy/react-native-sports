/* @flow */

import AppState from '../AppState'
import defaultTheme from '../defaultTheme'
import locale from '../locale'
import localeData from 'react-intl/locale-data/'
import Messages from '../Messages'
import {Provider} from 'react-redux'
import {addLocaleData, IntlProvider} from 'react-intl'
import React from 'react';
import PropTypes from 'prop-types';
import 'intl'
// Fix Error no locale-data
// https://github.com/yahoo/react-intl/issues/409#issuecomment-257157446
import 'intl/locale-data/jsonp/en.js'

addLocaleData(localeData)


export default class App extends React.Component {
    static displayName = 'App'

    static childContextTypes = {
        theme: PropTypes.object,
    }

    static propTypes = {
        children: PropTypes.element,
        didBecomeActive: PropTypes.func,
        didFinishLaunching: PropTypes.func,
        store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
        theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
        translations: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }

    static defaultProps = {
        didBecomeActive: () => {}, // eslint-disable-line no-empty-function
        didFinishLaunching: () => {}, // eslint-disable-line no-empty-function
        translations: {},
    }

    getChildContext() {
        return {theme: this.props.theme || defaultTheme}
    }

    componentDidMount() {
        this.props.didFinishLaunching()

        this.handleAppStateChange(AppState.currentState)

        AppState.addEventListener('change', this.handleAppStateChange)
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange)
    }

    handleAppStateChange = (appState) => {
        if (appState === 'active') {
            this.props.didBecomeActive() // eslint-disable-line no-invalid-this
        }
    }

    render() {
        const languageCode = locale.split('-')[0]

        let messages = Messages.getMessages()

        if (this.props.translations[languageCode]) {
            messages = {...messages, ...this.props.translations[languageCode]}
        }

        if (this.props.translations[locale]) {
            messages = {...messages, ...this.props.translations[locale]}
        }

        return (
            <IntlProvider
                locale={locale}
                messages={messages}
            >
                <Provider store={this.props.store}>
                    {this.props.children}
                </Provider>
            </IntlProvider>
        )
    }
}
