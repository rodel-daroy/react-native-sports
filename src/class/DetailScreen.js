/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import DetailButtonGroup from './DetailButtonGroup'
import DetailTitleRow from './DetailTitleRow'
import ExtraSmallText from '../common/text/ExtraSmallText'
import immutablePropTypes from 'react-immutable-proptypes'
import {classDetailScreenEventHandlers as mapDispatchToProps} from './eventHandlers'
import {classDetailScreenSelector as mapStateToProps} from './selectors'
import ScreenContainer from '../common/ScreenContainer'
import {
    ActivityIndicator,
    createComponent,
    HorizontalLayout,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import React from 'react';
import PropTypes from 'prop-types';
import BookingRow from '../common/booking/BookingRow';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR_CONSTANTS.BXR_LIST_BACKGROUND,
    },
    details: {
        margin: 10,
        marginTop: 30,
    },
    dateContainer: {
        flex: 1,
        height: 28,
    },
    subHeaderText: {
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
        textAlign: 'left',
        flex: 1,
        marginRight: 4,
    },
    venueText: {
        flex: 1.2,
    },
    subHeaderTextContainer: {
        marginLeft: 4,
    },
    staffText: {
        color: 'rgb(62, 125, 215)',
    },
    description: {
        margin: 4,
        marginTop: 15,
        textAlign: 'justify',
        color: COLOR_CONSTANTS.BXR_TEXT_SECONDARY,
    },
    loader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
})

const SubHeader = ({
    monthDay,
    time,
    duration,
    staff,
    location,
}) => (
    <VerticalLayout>
        <HorizontalLayout
            style={styles.subHeaderTextContainer}
        >
            <VerticalLayout style={styles.dateContainer}>
                <ExtraSmallText style={styles.subHeaderText}>{monthDay}</ExtraSmallText>
                <ExtraSmallText style={styles.subHeaderText}>{time}</ExtraSmallText>
            </VerticalLayout>
            <ExtraSmallText style={[styles.subHeaderText, styles.venueText]}>{location}</ExtraSmallText>
            <ExtraSmallText style={styles.subHeaderText}>{duration}</ExtraSmallText>
            <ExtraSmallText style={[styles.subHeaderText, styles.staffText]}>{staff}</ExtraSmallText>
        </HorizontalLayout>
    </VerticalLayout>
)

SubHeader.propTypes = {
    duration: PropTypes.string,
    location: PropTypes.string,
    monthDay: PropTypes.string,
    staff: PropTypes.string,
    time: PropTypes.string,
}

const propTypes = {
    clientId: PropTypes.string,
    currentClass: immutablePropTypes.map,
    isGettingList: PropTypes.bool,
    isSweatClasses: PropTypes.bool,
    onBookButtonTapped: PropTypes.func,
    onUnBookButtonTapped: PropTypes.func,
    popScene: PropTypes.func,
}

export default createComponent({
    displayName: 'ClassDetailScreen',
    mapStateToProps,
    mapDispatchToProps,
    propTypes,
}, ({ // eslint-disable-line complexity
    currentClass,
    clientId,
    isGettingList,
    isSweatClasses,
    popScene,
    onBookButtonTapped,
    onUnBookButtonTapped,
    onJoinWaitlistTapped,
    onWaitlistedTapped,
    navigation
}) => {
    if (isGettingList) {
        return (
            <VerticalLayout
                horizontalAlign
                verticalAlign
                weight={1}
            >
                <ActivityIndicator
                    animating
                    color={COLOR_CONSTANTS.BXR_PRIMARY}
                    size='large'
                    style={styles.loader}
                />
            </VerticalLayout>
        )
    }

    return (
        <ScreenContainer style={styles.container}>
            <DetailTitleRow
                bookingStatus={currentClass.get('bookingStatus')}
                isLoading={currentClass.get('isLoading')}
                isReadOnly={currentClass.get('isReadOnly')}
                onBookItem={() => onBookButtonTapped({clientId, item: currentClass, isSweatClasses})}
                onUnBookSession={() => onUnBookButtonTapped({clientId, item: currentClass}, navigation)}
                title={currentClass.getIn(['classDescription', 'name']) || ''}
            />
            <VerticalLayout
                style={styles.details}
                weight={1}
            >
                <SubHeader
                    duration={currentClass.get('duration')}
                    location={currentClass.getIn(['location', 'name'])}
                    monthDay={currentClass.get('monthDay')}
                    staff={currentClass.getIn(['staff', 'name'])}
                    time={currentClass.get('time')}
                />
                <VerticalLayout>
                    <ExtraSmallText style={styles.description}>
                        {currentClass.getIn(['classDescription', 'description']) || 'No Description Available'}
                    </ExtraSmallText>
                </VerticalLayout>
            </VerticalLayout>
            <DetailButtonGroup
                bookingStatus={currentClass.get('bookingStatus')}
                isLoading={currentClass.get('isLoading')}
                isReadOnly={currentClass.get('isReadOnly')}
                onJoinSession={() => onBookButtonTapped({clientId, item: currentClass, isSweatClasses})}
                onUnBookSession={() => onUnBookButtonTapped({clientId, item: currentClass}, navigation)}
                onJoinWaitlist={() => onJoinWaitlistTapped({clientId, item: currentClass, isSweatClasses})}
                onWaitlisted={() => onWaitlistedTapped({clientId, item: currentClass})}
                onReturn={popScene}
            />
        </ScreenContainer>
    )
})
