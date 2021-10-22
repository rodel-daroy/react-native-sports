/* @flow */

import THEME_CONSTANTS from '../ThemeConstants'
import DefaultTheme from '../defaultTheme';

const mapButtonTypeColor = {
    primary: THEME_CONSTANTS.BRAND_PRIMARY,
    success: THEME_CONSTANTS.BRAND_SUCCESS,
    info: THEME_CONSTANTS.BRAND_INFO,
    warning: THEME_CONSTANTS.BRAND_WARNING,
    danger: THEME_CONSTANTS.BRAND_DANGER,
}

export default (theme, props) => {
    const type = Object.keys(mapButtonTypeColor).find((key) => props[key])

    return DefaultTheme[mapButtonTypeColor[type]]
}
