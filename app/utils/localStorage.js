const SETTINGS_KEY = 'SETTINGS_';

export const removeKey = (key) => {
    return localStorage.removeItem(key);
}
    export const getKey = (key) => {
    return localStorage.getItem(key);
}

export const setKey = (key, value) => {
    return localStorage.setItem(key, value);
}

export const getJSON = (key) => {
    return JSON.parse(getKey(key));
}

export const setJSON = (key, value) => {
    return setKey(key, JSON.stringify(value));
}
