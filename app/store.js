import {createStore, applyMiddleware, compose} from 'redux'
import ReduxThunk from 'redux-thunk'
import autosave from './middleware/autosave'
import imageDrop from './middleware/imageDrop'
import readonly from './middleware/readonly'

import rnbinApp from './reducers';

export default createStore(rnbinApp, compose(applyMiddleware(ReduxThunk, readonly, autosave, imageDrop),
    window.devToolsExtension ? window.devToolsExtension() : f => f)); // logger , firebase, recorder ,autosave

