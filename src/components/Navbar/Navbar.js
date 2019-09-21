import React from 'react';
import classes from './Navbar.module.css';
import SidebarTool from './NavbarIcon/NavbarIcon';
import {NavLink} from 'react-router-dom';
import { IfFirebaseAuthed } from '@react-firebase/auth';

const sidebar = (props) =>  {


    return (
        <div className={classes.Navbar}>
            <h1 className={classes.songHeader}>songs</h1>
            <h1 className={classes.songMobile}>s</h1>
            <ul>
                <NavLink to="/"><SidebarTool key="0" icon='library_music'/></NavLink>
                <SidebarTool key="3" icon='settings'/>
                <IfFirebaseAuthed>
                    <SidebarTool onClick={props.signOutFunc} key="4" title="Sign Out" icon='arrow_back'/> 
                </IfFirebaseAuthed>
            </ul>
        </div>
    )
}


export default sidebar;