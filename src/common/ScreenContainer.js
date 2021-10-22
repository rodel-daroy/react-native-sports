/* @flow */

import React from 'react';
import ModalHeader from './ModalHeader'
import {
    createComponent,
    Platform,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import PropTypes from 'prop-types';
import {batchActions} from 'redux-batched-actions';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(0, 0, 0)',
        width: null,
    },
    withTabBar: {
        height: null,
    },
    modal: {
        marginTop: 0,
        height: null,
    },
    withTitle: {
        ...Platform.select({
            web: {
                marginTop: '44px',
                height: '524px',
            },
        }),
    },
})

const propTypes = {
    withTabBar: PropTypes.bool,
    isModal: PropTypes.bool,
    modalHeaderTitle: PropTypes.string,
}
const mapDispatchToProps = (dispatch) => ({
    closeModal: (navigation) => dispatch(batchActions([navigation.goBack()])),
})

const getModalStyles = (isModal, withTabBar) => ([
    isModal ? styles.modal : styles.withTitle,
    withTabBar ? styles.withTabBar : {},
])

export default createComponent({
    displayName: 'ScreenContainer',
    mapDispatchToProps,
    propTypes,
}, ({
    withTabBar,
    closeModal,
    style,
    isModal,
    modalHeaderTitle,
    children,
    navigation,
}) => (
    <VerticalLayout
        style={[styles.container, style, getModalStyles(isModal, withTabBar)]}
        weight={1}
    >
        {
            isModal ?
                <ModalHeader
                    popScene={() => closeModal(navigation)}
                    title={modalHeaderTitle}
                /> : null
        }
        {children}
    </VerticalLayout>
))
