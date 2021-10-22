/* @flow */

import immutable from 'immutable'

const findMatchingGroup = (groupId: string, clientPreferences: Object): Object =>
    clientPreferences.find((group) => group.get('iD') === groupId) || immutable.Map()

const findPreferenceName = (clientIndex: string, clientPreferences: Object): ?string => {
    const [groupId, preferenceId] = clientIndex
    const preferenceGroup = findMatchingGroup(groupId, clientPreferences)
    const clientIndexValues = preferenceGroup.getIn(['values', 'clientIndexValue']) || immutable.List()
    const matchingPreference = clientIndexValues.find((preference) => preference.get('iD') === preferenceId)

    return matchingPreference ? `Training Goal: ${matchingPreference.get('name')}` : null
}

export default (clientIndexes: Object, clientPreferences: Object): Array<string> => {
    if (!clientIndexes || !clientPreferences) {
        return []
    }

    return clientIndexes.entrySeq().reduce((userSegments, next) => {
        const preferenceName = findPreferenceName(next, clientPreferences)

        return preferenceName ? [...userSegments, preferenceName] : userSegments
    }, [])
}
