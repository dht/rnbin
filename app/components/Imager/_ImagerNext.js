import React from 'react';
import './Imager.scss';
import {copyTextToClipboard} from '../../utils/clipboard';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import Cover from './Cover';

export default class Imager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            top: 100,
            left: 100,
            width: 100,
            height: 100,
            previewUrl: '',
            message: ' ',
            loading: false,
        }

        this.updatePreviewUrl = this.updatePreviewUrl.bind(this);
        this.scaledDimension = this.scaledDimension.bind(this);
        this.resetCover = this.resetCover.bind(this);
    }

    resetCover() {
        this.setState({
            top: 100,
            left: 100,
            width: 100,
            height: 100,
        });
    }

    scaledDimension(ratio) {
        let {top, left, width, height} = this.state;

        top -= 30;
        left -= 30;

        return {
            top: parseInt(top * ratio, 10),
            left: parseInt(left * ratio, 10),
            width: parseInt(width * ratio, 10),
            height: parseInt(height * ratio, 10),
        }
    }

    updatePreviewUrl() {
        const {url, overlayWidth} = this.state;

        const imgWidth = this._img.clientWidth;


        if (!url || !overlayWidth) {
            return;
        }

        const ratio = (this._img.naturalWidth || overlayWidth) / imgWidth;
        const dimensions = this.scaledDimension(ratio);
        const previewUrl = url.replace('upload/', `upload/x_${dimensions.left},y_${dimensions.top},w_${dimensions.width},h_${dimensions.height},c_crop/`);

        this.setState({previewUrl, overlayWidth});
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            url: newProps.url,
            overlayWidth: newProps.width
        }, () => {
            this.updatePreviewUrl()
        })
    }

    componentDidMount() {
        this.setState({
            url: this.props.url,
            overlayWidth: this.props.width
        }, () => {
            this.updatePreviewUrl();
        })
    }

    changeCover({top, left, width, height}) {
        this.setState({top, left, width, height});
    }

    copyImage() {
        copyTextToClipboard(this.state.previewUrl);

        this.setState({
            message: 'Image url was copied to clipboard'
        })

        setTimeout(() => {
            this.setState({
                message: ' '
            })
        }, 2000);
    }

    cropOverlay() {
        const {previewUrl} = this.state;

        this.props.setOverlay(previewUrl);
        this.setState({loading: true});
    }

    render() {
        const {top, left, width, height, loading} = this.state;

        return (
            <div className="Imager-container">

                <a className="close" onClick={this.props.close}>
                    <span className="material-icons">close</span>
                </a>

                <div className="left">
                    <div className="image">
                        <img ref={c => this._img = c } width="100%" src={this.props.url}/>
                    </div>
                    <Cover
                        top={top} left={left} width={width} height={height}
                        change={this.changeCover.bind(this)}
                        update={this.updatePreviewUrl}
                    />
                </div>
                <div className="right">
                    <div className="content">
                        <div className="image">
                            <img src={this.state.previewUrl}/>

                            {loading?<div className="refresh-container">
                                <RefreshIndicator
                                    top={0}
                                    left={0}
                                    size={150}
                                    loadingColor="#FF9800"
                                    status="loading"
                                    style={styles.refresh}
                                />
                            </div>:null}
                        </div>

                        <div className="actions">
                            <div className="buttons">
                                <RaisedButton
                                    label="Copy as image"
                                    labelPosition="before"
                                    style={{flex: 1}}
                                    disabled={loading}
                                    onClick={this.copyImage.bind(this)}
                                    icon={<FontIcon className="material-icons">image</FontIcon>}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <RaisedButton
                                    label="Crop overlay"
                                    labelPosition="before"
                                    secondary={true}
                                    disabled={loading}
                                    onClick={this.cropOverlay.bind(this)}
                                    icon={<FontIcon className="material-icons">crop</FontIcon>}
                                />
                            </div>
                            <div className="text">
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    button: {},
    refresh: {
        margin: 'auto',
    }
}