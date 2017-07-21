// import { mainApp, getRef, listen } from '../constants/firebase_debug';
import {mainApp, getRef, listen} from '../constants/firebase';

import EmptyState from '../constants/EmptyState';

const FIREBASE_BASE_PATH = "https://console.firebase.google.com/project/jupiter-b2f67/database/data/";

// Create a storage reference from our storage service

let snippetsAdhocRef,
    snippetsRef,
    snippetRef,
    typographyAllRef,
    typographyRef,
    versionRef,
    versionsInfoRef,
    latestRef,
    stateRef,
    overlaysRef,
    customCssRef;		// All permissions

let firebaseDashboardUrl;

export const configureFirebase = () => {
    snippetsRef = mainApp.database().ref("snippets");
    snippetsAdhocRef = mainApp.database().ref("bins");
    typographyAllRef = mainApp.database().ref("typography");
}

export const clearSnippet = (path) => {
    const _snippetRef = _getSnippetRef(path);
    _snippetRef.child('workingCopy').set(EmptyState);
}

export const clearSnippetIfEmpty = (path) => {
    fetchSnippet(path)
        .then(snippet => {

            if (!snippet) {
                clearSnippet(path);
            }
        })
}

export const configureSnippet_adhoc = (id) => {

    snippetRef = snippetsAdhocRef.child(id);
    overlaysRef = snippetRef.child('overlays');
    customCssRef = snippetRef.child('customCss');
    stateRef = snippetRef.child('workingCopy');
    versionsInfoRef = snippetRef.child('versionsInfo');

    firebaseDashboardUrl = FIREBASE_BASE_PATH + 'adhoc/' + id;
}

export const clearScreen = () => {
    stateRef.remove();
}

export const listenToState_adhock = (id, callback) => {
    const _stateRef = snippetsAdhocRef.child(id).child('workingCopy');

    return listen(_stateRef, callback);
}

export const listenToState = (path, callback) => {
    const _snippetRef = _getSnippetRef(path);
    const _stateRef = _snippetRef.child('workingCopy');

    return listen(_stateRef, callback);
}

export const listenToState_typography = (path, callback) => {
    const _stateRef = typographyRef.child('state');

    return listen(_stateRef, callback);
}

export const copyFromSnippet = (path) => {
    const savePath = snippetRef;

    configureSnippet(path);

    return getRef(snippetRef)
        .then(value => {

            // delete versions
            delete value['versions'];

            savePath.set(value);
            document.location.reload(true);
        })
}

export const executeInstructions = (instructions) => {

    if (!instructions) {
        return;
    }

    instructions.reduce((output, instruction) => {

        const ref = stateRef.child(instruction.path);

        const NAN = (typeof instruction.value === 'number') && isNaN(instruction.value);

        if (NAN || instruction.value === null || typeof instruction.value === 'undefined') {
            instruction.verb = 'REMOVE';
        }

        switch (instruction.verb) {
            case 'REMOVE':
                ref.remove();
                break;
            case 'SET_VALUE':
                ref.set(instruction.value);
                break;
        }

    }, {});
};

export const saveOverlay = (resolution, overlay) => {
    overlaysRef
        .child(`r${resolution}`)
        .set(overlay);
}

export const saveHeightForSnippet = (path, height, resolution) => {
    const r_key = `data/vars/r${resolution}/height`;

    height *= 2;

    const _snippetRef = _getSnippetRef(path);
    const _stateRef = _snippetRef.child('workingCopy');
    const _element = _stateRef.child('A1');
    const style_height = _element.child('style').child('height');
    const r_height = _element.child(r_key);

    style_height.set(height);
    r_height.set(height);
}

export const fetchState = () => {

    return getRef(stateRef);
}

export const fetchStateByPath = (path) => {
    const _snippetRef = _getSnippetRef(path),
        _stateRef = _snippetRef.child('workingCopy');

    return getRef(_stateRef);
}

export const fetchOverlays = () => {

    return getRef(overlaysRef);
}

export const fetchOverlaysByPath = (path) => {

    const _snippetRef = _getSnippetRef(path),
        _overlaysRef = _snippetRef.child('overlays');

    return getRef(_overlaysRef);
}


export const fetchSnippetAdhoc = (id) => {
    const ref = snippetsAdhocRef.child(id);
    return getRef(ref.child('workingCopy'));
}

export const fetchSnippet = (path) => {
    configureSnippet(path);
    return getRef(latestRef);
}

export const fetchVersion = () => {

    return getRef(versionRef.child('state'));

}

export const fetchVersionsInfo = () => {

    return getRef(versionsInfoRef);

}

export const publishVersion = (version, state, whatsNew) => {

    const versionInfoRef = versionsInfoRef
        .child(`v${version}`);

    versionInfoRef.set({
        id: version,
        whatsNew: whatsNew,
    });

    latestRef.set(state);

    versionRef.set({
        id: version,
        state: state,
        whatsNew: whatsNew
    });
}

export const getDashboardUrl = () => {
    return firebaseDashboardUrl;
}


export const resetState = (state) => {
    stateRef.set(state);
}

configureFirebase();
