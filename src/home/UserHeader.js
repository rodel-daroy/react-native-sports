/* @flow */

import Avatar from '../common/Avatar'
import COLOR_CONSTANTS from '../colorConstants'
import MediumText from '../common/text/MediumText'
import React from 'react'
import {
    createComponent,
    StyleSheet,
    VerticalLayout,
} from 'RNFReact'

const styles = StyleSheet.create({
    text: {
        color: COLOR_CONSTANTS.BXR_TEXT,
        textAlign: 'center',
        marginTop: 10,
    },
    name: {
        color: COLOR_CONSTANTS.BXR_PRIMARY,
        textAlign: 'center',
        marginTop: 10,
    },
    memberName: {
        color: COLOR_CONSTANTS.BXR_GOLD,
    },
})

const getNameStyle = (isMember) => isMember ? styles.memberName : styles.name

export default createComponent({displayName: 'UserHeader'}, ({
    onAvatarWasTapped,
    userDetails,
    isMember = false,
}) => (
    <VerticalLayout
        horizontalAlign
        verticalAlign
    >
        <Avatar
            avatarUrl={userDetails.get('photoURL')}
            onPress={onAvatarWasTapped}
        />
        <MediumText style={[styles.name, getNameStyle(isMember)]}>
            {`${userDetails.get('firstName')} ${userDetails.get('lastName')}`}
        </MediumText>
    </VerticalLayout>
))
