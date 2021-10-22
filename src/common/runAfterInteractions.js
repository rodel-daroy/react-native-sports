/* @flow */

import {InteractionManager} from 'react-native'

export default (callBack) => InteractionManager.runAfterInteractions(callBack)
