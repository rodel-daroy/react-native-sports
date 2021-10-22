import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import immutable from 'immutable';
import store from './store';
import {Provider} from 'react-redux';

import LoadingScreen from './loading';
import ClassScreen from './class/ClassScreen';
import DetailScreen from './class/DetailScreen';
import ForgotPasswordScreen from './login/ForgotPasswordScreen';
import Home from './home/HomeScreen';
import LocationScreen from './location/LocationScreen';
import LoginScreen from './login/LoginScreen';
import MembershipScreen from './membership/MembershipScreen';
import ProfileManage from './profile/ProfileManage';
import ProfileMembership from './profile/ProfileMembership';
import ProfilePurchases from './profile/ProfilePurchases';
import ProfileScreen from './profile/ProfileScreen';
import ScheduleScreen from './schedule/ScheduleScreen';
import SweatTrainers from './trainer/SweatTrainers';
import SweatTrainersClasses from './class/SweatTrainersClasses';
import SwipeIntroScreen from './swipeIntro/SwipeIntro';
import TrainerDetailsScreen from './trainer/TrainerDetailsScreen';
import Trainers from './trainer/TrainersScreen';
import TrainerSchedule from './trainer/TrainerSchedule';
import UpdatePasswordScreen from './login/UpdatePasswordScreen';
import PurchaseSweatScreen from './purchase/PurchaseSweatScreen';
import PurchaseItemsScreen from './purchase/PurchaseItemsScreen';
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
import colorConstants from './colorConstants';

export const loadingScreen = LoadingScreen;

export const IntroStack = createStackNavigator({
    SwipeIntroScreen: {
        screen: SwipeIntroScreen,
        navigationOptions: {
            headerShown: false,
            headerBackTitle: ' ',
        },
    },
});

export const AboutTabs = createBottomTabNavigator(
    {
        location: LocationScreen,
        aboutBxrScreen: AboutBxrScreen,
        aboutSweatScreen: AboutSweatScreen
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'location') {
                    return <Ionicons name="md-navigate" color={tintColor} size={35} style={{transform: [{rotate: '45deg'}]}}/>
                } else if (routeName === 'aboutBxrScreen') {
                    return  <Image source={require('./images/sweatlogo.png')} style={{width: 35, height: 35, tintColor}} tintColor={tintColor}/>
                } else  if(routeName === 'aboutSweatScreen') {
                    return <Image source={require('./images/bxrlogo.png')} style={{width: 35, height: 35, tintColor}} tintColor={tintColor}/>
                } else {
                    return null;
                }
            },
        }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: colorConstants.BXR_TEXT,
            inactiveTintColor: colorConstants.BXR_PRIMARY,
            style: {
                backgroundColor: colorConstants.BXR_SECONDARY,
            },
        },
    },
);

export const profileTabs = createBottomTabNavigator(
    {
        profile: ProfileScreen,
        profileManage: ProfileManage,
        profileMemberships: ProfileMembership,
        profilePurchases: ProfilePurchases
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'profile') {
                    return <Ionicons name="md-person" color={tintColor} size={35}/>
                } else if (routeName === 'profileManage') {
                    return <Ionicons name="md-cog" color={tintColor} size={35} style={{transform: [{rotate: '45deg'}]}}/>
                } else  if(routeName === 'profileMemberships') {
                    return <Image source={require('./images/id-card.png')} style={{width: 35, height: 35, tintColor}} tintColor={tintColor}/>
                } else if(routeName === 'profilePurchases') {
                    return <Ionicons name="md-card" color={tintColor} size={35}/>
                } else {
                    return null;
                }
            },
        }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: colorConstants.BXR_TEXT,
            inactiveTintColor: colorConstants.BXR_PRIMARY,
            style: {
                backgroundColor: colorConstants.BXR_SECONDARY,
            },
        },
    },
);

export const LoginStack = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    forgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
    version: {
        screen: Version,
        navigationOptions: {
            title: 'INFORMATION',
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: 'white',
        }
    },
    AboutTabs: {
        screen: AboutTabs,
        navigationOptions: ({navigation}) => ({
            title: 'ABOUT',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.push('version')}>
                    <Ionicons name={'md-information-circle'} size={25} color={'white'} style={{marginRight: 10}}/>
                </TouchableOpacity>
            )
        })
    }
}, {
    defaultNavigationOptions: {
        headerTitleAlign: "center",
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            color: "white"
        },
        headerBackTitle: ' ',
        headerTintColor: 'white'
    }
});

export const RootStack = createStackNavigator({
    home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        },
    },
    classes: {
        screen: ClassScreen,
        navigationOptions: {
            title: 'CLASSES'
        }
    },
    membership: {
        screen: MembershipScreen,
        navigationOptions: {
            title: 'MEMBERSHIP'
        }
    },
    classDetails: {
        screen: DetailScreen,
        navigationOptions: {
            title: 'DETAIL'
        }
    },
    updatePassword: {
        screen: UpdatePasswordScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    schedules: {
        screen: ScheduleScreen,
        navigationOptions: {
            title: 'MY SCHEDULE'
        }
    },
    trainers: {
        screen: Trainers,
        navigationOptions: {
            title: 'TRAINERS'
        }
    },
    trainerSchedule: {
        screen: TrainerSchedule,
        navigationOptions: {
            title: 'TRAINER SCHEDULE'
        }
    },
    trainerDetails: {
        screen: TrainerDetailsScreen,
        navigationOptions: {
            title: 'TRAINER DETAILS'
        }
    },
    sweatClass: {
        screen: ClassScreen,
        navigationOptions: {
            title: 'SWEAT CLASSES'
        }
    },
    treatments: {
        screen: Trainers,
        navigationOptions: {
            title: 'CLINICS'
        }
    },
    sweatTrainers: {
        screen: SweatTrainers,
        navigationOptions: {
            title: 'SWEAT TRAINERS'
        }
    },
    sweatTrainerClasses: {
        screen: SweatTrainersClasses,
        navigationOptions: {
            title: "TRAINER'S CLASSES"
        }
    },
    purchaseSweat: {
        screen: PurchaseSweatScreen,
        navigationOptions: {
            title: 'SWEATPACKS'
        }
    },
    purchaseItemsScreen: {
        screen: PurchaseItemsScreen,
        navigationOptions: {
            title: 'SWEATPACKS'
        }
    },
    paymentTotal: {
        screen: PaymentTotalScreen,
        navigationOptions: {
            title: 'PAYMENT TOTAL'
        }
    },
    useStoredCardScreen: {
        screen: UseStoredCardScreen,
        navigationOptions: {
            title: 'USE STORED CARD'
        }
    },
    enterNewCardScreen: {
        screen: EnterNewCardScreen,
        navigationOptions: {
            title: 'ENTER NEW CARD'
        }
    },
    paymentCompleteScreen: {
        screen: PaymentCompleteScreen,
        navigationOptions: {
            title: 'PAYMENT COMPLETE'
        }
    },
    profileAddCreditCard: {
        screen: ProfileAddCreditCard,
        navigationOptions: {
            title: 'STORE CARD TO ACCOUNT'
        }
    },
    profileChangeCreditCard: {
        screen: ProfileChangeCreditCard,
        navigationOptions: {
            title: 'STORED CARD'
        }
    },
    trainerPriceListScreen: {
        screen: TrainerPriceListScreen,
        navigationOptions: {
            title: 'PRICE LIST'
        }
    },
    trainerFindMoreScreen: {
        screen: TrainerPriceListScreen,
        navigationOptions: {
            title: 'WHAT ARE PACKS'
        }
    },
    trainerConfirmScreen: {
        screen: TrainerConfirmScreen,
        navigationOptions: {
            title: 'CONFIRMATION'
        }
    },
    trainerPaymentScreen: {
        screen: TrainerPaymentScreen,
        navigationOptions: {
            title: 'PAYMENT'
        }
    },
    trainerNewCardScreen: {
        screen: TrainerNewCardScreen,
        navigationOptions: {
            title: 'ENTER NEW CARD'
        }
    },
    trainerStoredCardScreen: {
        screen: TrainerStoredCardScreen,
        navigationOptions: {
            title: 'USE STORED CARD'
        }
    },
    trainerPaymentCompleteScreen: {
        screen: TrainerPaymentCompleteScreen,
        navigationOptions: {
            title: 'PAYMENT COMPLETE'
        }
    },
    bookingConfirmScreen: {
        screen: BookingConfirmScreen,
        navigationOptions: {
            title: 'CONFIRMATION'
        }
    },
    bookingCompleteScreen: {
        screen: BookingCompleteScreen,
        navigationOptions: {
            title: 'BOOKING COMPLETE'
        }
    },
    upgradeTierScreen: {
        screen: UpgradeTierScreen,
        navigationOptions: {
            title: 'UPGRADE TIER LEVEL'
        }
    },
    version: {
        screen: Version,
        navigationOptions: {
            title: 'INFORMATION',
        }
    },
    AboutTabs: {
        screen: AboutTabs,
        navigationOptions: ({navigation}) => ({
            title: 'ABOUT',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.push('version')}>
                    <Ionicons name={'md-information-circle'} size={25} color={'white'} style={{marginRight: 10}}/>
                </TouchableOpacity>
            )
        })
    },
    profileTabs: {
        screen: profileTabs,
        navigationOptions: ({navigation}) => {
            const tabTitles = ['PROFILE', 'MANAGE MY PROFILE', 'MEMBERSHIP STATUS', 'PURCHASE HISTORY'];
            return {
                title: tabTitles[navigation.state.index] || 'PROFILE'
            }
        }
    }
}, {
    initialRouteName: 'home',
    defaultNavigationOptions: {
        headerTitleAlign: "center",
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            color: "white"
        },
        headerBackTitle: ' ',
        headerTintColor: 'white'
    }
});


