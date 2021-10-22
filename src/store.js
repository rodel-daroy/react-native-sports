/* @flow */

import classDuck from './class/reducer'
import {combineReducers} from 'redux-immutable'
import dateFilter from './dateFilter/reducer'
import {enableBatching} from 'redux-batched-actions'
import login from './login/reducer'
import {NetworkRequests} from './RNFReact'
import profile from './profile/reducer'
import sceneNavigation from './sceneNavigation/sceneNavigationDuck'
import schedule from './schedule/reducer'
import thunkMiddleware from 'redux-thunk'
import trainer from './trainer/reducer'
import user from './user/userDuck'
import purchase from './purchase/reducer'
import payment from './payment/reducer'
import {
    applyMiddleware,
    createStore,
} from 'redux'

const {reducer: networkRequest} = NetworkRequests

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
)(createStore)

const reducer = combineReducers({
    login,
    sceneNavigation,
    'class': classDuck,
    profile,
    user,
    networkRequest,
    schedule,
    trainer,
    dateFilter,
    purchase,
    payment,
})

export default createStoreWithMiddleware(enableBatching(reducer))
