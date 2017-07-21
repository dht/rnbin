import React, {PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Imager from '../../Imager';

import 'brace/mode/css';
import 'brace/theme/github';

export default class ImagerModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: '',
            width: 1000,
            widthLeft:400,
        }

        this.ok = this.ok.bind(this);
    }

    ok() {
        const {minCharacters = 3} = this.props;

        this.setState({errorText: ''});

        const name = this._input.input.value;

        if (name.length < minCharacters) {
            this.setState({errorText: 'what\'s new must have at least 3 characters'});
            this.focus();
            return;
        }

        this.props.ok(name);
        this.props.handleClose();
    }

    onChange(newValue) {
    }

    render() {
        const {title, defaultValue, url} = this.props;
        const {width} = this.state;

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.handleClose}
            />
        ];

        return (

            <Dialog
                contentStyle={{...styles.dialog, width: `${width}px`, maxWidth: `${width}px` }}
                title={ title }
                actions={actions}
                modal={false}
                open={ true }
                onRequestClose={this.props.handleClose}
            >

                <div>
                    <Imager url={url} />
                </div>

            </Dialog>
        )
    }
}

const styles = {
    dialog: {
        margin: 'auto',
        textAlign: 'center',
        alignSelf: 'center',
        paddingTop:0,
    },
};

