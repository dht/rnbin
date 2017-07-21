const ELEMENT_INITIAL = 'A';

export const compare = (jsonAfter, jsonBefore, ignoreValues = []) => {
	let output = {
		removedProperties: {},
		changedProperties: {},
		addedProperties: {},
	}

	Object.keys(jsonBefore).forEach(key => {


		if (ignoreValues.indexOf(key) < 0) {

			if (!jsonAfter.hasOwnProperty(key)) {
				output.removedProperties[key] = true;
			}
		}
	})

	Object.keys(jsonAfter).forEach(key => {

		if (ignoreValues.indexOf(key) < 0) {

			if (!jsonBefore.hasOwnProperty(key)) {

				output.addedProperties[key] = jsonAfter[key];

			} else if (jsonBefore[key] != jsonAfter[key]) {

				output.changedProperties[key] = jsonAfter[key];

			}
		}
	})

	return output;
}

export const diffToInstructions = (path, diff, ignoreChanged) => {
	let instructions = [],
		newPath,
		value;

	Object.keys(diff.removedProperties).forEach(key => {
		newPath = ELEMENT_INITIAL + path + key;
		instructions.push({path: newPath, verb:'REMOVE'});
	});

	Object.keys(diff.addedProperties).forEach(key => {
		newPath = ELEMENT_INITIAL + path + key;
		value = diff.addedProperties[key];
		instructions.push({path: newPath, verb:'SET_VALUE', value });
	});

	if (!ignoreChanged) {
		Object.keys(diff.changedProperties).forEach(key => {
			newPath = ELEMENT_INITIAL + path + key;
			value = diff.changedProperties[key];
			instructions.push({path: newPath, verb: 'SET_VALUE', value});
		});
	}

	return instructions;
}


export const compareElement = (elementId, elementAfter, elementBefore) => {
	const path = elementId + '/';
	let diff = compare(elementAfter, elementBefore, ['style', 'data']);
	let diffStyle = compare(elementAfter.style || {}, elementBefore.style || {});
	let diffData = compare(elementAfter.data || {}, elementBefore.data || {});

	return [
		...diffToInstructions(path, diff),
		...diffToInstructions(path + 'style/', diffStyle),
		...diffToInstructions(path + 'data/', diffData)
		];
}




export const compareElements = (jsonAfter, jsonBefore) => {
	let diff = compare(jsonAfter, jsonBefore);
	let changes = [
		...diffToInstructions('', diff, true)
	];

	Object.keys(diff.changedProperties).forEach(key => {
		const elementBefore = jsonBefore[key];
		const elementAfter = jsonAfter[key];
		changes = changes.concat(compareElement(key, elementAfter, elementBefore));
	})

	return changes;
}

export const getInstructions = (state, action) => {
	const { elements } = state;
	const { present, past } = elements;

	if (!past || past.length == 0) {
		return null;
	}

	const before = past[past.length - 1];

	// console.log('action, present, before, instructions -> ', action, present, before, compareElements(present, before));

	return compareElements(present, before);
}