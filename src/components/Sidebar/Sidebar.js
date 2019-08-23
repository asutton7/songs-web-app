import React, {Component} from 'react';
import classes from './Sidebar.module.css';
import {SidebarTool, SidebarToolMet} from './SidebarTool/SidebarTool';
import {NavLink} from 'react-router-dom';
import { IfFirebaseAuthed } from '@react-firebase/auth';

const sidebar = (props) =>  {


    return (
        <div className={classes.Sidebar}>
            <h1 className={classes.songHeader}>songs</h1>
            <h1 className={classes.songMobile}>s</h1>
            <ul>
                <NavLink to="/"><SidebarTool key="0" title="Your Songs" icon='library_music'/></NavLink>
                <SidebarTool onClick={props.toggleTuner} key="1" title="Tuner" icon='mic'/>
                <SidebarToolMet onClick={props.toggleMetronome} key="2" title="Metronome"/>
                <SidebarTool key="3" title="Settings" icon='settings'/>
                <IfFirebaseAuthed>
                    <SidebarTool onClick={props.signOutFunc} key="4" title="Sign Out" icon='arrow_back'/> 
                </IfFirebaseAuthed>
            </ul>
        </div>
    )
}


export default sidebar;