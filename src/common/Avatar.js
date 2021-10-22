/* @flow */

import avatarDefault from '../images/avatarDefault.png'
import COLOR_CONSTANTS from '../colorConstants'
import React from 'react'
import {
    createComponent,
    Image,
    StyleSheet,
    Touchable,
} from '../RNFReact'

const AVATAR_SIZE = 80

const styles = StyleSheet.create({
    avatar: {
        overflow: 'hidden',
        height: AVATAR_SIZE,
        width: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        borderColor: COLOR_CONSTANTS.BXR_PRIMARY,
        borderWidth: 4,
    },
})

export default createComponent({displayName: 'Avatar'}, ({
    avatarUrl,
    onPress,
    style,
}) => (
    <Touchable onPress={onPress}>
        <Image
            source={avatarUrl ? {uri: avatarUrl} : avatarDefault}
            style={[styles.avatar, style]}
        />
    </Touchable>
))
