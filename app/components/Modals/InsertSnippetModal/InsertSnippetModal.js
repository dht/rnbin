import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

class InsertSnippet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.insertSnippet = this.insertSnippet.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.newSnippet = this.newSnippet.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.focus();
        }, 10);
    }

    focus() {
        this._inputName.focus();
        this._inputName.select();
    }

    onKeyDown(ev) {
        if (ev.which === 13) {
            this.insertSnippet();
        }
    }

    insertSnippet() {
        const {selectedElement} = this.props;
        const {snippetId} = this.state;

        this.props.insertSnippet(selectedElement.id, snippetId);
    }

    newSnippet() {
        const guid = this.props.newSnippet();
        this.setState({snippetId: guid});
    }

    render() {

        const actions = [
            <FlatButton
                label="New Snippet"
                secondary={true}
                onTouchTap={this.newSnippet}
            />
            ,
            <FlatButton
                label="Cancel"
                keyboardFocused={true}
                onTouchTap={this.props.handleClose}
            />,
            <FlatButton
                label="Insert"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.insertSnippet}
            />,
        ];


        return (
            <Dialog
                contentStyle={ styles.dialog }
                title="Insert Snippet"
                actions={actions}
                modal={false}
                open={ true }
                onRequestClose={this.props.handleClose}
            >
                <div>
                    <TextField
                        ref={(c) => this._inputName = c}
                        floatingLabelText="Snippet's id"
                        value={this.state.snippetId}
                        onKeyDown={this.onKeyDown}
                        onChange={(event, value) => this.setState({snippetId: value})}
                    />
                </div>
            </Dialog>
        )
    }
}

const styles = {
    dialog: {
        width: '360px',
        margin: 'auto',
        alignSelf: 'center',
    }
};

export default InsertSnippet
