/* @flow */

import COLOR_CONSTANTS from '../colorConstants'
import GroupInput from '../common/form/GroupInput'
import ModalPicker from '../common/ModalPicker'
import React from 'react'
import SmallText from '../common/text/SmallText'
import {
    ActivityIndicator,
    createComponent,
    StyleSheet,
    VerticalLayout,
} from '../RNFReact'

const styles = StyleSheet.create({
    loader: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    loaderContainer: {
        borderTopWidth: 1,
        borderTopColor: COLOR_CONSTANTS.BXR_TEXT,
        borderStyle: 'solid',
        paddingVertical: 10,
    },
    error: {
        marginTop: 13,
    },
    preferencesRow: {
        height: 50,
    },
})

const renderPreferencesFields = ({preferencesForm, onUpdatePreferences, clientPreferences}) => (
    preferencesForm.map((preference) => { // eslint-disable-line complexity
        const preferenceName = preference.get('name')
        const preferenceId = preference.get('iD')
        const preferenceValues = preference.getIn(['values', 'clientIndexValue'])
        const pickerData = [{key: 'preferenceName', section: true, label: preferenceName}]
        const defaultPreferenceValueId = clientPreferences ? clientPreferences.get(preferenceId) : ''

        const defautlPreference = preferenceValues ?
            preferenceValues.find((item) => item.get('iD') === defaultPreferenceValueId) : []

        const defaultPreferenceName = defautlPreference ?
            defautlPreference.get('name') : null

        preferenceValues.map((value) => { // eslint-disable-line array-callback-return
            pickerData.push({key: value.get('iD'), label: value.get('name')})
        })

        return (
            <VerticalLayout
                key={preferenceId}
                style={styles.preferencesRow}
                verticalAlign
            >
                <ModalPicker
                    initValue={defaultPreferenceName}

                    onChange={(option) => onUpdatePreferences(preferenceId, option.key)}
                    pickerData={pickerData}
                    pickerLabel={preferenceName}
                />
            </VerticalLayout>
        )
    })
)

const Loader = createComponent({displayName: 'Loader'}, () =>
    <VerticalLayout
        horizontalAlign
        style={styles.loaderContainer}
        verticalAlign
    >
        <ActivityIndicator
            animating
            color={COLOR_CONSTANTS.BXR_PRIMARY}
            size='large'
            style={styles.loader}
        />
    </VerticalLayout>,
)

const ERROR_GETTING_PREFRENCE_FIELDS =
    'We are unable to fetch you profile preferences, please try again later'

const PreferenceForm = createComponent({displayName: 'PreferenceForm'}, ({
    preferencesForm,
    clientPreferences,
    onUpdatePreferences,
}) => (
    preferencesForm && preferencesForm.isEmpty() ?
        <SmallText style={styles.error}>{ERROR_GETTING_PREFRENCE_FIELDS}</SmallText> :
        <VerticalLayout>
            {
                renderPreferencesFields({
                    preferencesForm,
                    onUpdatePreferences,
                    clientPreferences,
                })
            }
        </VerticalLayout>
))

export default createComponent({displayName: 'ProfilePreferences'}, ({
    clientPreferences,
    preferencesForm,
    onUpdatePreferences,
    isPreferencesLoading,
}) => (
        isPreferencesLoading ?
            <Loader /> :
            <GroupInput iconName='cog'>
                <PreferenceForm
                    clientPreferences={clientPreferences}
                    onUpdatePreferences={onUpdatePreferences}
                    preferencesForm={preferencesForm}
                />
            </GroupInput>
))
