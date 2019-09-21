import React from 'react';
import classes from './ToolboxSlider.module.css';
import MetronomeTick from 'mdi-react/MetronomeTickIcon';
import Microphone from 'mdi-react/MicrophoneIcon';
import Musicbook from 'mdi-react/AudiobookIcon';

const ToolboxSlider = (props) => {
    let toolBoxSliderClasses;

    if(props.expandTools) {
        toolBoxSliderClasses = [classes.ToolboxSlider, classes.ToolboxSliderShow].join(' ');
    }else {
        toolBoxSliderClasses = classes.ToolboxSlider;
    }

    

    return (
        <div className={toolBoxSliderClasses}>
            <div className={classes.Tool} onClick={props.toggleMet}><MetronomeTick /><p>Metronome</p></div>
            <div className={classes.Tool} onClick={props.toggleTuner}><Microphone /><p>Tuner</p></div>
            <div className={classes.Tool}><Musicbook /><p>ChordHelper</p></div>
            <div className={classes.ExpandIcon} onClick={props.toggleToolbox}><p className={classes.arrow}>></p></div>
        </div>
    )
}

export default ToolboxSlider;