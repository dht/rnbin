import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {fetchStateBySnippetId} from '../../../utils/elements_api';
import {firebaseStateToState, variablesArrayToObject} from '../../../utils/StateParser';
import RefreshIndicator from 'material-ui/RefreshIndicator';


class VariableModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.setVariable = this.setVariable.bind(this);
        this.saveVariables = this.saveVariables.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.focusOnFirst = this.focusOnFirst.bind(this);
    }

    componentDidMount() {
        const {snippetId} = this.props;

        fetchStateBySnippetId(snippetId).then((state) => {
            state = firebaseStateToState(state);
            this.parseState(state)
        });
    }

    focusOnFirst() {
        document.querySelector('.dialog-variables-container input').focus();
    }

    saveVariables() {
        const {variables} = this.state;

        this.props.saveVariables(variablesArrayToObject(variables));
    }

    parseState(state) {
        const {params = {}} = this.props;

        const variables = Object.keys(state).map(id => {
            const element = state[id];
            const {content = '', dataField = '', dataFieldType = ''} = element.data || {};
            const param = params[dataField] || '';

            if (dataField && dataFieldType) {
                return {
                    id,
                    dataField,
                    dataFieldType,
                    content: param || content
                }
            } else {
                return null;
            }
        }).filter(variable => variable);

        this.setState({variables, noVariables: variables.length === 0});

        setTimeout(() => {
            this.focusOnFirst();
        }, 150);
    }

    onKeyDown(ev) {
        if (ev.which === 13) {
            this.saveVariables();
        }
    }

    setVariable(id, value) {
        let {variables = []} = this.state;

        const newVariables = variables.map(variable => {
            if (variable.id === id) {
                variable.content = value;
            }

            return variable;
        })

        this.setState({variables: newVariables});
    }

    renderText(variable) {
        return <div key={variable.id}>
            <TextField
                fullWidth={true}
                floatingLabelText={variable.dataField}
                value={variable.content}
                onKeyDown={this.onKeyDown}
                onChange={(event, value) => this.setVariable(variable.id, value)}
            />
        </div>
    }

    renderImage(variable) {
        return <div key={variable.id}>
            <TextField
                fullWidth={false}
                style={{width:'90%'}}
                floatingLabelText={variable.dataField}
                value={variable.content}
                onKeyDown={this.onKeyDown}
                onChange={(event, value) => this.setVariable(variable.id, value)}
            />
            <IconButton
                iconClassName="material-icons"
                tooltip="crop"
                onClick={this.props.showImager}
            >
                crop
            </IconButton>
        </div>
    }

    renderEmpty() {
        return <div style={styles.empty}>
            <RefreshIndicator
                size={50}
                left={340}
                top={55}
                loadingColor="#FF9800"
                status="loading"
            />
        </div>
    }

    renderNoVariables() {
        return <div style={styles.empty}>
            No content variables for this snippet.
        </div>
    }

    renderVariables() {
        const {variables = [], noVariables = false} = this.state;


        if (noVariables) {
            return this.renderNoVariables();
        }

        if (variables.length === 0) {
            return this.renderEmpty();
        }

        return <div className="dialog-variables-container">
            {
                variables.map(variable => {
                    if (variable.dataFieldType === 'HTML') {
                        return this.renderText(variable);
                    } else {
                        return this.renderText(variable);
                    }
                })
            }
        </div>
    }

    render() {
        const {snippetId} = this.props;

        const actions = [
            <FlatButton
                label="Edit snippet"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.props.editSnippet}
            />,
            <FlatButton
                label="Cancel"
                keyboardFocused={true}
                onTouchTap={this.props.handleClose}
            />,
            <FlatButton
                label="Save content"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.saveVariables}
            />,
        ];


        return (
            <Dialog
                contentStyle={ styles.dialog }
                title={'Snippet parameters'}
                actions={actions}
                modal={false}
                open={ true }
                onRequestClose={this.props.handleClose}>
                <span style={ styles.span }>(id: {snippetId})</span>
                {
                    this.renderVariables()
                }
            </Dialog>
        )
    }
}

const styles = {
    dialog: {
        width: '860px',
        margin: 'auto',
        alignSelf: 'center',
    },
    empty: {
        padding: '30px',
        height: '100px',
        position: 'relative',
        fontSize: '18px',
        textAlign: 'center',
    },
    span: {
        position: 'relative',
        fontSize: '14px',
        color:'#bbb',
        top:'-3px',
        textAlign: 'center',
    }
};

export default VariableModal
