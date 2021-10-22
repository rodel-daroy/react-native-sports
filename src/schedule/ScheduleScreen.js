/* @flow */

import {createComponent} from '../RNFReact'
import {scheduleListScreenEventHandlers as mapDispatchToProps} from './eventHandlers'
import {scheduleListScreenSelector as mapStateToProps} from './selectors'
import ScheduleList from './ScheduleList'

export default createComponent({
    displayName: 'MySchedule',
    mapStateToProps,
    mapDispatchToProps,
}, ScheduleList)
