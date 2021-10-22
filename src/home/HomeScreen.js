/* @flow */

import BackgroundImageContainer from '../common/BackgroundImageContainer'
import bookClassImage from '../images/bookaclass.jpg'
import bookClinicImage from '../images/bookaclinic.jpg'
import bookSweatImage from '../images/bookasweat.jpg'
import bookTrainerImage from '../images/bookatrainer.jpg'
import featureFlagsByMember from '../featureFlagsByMember'
import HomeButton from './HomeButton'
import immutablePropTypes from 'react-immutable-proptypes'
import {mapStateToProps} from './homeSelector'
import myScheduleImage from '../images/myschedule.jpg'
import SmallText from '../common/text/SmallText'
import UserHeader from './UserHeader'
import {
    ActivityIndicator,
    AppState,
    createComponent,
    HorizontalLayout,
    Row,
    StyleSheet,
    VerticalLayout,
} from 'RNFReact'
import React, {Component, PropTypes} from 'react'
// import {subscribeToShake, unsubsribeFromShake} from '../common/shake' // eslint-disable-line import/no-unresolved
import * as FEATURES from '../featureFlags'
import * as mapDispatchToProps from './homeEventHandler'

const styles = StyleSheet.create({
    abotUsContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    aboutUs: {
        justifyContent: 'center',
    },
    logout: {
        justifyContent: 'center',
    },
    buttonsContainer: {
        justifyContent: 'center',
    },
    logoutText: {
        color: 'rgb(255, 255, 255)',
    },
    aboutText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    rightIcon: {
        marginLeft: 10,
        color: 'rgba(255, 255, 255, 0.5)',
    },
})

export default createComponent({
    displayName: 'Home Screen',
    mapStateToProps,
    mapDispatchToProps,
    pure: true,
}, class HomeScreenComponent extends Component {
    constructor() {
        super()
        this.toggleMembershipModal = this.toggleMembershipModal.bind(this)
    }

    toggleMembershipModal() {
        const {
            isUserLoggedIn,
            onHideProfileCard,
            isMembershipCardOpen,
            onShowProfileCard,
        } = this.props

        if (!isUserLoggedIn) {
            return
        }

        if (isMembershipCardOpen) {
            onHideProfileCard()
        } else {
            onShowProfileCard()
        }
    }

    componentDidMount() {
        // subscribeToShake(() => {
        //     if (AppState.currentState === 'active') {
        //         this.toggleMembershipModal()
        //     }
        // })
    }

    componentWillUnmount() {
        // unsubsribeFromShake()
    }

    static propTypes = {
        isGettingMembershipSucceded: PropTypes.bool,
        isMember: PropTypes.bool,
        isMembershipCardOpen: PropTypes.bool,
        isUserLoggedIn: PropTypes.bool,
        membershipType: PropTypes.string,
        onClassesWasTapped: PropTypes.func,
        onHideProfileCard: PropTypes.func,
        onLogoutWasTapped: PropTypes.func,
        onSchedulesWasTapped: PropTypes.func,
        onPurchaseSweatPacks: PropTypes.func,
        onShowAbout: PropTypes.func,
        onShowProfileCard: PropTypes.func,
        onSweatClassWasTapped: PropTypes.func,
        onTrainerWasTapped: PropTypes.func,
        onTreatmentWasTapped: PropTypes.func,
        userDetails: immutablePropTypes.map,
    }

    renderButtons() {
        const {
            onClassesWasTapped,
            onSchedulesWasTapped,
            onTreatmentWasTapped,
            onTrainerWasTapped,
            onSweatClassWasTapped,
            onPurchaseSweatPacks,
            membershipType,
        } = this.props


        const homeButtons = {
            BOOK_MEMBER_CLASSES: {
                id: 'bookMemberClass',
                buttonText: ' BOOK CLASSES',
                buttonImageUrl: bookClassImage,
                onPress: onClassesWasTapped,
            },
            BOOK_TRAINER: {
                id: 'bookTrainer',
                buttonText: 'BOOK TRAINER',
                buttonImageUrl: bookTrainerImage,
                onPress: onTrainerWasTapped,
            },
            BOOK_CLINIC: {
                id: 'bookClinic',
                buttonText: 'BOOK CLINIC',
                buttonImageUrl: bookClinicImage,
                onPress: onTreatmentWasTapped,
            },
            BOOK_SWEAT_CLASSES: {
                id: 'bookSweatClasses',
                buttonText: 'BOOK SWEAT',
                buttonImageUrl: bookSweatImage,
                onPress: onSweatClassWasTapped,
            },
            PURCHASE_SWEAT_PACKS: {
                id: 'purchaseSweatPacks',
                buttonText: 'PURCHASE SWEATPACKS',
                buttonImageUrl: myScheduleImage,
                onPress: onPurchaseSweatPacks,
            },
            VIEW_SCHEDULE: {
                id: 'viewSchedule',
                buttonText: 'MY SCHEDULE',
                buttonImageUrl: myScheduleImage,
                onPress: onSchedulesWasTapped,
            },
        }

        const homeButtonsByMember = featureFlagsByMember[membershipType]

        return (
            <VerticalLayout>
                {
                    homeButtonsByMember.map((item) => {
                        const {
                            id,
                            buttonImageUrl,
                            buttonText,
                            onPress,
                        } = homeButtons[item]

                        return (
                            <HomeButton
                                buttonImageUrl={buttonImageUrl}
                                buttonText={buttonText}
                                key={id}
                                onPress={onPress}
                            />
                        )
                    })
                }
            </VerticalLayout>
        )
    }

    render() { // eslint-disable-line complexity
        const {
            isGettingMembershipSucceded,
            isMember,
            userDetails,
            onShowAbout,
            onLogoutWasTapped,
        } = this.props

        return (
            <BackgroundImageContainer
                backgroundIndex={10}
            >
                <UserHeader
                    isMember={isMember}
                    onAvatarWasTapped={this.toggleMembershipModal} // eslint-disable-line react/jsx-handler-names
                    userDetails={userDetails}
                />
                <VerticalLayout
                    style={styles.buttonsContainer}
                    weight={1}
                >
                    {isMember || isGettingMembershipSucceded ?
                        this.renderButtons() :
                        <VerticalLayout
                            verticalAlign
                            weight={1}
                        >
                            <ActivityIndicator
                                isLoading
                                size='large'
                            />
                        </VerticalLayout>
                    }
                    {
                        FEATURES.LOGOUT ?
                            <Row
                                onPress={onLogoutWasTapped}
                                style={styles.logout}
                            >
                                <SmallText style={styles.logoutText}>LOGOUT</SmallText>
                            </Row> :
                            null
                    }
                </VerticalLayout>
                <HorizontalLayout
                    horizontalAlign
                    style={styles.abotUsContainer}
                >
                    <Row
                            onPress={onShowAbout}
                        style={styles.aboutUs}
                    >
                        <SmallText style={styles.aboutText}>ABOUT US</SmallText>
                    </Row>
                </HorizontalLayout>
            </BackgroundImageContainer>
        )
    }
})
