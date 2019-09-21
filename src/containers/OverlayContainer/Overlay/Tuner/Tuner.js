import React, {Component} from 'react';
import classes from './Tuner.module.css';

class Tuner extends Component {

    state = {
        context: null,
        gain: null,
        currentNote: 0
    }
    
    playNote = (evt) => {
        if(this.state.context) {
            this.stopNote();
        } 
        if(this.state.currentNote === evt.target.value){
            this.stopNote();
            evt.target.removeAttribute('checked');
            this.setState({currentNote: 0});
            return;
        } else {
            let audioContext = new AudioContext();
            let gainNode = audioContext.createGain();
            let osc = audioContext.createOscillator();
            osc.connect(gainNode);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(evt.target.value, audioContext.currentTime);
            gainNode.connect(audioContext.destination);
            osc.start();
    
            this.setState({context: audioContext, gain: gainNode, currentNote: evt.target.value});
    
        }
        
    }

    stopNote = () => {
        this.state.gain.gain.setTargetAtTime(0, this.state.context.currentTime, .03);
        this.setState({context: null, gain: null})
    }

    render() {
        return (
            <div className={classes.containerDiv}>
            <p className={classes.notes}>C D E F G A B</p>

                <div className={classes.keyboard}>
                    <input id="Ckey" checked={this.state.currentNote === "261.6256"} onClick={event => this.playNote(event)} value="261.6256" type="radio" name="key"></input><label htmlFor="Ckey" className={classes.whiteKey}><input checked={this.state.currentNote === "277.1826"}  onClick={event => this.playNote(event)} id="CSkey" value="277.1826" type="radio" name="key"></input><label htmlFor="CSkey" className={classes.blackKey}></label></label>
                    <input id="Dkey" checked={this.state.currentNote === "293.6648"} onClick={event => this.playNote(event)} value="293.6648" type="radio" name="key" ></input><label htmlFor="Dkey" className={classes.whiteKey}><input checked={this.state.currentNote === "311.1270"}  onClick={event => this.playNote(event)} id="DSkey" value="311.1270" type="radio" name="key"></input><label htmlFor="DSkey" className={classes.blackKey}></label></label>
                    
                    <input id="Ekey" checked={this.state.currentNote === "329.6276"} onClick={event => this.playNote(event)} value="329.6276" type="radio" name="key"></input><label htmlFor="Ekey" className={classes.whiteKey}></label>
                    <input id="Fkey" checked={this.state.currentNote === "349.2282"} onClick={event => this.playNote(event)} value="349.2282" type="radio" name="key"></input><label htmlFor="Fkey" className={classes.whiteKey}><input checked={this.state.currentNote === "369.9944"} id="FSkey" onClick={event => this.playNote(event)} value="369.9944" type="radio" name="key"></input><label htmlFor="FSkey" className={classes.blackKey}></label></label>
                    <input id="Gkey" checked={this.state.currentNote === "391.9954"} onClick={event => this.playNote(event)} value="391.9954" type="radio" name="key"></input><label htmlFor="Gkey" className={classes.whiteKey}><input checked={this.state.currentNote === "415.3047"}  id="GSkey" onClick={event => this.playNote(event)} value="415.3047" type="radio" name="key"></input><label htmlFor="GSkey" className={classes.blackKey}></label></label>
                    <input id="Akey" checked={this.state.currentNote === "440.0000"} onClick={event => this.playNote(event)} value="440.0000" type="radio" name="key"></input><label htmlFor="Akey" className={classes.whiteKey}><input checked={this.state.currentNote === "466.1638"}  id="ASkey" onClick={event => this.playNote(event)} value="466.1638" type="radio" name="key"></input><label htmlFor="ASkey" className={classes.blackKey}></label></label>
                    <input id="Bkey" checked={this.state.currentNote === "493.8833"} onClick={event => this.playNote(event)} value="493.8833" type="radio" name="key"></input><label htmlFor="Bkey" className={classes.whiteKey}></label>
                
                </div>
            </div> 
        )
    }
}

export default Tuner;