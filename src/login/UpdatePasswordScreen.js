/* @flow */

import BackgroundImageContainer from '../common/BackgroundImageContainer'
import COLOR_CONSTANTS from '../colorConstants'
import LargeText from '../common/text/LargeText'
import {getUpdatePasswordFormEventHandlers as mapDispatchToProps} from './loginEventHandlers'
import {updatePasswordScreenSelector as mapStateToProps} from './selectors/loginSelector'
import React from 'react'
import SmallText from '../common/text/SmallText'
import SubmitButton from '../common/form/SubmitButton'
import TextInput from '../common/form/TextInput'
import {
    createComponent,
    KeyboardAwareScrollView,
    Platform,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import {userDetails} from "../user/userSelector";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    buttonContainer: {
        justifyContent: 'flex-end',
    },
    button: {
        borderRadius: 0,
        paddingHorizontal: 30,
    },
    contentContainer: {
        marginLeft: 30,
        marginRight: 30,
    },
    subHeaderText: {
        textAlign: 'center',
    },
    ruleText: {
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        textAlign: 'center',
        marginTop: 20,
    },
})

const UPDASTE_PASSWORD_HEADER = 'Update Password'
const UPDATE_PASSWORD_TEXT_HEADER = 'In order to finalise your BXR account please set your password using the form below.' // eslint-disable-line max-len
const UPDATE_PASSWORD_RULE = 'Password should have a minimum of 8 characters, one capital letter and one number.'

export default createComponent({
    displayName: 'UpdatePasswordScreen',
    mapStateToProps,
    mapDispatchToProps,
}, ({
    validationStatus,
    fields,
    isLoading,
    handleSubmitUpdatePassword,
    handleUpdatePasswordFieldChange,
    userDetails,
    navigation,
}) => (
    <BackgroundImageContainer
        backgroundIndex={2}
        isModal
        style={styles.container}
        navigation={navigation}
    >
        <VerticalLayout style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <VerticalLayout
                    horizontalAlign
                    style={styles.contentContainer}
                    verticalAlign
                    weight={0.8}
                >
                    <LargeText>{UPDASTE_PASSWORD_HEADER}</LargeText>
                    {
                        fields.get('isNewSignUp') ?
                            <SmallText style={styles.subHeaderText}>{UPDATE_PASSWORD_TEXT_HEADER}</SmallText> :
                            null
                    }
                </VerticalLayout>
                <VerticalLayout
                    style={styles.contentContainer}
                    weight={1}
                >
                    <TextInput
                        fieldName='password'
                        isValid={validationStatus.getIn(['fields', 'password'])}
                        onValueChange={handleUpdatePasswordFieldChange}
                        placeholder='Password'
                        secureTextEntry
                        value={fields.get('password')}
                    />
                    <TextInput
                        fieldName='confirmPassword'
                        isValid={validationStatus.getIn(['fields', 'confirmPassword'])}
                        onValueChange={handleUpdatePasswordFieldChange}
                        placeholder='Confirm Password'
                        secureTextEntry
                        value={fields.get('confirmPassword')}
                    />
                    <SmallText style={styles.ruleText}>{UPDATE_PASSWORD_RULE}</SmallText>
                </VerticalLayout>
            </KeyboardAwareScrollView>
        </VerticalLayout>
        <VerticalLayout
            style={styles.buttonContainer}
        >
            <SubmitButton
                buttonText={UPDASTE_PASSWORD_HEADER}
                isFormComplete={validationStatus.get('isComplete')}
                isLoading={isLoading}
                onPress={() => handleSubmitUpdatePassword(userDetails.get('iD'), userDetails.get('email'), fields, navigation)}
                style={styles.button}
            />
        </VerticalLayout>
    </BackgroundImageContainer>
))
