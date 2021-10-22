/* @flow */

import {batchActions} from 'redux-batched-actions'
import {CLASS_TYPES} from '../class/reducer'
import {getUserMemberships} from '../profile/eventHandlers'
import {handleLogout} from '../login/loginEventHandlers'
import {Platform} from 'RNFReact'
import {setClassesType} from '../class/actionCreators'
import {APPOINTMENT_TYPES, TRAINER_TYPE} from '../trainer/reducer'
import {
    popScene,
    popToRootScene,
    pushScene,
} from '../sceneNavigation/sceneNavigationDuck'
import {setAppointmentType, setTrainerType} from '../trainer/actionCreators'
import * as FEATURES from '../featureFlags'

export const onShowAbout = () => {
    const aboutUsChildRoute = Platform.OS === 'web' ? [
        'membership',
        'location',
    ] : [
        'location',
        // 'membership',
        // 'appIntro',
        'aboutBxrScreen',
        'aboutSweatScreen',
    ]

    return pushScene({
        route: 'aboutRoot',
        pushInto: 'rootStack',
        childRoutes: aboutUsChildRoute,
    })
}

export const onClassesWasTapped = () => (dispatch) => {
    dispatch(batchActions([
        setClassesType(CLASS_TYPES.BXR_CLASSES),
        pushScene({
            route: 'classes',
            pushInto: 'rootStack',
        }),
    ]))
}

export const onSchedulesWasTapped = () => pushScene({
    route: 'schedules',
    pushInto: 'rootStack',
});

export const onShowProfileCard = () => pushScene({
    route: 'profileRoot',
    pushInto: 'modalStack',
    childRoutes: FEATURES.MANAGE_PROFILE ? [
        'profile',
        'profileManage',
        'profileMemberships',
        'profilePurchases',
    ] : [
        'profile',
        'profileMemberships',
        'profilePurchases',
    ],
})

export const onSweatClassWasTapped = () => (dispatch) => {
    dispatch(batchActions([
        setClassesType(CLASS_TYPES.SWEAT_CLASSES),
        pushScene({
            route: 'sweatClass',
            pushInto: 'rootStack',
        }),
    ]))
}

export const onHideProfileCard = () => popScene({stackToPopIn: 'modalStack'})

export const onGetUserMembership = getUserMemberships

export const onLogoutWasTapped = () => async (dispatch) => {
    await dispatch(handleLogout())

    dispatch(popToRootScene())
}

export const onTrainerWasTapped = () => (dispatch) => {
    dispatch(batchActions([
        setAppointmentType(APPOINTMENT_TYPES.TRAINERS),
        pushScene({
            route: 'trainers',
            pushInto: 'rootStack',
        }),
        setTrainerType(TRAINER_TYPE.BOOKABLE),
    ]))
}

export const onTreatmentWasTapped = () => (dispatch) => {
    dispatch(batchActions([
        setAppointmentType(APPOINTMENT_TYPES.TREATMENT),
        pushScene({
            route: 'treatments',
            pushInto: 'rootStack',
        }),
    ]))
}

export const onPurchaseSweatPacks = () => (dispatch) => {
    dispatch(batchActions([
        pushScene({
            route: 'purchaseSweat',
            pushInto: 'rootStack',
        }),
    ]))
}

export const onVersionTapped = () => (dispatch) => {
    dispatch(pushScene({
        route: 'version',
        pushInto: 'rootStack',
    }));
};
