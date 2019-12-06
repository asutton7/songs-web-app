import React from 'react';
import classes from './Navbar.module.css';
import NavbarTool from './NavbarIcon/NavbarIcon';
import { NavLink } from 'react-router-dom';
import { IfFirebaseAuthed } from '@react-firebase/auth';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions'
import {withRouter} from 'react-router-dom';

const navbar = (props) => {
    let breadCrumbs = null;
    let rootBreadCrumb = <span key='bcRootKey' id='-1' onClick={async () => {
        await props.history.push({
            pathname:'/'
        });
        props.moveToFolder(-1, props.openFolderKeys, props.openFolderNames);
    }} className={classes.breadCrumbs}>root</span>

    if (props.openFolderNames.length > 0) {
        breadCrumbs = props.openFolderNames.map((val, index) => {
            return <span key={index} id={index} onClick={async () => {
                await props.history.push({
                    pathname:'/'
                });
                props.moveToFolder(index, props.openFolderKeys, props.openFolderNames);
            }} className={classes.breadCrumbs}>{val}</span>
        })
    }

    return (
        <div className={classes.Navbar}>
            <h1 className={classes.songHeader}>songs</h1>
            <h1 className={classes.songMobile}>s</h1>
            <p className={classes.breadCrumbsContainer}>{rootBreadCrumb}{breadCrumbs}</p>
            <ul>
                <NavLink to="/"><NavbarTool key="0" icon='library_music' /></NavLink>
                {/* <NavbarTool key="3" icon='settings' /> */}
                <IfFirebaseAuthed>
                    <NavbarTool onClick={props.signOutFunc} key="4" title="Sign Out" icon='close' />
                </IfFirebaseAuthed>
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        openFolderNames: state.openFolderNames,
        openFolderKeys: state.openFolderKeys
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveToFolder: (index, openFolderKeys, openFolderNames) => dispatch(actionCreators.moveToFolder(index, [...openFolderKeys], [...openFolderNames]))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbar));