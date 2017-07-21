import { connect } from 'react-redux'
import * as appStateActions  from '../../reducers/appState/appState_actions';
import flexEditor from 'flex-editor';
import {showModal, closeModal, modalTypes} from '../../reducers/modal/modal_actions'
import {clearScreen, duplicateSnippet} from '../../reducers/app_thunks';

import AdhocBar from 'flex-editor/AdhocBar'

const mapStateToProps = (state) => {
    const {appState} = state,
        {isAdhoc, readonly} = appState;

    return {
        isAdhoc,
        readonly
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clear:() => {
            dispatch(showModal(modalTypes.CONFIRMATION_MODAL, {
                ok: () => {
                    dispatch(clearScreen());
                    dispatch(closeModal());
                }
            }));
        },
        duplicate:() => {
            dispatch(duplicateSnippet());
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdhocBar)
