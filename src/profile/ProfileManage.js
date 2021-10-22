/* @flow */

import Avatar from '../common/Avatar'
import BackgroundImageContainer from '../common/BackgroundImageContainer'
import CountyPicker from './CountyPicker'
import ExtraSmallText from '../common/text/ExtraSmallText'
import GroupInput from '../common/form/GroupInput'
import immutablePropTypes from 'react-immutable-proptypes'
import {manageProfileEventHandlers as mapDispatchToProps} from './eventHandlers'
import {manageProfileScreenSelector as mapStateToProps} from './selectors'
import ProfilePreferences from './ProfilePreferences'
import ProfileCreditCard from './ProfileCreditCard'
import SmallText from '../common/text/SmallText'
import SubmitButton from '../common/form/SubmitButton'
import TextInput from '../common/form/TextInput'
import {
    createComponent,
    KeyboardAwareScrollView,
    Platform,
    Row,
    StyleSheet,
    Touchable,
    VerticalLayout,
} from '../RNFReact'
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import * as FEATURES from '../featureFlags'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    button: {
        borderRadius: 0,
        paddingHorizontal: 30,
    },
    changePasswordButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    updatePhotoText: {
        marginTop: 10,
        textAlign: 'center',
    },
    updatePhotoContainer: {
        padding: 20,
        marginVertical: 10,
    },
})

export default createComponent({
    displayName: 'ProfileManage',
    mapDispatchToProps,
    mapStateToProps,
}, class ProfileManage extends Component {
    static propTypes = {
        fields: immutablePropTypes.map,
        isLoading: PropTypes.bool,
        isPreferencesLoading: PropTypes.bool,
        onAvatarChange: PropTypes.func,
        onChange: PropTypes.func,
        onChangePasswordButtonTapped: PropTypes.func,
        onSubmit: PropTypes.func,
        onUpdatePreferences: PropTypes.func,
        preferencesForm: immutablePropTypes.list,
        titleText: PropTypes.string,
        userDetails: immutablePropTypes.map,
        validationStatus: immutablePropTypes.map,
        onGetCreditCard: PropTypes.func,
        isGettingCreditCard: PropTypes.bool,
        onAddCreditCard: PropTypes.func,
        onChangeCreditCard: PropTypes.func,
        userCreditCard: immutablePropTypes.map,
    }

    async componentDidMount() {
        this.props.onGetCreditCard(this.props.fields.get('iD'));
        this.props.onClearManageProfileFields()
        await this.props.onGetPreferencesFields()
        // this.props.onGetClientPreferences(this.props.fields.get('iD'))
    }

    render() {
        const {
            fields,
            isLoading,
            isPreferencesLoading,
            onAvatarChange,
            onChange,
            onChangePasswordButtonTapped,
            onSubmit,
            onUpdatePreferences,
            preferencesForm,
            titleText,
            validationStatus,
            userDetails,
            isGettingCreditCard,
            onAddCreditCard,
            onChangeCreditCard,
            userCreditCard,
            navigation,
        } = this.props

        return (
            <BackgroundImageContainer
                backgroundIndex={10}
                // isModal
                modalHeaderTitle={titleText}
                navigation={navigation}
            >
                <VerticalLayout style={styles.container}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <VerticalLayout
                            horizontalAlign
                            style={styles.updatePhotoContainer}
                            verticalAlign
                        >
                            <Avatar
                                avatarUrl={userDetails.get('photoURL')}
                                onPress={() => onAvatarChange(userDetails.get('username'))}
                            />
                            <Touchable onPress={() => onAvatarChange(userDetails.get('username'))}>
                                <ExtraSmallText style={styles.updatePhotoText}>Update Photo</ExtraSmallText>
                            </Touchable>
                        </VerticalLayout>
                        <GroupInput iconName='home'>
                            <TextInput
                                fieldName='addressLine1'
                                isValid={validationStatus.getIn(['fields', 'addressLine1'])}
                                onValueChange={onChange}
                                placeholder='Address Line 1'
                                underlined
                                value={fields.get('addressLine1')}
                            />
                            <TextInput
                                fieldName='city'
                                isValid={validationStatus.getIn(['fields', 'city'])}
                                onValueChange={onChange}
                                placeholder='City'
                                underlined
                                value={fields.get('city')}
                            />

                            <CountyPicker
                                onValueChange={(item) => onChange('state', item.key)}
                                value={fields.get('state')}
                            />
                            <TextInput
                                fieldName='postalCode'
                                isValid={validationStatus.getIn(['fields', 'postalCode'])}
                                onValueChange={onChange}
                                placeholder='Postal Code'
                                underlined
                                value={fields.get('postalCode')}
                            />
                        </GroupInput>
                        <GroupInput iconName='phone'>
                            <TextInput
                                fieldName='mobilePhone'
                                isValid={validationStatus.getIn(['fields', 'mobilePhone'])}
                                onValueChange={onChange}
                                placeholder='Mobile Number'
                                underlined
                                value={fields.get('mobilePhone')}
                            />
                            <TextInput
                                fieldName='homePhone'
                                isValid={validationStatus.getIn(['fields', 'homePhone'])}
                                onValueChange={onChange}
                                placeholder='Home Number'
                                underlined
                                value={fields.get('homePhone')}
                            />
                        </GroupInput>
                        {
                            FEATURES.MANAGE_PROFILE_PREFERENCES && preferencesForm ?
                                <ProfilePreferences
                                    clientPreferences={fields.get('clientIndexes')}
                                    isPreferencesLoading={isPreferencesLoading}
                                    onUpdatePreferences={(id, value) => onUpdatePreferences(
                                        fields.get('clientIndexes'),
                                        id,
                                        value,
                                    )}
                                    preferencesForm={preferencesForm}
                                /> :
                                null
                        }
                        {
                            FEATURES.MANAGE_PROFILE_CHANGE_PASSWORD ?
                                <GroupInput iconName='lock'>
                                    <Row
                                        onPress={() => {
                                            onChangePasswordButtonTapped({
                                                iD: fields.get('iD'),
                                                username: fields.get('username'),
                                            }, navigation)
                                        }}
                                        style={styles.changePasswordButton}
                                    >
                                        <SmallText>Change Password</SmallText>
                                    </Row>
                                </GroupInput> :
                                null
                        }
                        {
                            FEATURES.MANAGE_PROFILE_CREDITCARD ?
                                <ProfileCreditCard
                                    userCreditCard={userCreditCard}
                                    isGettingCreditCard={isGettingCreditCard}
                                    onAddCreditCard={() => onAddCreditCard(navigation)}
                                    onChangeCreditCard={() => onChangeCreditCard(navigation)}
                                /> :
                                null
                        }
                    </KeyboardAwareScrollView>
                </VerticalLayout>
                <SubmitButton
                    buttonText={'save changes'}
                    isFormComplete={validationStatus.get('isComplete')}
                    isLoading={isLoading}
                    onPress={() => onSubmit(fields)}
                    style={styles.button}
                />
            </BackgroundImageContainer>
        )
    }
})
