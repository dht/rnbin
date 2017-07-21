import React from 'react';
import './Titlebar.scss';
import IconButton from 'material-ui/IconButton'


export const Titlebar = (props) => <div className="Titlebar-container">
    {props.children}
    <div className="drawer-button" style={props.drawerOpen ? styles.buttonOpen : styles.button}>
        <IconButton
            iconClassName="material-icons"
            onClick={props.toggle}>
            {props.drawerOpen ? 'close': 'keyboard_arrow_right'}
        </IconButton>
    </div>
</div>;

export default Titlebar;

const styles = {
    button: {
        right:'-60px',
        transitionDelay: '0.5s',
    },
    buttonOpen:{
    }
}
