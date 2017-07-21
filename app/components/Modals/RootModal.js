import React from 'react'
import {connect} from 'react-redux'
import {modalTypes} from '../../reducers/modal/modal_actions';

import ImagerModal from './ImagerModal/ImagerModal'
import DataModal from './DataModal/DataModal'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'

const MODAL_COMPONENTS = (modalType) => {

    switch (modalType) {

        case modalTypes.IMAGER_MODAL:
            return ImagerModal;

        case modalTypes.DATA_MODAL:
            return DataModal;

        case modalTypes.CONFIRMATION_MODAL:
            return ConfirmationModal;
    }
}

export default class ModalRoot extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {modal} = this.props;
        const {modalType, modalProps} = modal;

        if (!modalType) {
            return null;
        }

        const SpecificModal = MODAL_COMPONENTS(modalType);

        return (
            <SpecificModal {...modalProps} handleClose={ () => this.props.handleClose(modalProps) }/>
        );
    }
}

