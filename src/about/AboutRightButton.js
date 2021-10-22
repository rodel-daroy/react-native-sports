import {
    Button,
    View,
    StyleSheet,
    Platform,
    Icon, createComponent,
} from "../RNFReact";
import React, {Component} from 'react'
import {mapStateToProps} from "../home/homeSelector";
import * as mapDispatchToProps from "../home/homeEventHandler";

export default createComponent({
    displayName: 'AboutRightButton',
    mapStateToProps,
    mapDispatchToProps,
}, ({onVersionTapped}) => (
            <Button style={[styles.buttonContainer , Platform.OS === "ios" ? {} : {height: 55}]} onPress={onVersionTapped}>
                <Icon
                    color='rgb(255, 255, 255)'
                    name='info-circle'
                    size={20}
                />
            </Button>
));

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13,
        backgroundColor: 'rgb(0, 0, 0)',
    },
});
