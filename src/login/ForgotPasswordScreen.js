/* @flow */

import BackgroundImageContainer from '../common/BackgroundImageContainer'
import LargeText from '../common/text/LargeText'
import {getForgotPasswordFormEventHandlers as mapDispatchToProps} from './loginEventHandlers'
import {forgotPasswordScreenSelector as mapStateToProps} from './selectors/loginSelector'
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

const styles = StyleSheet.create({
    formContainer: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
    },
    container: {
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
        paddingHorizontal: 30,
    },
    subHeaderText: {
        textAlign: 'center',
    },
})

const HEADER_TEXT = 'Recover Password'
const SUB_HEADER_TEXT = 'Please provide additional information \n to aid in the recovery process.'
const SUBMIT_TEXT = 'recover password'

export default createComponent({
    displayName: 'forgotPasswordScreen',
    mapStateToProps,
    mapDispatchToProps,
}, (props) => (
    <BackgroundImageContainer
        backgroundIndex={2}
        isModal
        style={styles.container}
        navigation={props.navigation}
    >
        <VerticalLayout style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <VerticalLayout
                    horizontalAlign
                    verticalAlign
                    weight={1}
                >
                    <LargeText>{HEADER_TEXT}</LargeText>
                    <SmallText style={styles.subHeaderText}>{SUB_HEADER_TEXT}</SmallText>
                </VerticalLayout>
                <VerticalLayout style={styles.formContainer}>
                    <TextInput
                        autoCorrect={false}
                        fieldName='firstName'
                        isValid={props.validationStatus.getIn(['fields', 'firstName'])}
                        onValueChange={props.onChange}
                        placeholder='First Name'
                        value={props.fields.get('firstName')}
                    />
                    <TextInput
                        autoCorrect={false}
                        fieldName='lastName'
                        isValid={props.validationStatus.getIn(['fields', 'lastName'])}
                        onValueChange={props.onChange}
                        placeholder='Last Name'
                        value={props.fields.get('lastName')}
                    />
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        fieldName='email'
                        isValid={props.validationStatus.getIn(['fields', 'email'])}
                        onValueChange={props.onChange}
                        placeholder='Email Address'
                        value={props.fields.get('email')}
                    />
                </VerticalLayout>
            </KeyboardAwareScrollView>
        </VerticalLayout>
        <VerticalLayout
            style={styles.buttonContainer}
        >
            <SubmitButton
                buttonText={SUBMIT_TEXT}
                isFormComplete={props.validationStatus.get('isComplete')}
                isLoading={props.isLoading}
                onPress={() => props.onSubmit(props.fields, props.navigation)}
                style={styles.button}
            />
        </VerticalLayout>
    </BackgroundImageContainer>
))
