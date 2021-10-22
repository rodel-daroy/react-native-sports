/* @flow */

import ClassScreen from './class/ClassScreen'
import DetailScreen from './class/DetailScreen'
import ForgotPasswordScreen from './login/ForgotPasswordScreen'
import Home from './home/HomeScreen'
import immutable from 'immutable'
import LocationScreen from './location/LocationScreen'
import LoginScreen from './login/LoginScreen'
import MembershipScreen from './membership/MembershipScreen'
import ProfileManage from './profile/ProfileManage'
import ProfileMembership from './profile/ProfileMembership'
import ProfilePurchases from './profile/ProfilePurchases'
import ProfileScreen from './profile/ProfileScreen'
import ScheduleScreen from './schedule/ScheduleScreen'
import StackNavigator from './sceneNavigation/stack/StackNavigator'
import SweatTrainers from './trainer/SweatTrainers'
import SweatTrainersClasses from './class/SweatTrainersClasses'
import SwipeIntroScreen from './swipeIntro/SwipeIntro' // eslint-disable-line import/no-unresolved
import TabNavigator from './sceneNavigation/tab/TabNavigator'
import TrainerDetailsScreen from './trainer/TrainerDetailsScreen'
import Trainers from './trainer/TrainersScreen'
import TrainerSchedule from './trainer/TrainerSchedule'
import UpdatePasswordScreen from './login/UpdatePasswordScreen'
import PurchaseSweatScreen from './purchase/PurchaseSweatScreen';
import PurchaseItemsScreen from './purchase/PurchaseItemsScreen'
import PaymentTotalScreen from './payment/PaymentTotalScreen';
import UseStoredCardScreen from './payment/UseStoredCardScreen';
import EnterNewCardScreen from './payment/EnterNewCardScreen';
import PaymentCompleteScreen from './payment/PaymentCompleteScreen';
import ProfileAddCreditCard from './profile/ProfileAddCreditCard';
import ProfileChangeCreditCard from './profile/ProfileChangeCreditCard';
import TrainerPriceListScreen from './trainer/TrainerPriceListScreen';
import TrainerConfirmScreen from './trainer/TrainerConfirmScreen';
import TrainerPaymentScreen from './trainer/TrainerPaymentScreen';
import TrainerNewCardScreen from './trainer/TrainerNewCardScreen';
import TrainerStoredCardScreen from './trainer/TrainerStoredCardScreen';
import TrainerPaymentCompleteScreen from './trainer/TrainerPaymentCompleteScreen';
import AboutBxrScreen from './about/AboutBxrScreen';
import AboutSweatScreen from './about/AboutSweatScreen';
import AboutRightButton from './about/AboutRightButton';
import Version from './about/Version';
import BookingConfirmScreen from './trainer/BookingConfirmScreen';
import BookingCompleteScreen from './trainer/BookingCompleteScreen';
import UpgradeTierScreen from './trainer/UpgradeTierScreen';

export default immutable.fromJS({
    appIntro: {
        component: SwipeIntroScreen,
        hideNavBar: true,
        tabIcon: 'eye',
    },
    home: {
        component: Home,
    },
    modalStack: {
        component: StackNavigator,
        stackDirection: 'vertical',
        hideNavBar: true,
    },
    profileRoot: {
        component: TabNavigator,
        hideNavBar: true,
    },
    aboutRoot: {
        titleText: 'ABOUT',
        component: TabNavigator,
        rightComponent: AboutRightButton,
    },
    rootStack: {
        component: StackNavigator,
        stackDirection: 'horizontal',
    },
    login: {
        component: LoginScreen,
        hideLeftComponent: true,
    },
    forgotPassword: {
        component: ForgotPasswordScreen,
        hideNavBar: true,
    },
    classes: {
        titleText: 'CLASSES',
        component: ClassScreen,
    },
    membership: {
        titleText: 'MEMBERSHIP',
        hideNavBar: true,
        component: MembershipScreen,
        // tabIcon: 'credit-card',
        tabImage: require('./images/bxrlogo.png'),
    },
    location: {
        titleText: 'LOCATION',
        hideNavBar: true,
        component: LocationScreen,
        tabIcon: 'location-arrow',
    },
    classDetails: {
        titleText: 'DETAIL',
        component: DetailScreen,
    },
    profile: {
        component: ProfileScreen,
        hideLeftComponent: true,
        tabIcon: 'user',
        hideNavBar: true,
    },
    profileManage: {
        titleText: 'MANAGE MY PROFILE',
        component: ProfileManage,
        hideLeftComponent: true,
        hideNavBar: true,
        tabIcon: 'cog',
    },
    profileMemberships: {
        titleText: 'MEMBERSHIP STATUS',
        component: ProfileMembership,
        hideLeftComponent: true,
        hideNavBar: true,
        // tabIcon: 'id-card',
        tabImage: require('./images/id-card.png'),
    },
    profilePurchases: {
        titleText: 'PURCHASE HISTORY',
        component: ProfilePurchases,
        hideLeftComponent: true,
        hideNavBar: true,
        tabIcon: 'credit-card',
    },
    updatePassword: {
        component: UpdatePasswordScreen,
        hideLeftComponent: true,
    },
    schedules: {
        titleText: 'MY SCHEDULE',
        component: ScheduleScreen,
    },
    trainers: {
        titleText: 'TRAINERS',
        component: Trainers,
    },
    trainerSchedule: {
        titleText: 'TRAINER SCHEDULE',
        component: TrainerSchedule,
    },
    trainerDetails: {
        titleText: 'TRAINER DETAILS',
        component: TrainerDetailsScreen,
    },
    sweatClass: {
        titleText: 'SWEAT CLASSES',
        component: ClassScreen,
    },
    treatments: {
        titleText: 'CLINICS',
        component: Trainers,
    },
    sweatTrainers: {
        titleText: 'SWEAT TRAINERS',
        component: SweatTrainers,
    },
    sweatTrainerClasses: {
        titleText: "TRAINER'S CLASSES",
        component: SweatTrainersClasses,
    },
    purchaseSweat: {
        titleText: 'SWEATPACKS',
        component: PurchaseSweatScreen,
    },
    purchaseItemsScreen: {
        titleText: 'SWEATPACKS',
        component: PurchaseItemsScreen
    },
    paymentTotal: {
        titleText: 'PAYMENT TOTAL',
        component: PaymentTotalScreen,
    },
    useStoredCardScreen: {
        titleText: 'USE STORED CARD',
        component: UseStoredCardScreen,
    },
    enterNewCardScreen: {
        titleText: 'ENTER NEW CARD',
        component: EnterNewCardScreen,
    },
    paymentCompleteScreen: {
        titleText: 'PAYMENT COMPLETE',
        component: PaymentCompleteScreen,
    },
    profileAddCreditCard: {
        titleText: 'STORE CARD TO ACCOUNT',
        component: ProfileAddCreditCard,
        hideLeftComponent: true,
        hideNavBar: true,
        tabIcon: 'cog',
    },
    profileChangeCreditCard: {
        titleText: 'STORED CARD',
        component: ProfileChangeCreditCard,
        hideLeftComponent: true,
        hideNavBar: true,
        tabIcon: 'cog',
    },
    trainerPriceListScreen : {
        titleText: 'PRICE LIST',
        component: TrainerPriceListScreen,
    },
    trainerFindMoreScreen : {
        titleText: 'WHAT ARE PACKS',
        component: TrainerPriceListScreen,
    },
    trainerConfirmScreen : {
        titleText: 'CONFIRMATION',
        component: TrainerConfirmScreen,
    },
    trainerPaymentScreen : {
        titleText: 'PAYMENT',
        component: TrainerPaymentScreen,
    },
    trainerNewCardScreen : {
        titleText: 'ENTER NEW CARD',
        component: TrainerNewCardScreen,
    },
    trainerStoredCardScreen : {
        titleText: 'USE STORED CARD',
        component: TrainerStoredCardScreen,
    },
    trainerPaymentCompleteScreen : {
        titleText: 'PAYMENT COMPLETE',
        component: TrainerPaymentCompleteScreen,
    },
    aboutBxrScreen: {
        titleText: 'About BXR',
        component: AboutBxrScreen,
        hideNavBar: true,
        tabImage: require('./images/bxrlogo.png'),
    },
    aboutSweatScreen: {
        titleText: 'About SWEAT',
        component: AboutSweatScreen,
        hideNavBar: true,
        tabImage: require('./images/sweatlogo.png'),
    },
    version: {
        titleText: 'INFORMATION',
        component: Version,
    },
    bookingConfirmScreen : {
        titleText: 'CONFIRMATION',
        component: BookingConfirmScreen,
    },
    bookingCompleteScreen : {
        titleText: 'BOOKING COMPLETE',
        component: BookingCompleteScreen,
    },
    upgradeTierScreen : {
        titleText: 'Upgrade Tier Level',
        component: UpgradeTierScreen,
    },
})
