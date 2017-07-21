import flexEditor from 'flex-editor';
const ActionTypes = flexEditor.ActionTypesElements;
const ActionTypes_appState = flexEditor.ActionTypesAppState;

const ignoreActions = [...Object.values(ActionTypes), ActionTypes_appState.SHOW_ATTRIBUTE_POPOVER];
const acceptActions = [ActionTypes.SET_ELEMENTS];


const readonly = store => next => action => {

    const {appState} = store.getState(),
        {readonly} = appState;

    // cancel action
    if (readonly &&
        ignoreActions.indexOf(action.type) >= 0 &&
        acceptActions.indexOf(action.type) < 0) {
        return;
    }

    return next(action);
}

export default readonly;
