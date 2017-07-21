import {ActionTypes} from './appState';

const setIsAdHoc = (value) => {

    return {
        type: ActionTypes.SET_IS_ADHOC,
        value,
    }
}

const setIsLoaded = (value) => {

    return {
        type: ActionTypes.SET_IS_LOADED_SNIPPET,
        value,
    }
}

const setUserId = (value) => {

    return {
        type: ActionTypes.SET_USER_ID,
        value,
    }
}

const setReadOnly = (value) => {

    return {
        type: ActionTypes.SET_READONLY,
        value,
    }
}
const setSnippetId = (value) => {

    return {
        type: ActionTypes.SET_SNIPPET_ID,
        value,
    }
}

//@formatter:off
/*
 _____ _  _ _   _ _  _ _  _____
 |_   _| || | | | | \| | |/ / __|
 | | | __ | |_| | .` | ' <\__ \
 |_| |_||_|\___/|_|\_|_|\_\___/

 */
//@formatter:on


export default {
    setIsAdHoc,
    setUserId,
    setIsLoaded,
    setReadOnly,
    setSnippetId
}