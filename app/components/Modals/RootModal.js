import React from 'react'
import {modalTypes} from '../../reducers/modal/modal_actions';

import ImagerModal from './ImagerModal/ImagerModal'
import DataModal from './DataModal/DataModal'
import InsertSnippetModal from './InsertSnippetModal/InsertSnippetModal'
import ConfirmationModal from './ConfirmationModal/ConfirmationModal'
import VariableModal from './VariableModal/VariableModal'

const MODAL_COMPONENTS = (modalType) => {

    switch (modalType) {

        case modalTypes.IMAGER_MODAL:
            return ImagerModal;

        case modalTypes.DATA_MODAL:
            return DataModal;

        case modalTypes.CONFIRMATION_MODAL:
            return ConfirmationModal;

        case modalTypes.INSERT_SNIPPET:
            return InsertSnippetModal;

        case modalTypes.VARIABLES_MODAL:
            return VariableModal;
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

