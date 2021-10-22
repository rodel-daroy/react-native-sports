/* @flow */

import {AsyncStorage} from './RNFReact'

export const storeDataInStorage = (storageKey) => (dataToStore, append = '') => {
    const jsonData = JSON.stringify(dataToStore.toJS ? dataToStore.toJS() : dataToStore)

    return AsyncStorage.setItem(`${storageKey}${append}`, jsonData)
}

export const removeDataFromStorage = (storageKey) => () => AsyncStorage.removeItem(storageKey)

export const loadDataFromStorage = (storageKey) => async (append = '') => {
    try {
        const dataFromStorage = await AsyncStorage.getItem(`${storageKey}${append}`)

        return dataFromStorage || null
    } catch (exception) {
        return null
    }
}
