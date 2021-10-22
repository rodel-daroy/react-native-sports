/* @flow */

import {createAction} from 'redux-actions'

export const initialiseScenes = createAction('RNF/SCENE_NAVIGATOR/INITIALISE_SCENES')
export const popScene = createAction('RNF/SCENE_NAVIGATOR/POP_SCENE')
export const popToRootScene = createAction('RNF/SCENE_NAVIGATOR/POP_TO_ROOT_SCENE')
export const pushScene = createAction('RNF/SCENE_NAVIGATOR/PUSH_SCENE')
export const replaceScene = createAction('RNF/SCENE_NAVIGATOR/REPLACE_SCENE')
export const switchToScene = createAction('RNF/SCENE_NAVIGATOR/SWITCH_TO_SCENE')
export const toggleMenuScene = createAction('RNF/SCENE_NAVIGATOR/TOGGLE_MENU_SCENE')
