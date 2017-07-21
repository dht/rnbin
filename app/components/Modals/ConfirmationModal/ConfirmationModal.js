import React, { PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class ConfirmationModal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.props.handleClose}
			/>,
			<FlatButton
				label="Yes"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.props.ok}
			/>,
		];

		return (
			<Dialog
				contentStyle={ styles.dialog }
				title="Reset snippet"
				actions={actions}
				modal={false}
				open={ true }
				onRequestClose={this.props.handleClose}
			>

				<div>
					Are you sure you want to reset this snippet?
				</div>

			</Dialog>
		)
	}
}

const styles = {
	dialog: {
		width: '360px',
		margin: 'auto',
		textAlign: 'center',
		alignSelf: 'center',
	}
};

export default ConfirmationModal
