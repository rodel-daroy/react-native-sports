/* @flow */

import BackgroundImageContainer from '../common/BackgroundImageContainer'
import COLOR_CONSTANTS from '../colorConstants'
import immutablePropTypes from 'react-immutable-proptypes'
import {mapStateToProps} from '../user/userSelector'
import MediumText from '../common/text/MediumText'
import UserHeader from '../home/UserHeader'
import {
    createComponent,
    StyleSheet,
    Text,
    VerticalLayout,
    Platform,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Barcode from 'react-native-barcode-builder';
import ScreenBrightness from 'react-native-screen-brightness';

const styles = StyleSheet.create({
    barCode: {
        color: 'rgb(0, 0, 0)',
        padding: 16,
        fontSize: 60,
        backgroundColor: 'rgb(255, 255, 255)',
        marginTop: 10,
        marginBottom: 10,
    },
    content: {
        marginTop: 20,
    },
    userIdText: {
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        marginTop: 10,
    },
});

const propTypes = {
    onAvatarChange: PropTypes.func,
    userDetails: immutablePropTypes.map,
    titleText: PropTypes.string,
};
export default createComponent({
    displayName: 'MembershipInfoScreen',
    mapStateToProps,
    propTypes,
}, class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brightness: 0.5,
        }
    }

    componentDidMount() {
        if(Platform.OS === 'android') {
            ScreenBrightness.requestPermission();
        }
        ScreenBrightness.getBrightness().then(brightness => {
            let oldBrightNess = brightness;
            if(Platform.OS === 'android') {
                oldBrightNess = brightness / 255;
            }
            this.setState({brightness: oldBrightNess});
            ScreenBrightness.setBrightness(1);
        });
    }

    componentWillUnmount() {
        ScreenBrightness.setBrightness(this.state.brightness);
    }

    render() {
        const {
            userDetails,
            userMembership,
            titleText,
            navigation
        } = this.props;
        return (
            <BackgroundImageContainer
                backgroundIndex={10}
                // isModal
                modalHeaderTitle={titleText}
                navigation={navigation}
            >
                <UserHeader
                    isMember={userMembership.has('name')}
                    userDetails={userDetails}
                />
                <VerticalLayout
                    horizontalAlign
                    verticalAlign
                    weight={2}
                >
                    <Barcode width={3} height={80} value={userDetails.get('iD')} />
                    <MediumText style={styles.userIdText}>{userDetails.get('iD')}</MediumText>
                </VerticalLayout>
            </BackgroundImageContainer>
        )
    }
});
