/* @flow */

import {combineReducers} from 'redux-immutable'
import {createStore} from 'redux'
import sceneNavigator from './reducer'

const store = createStore(combineReducers({
    sceneNavigator,
}))

export default store
