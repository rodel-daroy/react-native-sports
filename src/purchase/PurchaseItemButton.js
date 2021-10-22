import COLOR_CONSTANTS from '../colorConstants'
import MediumText from '../common/text/MediumText'
import SmallText from '../common/text/SmallText';
import {
    Row,
    Button,
    createComponent,
    StyleSheet,
    HorizontalLayout,
    VerticalLayout,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';
import immutablePropTypes from "react-immutable-proptypes";

const propTypes = {
    itemName: PropTypes.string,
    itemDesc: PropTypes.string,
    itemPrice: PropTypes.string,
    item: immutablePropTypes.map,
    isChecked: PropTypes.bool,
    onPress: PropTypes.func,
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        // height: 80,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 10,
        marginHorizontal: 0,
        paddingVertical: 17,
        paddingHorizontal: 20,
    },
    rowButton: {
        height: 87,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 0,
        paddingVertical: 17,
        paddingHorizontal: 20,
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
});

export default createComponent(
    {displayName: 'PurchaseItemButton', propTypes}, ({
                                                         itemName,
                                                         itemDesc,
                                                         itemPrice,
                                                         item,
                                                         isChecked,
                                                         onPress,
        navigation
                                                     }) => {
        if (onPress === undefined) {
            return (
                <Row
                    style={[styles.button, {marginVertical: 2}, !isChecked ? {backgroundColor: 'black'} : {}]}
                >
                    <VerticalLayout style={styles.nameContainer}>
                        <MediumText >{itemName}</MediumText>
                        <SmallText numberOfLines={1}>{itemDesc}</SmallText>
                    </VerticalLayout>
                    <VerticalLayout style={styles.priceContainer}>
                        <MediumText>£{itemPrice}</MediumText>
                    </VerticalLayout>
                </Row>
            )
        } else {
            return (
                <Button
                    style={[styles.rowButton, !isChecked ? {backgroundColor: 'black'} : {}]}
                    onPress={() => onPress(item, navigation)}
                >
                    <VerticalLayout style={styles.nameContainer}>
                        <MediumText>{itemName}</MediumText>
                        <SmallText numberOfLines={1}>{itemDesc}</SmallText>
                    </VerticalLayout>
                    <VerticalLayout style={styles.priceContainer}>
                        <MediumText>£{itemPrice}</MediumText>
                    </VerticalLayout>
                </Button>
            )
        }
    })

