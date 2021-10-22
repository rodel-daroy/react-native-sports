/* @flow */

import defaultTheme from './defaultTheme'
import THEME_CONSTANTS from './ThemeConstants'

export default {
    create: (theme: {[key: string]: any}): {[key: string]: {[key: string]: any}} =>
         Object.freeze({...defaultTheme, ...theme}),
    ...THEME_CONSTANTS,
}
