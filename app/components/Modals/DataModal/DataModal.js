import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

class DataModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHTMLEditor: false,
            content: props.data.content,
            varName: props.data.dataField || '',
            varType: props.data.dataFieldType || 'TEXT'
        };

        this.renderHTMLEditor = this.renderHTMLEditor.bind(this);
        this.saveHTML = this.saveHTML.bind(this);
        this.saveVar = this.saveVar.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
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

    saveHTML(html) {
        this.setState({content: html})
    }

    renderHTMLEditor() {
        const {showHTMLEditor} = this.state;

        if (!showHTMLEditor) {
            return;
        }

        return null;
    }

    onKeyDown(ev) {
        if (ev.which === 13) {
            this.saveVar();
        }
    }

    saveVar() {
        const {selectedElement} = this.props;
        const {content, varName, varType} = this.state;

        this.props.saveVar(selectedElement.id, content, varName, varType);
    }

    render() {

        const actions = [
            <FlatButton
                label="Delete variable"
                secondary={true}
                onTouchTap={this.props.deleteVar}
            />
            ,
            <FlatButton
                label="Cancel"
                keyboardFocused={true}
                onTouchTap={this.props.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.saveVar}
            />,
        ];


        return (
            <Dialog
                contentStyle={ styles.dialog }
                title="Set Variable"
                actions={actions}
                modal={false}
                open={ true }
                onRequestClose={this.props.handleClose}
            >
                <div>
                    <TextField
                        ref={(c) => this._inputName = c}
                        floatingLabelText="Variable's name"
                        value={this.state.varName}
                        onKeyDown={this.onKeyDown}
                        onChange={(event, value) => this.setState({varName: value})}
                    />
                    <SelectField
                        floatingLabelText="Type"
                        value={this.state.varType}
                        onChange={(event, index, value) => this.setState({varType: value})}
                    >
                        <MenuItem value={'TEXT'} primaryText="String"/>
                        <MenuItem value={'IMAGE'} primaryText="Image URL"/>
                        <MenuItem value={'HTML'} primaryText="HTML"/>
                    </SelectField>
                    <TextField
                        floatingLabelText="Default value"
                        value={this.state.content}
                        onKeyDown={this.onKeyDown}
                        onChange={(event, value) => this.setState({content: value})}
                    />
                    {/*<IconButton*/}
                        {/*iconClassName="material-icons"*/}
                        {/*tooltip="HTML editor"*/}
                        {/*onClick={() => this.setState({showHTMLEditor: true})}*/}
                    {/*>*/}
                        {/*edit*/}
                    {/*</IconButton>*/}
                </div>

                { this.renderHTMLEditor() }
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

export default DataModal
