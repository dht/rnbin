import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import appState from './appState/appState'
import flexState from 'flex-editor/reducers'

import modal from './modal/modal'

const reduxApp = combineReducers({
    appState,
    flexState,
    modal,
    routing: routerReducer,
})

export default reduxApp




