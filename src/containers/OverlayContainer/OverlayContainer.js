import React, {Component} from 'react'
import classes from './OverlayContainer.module.css';
import {OverlayMet, OverlayTune} from './Overlay/Overlay';

class OverlayContainer extends Component {

    render(){
        return(
            <div className={classes.overlayContainer}>
                <OverlayTune tunerVis={this.props.showTuner} toggleVis={this.props.toggleTuner}/>

                <OverlayMet metronomeVis={this.props.showMet} toggleVis={this.props.toggleMet}/>
            </div>
        );
    }
}


export default OverlayContainer;