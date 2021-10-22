/* @flow */
/* global __DEV__ */

import {connect} from 'react-redux'
import {intlShape} from 'react-intl'
import React from 'react';
import PropTypes from 'prop-types';

type Options = {|
    debug?: boolean;
    defaultProps: {[key: string]: any},
    displayName: string;
    injectIntl?: boolean;
    injectTheme?: boolean;
    mapDispatchToProps?: Function,
    mapStateToProps?: Function,
    mergeProps?: Function,
    propTypes?: {[key: string]: any};
    pure?: boolean;
|}

const createContextTypes = (injectTheme: boolean, injectIntl: boolean): ?{[key: string]: any} => { // eslint-disable-line complexity
    if (!injectTheme && !injectIntl) {
        return null
    }

    const contextTypes = {}

    if (injectTheme) {
        contextTypes.theme = PropTypes.object
    }

    if (injectIntl) {
        contextTypes.intl = intlShape
    }

    return contextTypes
}

const shouldWrapInRedux = (mapStateToProps, mapDispatchToProps, mergeProps) =>
    mapStateToProps || mapDispatchToProps || mergeProps

let increment = 0

// eslint-disable-next-line complexity, max-statements
export default ({
    defaultProps,
    displayName,
    propTypes,
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    injectTheme = false,
    injectIntl = false,
    pure = false,
    debug = false,
}: Options, WrappedComponent: ReactClass<*>) => {
    if (__DEV__) {
        if (!displayName) {
            console.error(`Display Name is required ${WrappedComponent.name}`) // eslint-disable-line no-console
        }
        if (!WrappedComponent) {
            console.error(`Wrapped Component is required ${WrappedComponent.name}`) // eslint-disable-line no-console
        }
    }

    WrappedComponent.displayName = displayName // eslint-disable-line no-param-reassign

    if (propTypes) {
        WrappedComponent.propTypes = propTypes // eslint-disable-line no-param-reassign
    }

    if (defaultProps) {
        WrappedComponent.defaultProps = defaultProps // eslint-disable-line no-param-reassign
    }

    WrappedComponent.contextTypes = createContextTypes(injectTheme, injectIntl) // eslint-disable-line no-param-reassign

    let WrappedComponentProxy = WrappedComponent

    if (__DEV__ && debug) {
        const InnerWrappedComponentProxy = WrappedComponentProxy

        WrappedComponentProxy = class extends React.Component<void, void, void> {
            static displayName = `Debug(${displayName})`;
            static propTypes = WrappedComponent.propTypes;

            componentWillMount() {
                this.componentId = increment
                increment += 1
                console.log(`Mounting ${displayName} ${this.componentId}`) // eslint-disable-line no-console
            }

            componentWillUnmount() {
                console.log(`Unmounting ${displayName} ${this.componentId}`) // eslint-disable-line no-console
            }

            render() {
                console.log(`Rendering ${displayName} ${this.componentId}`) // eslint-disable-line no-console

                return React.createElement(InnerWrappedComponentProxy, this.props)
            }
        }
    }

    if (shouldWrapInRedux(mapStateToProps, mapDispatchToProps, mergeProps)) {
        return connect(mapStateToProps, mapDispatchToProps, mergeProps, {pure})(WrappedComponentProxy)
    }

    if (!pure) {
        return WrappedComponentProxy
    }

    return class extends React.PureComponent<void, void, void> { // eslint-disable-line react/prefer-stateless-function, react/no-multi-comp
        static displayName = `Pure(${displayName})`;
        static propTypes = WrappedComponent.propTypes;

        render() {
            return React.createElement(WrappedComponentProxy, this.props)
        }
    }
}
