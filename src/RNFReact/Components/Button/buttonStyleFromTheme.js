/* @flow */

import defaultTo from '../../Utils/defaultTo'
import getThemeColor from '../../Utils/getThemeColor'
import THEME_CONSTANTS from '../../ThemeConstants'
import DefaultTheme from '../../defaultTheme';

const CIRCULAR_BORDER_RADIUS_MULTIPLIER = 5.8
const BORDERED_BACKGROUND_COLOR = 'rgba(0,0,0,0)'

const getHeight = (theme, props) => {
    if (!props.small && !props.large) {
        return DefaultTheme[THEME_CONSTANTS.HEIGHT_SIZE_REGULAR_BUTTON]
    }

    return props.small ?
        DefaultTheme[THEME_CONSTANTS.HEIGHT_SIZE_SMALL_BUTTON] :
        DefaultTheme[THEME_CONSTANTS.HEIGHT_SIZE_LARGE_BUTTON]
}
const getBackgroundColor = (theme, props) => {
    if (props.bordered || props.transparent) {
        return BORDERED_BACKGROUND_COLOR
    }

    return defaultTo(getThemeColor(DefaultTheme, props), DefaultTheme[THEME_CONSTANTS.BRAND_PRIMARY])
}

export default (theme, props) => ({ // eslint-disable-line complexity
    backgroundColor: getBackgroundColor(DefaultTheme, props),
    borderColor: defaultTo(getThemeColor(DefaultTheme, props), DefaultTheme[THEME_CONSTANTS.BRAND_PRIMARY]),
    borderRadius: props.rounded ?
        (DefaultTheme[THEME_CONSTANTS.BORDER_RADIUS_BUTTON] * CIRCULAR_BORDER_RADIUS_MULTIPLIER) :
        DefaultTheme[THEME_CONSTANTS.BORDER_RADIUS_BUTTON],
    borderWidth: props.bordered ? 1 : 0,
    height: props.weight ? null : getHeight(DefaultTheme, props),
})
