/* @flow */

import {Dimensions} from 'react-native'

const DEFAULT_BASE_HEIGHT = 480

export const dimension = Dimensions.get('window')
export default (height = DEFAULT_BASE_HEIGHT) => dimension.height <= height
