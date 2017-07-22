import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/AppContainer'
import {guid8} from './utils/guid';
import duplicate from './utils/duplicate';

import {loadAdHock, loadFromExistingSnippet, login, logout} from './reducers/app_thunks';

injectTapEventPlugin();

let rootElement;

const onEnter = (location) => {
    document.location.hash = guid8();
}

const onAdHock = (location) => {
    const {params} = location;
    const {id} = params;

    store.dispatch(login(id))
        .then(() => {
            const from_id = duplicate.getDuplicationRequest(id);

            store.dispatch(!from_id ? loadAdHock(id) : loadFromExistingSnippet(from_id, id));
        });
}

const history = syncHistoryWithStore(hashHistory, store);

const renderStore = () => {
    rootElement = document.getElementById('root')

    render(
        <MuiThemeProvider>
            <Provider store={store}>
                <Router history={ history }
                        routes={[
                            {path: '/', onEnter: onEnter},
                            {path: '/:id', component: App, onEnter: onAdHock},
                            {path: '/:id/:width/:height', component: App, onEnter: onAdHock},
                        ]}/>
            </Provider>
        </MuiThemeProvider>
        , rootElement
    );
}

renderStore();
