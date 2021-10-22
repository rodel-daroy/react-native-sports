/* @flow */

import React from 'react'
import {ScrollView} from 'react-native';
import BackgroundImageContainer from '../common/BackgroundImageContainer'
import BxrLogo from '../common/BxrLogo'
import ExtraSmallText from '../common/text/ExtraSmallText'
import isSmallScreen from '../common/isSmallScreen'
import LoginInputField from './LoginInputField'
import LoginPasswordField from './LoginPasswordField'
import {getLoginFormEventHandlers as mapDispatchToProps} from './loginEventHandlers'
import {loginScreenSelector as mapStateToProps} from './selectors/loginSelector'
import SmallText from '../common/text/SmallText'
import SubmitButton from '../common/form/SubmitButton'
import {
    createComponent,
    KeyboardAwareScrollView,
    Platform,
    Row,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'
import * as FEATURES from '../featureFlags'

const styles = StyleSheet.create({
    loginFormContainer: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    forgotPassword: {
        justifyContent: 'center',
    },
    buttonContainer: {
        justifyContent: 'flex-end',
    },
    button: {
        borderRadius: 0,
        padding: Platform.OS === 'android' ? 30 : 10,
    },
    abotUsContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    aboutUs: {
        justifyContent: 'center',
    },
})

const LOGIN_SUBMIT_TEXT = 'sign in'

export default createComponent({
    displayName: 'loginScreen',
    mapStateToProps,
    mapDispatchToProps,
}, ({
    handleLoginFieldChange,
    handleSubmitLogin,
    isLoading,
    onForgotPasswordButtonTapped,
    onShowAbout,
    validationStatus,
    fields,
    navigation
}) => (
    <BackgroundImageContainer
        backgroundIndex={2}
    >
        <VerticalLayout style={styles.formContainer}>
            <ScrollView contentContainerStyle={styles.formContainer} enableOnAndroid={true}>
                <VerticalLayout
                    horizontalAlign
                    verticalAlign
                    weight={isSmallScreen() ? 0 : 1}
                >
                    <BxrLogo />
                </VerticalLayout>
                <VerticalLayout style={styles.loginFormContainer}>
                    <LoginInputField
                        autoCapitalize='none'
                        autoCorrect={false}
                        fieldName='email'
                        iconName='md-person'
                        isValid={validationStatus.getIn(['fields', 'email'])}
                        onValueChange={handleLoginFieldChange}
                        value={fields.get('email')}
                    />
                    <LoginPasswordField
                        fieldName='password'
                        iconName='ios-lock'
                        isValid={validationStatus.getIn(['fields', 'password'])}
                        onValueChange={handleLoginFieldChange}
                        secureTextEntry
                        type={'password'}
                        value={fields.get('password')}
                        showPassword={fields.get('isShowPassword')}
                    />
                    {
                        FEATURES.FORGOT_PASSWORD ?
                            <Row
                                onPress={() => onForgotPasswordButtonTapped(navigation)}
                                style={styles.forgotPassword}
                            >
                                <ExtraSmallText>Forgot Password?</ExtraSmallText>
                            </Row> :
                            null
                    }
                </VerticalLayout>
            </ScrollView>
        </VerticalLayout>
        <VerticalLayout
            style={styles.buttonContainer}
        >
            <Row
                onPress={() => onShowAbout(navigation)}
                style={styles.aboutUs}
            >
                <SmallText style={styles.aboutText}>ABOUT US</SmallText>
            </Row>
            <SubmitButton
                buttonText={LOGIN_SUBMIT_TEXT}
                isFormComplete={validationStatus.get('isComplete')}
                isLoading={isLoading}
                onPress={() => handleSubmitLogin(fields, fields.get('isExternalLoginLink'), navigation)}
                style={styles.button}
            />
        </VerticalLayout>
    </BackgroundImageContainer>
))
