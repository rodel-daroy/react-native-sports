/* @flow */

import ClassList from './ClassList'
import {createComponent} from '../RNFReact'
import {classListScreenEventHandlers as mapDispatchToProps} from './eventHandlers'
import {classListScreenSelector as mapStateToProps} from './selectors'

export default createComponent({
    displayName: 'ClassScreen',
    mapStateToProps,
    mapDispatchToProps,
}, ClassList)
