/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import immutablePropTypes from 'react-immutable-proptypes'
import SmallText from './text/SmallText'
import {
    createComponent,
    HorizontalLayout,
    Platform,
    Scrollable,
    StyleSheet,
    Text,
    Touchable,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';

const webScroll = null

const styles = StyleSheet.create({
    filters: {
        backgroundColor: COLOR_CONSTANTS.BXR_FILTER_BACKGROUND,
        flex: 1,
        ...webScroll,
    },
    active: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        padding: 10,
    },
    text: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
        padding: 10,
    },
})

const FilterItem = ({
    disabled,
    filter,
    onPress,
    style,
}) => (
    <Touchable
        disabled={disabled}
        onPress={
            () => onPress && onPress(filter)
        }
    >
        <SmallText
            style={style}
        >
            {filter}
        </SmallText>
    </Touchable>

)

FilterItem.propTypes = {
    disabled: PropTypes.bool,
    filter: PropTypes.string,
    onPress: PropTypes.func,
    style: Text.propTypes.style,
}

const propTypes = {
    currentFilterIndex: PropTypes.number,
    disabled: PropTypes.bool,
    onCurrentFilterIndexChange: PropTypes.func,
    filters: immutablePropTypes.listOf(PropTypes.string),
}

export default createComponent({displayName: 'SlideFilter', propTypes}, ({
    currentFilterIndex = 0,
    disabled,
    filters,
    onCurrentFilterIndexChange,
    style,
    filterItemStyle,
}) => (
    <HorizontalLayout
        horizontalAlign
        style={styles.container}
    >
        <Scrollable
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.filters, style]}
        >
            {
                filters.map((filter, index) =>
                    <FilterItem
                        disabled={disabled}
                        filter={filter}
                        key={filter}
                        onPress={
                            () => onCurrentFilterIndexChange &&
                            onCurrentFilterIndexChange(filters.indexOf(filter))
                        }
                        style={[
                            filterItemStyle,
                            currentFilterIndex === index ? styles.active : styles.text,
                        ]}
                    />,
                )
            }
        </Scrollable>
    </HorizontalLayout>
))
