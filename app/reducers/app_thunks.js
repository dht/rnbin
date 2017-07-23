import flexEditor from 'flex-editor';
import * as api from '../utils/elements_api';
import appStateActions  from './appState/appState_actions';
import api_login from '../utils/login_api';
import {guid8} from '../utils/guid';
import {currentLocationWithHash} from '../utils/utils';
import duplicate from '../utils/duplicate';

import {
    firebaseStateToState,
    stateToFirebaseState,
    firebasePagesToPages,
    firebaseObjectToObject,
    objectToFirebaseObject
} from '../utils/StateParser';

import {showModal, closeModal, modalTypes} from '../reducers/modal/modal_actions'

const getItem = (elements, selectedElement) => {
    return selectedElement.id ? elements.present[selectedElement.id] : null;
}

export const loadFromExistingSnippet = (from_id, id) => {
    return (dispatch) => {

        api.configureSnippet_adhoc(from_id);

        api.fetchState().then(state => {
            api.configureSnippet_adhoc(id);
            api.resetState(state);
            dispatch(loadAdHock(id));
        })
    }
}

export const loadAdHock = (id) => {
    return (dispatch, getState) => {

        dispatch(appStateActions.setSnippetId(id));
        dispatch(appStateActions.setIsAdHoc(true));
        dispatch(flexEditor.showSelection(false));

        api.configureSnippet_adhoc(id);

        api.fetchState().then(state => {
            if (state) {
                state = firebaseStateToState(state);
                dispatch(flexEditor.setElements(state));
            } else {
                dispatch(flexEditor.resetScreen())
                    .then(() => {
                    })
            }

            dispatch(flexEditor.showSelection(true));
            dispatch(flexEditor.refreshSelector(50));


        });
    }
}

export const duplicateSnippet = () => {

    return (dispatch, getState) => {

        const {appState} = getState(),
            {snippet_id} = appState,
            new_id = guid8();

        duplicate.setDuplicationRequest(snippet_id, new_id);
        window.open(currentLocationWithHash(new_id), '_blank');
    }
}

export const publishVersion = (whatsNew) => {
    return (dispatch, getState) => {

        const {appState, flexState} = getState();
        const {elements} = flexState;
        const version = nextVersion(appState.versionsInfo);
        const state = stateToFirebaseState(elements.present);

        api.configureVersion(version);

        api.publishVersion(version, state, whatsNew);

        dispatch(appStateActions.addVersionInfo(`v${version}`, {
            id: version,
            whatsNew: whatsNew
        }));
    }
}

export const showDataFieldModal = () => {
    return (dispatch, getState) => {

        const {flexState} = getState();
        const selectedElement = getItem(flexState.elements, flexState.elementSelection);
        const {data} = selectedElement || {};

        dispatch(showModal(modalTypes.DATA_MODAL, {
            selectedElement,
            data,
            handleClose: () => {
                dispatch(closeModal());
                dispatch(flexEditor.clearFieldModal());
            },
            deleteVar: () => {
                dispatch(closeModal());
                dispatch(flexEditor.clearFieldModal());
                dispatch(flexEditor.setDataField("", ""));
            },
            saveVar: (element_id, content, varName, varType) => {
                dispatch(closeModal());
                dispatch(flexEditor.clearFieldModal());
                dispatch(flexEditor.applyData(element_id, {content}));
                dispatch(flexEditor.setDataField(varName, varType));
            }
        }));
    }
}

export const showInsertSnippetModal = () => {
    return (dispatch, getState) => {

        const {flexState} = getState();
        const {elementSelection} = flexState;
        const {rect} = elementSelection;

        const selectedElement = getItem(flexState.elements, flexState.elementSelection);

        dispatch(showModal(modalTypes.INSERT_SNIPPET, {
            selectedElement,
            handleClose: () => {
                dispatch(closeModal());
                dispatch(flexEditor.clearFieldModal());
            },
            insertSnippet: (elementId, snippetId) => {
                dispatch(closeModal());
                dispatch(flexEditor.clearFieldModal());
                dispatch(flexEditor.addSnippet({snippetId}));
            },
            newSnippet: () => {
                const guid = guid8(),
                    width = Math.floor(rect.width),
                    height = Math.floor(rect.height);

                window.open(`/#/${guid}/${width}/${height}`, '_blank');
                return guid;
            }
        }));
    }
}

export const clearScreen = () => {
    return (dispatch, getState) => {

        const {appState} = getState(),
            {readonly} = appState;

        if (readonly) {
            window.open('/#', '_blank');
            return;
        }

        api.clearScreen();
        dispatch(flexEditor.resetScreen());
        dispatch(flexEditor.refreshSelector(100));
    }
}

export const importSnippet = (path) => {
    return (dispatch, getState) => {

        const pathOk = validatePath(path);

        if (!pathOk.ok) {
            alert(pathOk.reason);
            return;
        }

        api.copyFromSnippet(path);
    }
}

const blankOverlay = {
    show: true,
    url: '',
    width: -1,
    height: -1,
    top: 0,
    left: 0,
    opacity: 0.3
};

export const clearOverlays = () => {
    return (dispatch, getState) => {

        dispatch(flexEditor.configOverlay(blankOverlay));
        dispatch(appStateActions.setOverlay(1, blankOverlay));
        dispatch(appStateActions.setOverlay(2, blankOverlay));
        dispatch(appStateActions.setOverlay(3, blankOverlay));
        dispatch(appStateActions.setOverlay(4, blankOverlay));

    }
}

export const editVariables = (page, snippet) => {
    return (dispatch, getState) => {

        const {id} = snippet;

        dispatch(showModal(modalTypes.VARIABLES_MODAL, {
            page,
            snippet,
            showImager: () => {
                dispatch(appStateActions.showImager())
            },
            handleClose: () => {
                dispatch(closeModal());
            },
            saveVariables: (variables) => {
                dispatch(closeModal());
                dispatch(projectActions.setSnippetContent(page.id, id, variables));
            }
        }));

    }
}


export const login = (snippetId) => {

    return (dispatch) => {

        return api_login.login()
            .then(uid => {
                api_login.setUser(uid);
                dispatch(appStateActions.setUserId(snippetId));
                return api_login.setPermissions(snippetId, uid)
            })
            .then(() => {
                // permissions granted
                api_login.addToUserLibrary(snippetId);
                dispatch(appStateActions.setReadOnly(false));
            })
            .catch(err => {
                // no permission
                if (err.code === 'PERMISSION_DENIED') {
                    api_login.checkPermissions(snippetId)
                        .then(granted => {
                            dispatch(appStateActions.setReadOnly(!granted));
                        })
                }
            })
    }
}

export const logout = () => {

    return (dispatch, getState) => {
        api_login.logout()
            .then(() => {
                dispatch(appStateActions.setUserId(''));
            })
    }
}

