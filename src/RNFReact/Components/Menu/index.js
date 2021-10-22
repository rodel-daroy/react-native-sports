/* @flow */

import createComponent from '../../createComponent'
import MenuList from './MenuList'
import ThemeConstants from '../../ThemeConstants'
import VerticalLayout from '../VerticalLayout'
import React from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from '../../defaultTheme';

const propTypes = {
    rowHeight: PropTypes.number,
    menuOptions: PropTypes.object,
    onMenuOptionPressed: PropTypes.func,
}

export default createComponent({displayName: 'Menu', injectTheme: true, propTypes}, ({
    rowHeight,
    menuOptions,
}, {theme}) => (
    <VerticalLayout
        style={{backgroundColor: DefaultTheme[ThemeConstants.BRAND_PRIMARY]}}
        weight={1}
    >
        <MenuList
            menuOptions={menuOptions}
            rowHeight={rowHeight}
        />
    </VerticalLayout>
))
