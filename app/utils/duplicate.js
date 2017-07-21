const REQUEST_KEY = 'duplication_request';

import {getKey, setKey, removeKey} from './localStorage';

const setDuplicationRequest = (id, new_id) => {

    setKey(`${REQUEST_KEY}_${new_id}`, id);
}

const getDuplicationRequest = (id) => {

    const key = `${REQUEST_KEY}_${id}`;
    const from_id= getKey(key);
    removeKey(key);
    // console.log('from_id -> ', from_id);
    return from_id;
}

export default {
    getDuplicationRequest,
    setDuplicationRequest
}