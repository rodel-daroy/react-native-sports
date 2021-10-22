/* @flow */

import COLOR_CONSTANTS from '../../colorConstants'
import {
    createComponent,
    HorizontalLayout,
    Icon,
    StyleSheet,
    VerticalLayout,
} from '../../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: COLOR_CONSTANTS.BXR_TEXT,
        borderStyle: 'solid',
        marginBottom: 20,
    },
    icon: {
        justifyContent: 'center',
        paddingTop: 13,
        marginRight: 10,
    },
})

const propTypes = {
    children: PropTypes.node,
    iconName: PropTypes.string,
}

export default createComponent({displayName: 'GroupInput', propTypes}, ({
    iconName,
    children,
}) => (
    <HorizontalLayout style={styles.container}>
        <Icon
            color={COLOR_CONSTANTS.BXR_TEXT}
            name={iconName}
            size={30}
            style={styles.icon}
        />
        <VerticalLayout weight={1}>
            {children}
        </VerticalLayout>
    </HorizontalLayout>
))
