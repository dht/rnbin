import {getImageSize, getImageName, uploadImageByUrl, resolutionFromImageDimensions} from '../utils/image';
import {saveOverlay, setProjectElementFocus} from '../reducers/appState/appState_actions';

const acceptActions = ['FLEX_SET_LAST_IMAGE_DROP'];
const ignoreActions = [];

const imageDrop = store => next => action => {

    let result = next(action);

    if (action.type &&
        acceptActions.indexOf(action.type) >= 0 &&
        ignoreActions.indexOf(action.type) == -1) {

        const state = store.getState(),
            {appState} = state,
            {resolution} = appState,
            {value} = action,
            {isCanvas, target, files} = value,
            page_id = getPageId(target);


        if (isCanvas) {
            makeNewPages(store, files);
            return;
        } else if (page_id) {
            return;
        }
    }

    return result
}

const getPageId = (target = '') => {
    const parts = target.split('-');

    if (parts.length == 2 && parts[0] == 'page' && !isNaN(Number(parts[1]))) {
        return Number(parts[1]);
    }

    return 0;
}

const makeNewPages = (store, files) => {
    files.forEach(file => {
        const title = getImageName(file.name);
        let pageInfo = {};

        getImageSize(file.preview)
            .then(response => {
                pageInfo.imageSize = response;
                pageInfo.resolution = resolutionFromImageDimensions(response);
                return store.dispatch(newTempPage(title, pageInfo.resolution));
            })
            .then(id => {
                store.dispatch(setProjectElementFocus(`#page-${id}`));
                pageInfo.id = id;
                return uploadImageByUrl(file.preview);
            })
            .then(response => {
                const width = pageInfo.imageSize.width,
                    height = pageInfo.imageSize.height;

                const overlay = {isUploading: false, url: response.url, width, height};
                store.dispatch(setProjectElementFocus(`#page-${pageInfo.id}`));
            });
    })
}


export default imageDrop;
