/* @flow */


import calculateAppointmentSchedule from '../common/booking/calculateAppointmentSchedule'
import getDateAndTimeDifference from '../class/getDateAndTimeDifference'
import getDateFromDateFilter from '../dateFilter/getDateFromDateFilter'
import immutable from 'immutable'
import {NetworkRequests} from '../RNFReact'
import R from 'ramda'
import stripHTMLTags from '../common/stripHTMLTags'
import {twoWeeksSweatClassesSelector} from '../class/selectors'
import {userDetails, userCreditCard} from '../user/userSelector'
import {APPOINTMENT_TYPES, TRAINER_TYPE} from './reducer'
import {
    BOOK_TRAINER,
    GET_BOOKABLE_ITEMS,
    GET_SWEAT_TRAINERS,
    GET_TRAINER_SESSION_PRICE,
    REQUEST_NAME,
    TRAINER_DATE_FILTER_NAME,
    TREATMENT_DATE_FILTER_NAME,
    TIER_LIST,
    GET_TIER_PRICE_LIST,
    PAY_PRICE_ITEM, PROGRAMID_LIST,
    BOOK_PROCEED,
} from './constants'
import {createSelector, createStructuredSelector} from 'reselect'
import {
    currentFilterIndexSelector,
    filtersSelector,
    weeksFromNowSelector,
} from '../dateFilter/selectors'
import {setBookedTrainerSchedule} from "./actionCreators";

const {
    selectors: {
        networkRequestSucceededSelector,
        networkRequestStartedSelector,
    },
    statusConstants: {REQUEST_STARTED},
} = NetworkRequests

const currentTrainerId = (state) => state.getIn(['trainer', 'currentTrainerId'])
const currentTrainerSessionTypeId = (state) => state.getIn(['trainer', 'currentSessionTypeId'])
const trainerSessionPrice = (state) => state.getIn(['trainer', 'trainerSessionPrice'], immutable.Map())
const currentScheduleId = (state) => state.getIn(['trainer', 'currentScheduleId'])
const isTreatmentSelector = (state) => state.getIn(['trainer', 'appointmentType']) === APPOINTMENT_TYPES.TREATMENT
const programFilter = (state) => state.getIn(['trainer', 'programFilter'])
const isSweatTrainer = (state) => state.getIn(['trainer', 'trainerType']) === TRAINER_TYPE.SWEAT
const tiers = (state) => state.getIn(['trainer', 'tiers']);
const tierFilter = (state) => state.getIn(['trainer', 'tierFilter']);
const tierPriceItems = (state) => state.getIn(['trainer', 'tierPriceItems']);
const selectedTierPrice = (state) => state.getIn(['trainer', 'selectedTierPrice']);
const clientServices = (state) => state.getIn(['trainer', 'clientServices']);

export const trainersSelector = (state) => state.getIn(['trainer', 'trainerSchedules'])

export const availablePrograms = (state) => state.getIn(['trainer', 'availablePrograms'])
    .map((item) => {
        const newProgramName = R.replace(/training/gi, '', item.get('name'))

        return item.set('name', newProgramName)
    })


const extractCurrentTrainerSchedules = (trainerId, sessionTypeId, trainers) => trainers.filter((item) =>
    item.getIn(['staff', 'iD']) === trainerId && item.getIn(['sessionType', 'iD']) === sessionTypeId,
).sort(getDateAndTimeDifference('startDateTime'))

const isBookable = (state) => !state.get('fromMySchedule')

export const getTrainerRequests = (state) => state.getIn(['networkRequest', REQUEST_NAME], immutable.Map())

export const dedupedStaffSelector = createSelector(
    trainersSelector,
    tierFilter,
    (schedules, tierFilter) => schedules
        .reduce(
            (uniqueStaff, appointment) => {
                const uniqueStaffSessionID =
                    `${appointment.getIn(['staff', 'iD'])}${appointment.getIn(['sessionType', 'iD'])}`

                if (uniqueStaff.has(uniqueStaffSessionID)) {
                    return uniqueStaff
                }

                const sessionName = appointment.getIn(['sessionType', 'name']);
                if(tierFilter !== TIER_LIST.TIER_ALL){
                    if(sessionName.indexOf(tierFilter) === -1){
                        return uniqueStaff
                    }
                }

                return uniqueStaff.set(uniqueStaffSessionID, immutable.fromJS({
                    ID: appointment.get('iD'),
                    staffName: appointment.getIn(['staff', 'name']),
                    staffID: appointment.getIn(['staff', 'iD']),
                    staffImageURL: appointment.getIn(['staff', 'imageURL']),
                    sessionName: appointment.getIn(['sessionType', 'name']),
                    sessionID: appointment.getIn(['sessionType', 'iD']),
                }))
            },
            immutable.Map(),
        )
        .toList()
        .sortBy((staff) => staff.get('staffName')),
)

export const currentTrainerSchedulesSelector = createSelector(
    currentTrainerId,
    currentTrainerSessionTypeId,
    trainersSelector,
    extractCurrentTrainerSchedules,
)

export const currentTrainerSchedule = createSelector(
    trainersSelector,
    currentScheduleId,
    (trainersSchedules, currentScheduleId) => trainersSchedules.get(currentScheduleId),
)

export const sweatTrainersSelector = createSelector(
    twoWeeksSweatClassesSelector,
    (classes) =>
        classes.reduce((trainerMap, classItem) => {
            const trainerId = classItem.getIn(['staff', 'iD'])
            const INVALID_STAFF_ID = '-1'
            const isInvalidStaffMember = trainerId === INVALID_STAFF_ID

            if (trainerMap.has(trainerId) || isInvalidStaffMember) {
                return trainerMap
            }

            return trainerMap.set(trainerId, classItem.setIn(['staff', 'bio'], immutable.Map({
                text: classItem.getIn(['staff', 'bio']),
            })))
        }, immutable.Map()),
)

export const currentSweatTrainerSelector = createSelector(
    sweatTrainersSelector,
    currentTrainerId,
    (sweatTrainer, currentTrainerId) => {
        const currentTrainer = sweatTrainer.get(currentTrainerId, immutable.Map())

        return currentTrainer
    },
)

export const currentTrainerSelector = createSelector(
    isSweatTrainer,
    currentSweatTrainerSelector,
    currentTrainerSchedule,
    (isSweatTrainer, currentSweatTrainer, currentTrainerSchedule) =>
        isSweatTrainer ? currentSweatTrainer : currentTrainerSchedule,
)

export const currentTrainerScheduleAvatarUrl = createSelector(
    currentTrainerSelector,
    (state) => state.getIn(['staff', 'imageURL']),
)

export const currentTrainerScheduleName = createSelector(
    currentTrainerSelector,
    (state) => state.getIn(['staff', 'name']),
)

export const currentTrainerScheduleDescription = createSelector(
    currentTrainerSelector,
    (state) => {
        const getBioTextFromApiResponse = (staff) => staff.getIn(['bio', 'text']) || staff.get('bio')

        return stripHTMLTags(getBioTextFromApiResponse(state.get('staff')))
    },
)

export const currentDateSelector = (dateFormat) => createSelector(
    isTreatmentSelector,
    (state) => state,
    (isTreatment, currentState) => {
        const dateFitlerName = isTreatment ? TREATMENT_DATE_FILTER_NAME : TRAINER_DATE_FILTER_NAME
        const daysfromNowComputed = currentFilterIndexSelector(dateFitlerName)(currentState)
        const weeksFromNowComputed = weeksFromNowSelector(dateFitlerName)(currentState)

        return getDateFromDateFilter(daysfromNowComputed, weeksFromNowComputed, dateFormat)
    },
)

export const currentTrainerIsBookable = createSelector(
    currentTrainerSelector,
    isSweatTrainer,
    (currentTrainer, isSweatTrainer) => isSweatTrainer ? false : isBookable(currentTrainer),
)

export const currentTrainerIsLoading = createSelector(
    currentTrainerSelector,
    getTrainerRequests,
    (trainer, requests) => requests.get(trainer.get('appointmentID')) === REQUEST_STARTED,
)

const dateFilterName = createSelector(
    isTreatmentSelector,
    (isTreatment) => isTreatment ? TREATMENT_DATE_FILTER_NAME : TRAINER_DATE_FILTER_NAME,
)

const weeksFromNow = createSelector(
    dateFilterName,
    (state) => state,
    (dateFilterName, currentState) => weeksFromNowSelector(dateFilterName)(currentState),
)

const currentFilterIndex = createSelector(
    dateFilterName,
    (state) => state,
    (dateFilterName, currentState) => currentFilterIndexSelector(dateFilterName)(currentState),
)

const filters = createSelector(
    dateFilterName,
    (state) => state,
    (dateFilterName, currentState) => filtersSelector(dateFilterName)(currentState),
)

export const schedulesSelector = createSelector(
    currentTrainerSchedulesSelector,
    (currentTrainerSchedule) =>
        calculateAppointmentSchedule(currentTrainerSchedule),
)

export const currentTrainerScheduleDetailsSelector = createSelector(
    currentTrainerSchedulesSelector,
    trainerSessionPrice,
    (currentTrainerSchedule, trainerSessionPrice) => {
        const trainer = currentTrainerSchedule.first() || immutable.Map()

        if (!trainer) {
            return immutable.Map()
        }

        const price = trainerSessionPrice
            .getIn([trainer.getIn(['staff', 'iD']), trainer.getIn(['sessionType', 'iD'])])

        return trainer.set('price', price)
    },
);

const purchasedPackInfoSelector = (state) => {
    let services = state.getIn(['trainer', 'clientServices']).filter(i => {
        return ((i.getIn(['program', 'iD']) === state.getIn(['trainer', 'programFilter']) || i.getIn(['program', 'iD']) === PROGRAMID_LIST.MIXED)
            && Number(i.get('remaining')) > 0 && i.get('current') === "true");
    });
    if(services.count() === 0){
        return immutable.Map();
    } else {
        let service = services.get(0);
        let purchasePackInfo = immutable.Map();
        purchasePackInfo = purchasePackInfo.set('programId', service.getIn(['program', 'iD']));
        purchasePackInfo = purchasePackInfo.set('programName', service.getIn(['program', 'name']));
        purchasePackInfo = purchasePackInfo.set('name', service.get('name'));
        purchasePackInfo = purchasePackInfo.set('remaining', service.get('remaining'));
        if (String(service.get('name')).toLowerCase().indexOf("personal") !== -1) {
            purchasePackInfo = purchasePackInfo.set('tierType', 'personal');
        } else if (String(service.get('name')).toLowerCase().indexOf(TIER_LIST.TIER_1.toLowerCase()) !== -1) {
            purchasePackInfo = purchasePackInfo.set('tierType', TIER_LIST.TIER_1);
        } else if (String(service.get('name')).toLowerCase().indexOf(TIER_LIST.TIER_2.toLowerCase()) !== -1) {
            purchasePackInfo = purchasePackInfo.set('tierType', TIER_LIST.TIER_2);
        } else {
            purchasePackInfo = purchasePackInfo.set('tierType', 'none');
        }
        console.warn(JSON.stringify(purchasePackInfo));
        return purchasePackInfo;
    }
}

export const trainerDetailsSelectors = createStructuredSelector({
    avatarUrl: currentTrainerScheduleAvatarUrl,
    name: currentTrainerScheduleName,
    description: currentTrainerScheduleDescription,
    trainer: currentTrainerSelector,
    isBookable: currentTrainerIsBookable,
    isLoading: currentTrainerIsLoading,
    isReadOnlyMode: isSweatTrainer,
    userDetails,
    purchasedPackInfo: purchasedPackInfoSelector,
})

export const trainerSchedulesSelectors = createStructuredSelector({
    isTreatment: isTreatmentSelector,
    schedules: schedulesSelector,
    userDetails,
    currentDate: currentDateSelector('dddd, MMMM D, YYYY'),
    isBookingTrainer: networkRequestStartedSelector(BOOK_TRAINER),
    currentTrainerScheduleDetails: currentTrainerScheduleDetailsSelector,
    isLoadingPrice: networkRequestStartedSelector(GET_TRAINER_SESSION_PRICE),
    availablePrograms,
    programFilter,
    tierPriceItems,
    selectedTierPrice,
    userCreditCard,
    isGettingPriceItems: networkRequestStartedSelector(GET_TIER_PRICE_LIST),
    tierFilter,
    tempCardInfo: (state) => state.getIn(['trainer', 'tempCardInfo']),
    isSaveCard: (state) => state.getIn(['trainer', 'isSaveCard']),
    isPaying: networkRequestStartedSelector(PAY_PRICE_ITEM),
    isBookingProceed: networkRequestStartedSelector(BOOK_PROCEED),
    bookedTrainerSchedule: (state) => state.getIn(['trainer', 'bookedTrainerSchedule']),
    purchasedPackInfo: purchasedPackInfoSelector,
})

export const trainerListSelectors = createStructuredSelector({
    userDetails,
    isTreatment: isTreatmentSelector,
    trainers: dedupedStaffSelector,
    isGettingTrainers: networkRequestStartedSelector(GET_BOOKABLE_ITEMS),
    getTrainersSucceeded: networkRequestSucceededSelector(GET_BOOKABLE_ITEMS),
    availablePrograms,
    programFilter,
    weeksFromNow,
    currentFilterIndex,
    filters,
    currentDate: currentDateSelector('YYYY-MM-DD'),
    tiers,
    tierFilter,
    clientServices,
    purchasedPackInfo: purchasedPackInfoSelector,
})

export const sweatTrainersListSelectors = createStructuredSelector({
    sweatTrainers: sweatTrainersSelector,
    getTrainersSucceeded: networkRequestSucceededSelector(GET_SWEAT_TRAINERS),
    isGettingTrainers: networkRequestStartedSelector(GET_SWEAT_TRAINERS),
})

export const trainerPaymentSelectors = createStructuredSelector({
    userDetails,
    userCreditCard,
    selectedTierPrice,
    tempCardInfo: (state) => state.getIn(['trainer', 'tempCardInfo']),
    isSaveCard: (state) => state.getIn(['trainer', 'isSaveCard']),
    isPaying: networkRequestStartedSelector(PAY_PRICE_ITEM),
    currentTrainerScheduleDetails: currentTrainerScheduleDetailsSelector,
    bookedTrainerSchedule: (state) => state.getIn(['trainer', 'bookedTrainerSchedule']),
    purchasePackInfo: purchasedPackInfoSelector,
});
