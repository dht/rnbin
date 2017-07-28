const EDITOR_MODES = {
    mobile: 'mobile',
    dashboard: 'dashboard',
    responsive: 'responsive',
};

const CODE_MODES = {
    react_native: 'react_native',
    react: 'react',
    HTML: 'HTML',
};

const GRID_MODES = {
    none: 'none',
    bootstrap3: 'bootstrap3',
    foundation: 'foundation',
    flex: 'flex',
}

const initialState = {
    isAdhoc: true,
    isLoadedSnippet: false,
    user_id: '',
    readonly: true,
    snippet_id: '',
    editorMode: EDITOR_MODES.mobile,
    codeMode: CODE_MODES.react,
    gridMode: GRID_MODES.none,
};

export const ActionTypes = {
    SET_IS_LOADED_SNIPPET: 'SET_IS_LOADED_SNIPPET',
    SET_IS_ADHOC: 'SET_IS_ADHOC',
    SET_USER_ID: 'SET_USER_ID',
    SET_READONLY: 'SET_READONLY',
    SET_SNIPPET_ID: 'SET_SNIPPET_ID',
}

export const appState = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.SET_IS_ADHOC:
            return {
                ...state,
                isAdhoc: action.value
            }
        case ActionTypes.SET_IS_LOADED_SNIPPET:
            return {
                ...state,
                isLoadedSnippet: action.value
            }

        case ActionTypes.SET_USER_ID:
            return {
                ...state,
                user_id: action.value
            }

        case ActionTypes.SET_READONLY:
            return {
                ...state,
                readonly: action.value
            }

        case ActionTypes.SET_SNIPPET_ID:
            return {
                ...state,
                snippet_id: action.value
            }

        default:
            return state
    }
}

export default appState;
