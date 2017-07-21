import flexEditor from 'flex-editor';
import { getInstructions } from '../utils/IO/compareStates';
import { executeInstructions } from '../utils/elements_api';

const ActionTypes = flexEditor.ActionTypesElements;

const acceptActions = [...Object.values(ActionTypes), '@@redux-undo/UNDO', '@@redux-undo/REDO'];
const ignoreActions = [ActionTypes.SET_ELEMENTS];

const isTypography = (state) => {
    const appState = state.appState || {};

    return appState.isTypography;
}

const autosave = store => next => action => {

	let result = next(action),
        isTypographyMode = isTypography(store.getState());

	if (action.type && !isTypographyMode &&
		acceptActions.indexOf(action.type) >= 0 &&
		ignoreActions.indexOf(action.type) === -1) {

        const state = store.getState().flexState;

        const instructions = getInstructions(state, action);

		// console.log('instructions ->', instructions);

		executeInstructions(instructions);
	}

	return result
}

export default autosave;
