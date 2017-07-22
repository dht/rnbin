import { connect } from 'react-redux'
import App from './App'
import flexEditor from 'flex-editor';
import {showDataFieldModal, showInsertSnippetModal} from '../reducers/app_thunks';

const mapStateToProps = (state, ownProps) => {

	const {flexState} = state,
		{appState} = flexState,
		{dataFieldModalOn, showPlaceholderPopover} = appState,
		{readonly} = state.appState;

	return {
		readonly,
        dataFieldModalOn,
		showPlaceholderPopover,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		flashSelection: (delay) => {
            dispatch(flexEditor.showSelection(false));
            dispatch(flexEditor.refreshSelector(delay));

            setTimeout(() => {
                dispatch(flexEditor.showSelection(true));
			}, delay + 150);
		},
        showDataFieldModal: () => {
			dispatch(showDataFieldModal());
		},
        showInsertSnippetModal: () => {
			dispatch(showInsertSnippetModal());
		},
	}
}

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

export default AppContainer
