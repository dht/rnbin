import React from 'react';
import './CodeEditor.scss';

import AceEditor from 'react-ace';

import 'brace';
import 'brace/mode/scss';
import 'brace/mode/html';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/ext/beautify';

const modes = {
    JSX: 'JSX',
    HTML: 'html',
    SCSS: 'scss',
    JSON: 'json',
    JS: 'javascript',
}

export default class CodeEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: modes.HTML
        }
    }

    onChange(newValue) {
    }

    onLoad(editor) {
    }

    componentWillReceiveProps(newProps) {
    }

    componentDidMount() {
    }


    render() {
        const {code} = this.props;

        return (
            <div className="CodeEditor-container">
                <AceEditor
                    mode={'javascript'}
                    theme="github"
                    onChange={this.onChange.bind(this)}
                    onLoad={this.onLoad.bind(this)}
                    name="the-ace"
                    readOnly={true}
                    width="100%"
                    height="100%"
                    editorProps={{$blockScrolling: true}}
                    value={code}
                />
            </div>
        );
    }
}

const styles = {}

