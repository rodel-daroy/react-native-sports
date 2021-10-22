/* @flow */

import Alert from '../common/Alert' // eslint-disable-line import/no-unresolved
import apiClient from '../api/apiClient'
import {batchActions} from 'redux-batched-actions'
import {bindActionCreators} from 'redux'
import getDateFromDateFilter from '../dateFilter/getDateFromDateFilter'
import getErrorMessage from '../api/getErrorMessage'
import getTrainerErrorMessage from './getTrainerErrorMessage'
import immutable from 'immutable'
import immutableMapToList from '../common/immutableMapToList'
import isErrorResponse from '../api/isErrorResponse'
import moment from 'moment'
import {NetworkRequests} from '../RNFReact'
import {onLateCancellation} from '../schedule/eventHandlers'
import R from 'ramda'
import {
    BOOK_TRAINER,
    GET_BOOKABLE_ITEMS,
    GET_SWEAT_TRAINERS,
    GET_TRAINER_SESSION_PRICE,
    REQUEST_NAME,
    TRAINER_DATE_FILTER_NAME,
    TREATMENT_DATE_FILTER_NAME,
    GET_TIER_PRICE_LIST,
    PAY_PRICE_ITEM,
    BOOK_PROCEED,
} from './constants'
import {BXR_LONDON_ID, SWEAT_BY_BXR_ID} from '../location/constants'
import {
    hydrateTrainersSchedule,
    setAvailablePrograms,
    setCurrentSchedule,
    setCurrentSessionType,
    setCurrentTrainer,
    setProgramFilter,
    setTrainerIsUnbooked,
    setTrainerSessionPrice,
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
import {isSweatMember, userId} from '../user/userSelector'
import {
    setCurrentFilterIndex,
    setWeeksFromNow,
} from '../dateFilter/actionCreators'
import {setCurrentSweatTrainerId, setTwoWeeksSweatClasses} from '../class/actionCreators'
import {GET_PAYMENT_REQUEST} from "../payment/constants";
import {onGetCreditCard} from "../profile/eventHandlers";

const {
    actionCreators: {
        setNetworkRequestFailed,
        setNetworkRequestStarted,
        setNetworkRequestSucceeded,
    },
} = NetworkRequests

const extractIds = R.pluck('iD')

const FILTER_WORD_FOR_TRAINING_APPOINTMENTS = 'training'

const isTrainingProgram = (item) => item.get('name').toLowerCase()
    .includes(FILTER_WORD_FOR_TRAINING_APPOINTMENTS)

export const getAvailablePrograms = async (isTreatment) => {
    const response = await apiClient.getPrograms({
        scheduleType: 'Appointment',
        onlineOnly: true,
    })

    if (isErrorResponse(response)) {
        throw response
    }

    let programs = response.getIn(['response', 'programs', 'program'], immutable.List())
    if(!immutable.List.isList(programs)) {
        programs = immutable.List([programs]);
    }
    return programs.filter((item) => isTreatment ? !isTrainingProgram(item) : isTrainingProgram(item))
}

const onRequestTrainerStarted = (id) => setNetworkRequestStarted(REQUEST_NAME, id)
const onRequestTrainerFailed = (id) => setNetworkRequestFailed(REQUEST_NAME, id)
const onRequestTrainerSucceeded = (id) => setNetworkRequestSucceeded(REQUEST_NAME, id)

export const getSessionTypes = async (programIds: Array<number>) => {
    const response = await apiClient.getSessionTypes({
        programIds,
    })

    if (isErrorResponse(response)) {
        throw response
    }

    const sessionTypes = response.getIn(['response', 'sessionTypes', 'sessionType'], immutable.List())

    if (immutable.Map.isMap(sessionTypes)) {
        return extractIds(immutable.List([sessionTypes]).toJS())
    }

    return extractIds(sessionTypes.toJS())
}

export const getBookableItems = async (sessionTypeIds, dateFilter) => { // eslint-disable-line complexity
    const dateToQuery = dateFilter || moment.utc(new Date()).format('YYYY-MM-DD')

    const response = await apiClient.getBookableItems({
        sessionTypeIds,
        startDate: dateToQuery,
        endDate: dateToQuery,
    })

    if (isErrorResponse(response)) {
        throw response
    }

    const scheduleItem = response.getIn(['response', 'scheduleItems', 'scheduleItem'], immutable.List())

    if (immutable.Map.isMap(scheduleItem)) {
        return immutable.List([scheduleItem])
    }

    return scheduleItem
}

export const onGetTrainers = (dateToQuery, isTreatment) => async (dispatch) => { // eslint-disable-line max-statements
    dispatch(setNetworkRequestStarted(GET_BOOKABLE_ITEMS))

    try {
        let availablePrograms = await getAvailablePrograms(isTreatment)
        if(availablePrograms.count() !== 0) {
            const i = availablePrograms.findIndex((program) => program.get('name').indexOf('Personal') === 0);
            if (i !== -1) {
                const personalProgram = availablePrograms.get(i);
                availablePrograms = availablePrograms.delete(i);
                availablePrograms = availablePrograms.push(personalProgram);
            }

            const defaultProgramType = availablePrograms.getIn([0, 'iD'])

            dispatch(batchActions([
                setAvailablePrograms(availablePrograms),
                setProgramFilter(defaultProgramType),
            ]))

            const sessionTypes = await getSessionTypes([defaultProgramType])
            const bookableItems = await getBookableItems(sessionTypes, dateToQuery)
            dispatch(hydrateTrainersSchedule(bookableItems))
        } else {
            dispatch(hydrateTrainersSchedule(immutable.List()))
        }
        dispatch(setNetworkRequestSucceeded(GET_BOOKABLE_ITEMS))
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(GET_BOOKABLE_ITEMS))
    }
}

export const getCartTotal = (clientId) => async (serviceId) => {
    const response = await apiClient.getCartTotal({
        serviceId,
        clientId,
    })

    if (isErrorResponse(response)) {
        throw response
    }

    const grandTotal = response.getIn(['response', 'shoppingCart', 'grandTotal'], '0')

    return {
        amount: grandTotal,
        serviceId,
        clientId,
    }
}

export const getServices = async (sessionTypeId) => {
    const response = await apiClient.getServices({
        sessionTypeIds: [sessionTypeId],
    })

    if (isErrorResponse(response)) {
        throw response
    }

    const serviceId = response.getIn(['response', 'services', 'service', 'iD'])

    if (!serviceId) {
        throw immutable.Map({
            message: 'Online purchasing of this appointment type is currently disabled. Please contact BXR reception to book this appointment.', // eslint-disable-line max-len
        })
    }

    return serviceId
}

const getSessionPrice = ({clientId, staffId, sessionId}) => async (dispatch) => {
    try {
        dispatch(setNetworkRequestStarted(GET_TRAINER_SESSION_PRICE))
        const serviceId = await getServices(sessionId)
        const {amount} = await getCartTotal(clientId)(serviceId)

        dispatch(batchActions([
            setNetworkRequestSucceeded(GET_TRAINER_SESSION_PRICE),
            setTrainerSessionPrice({amount, sessionId, staffId}),
        ]))
    } catch (exception) {
        dispatch(setNetworkRequestFailed(GET_TRAINER_SESSION_PRICE))
        console.log('Failed getting trainer session amount', exception) // eslint-disable-line no-console
    }
}

export const onBookTrainerWasTapped = ({clientId, trainer, purchasedPackInfo}, navigation) => (dispatch) => {
    if(purchasedPackInfo === immutable.Map() || Number(purchasedPackInfo.get('remaining')) < 1 ||
        trainer.get('sessionName').toLowerCase().indexOf(purchasedPackInfo.get('tierType').toLowerCase()) !== -1) {
        dispatch(batchActions([
            setCurrentTrainer(trainer.get('staffID')),
            setCurrentSessionType(trainer.get('sessionID')),
            navigation.push('trainerSchedule')
        ]));

        dispatch(getSessionPrice({
            clientId,
            staffId: trainer.get('staffID'),
            sessionId: trainer.get('sessionID'),
        }))
    } else {
        dispatch(batchActions([
            navigation.push('upgradeTierScreen')]));
    }
}


export const onViewTrainerWasTapped = (trainer, navigation) => batchActions([
    setCurrentTrainer(trainer.get('staffID')),
    setCurrentSessionType(trainer.get('sessionID')),
    setCurrentSchedule(trainer.get('ID')),
    navigation.push('trainerDetails')
])

export const checkoutShoppingCart = (locationId) => async ({
    serviceId,
    clientId,
    amount,
}) => {
    // const response = await apiClient.checkoutShoppingCart({
    //     serviceId,
    //     clientId,
    //     amount,
    //     locationId,
    // })
    const response = await apiClient.checkoutShoppingCart({
        serviceId,
        clientId,
        paymentInfo: {
            type: "DebitAccountInfo",
            values: {
                Amount: amount,
            },
        },
        locationId,
    })

    if (isErrorResponse(response)) {
        throw response
    }

    return response.getIn(['response', 'shoppingCart'], immutable.List())
}

export const onPurchaseAppointment = async (sessionTypeId, clientId, locationId) => getServices(sessionTypeId)
           .then(getCartTotal(clientId))
           .then(checkoutShoppingCart(locationId))
           .then(
               () => ({purchaseSuccess: true}),
               (response) => {
                   throw response
               },
            )

const NO_APPOINTMENT_PURCHASES_ERROR_CODE = '503'

const onBookAppointment = async (appointementPayload) => {
    const bookTrainerResponse = await apiClient.addOrUpdateAppointments(appointementPayload)

    if (isErrorResponse(bookTrainerResponse)) {
        const errorCode = bookTrainerResponse.getIn(['response', 'appointments', 'appointment', 'errorCode'])

        if (errorCode === NO_APPOINTMENT_PURCHASES_ERROR_CODE) {
            return immutable.fromJS({
                purchaseNeeded: true,
                response: bookTrainerResponse,
            })
        }
        throw bookTrainerResponse
    }

    return bookTrainerResponse
}

const onBookTrainer = (currentTrainerSchedule, clientId, startTime, navigation) => async (dispatch, getState) => { // eslint-disable-line max-statements, complexity
    dispatch(setNetworkRequestStarted(BOOK_TRAINER))
    try {
        const startTimeString = startTime.format('YYYY-MM-DDTHH:mm:ss')
        const sessionTypeId = currentTrainerSchedule.getIn(['sessionType', 'iD'])
        const bookAppointmentPayload = {
            startDateTime: startTimeString,
            locationId: currentTrainerSchedule.getIn(['location', 'iD']),
            staffId: currentTrainerSchedule.getIn(['staff', 'iD']),
            clientId,
            sessionTypeId,
            applyPayment: "true",
        }

        const bookAppointMentResponse = await onBookAppointment(bookAppointmentPayload)

        const locationId = isSweatMember(getState()) ? SWEAT_BY_BXR_ID : BXR_LONDON_ID

        if (bookAppointMentResponse.get('purchaseNeeded')) {
            await onPurchaseAppointment(sessionTypeId, clientId, locationId)
            await onBookAppointment(bookAppointmentPayload)
        }

        const startTimeDisplay = startTime.format('MMM DD, YYYY HH:mm')
        const staffName = currentTrainerSchedule.getIn(['staff', 'name'])
        const sessionName = currentTrainerSchedule.getIn(['sessionType', 'name'])
        const SUCCESSFULL_BOOKED_MESSAGE = // eslint-disable-next-line max-len
            `You successfully booked an appointment with ${staffName} for ${sessionName}, \n at ${startTimeDisplay}. \nA calendar invite will be included in the confirmation email.`

        Alert.alert(
            'Booking Success',
            SUCCESSFULL_BOOKED_MESSAGE,
            [
                {text: 'OK', onPress: () => null},
            ],
        )
        dispatch(batchActions([
            setNetworkRequestSucceeded(BOOK_TRAINER),
            navigation.popToTop()
        ]))
    } catch (exception) {
        dispatch(setNetworkRequestFailed(BOOK_TRAINER))
        if (immutable.Map.isMap(exception) && exception.get('message')) {
            alert(exception.get('message')) // eslint-disable-line no-alert

            return
        }

        alert(getErrorMessage()) // eslint-disable-line no-alert
    }
}

const getPriceItems = (currentTrainerSchedule) => async (dispatch, getState) => {
    try {
        dispatch(setNetworkRequestStarted(GET_TIER_PRICE_LIST))
        const sessionTypeId = currentTrainerSchedule.getIn(['sessionType', 'iD']);
        const programFilter = getState().getIn(['trainer', 'programFilter']);
        const programIds = []; // [8]
        programIds.push(programFilter);
        const response = await apiClient.getServices({
            pageSize: 30,
            currentPage: 0,
            sessionTypeIds: [sessionTypeId],
            programIds: programIds,
        });
        if(isErrorResponse(response)) {
            alert(response.getIn(['response', 'message']));
            dispatch(setNetworkRequestFailed(GET_TIER_PRICE_LIST));
            return;
        }
        dispatch(batchActions([
            setNetworkRequestSucceeded(GET_TIER_PRICE_LIST),
            setTierPriceItems(response.getIn(['response', 'services', 'service'], immutable.List()))
        ]))
    } catch (e) {
        dispatch(setNetworkRequestStarted(GET_TIER_PRICE_LIST))
    }
}

export const onBookTrainerSchedule = (currentTrainerSchedule, clientId, startTime, purchasedPackInfo, isTreatment, navigation) => (dispatch) => {
    if(isTreatment) {
        const cancelProperties = {text: 'Cancel', onPress: () => null}
        const submitProperties = {text: 'OK', onPress: () =>
            dispatch(onBookTrainer(currentTrainerSchedule, clientId, startTime, navigation)),
        }

        const startTimeDisplay = startTime.format('MMM DD, YYYY HH:mm')
        const BOOK_TRAINER_MESSAGE =
            `You're going to book an appointment for ${startTimeDisplay}. Would you like to proceed?`

        Alert.alert(
            'Confirm Booking',
            BOOK_TRAINER_MESSAGE,
            [
                cancelProperties,
                submitProperties,
            ],
        )
    } else {
        currentTrainerSchedule = currentTrainerSchedule.set('bookDateTime', startTime.format('YYYY-MM-DDTHH:mm:ss'));
        currentTrainerSchedule = currentTrainerSchedule.set('bookDisplayDateTime', startTime.local().format('dddd, MMMM D, YYYY, HH:mm'));
        dispatch(setBookedTrainerSchedule(currentTrainerSchedule));

        if(purchasedPackInfo !== immutable.Map() &&
            currentTrainerSchedule.getIn(['sessionType', 'name'], '').toLowerCase().indexOf(purchasedPackInfo.get('tierType').toLowerCase()) !== -1){
            dispatch(batchActions([navigation.push('bookingConfirmScreen')]));
        } else {
            dispatch(getPriceItems(currentTrainerSchedule));
            dispatch(batchActions([navigation.push('trainerConfirmScreen')]));
        }
    }
}

export const onRefreshTrainerList = (dateTimeQuery) => async (dispatch, getState) => {
    dispatch(setNetworkRequestStarted(GET_BOOKABLE_ITEMS))
    try {
        const programFilter = getState().getIn(['trainer', 'programFilter'])
        const programIds = ( programFilter !== undefined && programFilter !== null ) ? [programFilter] : [];
        const sessionTypes = await getSessionTypes(programIds)
        const bookableItems = await getBookableItems(sessionTypes, dateTimeQuery)

        dispatch(batchActions([
            dispatch(setNetworkRequestSucceeded(GET_BOOKABLE_ITEMS)),
            dispatch(hydrateTrainersSchedule(bookableItems)),
        ]))
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(setNetworkRequestFailed(GET_BOOKABLE_ITEMS))
    }
}

export const onProgramFilterSelected = (programFilterIndex: number, dateTimeQuery: string) => (dispatch, getState) => {
    const selectedProgram = getState().getIn(['trainer', 'availablePrograms', programFilterIndex])

    dispatch(setProgramFilter(selectedProgram.get('iD')))
    dispatch(onRefreshTrainerList(dateTimeQuery))
}

const unbookBookTrainerSchedule = (
    {appointmentId, popAfter, lateCancel = false},
    navigation,
    isResponseSuccess = () => true,
) => async (dispatch) => { // eslint-disable-line complexity, max-statements
    try {
        dispatch(onRequestTrainerStarted(appointmentId))

        const unbookTrainerResponse = await apiClient.addOrUpdateAppointments({
            appointmentId,
            isCancel: true,
            lateCancel,
        })

        if (isErrorResponse(unbookTrainerResponse)) {
            alert(getTrainerErrorMessage(unbookTrainerResponse.get('response'))) // eslint-disable-line no-alert
            dispatch(onRequestTrainerFailed(appointmentId))

            return
        } else if (!isResponseSuccess(unbookTrainerResponse)) {
            return
        }

        dispatch(batchActions([
            onRequestTrainerSucceeded(appointmentId),
            setTrainerIsUnbooked(appointmentId),
        ]))

        if (popAfter) {
            dispatch(batchActions([navigation.goBack()]))
        }
    } catch (exception) {
        alert(getErrorMessage()) // eslint-disable-line no-alert
        dispatch(onRequestTrainerFailed(appointmentId))
    }
}

const isOutsideCancellationWindow = (response) => response
    .getIn(['response', 'appointments', 'appointment', 'messages', 'string'], '')
    .includes('outside of cancelation window.')

const lateCancellation = ({appointmentId, popAfter}, navigation) => onLateCancellation({
    onCancel: () => onRequestTrainerSucceeded(appointmentId),
    onConfirm: () => unbookBookTrainerSchedule({appointmentId, popAfter, lateCancel: true}, navigation),
})

const onUnbookBookTrainerSchedule = ({appointmentId, popAfter}, navigation) => async (dispatch) =>
    dispatch(unbookBookTrainerSchedule({appointmentId, popAfter}, navigation, (response) => {
        if (!isOutsideCancellationWindow(response)) {
            return true
        }

        dispatch(lateCancellation({appointmentId, popAfter}, navigation))

        return false
    }))

export const onUnbookTrainerScheduleTapped = ({appointmentId, startTime, popAfter = false}, navigation) => (dispatch) => {
    const cancelProperties = {text: 'Cancel', onPress: () => null}
    const submitProperties = {text: 'OK', onPress: () =>
        dispatch(onUnbookBookTrainerSchedule({appointmentId, popAfter}, navigation))}

    const startTimeDisplay = moment.utc(startTime).local()
        .format('MMM DD, YYYY HH:mm')
    const BOOK_TRAINER_MESSAGE = `You're going to cancel your booking at ${startTimeDisplay}, do you want to proceed?`

    Alert.alert(
        'Cancel Appointment',
        BOOK_TRAINER_MESSAGE,
        [
            cancelProperties,
            submitProperties,
        ],
    )
}

export const onDateFilterChange = ({filterIndex, weeksFromNow, isTreatment}) => (dispatch) => {
    const dateToQuery = getDateFromDateFilter(filterIndex, weeksFromNow)
    const filterName = isTreatment ? TREATMENT_DATE_FILTER_NAME : TRAINER_DATE_FILTER_NAME

    dispatch(setCurrentFilterIndex({fieldName: filterName, value: filterIndex}))
    dispatch(onRefreshTrainerList(dateToQuery))
}

export const onDateCoverageChange = ({weeksFromNow, isTreatment}) => (dispatch) => {
    const dateToQuery = getDateFromDateFilter(0, weeksFromNow)
    const filterName = isTreatment ? TREATMENT_DATE_FILTER_NAME : TRAINER_DATE_FILTER_NAME

    dispatch(batchActions([
        setCurrentFilterIndex({fieldName: filterName, value: 0}),
        setWeeksFromNow({fieldName: filterName, value: weeksFromNow}),
    ]))

    dispatch(onRefreshTrainerList(dateToQuery))
}

const onViewSweatClassesWasTapped = (currentSweatTrainerId, navigation) => (dispatch) => {
    dispatch(batchActions([
        navigation.push('sweatTrainerClasses'),
        setCurrentSweatTrainerId(currentSweatTrainerId),
    ]))
}

export const trainerDetailsEventHandlers = (dispatch) => bindActionCreators({
    onBookTrainer: onBookTrainerWasTapped,
    onUnbookTrainer: onUnbookTrainerScheduleTapped,
    onViewSweatClasses: onViewSweatClassesWasTapped,
}, dispatch)

export const onViewSweatTrainerWasTapped = (id, navigation) => (dispatch) => {
    dispatch(batchActions([
        navigation.push('trainerDetails'),
        setCurrentTrainer(id),
    ]))
}

export const onGetSweatTrainers = () => async (dispatch, getState) => { // eslint-disable-line max-statements
    dispatch(setNetworkRequestStarted(GET_SWEAT_TRAINERS))

    try {
        const clientId = userId(getState())
        const endTime = getDateFromDateFilter(0, 2)
        const response = await apiClient.getClasses({
            hideCanceledClasses: false,
            schedulingWindow: true,
            startDateTime: moment.utc(new Date()).format('YYYY-MM-DD'),
            endDateTime: endTime,
            locationIds: [SWEAT_BY_BXR_ID],
            clientId,
        })

        if (isErrorResponse(response)) {
            alert(getTrainerErrorMessage(response.get('response'))) // eslint-disable-line no-alert
            dispatch(setNetworkRequestStarted(GET_SWEAT_TRAINERS))

            return
        }

        const classForTwoWeeks = immutableMapToList(
            response.getIn(['response', 'classes', 'class'], immutable.List()),
        )

        dispatch(batchActions([
            setNetworkRequestSucceeded(GET_SWEAT_TRAINERS),
            setTwoWeeksSweatClasses(classForTwoWeeks),
        ]))
    } catch (exception) {
        dispatch(setNetworkRequestFailed(GET_SWEAT_TRAINERS))
    }
}

export const sweatTrainersEventHandler = (dispatch) => bindActionCreators({
    onViewTrainerWasTapped: onViewSweatTrainerWasTapped,
    onGetSweatTrainers,
}, dispatch);

export const onPriceListTapped = (navigation) => async (dispatch) => {
    dispatch(batchActions([navigation.push('trainerPriceListScreen')]));
};

export const onPurchasedPackTapped = (navigation) => async (dispatch) => {
    dispatch(batchActions([navigation.push('bookingConfirmScreen')]));
};

export const onGetClientService = (clientId) => async (dispatch) => {
    const response = await apiClient.getClientServices({
        clientId,
    });
    dispatch(setClientServices(response.getIn(['response', 'clientServices', 'clientService'])));
};

export const onBookingProceed = (clientId, startDateTime, staffId, sessionTypeId, navigation) => async (dispatch, getState) => {
    try{
        dispatch(setNetworkRequestStarted(BOOK_PROCEED));
        const locationId = isSweatMember(getState()) ? SWEAT_BY_BXR_ID : BXR_LONDON_ID;

        const bookAppointmentPayload = {
            startDateTime,
            locationId,
            staffId,
            clientId,
            sessionTypeId,
            applyPayment: "true",
        };
        const bookAppointmentResponse = await apiClient.addOrUpdateAppointments(bookAppointmentPayload);
        if (isErrorResponse(bookAppointmentResponse)){
            alert(bookAppointmentResponse.getIn(['response', 'appointments', 'appointment', 'messages', 'string']));
            dispatch(setNetworkRequestFailed(BOOK_PROCEED));
            return;
        }
        dispatch(batchActions([
            setNetworkRequestSucceeded(BOOK_PROCEED),
            navigation.push('bookingCompleteScreen')
        ]))
    }catch (e) {
        console.warn(e.message);
        dispatch(setNetworkRequestFailed(BOOK_PROCEED))
    }
};

export const onTierFilterSelected = (tierIndex: number) => (dispatch, getState) => {
    const selectedTier = getState().getIn(['trainer', 'tiers', tierIndex])

    dispatch(setTierFilter(selectedTier))
}

export const onSelectTierPrice = (item) => (dispatch, getState) => {
    // if(tierPriceType !== '' && title !== '') {
    //     item = item.set('type', tierPriceType);
    //     item = item.set('title', title);
    // }
    dispatch(setTierPrice(item));
};

export const onPayNowTapped = (navigation) => (dispatch) => {
    dispatch(batchActions([navigation.push('trainerPaymentScreen')]));
};

export const onUseStoreCard = (navigation) => (dispatch) => {
    dispatch(batchActions([navigation.push('trainerStoredCardScreen')]));
};

export const onEnterNewCard = (navigation) => (dispatch) => {
    dispatch(batchActions([navigation.push('trainerNewCardScreen')]));
};

export const onSetCardNumber = (value) => async (dispatch) => {
    dispatch(setCardNumber(value));
};
export const onSetCardName = (value) => async (dispatch) => {
    dispatch(setCardName(value));
};
export const onSetCardExpiryDate = (value) => async (dispatch) => {
    let month = value.split('/')[0];
    let year = value.split('/')[1];
    if (year === undefined) year = "";
    dispatch(setCardExpiryMonth(month));
    dispatch(setCardExpiryYear(year));
};

export const onSetCardExpiryMonth = (value) => async (dispatch) => {
    dispatch(setCardExpiryMonth(value));
};
export const onSetCardExpiryYear = (value) => async (dispatch) => {
    dispatch(setCardExpiryYear(value));
};

export const onSetSaveCard = () => async (dispatch) => {
    dispatch(setSaveCard());
};

export const onGetCreditCardInfo = (clientId) => async (dispatch) => {
    dispatch(onGetCreditCard(clientId));
}

export const onPayStoredCard = (clientId, productId, amount, startDateTime, staffId, sessionTypeId, navigation) => async (dispatch, getState) => {
    try{
        dispatch(setNetworkRequestStarted(PAY_PRICE_ITEM));
        const locationId = isSweatMember(getState()) ? SWEAT_BY_BXR_ID : BXR_LONDON_ID;
        let response = await apiClient.checkoutShoppingCart({
            clientId: clientId,
            serviceId: productId,
            locationId: locationId,
            appointments: {
                startDateTime,
                staffId,
                sessionTypeId,
                locationId
            },
            discountAmount: 0,
            quantify: 1,
            paymentInfo: {
                type: 'StoredCardInfo',
                values: {
                    Amount: amount,
                },
            }
        });
        if (isErrorResponse(response)){
            alert(response.getIn(['response', 'message']));
            dispatch(setNetworkRequestFailed(PAY_PRICE_ITEM));
            return;
        }

        const bookAppointmentPayload = {
            startDateTime,
            locationId,
            staffId,
            clientId,
            sessionTypeId,
            applyPayment: "true",
        };
        const bookAppointmentResponse = await apiClient.addOrUpdateAppointments(bookAppointmentPayload);
        console.warn(JSON.stringify(bookAppointmentResponse));
        if (isErrorResponse(bookAppointmentResponse)){
            alert(bookAppointmentResponse.getIn(['response', 'appointments', 'appointment', 'messages', 'string']));
            dispatch(setNetworkRequestFailed(PAY_PRICE_ITEM));
            return;
        }

        dispatch(batchActions([
            setNetworkRequestSucceeded(PAY_PRICE_ITEM),
            navigation.push('trainerPaymentCompleteScreen')
        ]))
    }catch (e) {
        console.warn(e.message);
        dispatch(setNetworkRequestFailed(PAY_PRICE_ITEM))
    }
};

export const onPayNewCard = (clientId, productId, amount, cardNumber, expYear, expMonth, name, address, city, state, postalcode, isSaveCard, startDateTime, staffId, sessionTypeId, navigation) => async (dispatch, getState) => {
    try{
        let now = new Date();
        if(expYear == '' || expMonth == '' || expMonth < 1 || expMonth > 12){
            alert("Incorrect expiry date. Please check and try again.");
            return;
        }
        if((now.getFullYear() > Number(expYear)) || (now.getFullYear() === Number(expYear) && now.getMonth() + 1 > Number(expMonth))){
            alert("Incorrect expiry date. Please check and try again.");
            return;
        }
        dispatch(setNetworkRequestStarted(PAY_PRICE_ITEM));
        const locationId = isSweatMember(getState()) ? SWEAT_BY_BXR_ID : BXR_LONDON_ID;
        let response = await apiClient.checkoutShoppingCart({
            clientId: clientId,
            serviceId: productId,
            locationId: locationId,
            appointments: {
                startDateTime,
                staffId,
                sessionTypeId,
                locationId
            },
            discountAmount: 0,
            quantify: 1,
            paymentInfo: {
                type: 'CreditCardInfo',
                values: {
                    Amount: amount,
                    CreditCardNumber: cardNumber,
                    ExpYear: expYear,
                    ExpMonth: expMonth,
                    BillingName: name,
                    BillingAddress: address,
                    BillingCity: city,
                    BillingState: state,
                    BillingPostalCode: postalcode,
                    SaveInfo: isSaveCard,
                },
            }
        });
        if (isErrorResponse(response)){
            let errorMessage = response.getIn(['response', 'message']);
            alert("Incorrect card information. Please check and try again.");
            dispatch(setNetworkRequestFailed(PAY_PRICE_ITEM));
            return;
        }

        const bookAppointmentPayload = {
            startDateTime,
            locationId,
            staffId,
            clientId,
            sessionTypeId,
            applyPayment: "true",
        };
        const bookAppointmentResponse = await apiClient.addOrUpdateAppointments(bookAppointmentPayload);

        if (isErrorResponse(bookAppointmentResponse)){
            alert(bookAppointmentResponse.getIn(['response', 'appointments', 'appointment', 'messages']));
            dispatch(setNetworkRequestFailed(PAY_PRICE_ITEM));
            return;
        }

        dispatch(batchActions([
            setNetworkRequestSucceeded(PAY_PRICE_ITEM),
            navigation.push('trainerPaymentCompleteScreen')
        ]))
    }catch (e) {
        console.warn(e.message);
        dispatch(setNetworkRequestFailed(PAY_PRICE_ITEM))
    }
};

export const onPaymentDone = (navigation) => async(dispatch) => {
    dispatch(batchActions([navigation.popToTop()]));
};

export const onPopScreen = (navigation) => async (dispatch) => {
    dispatch(batchActions([navigation.goBack('')]));
}

export const onFindMoreTapped = (navigation) => batchActions([
    navigation.push('trainerFindMoreScreen')
])



