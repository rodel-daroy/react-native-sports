/* @flow */

import createComponent from '../../createComponent'
import DisclosureRow from '../DisclosureRow'
import HorizontalLayout from '../HorizontalLayout'
import Icon from '../Icon'
import StyleSheet from '../../StyleSheet'
import Text from '../Text'
import ThemeConstants from '../../ThemeConstants'
import VerticalLayout from '../VerticalLayout'
import React from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from '../../defaultTheme';

const style = StyleSheet.create({
    title: {
        flex: 8,
        paddingLeft: 10,
    },
    extraInfo: {
        flex: 2,
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
})

const propTypes = {
    option: PropTypes.object,
}

export default createComponent({displayName: 'MenuRow', injectTheme: true, propTypes}, ({
    option,
}, {theme}) => (
    <DisclosureRow
        onPress={option.get('onOptionPressed')}
        style={{flex: 1}}
    >
        <HorizontalLayout
            verticalAlign
            weight={1}
        >
            <VerticalLayout
                style={{justifyContent: 'center', alignItems: 'center'}}
                weight={1}
            >
                <Icon
                    color={DefaultTheme[ThemeConstants.MENU_ROW_TITLE_COLOUR]}
                    name={option.get('icon')}
                    size={24}
                />
            </VerticalLayout>
            <Text style={[style.title, {color: DefaultTheme[ThemeConstants.MENU_ROW_TITLE_COLOUR]}]}>
                {option.get('title')}
            </Text>
            <Text style={[style.extraInfo, {color: DefaultTheme[ThemeConstants.MENU_ROW_TITLE_COLOUR]}]}>
                {option.get('extraInfo')}
            </Text>
        </HorizontalLayout>
    </DisclosureRow>
))
