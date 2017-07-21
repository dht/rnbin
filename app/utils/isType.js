import {typeCheck} from 'type-check';

export const isNumber = (val) => {
    return typeCheck('Number', val);
}

export const isString= (val) => {
    return typeCheck('String', val);
}

export const isBoolean= (val) => {
    return typeCheck('Boolean', val);
}

export const isObject= (val) => {
    return typeCheck('Object', val);
}

export const isArray= (val) => {
    return typeCheck('[*]', val);
}

export const whatType= (val) => {
    if (isNumber(val)) {
        return 'number';
    } else if (isString(val)) {
        return 'string';
    } else if (isBoolean(val)) {
        return 'boolean';
    }else if (isObject(val)) {
        return 'object';
    } else if (isArray(val)) {
        return 'array';
    } else {
        return null;
    }
}

