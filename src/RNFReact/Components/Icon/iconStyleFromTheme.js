/* @flow */

import defaultTo from '../../Utils/defaultTo'
import ThemeConstants from '../../ThemeConstants'
import DefaultTheme from '../../defaultTheme';

export default (theme, props) =>
     ({
         color: defaultTo(props.color, DefaultTheme[ThemeConstants.ICON_COLOR]),
         textAlign: 'center',
         fontSize: props.size,
         width: props.size + 4,
     })
