import React from 'react';

export default class Cover extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDown: false
        }
    }

    componentDidMount() {

        setTimeout(() => {
            const rect = this._container.getBoundingClientRect();

            console.log('this._container, rect -> ', this._container, rect);
        }, 100);
    }

    onMouseDown(e) {
        const {x0, y0} = this.state;

        this.setState({
            isDown: true
        });

        const rect = this._container.getBoundingClientRect();
        this.setState({x0: rect.left, y0: rect.top});

        this.props.change({
            left: e.clientX - rect.left,
            top: e.clientY - rect.top,
            width: 0,
            height: 0
        })
    }

    onMouseUp(e) {
        this.setState({
            isDown: false
        });

        this.props.update();
    }

    onMouseMove(e) {
        const {isDown, x0, y0} = this.state;
        const {top = 100, left = 100} = this.props;

        if (!isDown) {
            return;
        }

        const height = (e.clientY - y0) - top,
            width = (e.clientX - x0) - left;

        if (width < 0 || height < 0) {
            return;
        }

        this.props.change({
            top,
            left,
            height,
            width
        })

    }

    render() {

        let {top = 100, left = 100, width = 100, height = 100} = this.props;

        return (
            <div style={styles.container}
                 ref={(c) => {
                     this._container = c
                 }}
                 onMouseDown={this.onMouseDown.bind(this)}
                 onMouseUp={this.onMouseUp.bind(this)}
                 onMouseMove={this.onMouseMove.bind(this)}
            >
                <div style={{...styles.patch, top: 0, left: 0, right: 0, height: top}}></div>
                <div style={{...styles.patch, bottom: 0, left: 0, right: 0, top: top + height}}></div>
                <div style={{...styles.patch, top: top, left: 0, width: left, height: height}}></div>
                <div style={{...styles.patch, top: top, right: 0, left: left + width, height: height}}></div>
            </div>
        );
    }
}

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    patch: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
    }
}