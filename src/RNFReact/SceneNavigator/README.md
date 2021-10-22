Below is a list of quick instructions on setting up the SceneNavigator. Further examples are available in the SceneNavigator stories in rnf-react. Some examples can also be seen in BXR.

### Importing SceneNavigator in your project

To import the navigation components into your project, do the following:

```
import {SceneNavigation} from 'rnf-react'

const {SceneNavigator, TabNavigator, StackNavigator} = SceneNavigation
```

### Integrating SceneNavigator with your project

Add the sceneNavigator reducer to your store:
```
import {SceneNavigation} from 'rnf-react'
const {reducer: sceneNavigator} = SceneNavigation

export default createStoreWithMiddleware(combineReducers({
    sceneNavigator,
}))
```

Produce a _route map_ for the navigator. A route map contains an immutable object with keys for screens, specifying their components and some other parts such as styles, transition direction and some icons.

```
export default immutable.fromJS({
    appIntro: {
        component: SwipeIntroScreen,
        hideNavBar: true,
        tabIcon: 'eye',
    },
    modalStack: {
        component: StackNavigator,
        stackDirection: 'vertical',
        hideNavBar: true,
    }
    rootStack: {
        component: StackNavigator,
        stackDirection: 'horizontal',
    },
    profileRoot: {
        component: TabNavigator,
    },
    profile: {
        component: ProfileScreen,
        hideLeftComponent: true,
        tabIcon: 'user',
        hideNavBar: true,
    },
    home: {
        component: Home,
    }
})
```

Supply an _initial state_ to the Scene Navigator, containing whatever scenes you'd like to show on launch.

```
const initialScenes = immutable.fromJS({
    index: 0,
    key: 'modalStack',
    routes: [
        {
            index: 0,
            key: 'rootStack',
            routes: [{key: 'home'}],
        },
    ],
})
```

Place the SceneNavigator component inside your `<App>` declaration, importing the initial state and route map from before:

```
import {SceneNavigation} from 'rnf-react'
import routeMap from './routeMap'
import initialScenes from './initialScenes'

const {SceneNavigator} = SceneNavigation

<App
    store={store}
    theme={theme}
>
    <SceneNavigator
        initialScenes={initialScenes}
        routeMap={routeMap}
    />
</App>
```

### Controlling SceneNavigator in the project

You can import a number of actions to influence the stack.

```
import {SceneNavigation} from 'rnf-react'

const {eventHandlers} = SceneNavigation
const {
    pushScene,
    popScene,
    popToRootScene,
    replaceScene,
    switchToScene,
    toggleMenuScene,
} = eventHandlers

dispatch(popScene())
dispatch(pushScene({route: 'middlePage', pushInto: 'rootStack'}))
```

You must specify what navigation view to push into when pushing a scene. Scenes will receive a prop called `stackRootKey` which is the key of their parent view, so you can simply type `pushInto: stackRootKey` to push the scene into the same stack.

### Customising the SceneNavigator

The route map is able to take in a number of style props to control the appearance of elements on the page...

```
export default immutable.fromJS({
    somePage: {
        backButtonIcon: <React component>
        styles: {
            headerTextStyle: <Style object>
            headerStyle: <Style object>
            tabBarButtonInactiveColour: <Colour string>
            tabBarButtonActiveColour: <Colour string>
            tabBarButtonStyle: <Style object>
            tabBarStyle: <Style object>
            backButtonColour: <Colour string>
        }
    },
})
```

The `backButtonIcon` allows you to supply your own back button instead of using the inbuilt one. The props within `styles` let you control various style elements of the navigators, the purpose of which are fairly obvious by their naming.
