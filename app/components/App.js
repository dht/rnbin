import React from 'react';
import './App.scss';
import FlexEditor from 'flex-editor/FlexEditor';
import AdhockBar from './AdhocBar/AdhocBarContainer';

import Titlebar from './Titlebar';
import CodeEditor from './CodeEditor';
import RootModal from './Modals/RootModalContainer';

import Drawer from 'material-ui-extensions/Drawer';

import {listenToState_adhock, stopToListen} from '../utils/elements_api'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerOpen: false
        }

        this.openCodeDrawer = this.openCodeDrawer.bind(this);
    }

    componentWillReceiveProps(props) {
        const {dataFieldModalOn, showPlaceholderPopover} = props;

        if (this.state.dataFieldModalOn !== dataFieldModalOn) {
            this.setState({dataFieldModalOn})

            if (dataFieldModalOn) {
                this.props.showDataFieldModal();
            }
        }

        if (this.state.showPlaceholderPopover !== showPlaceholderPopover) {
            this.setState({showPlaceholderPopover})

            if (showPlaceholderPopover) {
                this.props.showInsertSnippetModal();
            }
        }
    }

    openCodeDrawer() {
        let {drawerOpen} = this.state;

        drawerOpen = !drawerOpen;

        this.props.flashSelection(500);
        this.setState({drawerOpen});
    }

    render() {
        const {readonly, params} = this.props;
        const {width = 1280, height = 700} = params;
        const {drawerOpen} = this.state;

        const zoom = Math.min((1000 / width), 1.5);

        return <div className="App-container">
            <Drawer
                drawerOpen={drawerOpen}
                flex={true}
                left={true}
                drawerStyle={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}
                width={400}
                hideToggle={true}>
                <Titlebar drawerOpen={drawerOpen} toggle={this.openCodeDrawer}>
                    <div>Code <span className="readonly">(readonly)</span></div>
                </Titlebar>
                <CodeEditor />
            </Drawer>

            <div className="editor-container">
                <FlexEditor
                    colors={[]}
                    fonts={[]}
                    width={width}
                    height={height}
                    zoom={zoom}
                    readonly={readonly}
                    hideTreeTabs={true}
                    showDataButtons={true}
                    subscribe={listenToState_adhock}
                    unsubscribe={stopToListen}
                />

                <div style={styles.adhocBar}>
                    <AdhockBar />
                </div>

                <div style={styles.adhocBar}>
                    <AdhockBar />
                </div>

                <RootModal />
            </div>
            <div className="beta">
                PRE-BETA
            </div>

        </div>
    }
}

const styles = {
    adhocBar: {
        width: '100px',
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginLeft: '20px',
        zIndex: 999,
        backgroundColor: 'white',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        borderRadius: '1px',
    }
}