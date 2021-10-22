/* @flow */

import {bindActionCreators} from 'redux'
import createComponent from '../createComponent'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {
    initialiseScenes,
    popScene,
    popToRootScene,
    pushScene,
    replaceScene,
    switchToScene,
} from './eventHandlers'
import React from 'react'
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => ({
    sceneNavigator: ownProps.scene ? ownProps.scene.route : state.get('sceneNavigator'),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
        initialiseScenes,
        popScene,
        popToRootScene,
        pushScene,
        replaceScene,
        switchToScene,
    },
    dispatch,
)

export default createComponent({
    displayName: 'Scene Navigator',
    mapStateToProps,
    mapDispatchToProps,
}, class SceneNavigator extends React.Component {
    static propTypes = {
        initialScenes: ImmutablePropTypes.map,
        initialiseScenes: PropTypes.func,
        routeMap: ImmutablePropTypes.map,
        sceneNavigator: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }

    componentWillMount() {
        const {initialiseScenes, initialScenes} = this.props

        initialiseScenes(initialScenes)
    }

    render() {
        const {routeMap, sceneNavigator: route} = this.props

        if (route.isEmpty()) {
            return null
        }

        const rootKey = route.get('key')

        return React.createElement(routeMap.getIn([rootKey, 'component']), {
            routeMap,
            route,
        })
    }
})
