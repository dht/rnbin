import {ActionTypes} from './modal';
import {loadPath} from '../app_thunks';

export const modalTypes = {
    IMAGER_MODAL: 'IMAGER_MODAL',
    DATA_MODAL: 'DATA_MODAL',
    CONFIRMATION_MODAL: 'CONFIRMATION_MODAL',
    INSERT_SNIPPET: 'INSERT_SNIPPET',
}

export const showModal = (modalType, props) => {
	return {
		type: ActionTypes.SHOW_MODAL,
		modalType,
		modalProps: props
	}
}
export const closeModal = () => {
	return {
		type: ActionTypes.CLOSE_MODAL,
	}
}

