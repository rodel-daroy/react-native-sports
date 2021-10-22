import COLOR_CONSTANTS from '../colorConstants'
import MediumText from '../common/text/MediumText'
import {
    Row,
    Button,
    createComponent,
    StyleSheet,
    HorizontalLayout,
    VerticalLayout,
    Image,
} from '../RNFReact'

import React from 'react';
import PropTypes from 'prop-types';
import immutablePropTypes from "react-immutable-proptypes";

const propTypes = {
    id: PropTypes.number,
    item: immutablePropTypes.map,
    itemName: PropTypes.string,
    itemPrice: PropTypes.string,
    isChecked: PropTypes.bool,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 0,
        marginHorizontal: 0,
        paddingHorizontal: 15,
    },
    container: {
        flex: 1,
        backgroundColor: 'red'
    },
    nameContainer: {
        flex: 5,
    },
    priceContainer: {
        flex: 2,
        alignItems: 'flex-end',
    },
    buttonText: {
        fontSize: 16
    }
});

export default createComponent(
    {displayName: 'PurchaseItemButton', propTypes}, ({
                                                         id,
                                                         itemName,
                                                         itemPrice,
                                                         isChecked,
                                                         onPress,
                                                         style
                                                     }) => {
        if (onPress === undefined) {
            return (
                <Row
                    style={[styles.button, {marginVertical: 2}, !isChecked ? {backgroundColor: 'black'} : {}, style]}
                >
                    <VerticalLayout style={styles.nameContainer}>
                        <MediumText style={styles.buttonText} numberOfLines={1}>{itemName}</MediumText>
                    </VerticalLayout>
                    <VerticalLayout style={styles.priceContainer}>
                        <MediumText style={styles.buttonText}>£{itemPrice}</MediumText>
                    </VerticalLayout>
                </Row>
            )
        } else {
            return (
                <Button
                    style={[styles.button, !isChecked ? {backgroundColor: 'black'} : {}, style]}
                    onPress={onPress}
                >
                    <VerticalLayout style={styles.nameContainer}>
                        <MediumText style={styles.buttonText} numberOfLines={1}>{itemName}</MediumText>
                    </VerticalLayout>
                    <VerticalLayout style={styles.priceContainer}>
                        <MediumText style={styles.buttonText}>£{itemPrice}</MediumText>
                    </VerticalLayout>
                </Button>
            )
        }
    })

