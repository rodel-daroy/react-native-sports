/* @flow */

import {createAction} from 'redux-actions'

export const hydrateTrainersSchedule = createAction('bxr/trainer/HYDRATE_TRAINERS_SCHEDULE')
export const setTrainerIsUnbooked = createAction('bxr/trainer/SET_TRAINER_UNBOOK')
export const setTrainerSessionPrice = createAction('bxr/trainer/SET_TRAINER_SESSION_PRICE')
export const setCurrentTrainer = createAction('bxr/trainer/SET_CURRENT_TRAINER')
export const setCurrentSchedule = createAction('bxr/trainer/SET_CURRENT_SCHEDULE')
export const setCurrentSessionType = createAction('bxr/trainer/SET_CURRENT_SESSION_TYPE')
export const setAppointmentType = createAction('bxr/trainer/SET_APPOINTMENT_TYPE')
export const setAvailablePrograms = createAction('bxr/trainer/SET_AVAILABLE_PROGRAMS')
export const setProgramFilter = createAction('bxr/trainer/SET_PROGRAM_FILTER')
export const setTrainerType = createAction('bxr/trainer/SET_TRAINER_TYPE')
export const setTierFilter = createAction('bxr/trainer/SET_TIER_FILTER')
export const setTierPrice = createAction('bxr/trainer/SET_TIER_PRICE')
export const setCardNumber = createAction('bxr/trainer/SET_CARD_NUMBER');
export const setCardName = createAction('bxr/trainer/SET_CARD_NAME');
export const setCardExpiryMonth = createAction('bxr/trainer/SET_CARD_EXPIRY_MONTY');
export const setCardExpiryYear = createAction('bxr/trainer/SET_CARD_EXPIRY_YEAR');
export const setSaveCard = createAction('bxr/trainer/SET_SAVE_CARD');
export const setTierPriceItems = createAction('bxr/trainer/SET_TIER_PRICE_ITEMS');
export const setBookedTrainerSchedule = createAction('bxr/trainer/SET_BOOKED_TRAINER_SCHEDULE');
export const setClientServices = createAction('bxr/trainer/SET_CLIENT_SERVICES');

