import React from 'react';
import classes from './NavbarIcon.module.css';

const NavbarTool = (props) => (
    <div onClick={props.onClick} className={classes.SidebarTool}>
        <div className={classes.ToolIcon}><i className="material-icons">{props.icon}</i></div>
    </div>
)


export default NavbarTool;