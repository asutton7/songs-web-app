import React from 'react';
import NewSong from '@material-ui/icons/Add';
import classes from './EmptySongsNav.module.css'

const emptySongsNav = (props) => {
    return (
        <div className={classes.emptyContainer}>
            <h2>It looks like there aren't any songs here yet...</h2>
            <h1>Get started by clicking the<button className={classes.addNewSongBtn}><NewSong/></button>!</h1>
            <div className={classes.musicStaffContainer}>
            <p className={classes.musicStaff}>
                <span className={classes.keySig}>b</span>
                <span className={classes.measure}>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.C].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.FHigh].join(' ')}></span>
                    <span className={[classes.note,  classes.quarterNote, classes.C, classes.flipNote].join(' ')}></span>
                    <span className={[classes.note,  classes.quarterNote, classes.F].join(' ')}></span>
                </span>
                <span className={classes.measure}>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.C].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.FHigh].join(' ')}></span>
                    <span className={[classes.note, classes.halfNote, classes.flipNote, classes.C].join(' ')}></span>
                </span>
                <span className={classes.measure}>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.C].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.FHigh].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.C, classes.quarterNotePrecedingFlip].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.FHigh].join(' ')}></span>
                </span>
                <span className={classes.measure}>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.AHigh].join(' ')}><span className={classes.dotted}> </span></span>
                    <span className={[classes.note, classes.eighthNote, classes.flipNote, classes.GHigh, classes.flag].join(' ')}></span>
                    <span className={[classes.note, classes.eighthNote, classes.flipNote, classes.FHigh, classes.connector, classes.wholeStep].join(' ')}></span>
                    <span className={[classes.note, classes.eighthNote, classes.flipNote, classes.EHigh, classes.connector, classes.wholeStep].join(' ')}></span>
                    <span className={[classes.note, classes.eighthNote, classes.flipNote, classes.D, classes.connectorFlat].join(' ')}></span>
                    <span className={[classes.note, classes.eighthNote, classes.flipNote, classes.D].join(' ')}></span>
                    <span style={{top: '-27.5px', left: '-45px'}} className={classes.keySig}>b</span>
                </span>
                <span className={classes.measure}>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.C].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.FHigh].join(' ')}></span>
                    <span className={[classes.note,  classes.quarterNote, classes.C, classes.flipNote].join(' ')}></span>
                    <span className={[classes.note,  classes.quarterNote, classes.F].join(' ')}></span>
                </span>
                <span className={classes.measure}>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.C].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.FHigh].join(' ')}></span>
                    <span className={[classes.note, classes.halfNote, classes.flipNote, classes.C].join(' ')}></span>
                </span>
                <span className={classes.measure}>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.FHigh].join(' ')}><span className={classes.dotted}> </span></span>
                    <span className={[classes.note, classes.eighthNote, classes.flipNote, classes.D, classes.flag].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.C].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.flipNote, classes.B].join(' ')}></span>
                </span>
                    <span style={{marginLeft:'25px'}} className={[classes.note, classes.quarterNote, classes.A].join(' ')}></span>
                    <span className={[classes.note, classes.quarterNote, classes.G].join(' ')}></span>
                    <span className={[classes.note, classes.halfNote, classes.F, classes.noFlip].join(' ')}></span>
            </p>
            </div>
        </div>
    );
}

export default emptySongsNav;