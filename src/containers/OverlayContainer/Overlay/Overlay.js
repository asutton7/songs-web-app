import React, { useState } from 'react';
import classes from './Overlay.module.css';
import Metronome from './Metronome/Metronome';
import Tuner from './Tuner/Tuner';

const OverlayMet = (props) => {
    const [maximize, setSize] = useState(false);

    const toggleSize = () => {
        setSize(!maximize);
    }

    let contentClass = classes.overlay;
    if(props.metronomeVis && maximize) {
        contentClass = [classes.overlay, classes.overlayShow, "maximize"].join(' ');
    } else if (props.metronomeVis) {
        contentClass = [classes.overlay, classes.overlayShow].join(' ');
    }

    return (
        <div className={contentClass}>
            <button className={classes.closeBtn} onClick={props.toggleVis}>x</button>

            <Metronome toggleSize={toggleSize}/>
        </div>
    )
}

const OverlayTune = (props) => {
    let contentClass = classes.overlay;
    if(props.tunerVis) {
        contentClass = [classes.overlay, classes.overlayShow].join(' ');
    }

    return(
        <div className={contentClass}>
            <button className={classes.closeBtn} onClick={props.toggleVis}>x</button>
            <Tuner />
        </div>
    )
}

export {
    OverlayMet,
    OverlayTune
}