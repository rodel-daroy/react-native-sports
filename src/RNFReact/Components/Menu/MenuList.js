/* @flow */

import createComponent from '../../createComponent'
import {fromJS} from 'immutable'
import List from '../List'
import MenuRow from './MenuRow'
import Separator from '../Separator'
import ThemeConstants from '../../ThemeConstants'
import React from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from '../../defaultTheme';

const propTypes = {
    rowHeight: PropTypes.number,
    menuOptions: PropTypes.object,
}

const emptyMenuOptions = fromJS([])

export default createComponent({displayName: 'ProductList', injectTheme: true, propTypes}, ({
    rowHeight,
    menuOptions = emptyMenuOptions,
    ...props
}, {theme}) => (
    <List
        {...props}
        renderRow={({item}) => <MenuRow option={item} />}
        renderSeparator={(sectionID, rowID) => <Separator key={`${sectionID}-${rowID}`} />}
        rowData={menuOptions}
        rowHeight={rowHeight || DefaultTheme[ThemeConstants.MENU_ROW_HEIGHT]}
    />
))
