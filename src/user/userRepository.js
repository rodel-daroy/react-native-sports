/* @flow */

import {
    loadDataFromStorage,
    removeDataFromStorage,
    storeDataInStorage,
} from '../repository'

const USER_CREDENTIALS = 'USER_CREDENTIALS'
const USER_DETAILS = 'USER_DETAILS'
const USER_AVATAR = 'USER_AVATAR'
const USER_MEMBERSHIP = 'USER_MEMBERSHIPS'

export const saveUserCredentials = storeDataInStorage(USER_CREDENTIALS)
export const loadUserCredentials = loadDataFromStorage(USER_CREDENTIALS)
export const removeUserCredentials = removeDataFromStorage(USER_CREDENTIALS)

export const saveUserDetails = storeDataInStorage(USER_DETAILS)
export const loadUserDetails = loadDataFromStorage(USER_DETAILS)
export const removeUserDetails = removeDataFromStorage(USER_DETAILS)

export const saveUserMemberships = storeDataInStorage(USER_MEMBERSHIP)
export const loadUserMemberships = loadDataFromStorage(USER_MEMBERSHIP)
export const removeUserMemberships = removeDataFromStorage(USER_MEMBERSHIP)

export const saveUserAvatar = storeDataInStorage(USER_AVATAR)
export const loadUserAvatar = async (username) => {
    const avatar = await loadDataFromStorage(USER_AVATAR)(username)

    return avatar ? avatar.replace(/"/g, '') : null
}
export const removeUserAvatar = removeDataFromStorage(USER_AVATAR)
