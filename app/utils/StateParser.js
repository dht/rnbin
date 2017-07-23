import { mapPairs as map } from './map'
import equal from 'deep-equal'

const STATUS = {
	DELETED: 'DELETED',
	CHANGED: 'CHANGED',
	NEW: 'NEW',
}

export const remoteStateIds = (remoteState) => {
	return Object.keys(remoteState)
		.reduce((output, key) => { output.push(remoteState[key].id); return output;}, []);
}

export const filterOnlyChangedItems = (remoteState, localState) => {

	return Object.keys(remoteState).reduce((output, key) => {
		const remoteItem = remoteState[key],
			itemId = remoteItem.id,
			localItem = localState[itemId];

		if (!localItem) {
			output[key] = {
				status: STATUS.DELETED
			};
		} else if (!equal(localItem, remoteItem)) {
			output[key] = {
				status: STATUS.CHANGED,
				to: localItem
			}
		}

		return output;
	}, {});
}


	export const findNewItems = (remoteState, localState) => {

	const _remoteStateIds = remoteStateIds(remoteState);

	return Object.keys(localState).reduce((output, key) => {
		const remoteItemExists = _remoteStateIds[key];

		if (!remoteItemExists) {
			output[key] = localState[key];
		}

		return output;
	}, {});
}

export const compare = (remoteState, localState) => {

	const changedItems = filterOnlyChangedItems(remoteState, localState),
		newItems = findNewItems(remoteState, localState);

	return {
		changedItems,
		newItems,
	}
}

export const firebaseStateToState = (firebaseState) => {

	return Object.keys(firebaseState).reduce((output, key) => {
		let element = firebaseState[key];
		output[element.id] = element;
		element.data = element.data || {};
		return output;
	}, {});
}

export const stateToFirebaseState = (state) => {

	return Object.keys(state).reduce((output, key) => {
		let element = state[key];
		output['A' + element.id] = element;
		return output;
	}, {});
}

export const firebaseObjectToObject = (objects) => {

    return Object.keys(objects).reduce((output, key) => {
        let object = objects[key];
        output[object.id] = object;
        return output;
    }, {});
}

export const objectToFirebaseObject = (objects, initial) => {

    return Object.keys(objects).reduce((output, key) => {
        let object = objects[key];
        output[initial + object.id] = object;
        return output;
    }, {});
}


export const firebaseSnippetsToSnippets = (objects) => {

    return Object.keys(objects).reduce((output, key) => {
        let object = objects[key];
        output[object.id] = object;
        output[object.id].variables = firebaseObjectToObject(output[object.id].variables || {});
        return output;
    }, {});
}


export const firebasePagesToPages = (firebasePages) => {

    return Object.keys(firebasePages).reduce((output, key) => {
        let page = firebasePages[key];
        output[page.id] = page;
        page.snippets = firebaseSnippetsToSnippets(page.snippets || {});
        return output;
    }, {});
}


export const listToOptionsArray = (items, valueField) => {

    return Object.keys(items).map(key => {
        let output = {};
    	let item = items[key];
    	output['title'] = item.name;
        output[valueField || 'value'] = item.value;
        return output;
    }, {});
}


export const variablesArrayToObject = (variables) => {

    return variables.reduce((output, item) => {
        output[item.id] = item;
        return output;
    }, {});
}

export const mergeVariablesIntoState = (state, variables = {}) => {

    return Object.keys(state || {}).reduce((output, id) => {
        const element = state[id],
			variable_data = variables[element.id];

        output[element.id] = element;
        element.data = {...element.data, ...variable_data};
        return output;
    }, {});
}


