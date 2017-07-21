import React from 'react';
import './Imager.scss';
import {copyTextToClipboard} from '../../utils/clipboard';
import {getImageSize} from '../../utils/image';
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
        this.getPreviewUrl = this.getPreviewUrl.bind(this);
        this.loadUrl = this.loadUrl.bind(this);
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

    getPreviewUrl(url, dimenstions) {
        const regex = /\/x_(\d+),y_(\d+),w_(\d+),h_(\d+),c_crop/g;

        url = url.replace(regex, function (all, x, y, w, h) {

            x = parseInt(x, 10) + dimenstions.left;
            y = parseInt(y, 10) + dimenstions.top;
            w = dimenstions.width;
            h = dimenstions.height;

            return `/x_${x},y_${y},w_${w},h_${h},c_crop`;
        });

        return url;
    }

    updatePreviewUrl() {
        const {url, overlayWidth} = this.state;

        const imgWidth = this._img.clientWidth;

        if (!url || !overlayWidth) {
            return;
        }

        const ratio = (this._img.naturalWidth || overlayWidth) / imgWidth;
        const dimensions = this.scaledDimension(ratio);

        if (dimensions.width === 0 || dimensions.height === 0) {
            dimensions.width = 1;
            dimensions.height = 1;
        }

        if (url) {
            const previewUrl = this.getPreviewUrl(url, dimensions);
            this.setState({previewUrl, overlayWidth});
        }
    }

    loadUrl(url) {
        if (this._lastUrl === url) {
            return;
        }

        getImageSize(url)
            .then(size => {
                this.setState({
                    url: url,
                    overlayWidth: size.width
                }, () => {
                    this.updatePreviewUrl()
                })
        })

        this._lastUrl = url;
    }

    componentWillReceiveProps(newProps) {
        this.loadUrl(newProps.url);
    }

    componentDidMount() {
        this.loadUrl(this.props.url);
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
            <div className="Imager-container compact">

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

                            {loading ? <div className="refresh-container">
                                <RefreshIndicator
                                    top={0}
                                    left={0}
                                    size={150}
                                    loadingColor="#FF9800"
                                    status="loading"
                                    style={styles.refresh}
                                />
                            </div> : null}
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
    },
}

/*
 &nbsp;&nbsp;&nbsp;
 <RaisedButton
 label="Crop overlay"
 labelPosition="before"
 secondary={true}
 disabled={loading}
 onClick={this.cropOverlay.bind(this)}
 icon={<FontIcon className="material-icons">crop</FontIcon>}
 />
 */