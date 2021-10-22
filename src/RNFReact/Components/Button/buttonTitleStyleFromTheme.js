/* @flow */

import getThemeColor from '../../Utils/getThemeColor'
import THEME_CONSTANTS from '../../ThemeConstants'
import DefaultTheme from '../../defaultTheme';

const getFontSize = (theme, props) => {
    if (!props.small && !props.large) {
        return DefaultTheme[THEME_CONSTANTS.TEXT_SIZE_REGULAR_BUTTON]
    }

    return props.small ? DefaultTheme[THEME_CONSTANTS.TEXT_SIZE_SMALL_BUTTON] : DefaultTheme[THEME_CONSTANTS.TEXT_SIZE_LARGE_BUTTON]
}

export default (theme, props) => ({
    color: props.transparent || props.bordered ?
        getThemeColor(DefaultTheme, props) :
        DefaultTheme[THEME_CONSTANTS.COLOR_TITLE_BUTTON],
    fontSize: getFontSize(DefaultTheme, props),
})
