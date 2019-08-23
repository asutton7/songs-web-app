import React from 'react';
import classes from './SidebarTool.module.css';
import MetronomeTick from 'mdi-react/MetronomeTickIcon';

const SidebarTool = (props) => (
    <div onClick={props.onClick} className={classes.SidebarTool}>
        <p className={classes.ToolTitle}>{props.title}</p>
        <div className={classes.ToolIcon}><i className="material-icons">{props.icon}</i></div>
    </div>
)

const SidebarToolMet = (props) => (
    <div onClick={props.onClick} className={classes.SidebarTool}>
        <p className={classes.ToolTitle}>{props.title}</p>
        <div className={classes.ToolIcon}><MetronomeTick className={classes.vAlignNone}/></div>
    </div>
)

export {SidebarTool, SidebarToolMet};