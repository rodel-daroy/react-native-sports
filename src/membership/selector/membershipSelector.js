/* @flow */

import {createStructuredSelector} from 'reselect'

export const userDetailsSelector = (state) => state.getIn(['user', 'userDetails'])

export const mapStateToProps = createStructuredSelector({
    userDetails: userDetailsSelector,
})
