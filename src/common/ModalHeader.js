/* @flow */

import React from 'react'
import SmallText from './text/SmallText'
import {
    createComponent,
    HorizontalLayout,
    Icon,
    StyleSheet,
    Touchable,
    VerticalLayout,
} from '../RNFReact'

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 10,
    },
    left: {
        justifyContent: 'flex-start',
        width: 50,
    },
    right: {
        justifyContent: 'flex-end',
    },
    title: {
        justifyContent: 'center',
        width: 50,
    },
})

export default createComponent({displayName: 'ModalHeader'}, ({
    popScene,
    title,
}) => (
    <HorizontalLayout
        horizontalAlign
        style={styles.container}
    >
        <VerticalLayout style={styles.left} />
        <VerticalLayout
            style={styles.title}
            weight={1}
        >
            <SmallText style={{textAlign: 'center', fontWeight: 'bold'}}>{title}</SmallText>
        </VerticalLayout>
        <VerticalLayout style={styles.right} >
            <Touchable onPress={popScene}>
                <Icon
                    color='rgb(255, 255, 255)'
                    name='times'
                    size={24}

                    style={styles.iconRow}
                />
            </Touchable>
        </VerticalLayout>
    </HorizontalLayout>
))
