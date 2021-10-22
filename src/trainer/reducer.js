/* @flow */

import {handleActions} from 'redux-actions'
import immutable from 'immutable'
import R from 'ramda'
import {
    hydrateTrainersSchedule,
    setAppointmentType,
    setAvailablePrograms,
    setCurrentSchedule,
    setCurrentSessionType,
    setCurrentTrainer,
    setProgramFilter,
    setTrainerSessionPrice,
    setTrainerType,
    setTierFilter,
    setTierPrice,
    setCardNumber,
    setCardName,
    setCardExpiryMonth,
    setCardExpiryYear,
    setSaveCard,
    setTierPriceItems,
    setBookedTrainerSchedule,
    setClientServices,
} from './actionCreators'
import { TIER_LIST, TIER_PRICE_LIST } from './constants';
export const APPOINTMENT_TYPES = Object.freeze({
    TRAINERS: 'TRAINERS',
    TREATMENT: 'TREATMENT',
})

export const TRAINER_TYPE = Object.freeze({
    BOOKABLE: 'BOOKABLE',
    SWEAT: 'SWEAT',
})

const getInitialState = R.always(immutable.fromJS({
    trainerSchedules: {},
    trainerSessionPrice: {},
    currentTrainerId: null,
    currentSessionTypeId: null,
    appointmentType: APPOINTMENT_TYPES.TRAINERS,
    availablePrograms: [],
    programFilter: null,
    trainerType: TRAINER_TYPE.BOOKABLE,
    tiers: [TIER_LIST.TIER_ALL, TIER_LIST.TIER_1, TIER_LIST.TIER_2],
    tierFilter: TIER_LIST.TIER_ALL,
    tierPriceItems: [],
    selectedTierPrice: {},
    tempCardInfo: {
        number: '',
        name: '',
        expiryMonth: '',
        expiryYear: '',
    },
    clientServices: [],
}))

const handleHydrateList = (property, indexIdName) => (state, {payload}) => {
    if (!payload) {
        return state
    }

    const mapToHydrate = payload.reduce(
        (propertyMap, item, index) => {
            const id = indexIdName ? item.get('iD') : index.toString()

            return propertyMap.set(id, indexIdName ? item : item.set('iD', id))
        },
        immutable.Map(),
    )

    return state.set(property, mapToHydrate)
}

const setStateProperty = (propertyName: string) => (state: any, {payload: value}: any) => state.set(propertyName, value)
const handleSetTrainerSessionPrice = (state, {payload}) =>
    state.setIn(['trainerSessionPrice', payload.staffId, payload.sessionId], payload.amount)

const handleSetTempCardInfo = (infoName) => (state, {payload}) =>
    state.setIn(['tempCardInfo', infoName], payload);

const handleSetSaveCard = (state, {payload}) => {
    let isSaveCard = state.get('isSaveCard');
    return state.set('isSaveCard', !isSaveCard);
};

export default handleActions({
    [hydrateTrainersSchedule]: handleHydrateList('trainerSchedules'),
    [setCurrentTrainer]: setStateProperty('currentTrainerId'),
    [setCurrentSessionType]: setStateProperty('currentSessionTypeId'),
    [setCurrentSchedule]: setStateProperty('currentScheduleId'),
    [setAvailablePrograms]: setStateProperty('availablePrograms'),
    [setProgramFilter]: setStateProperty('programFilter'),
    [setAppointmentType]: setStateProperty('appointmentType'),
    [setTrainerType]: setStateProperty('trainerType'),
    [setTrainerSessionPrice]: handleSetTrainerSessionPrice,
    [setTierFilter]: setStateProperty('tierFilter'),
    [setTierPrice]: setStateProperty('selectedTierPrice'),
    [setCardNumber]: handleSetTempCardInfo('number'),
    [setCardName]: handleSetTempCardInfo('name'),
    [setCardExpiryMonth]: handleSetTempCardInfo('expiryMonth'),
    [setCardExpiryYear]: handleSetTempCardInfo('expiryYear'),
    [setSaveCard]: handleSetSaveCard,
    [setTierPriceItems]: setStateProperty('tierPriceItems'),
    [setBookedTrainerSchedule]: setStateProperty('bookedTrainerSchedule'),
    [setClientServices]: setStateProperty('clientServices'),
}, getInitialState())
