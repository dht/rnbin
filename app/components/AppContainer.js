import { connect } from 'react-redux'
import App from './App'
import flexEditor from 'flex-editor';

const mapStateToProps = (state, ownProps) => {

	const {appState} = state,
		{readonly} = appState;

	return {
		readonly,
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
		}
	}
}

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App)

export default AppContainer
