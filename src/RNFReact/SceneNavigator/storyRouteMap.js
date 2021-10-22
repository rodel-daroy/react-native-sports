/* @flow */

import Button from '../Components/Button'
import createComponent from '../createComponent'
import DrawerNavigator from './drawer/DrawerNavigator'
import immutable from 'immutable'
import Menu from '../Components/Menu'
import React from 'react'
import Row from '../Components/Row'
import StackNavigator from './stack/StackNavigator'
import TabNavigator from './tab/TabNavigator'
import Text from '../Components/Text'
import TouchableIcon from '../Components/TouchableIcon'
import View from '../Components/View'
import {
    popScene,
    pushScene,
    toggleMenuScene,
} from './eventHandlers'

const mapDispatchToProps = (dispatch) => ({
    onPushScenePressed: (payload) => dispatch(pushScene(payload)),
    onPopScenePressed: (payload) => dispatch(popScene(payload)),
    onLeftMenuButtonPressed: () => dispatch(toggleMenuScene('leftMenu')),
    onRightMenuButtonPressed: () => dispatch(toggleMenuScene('rightMenu')),
    onAppExampleLeftMenuPressed: () => dispatch(toggleMenuScene('drawerMenu')),
})

const TabPage = createComponent({displayName: 'tabPage'}, ({text}) => (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>{text}</Text>
    </View>
))

const menuOptions = immutable.fromJS([
    {
        items: [
            {
                icon: 'shopping-basket',
                title: 'Shopping Basket',
                extraInfo: '£8.00',
                onOptionPressed: () => alert('Shopping Basket Option'), // eslint-disable-line no-alert
            },
            {
                icon: 'book',
                title: 'Order History',
                onOptionPressed: () => alert('Order History Option'), // eslint-disable-line no-alert
            },
            {
                icon: 'map',
                title: 'Find Nearest Store',
                onOptionPressed: () => alert('Find Nearest Store Option'), // eslint-disable-line no-alert
            },
            {
                icon: 'info-circle',
                title: 'About',
                onOptionPressed: () => alert('About Option'), // eslint-disable-line no-alert
            },
        ],
    },
])

const StartPage = createComponent({
    displayName: 'StartPage',
    mapDispatchToProps,
}, ({onPushScenePressed, stackRootKey}) => (
    <View style={{height: 300, alignItems: 'center'}}>
        <Text>This is the start page.</Text>
        <Button
            onPress={() => onPushScenePressed({
                route: 'middle',
                pushInto: stackRootKey,
            })}
            style={{margin: 8}}
        >
            Push middle scene
        </Button>
    </View>
))

const MiddlePage = createComponent({
    displayName: 'MiddlePage',
    mapDispatchToProps,
}, ({onPushScenePressed, onPopScenePressed, stackRootKey}) => (
    <View>
        <Text>This is the middle page.</Text>
        <Button
            onPress={() => onPushScenePressed({
                route: 'end',
                pushInto: stackRootKey,
            })}
            style={{margin: 8}}
        >
            Push end scene
        </Button>
        <Button
            onPress={() => onPopScenePressed()}
            style={{margin: 8}}
        >
            Pop to start scene
        </Button>
    </View>
))

const EndPage = createComponent({
    displayName: 'EndPage',
    mapDispatchToProps,
}, ({onPopScenePressed}) => (
    <View>
        <Text>This is the end page.</Text>
        <Button
            onPress={() => onPopScenePressed()}
            style={{margin: 8}}
        >
            Pop to middle scene
        </Button>
    </View>
))

const Tab1 = createComponent({displayName: 'Tab 1'}, () => <Text>This is Tab 1</Text>)
const Tab2 = createComponent({displayName: 'Tab 2'}, () => <Text>This is Tab 2</Text>)
const Tab3 = createComponent({displayName: 'Tab 3'}, () => <Text>This is Tab 3</Text>)

export default immutable.fromJS({
    rootStack: {
        component: StackNavigator,
        stackDirection: 'horizontal',
        styles: {
            backButtonColour: 'black',
            headerTextStyle: {
                color: 'black',
            },
            headerStyle: {
                backgroundColor: 'crimson',
            },
        },
    },
    start: {
        component: StartPage,
        titleText: 'Start Page',
    },
    middle: {
        component: MiddlePage,
        titleText: 'Middle Page',
    },
    end: {
        component: EndPage,
        titleText: 'End Page',
    },
    tabRoot: {
        component: TabNavigator,
        hideNavBar: true,
    },
    tab1: {
        component: Tab1,
        titleText: 'Tab 1',
        tabIcon: 'leaf',
    },
    tab2: {
        component: Tab2,
        titleText: 'Tab 2',
        tabIcon: 'fire',
    },
    tab3: {
        component: Tab3,
        titleText: 'Tab 3',
        tabIcon: 'tint',
    },
    drawerRoot: {
        component: DrawerNavigator,
        titleText: 'Drawer Navigation',
        leftComponent: createComponent({displayName: 'leftComponent', mapDispatchToProps}, ({
            onLeftMenuButtonPressed,
        }) => (
            <View style={{marginLeft: 5, marginTop: 10}}>
                <TouchableIcon
                    color='black'
                    name='bars'
                    onPress={onLeftMenuButtonPressed}
                    size={24}
                />
            </View>
        )),
        rightComponent: createComponent({displayName: 'rightComponent', mapDispatchToProps}, ({
            onRightMenuButtonPressed,
        }) => (
            <View style={{marginRight: 5, marginTop: 10}}>
                <TouchableIcon
                    color='black'
                    name='bars'
                    onPress={onRightMenuButtonPressed}
                    size={24}
                />
            </View>
        )),
    },
    main: {
        component: createComponent({displayName: 'Main'}, () => (
            <View style={{backgroundColor: 'white', flex: 1}}><Text>Main</Text></View>
        )),
    },
    leftMenu: {
        component: createComponent({displayName: 'LeftMenu'}, () => (
            <View style={{backgroundColor: 'crimson', flex: 1}}>
                <Row style={{borderBottomWidth: 1}}>
                    <Text>Menu Option</Text>
                </Row>
            </View>
        )),
    },
    rightMenu: {
        component: createComponent({displayName: 'RightMenu'}, () => (
            <View style={{backgroundColor: 'skyblue', flex: 1}}>
                <Row style={{borderBottomWidth: 1}}>
                    <Text>Menu Option</Text>
                </Row>
            </View>
        )),
    },
    topModal: {
        component: StackNavigator,
        stackDirection: 'vertical',
        styles: {
            headerStyle: {
                backgroundColor: 'pink',
            },
            headerTextStyle: {
                fontSize: 18,
                fontFamily: 'Papyrus',
            },
        },
    },
    drawerNav: {
        component: DrawerNavigator,
        titleText: 'An RNF App',
        leftComponent: createComponent({displayName: 'leftComponent', mapDispatchToProps}, ({
            onAppExampleLeftMenuPressed,
        }) => (
            <View style={{marginLeft: 8, marginTop: 10}}>
                <TouchableIcon
                    color='black'
                    name='bars'
                    onPress={onAppExampleLeftMenuPressed}
                    size={24}
                />
            </View>
        )),
    },
    drawerMenu: {
        component: createComponent({displayName: 'Drawer Menu'}, () => <Menu menuOptions={menuOptions} />),
    },
    tabNav: {
        component: TabNavigator,
        hideNavBar: true,
        styles: {
            tabBarStyle: {
                backgroundColor: 'blue',
            },
            tabBarButtonStyle: {
                backgroundColor: 'yellow',
            },
            tabBarButtonInactiveColour: 'red',
            tabBarButtonActiveColour: 'green',
        },
    },
    tabStackNav1: {
        component: StackNavigator,
        tabIcon: 'star',
    },
    tabStackNav2: {
        component: StackNavigator,
        tabIcon: 'heart',
    },
    tabStackNav3: {
        component: StackNavigator,
        tabIcon: 'stack-overflow',
    },
    drawerMenuStackNav: {
        component: StackNavigator,
    },
    genericPage1: {
        component: createComponent({displayName: 'Generic Page 1'}, () => <TabPage text='Generic Page 1' />),
        tabIcon: 'star',
        hideNavBar: true,
    },
    genericPage2: {
        component: createComponent({displayName: 'Generic Page 2'}, () => <TabPage text='Generic Page 2' />),
        tabIcon: 'heart',
        hideNavBar: true,
    },
    genericPage3: {
        component: createComponent({displayName: 'Generic Page 3'}, () => <TabPage text='Generic Page 3' />),
        tabIcon: 'bed',
        hideNavBar: true,
    },
})
