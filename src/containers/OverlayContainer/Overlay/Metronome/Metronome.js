import React, {Component} from 'react';
import classes from './Metronome.module.css';
import { throwStatement, thisExpression } from '@babel/types';

class Metronome extends Component {
    
    constructor(props) {
        super(props);
    }

    state = {
        speed: 120,
        tapCount: 0,
        tapping: false,
        lastTapTime: null,
        averageTPM: null,
        previousTaps: [],
        playing: false,
        context: null
    }

    increase = () => {
        let newSpeed = Number(this.state.speed) + 1;
        this.setState({speed: newSpeed});
    }

    decrease = () => {
        let newSpeed = Number(this.state.speed) - 1;
        this.setState({speed: newSpeed});
    }

    speedChangeHandler = (evt) => {
        this.setState({speed: evt.target.value});
    }

    toggleMetronome = () => {
        this.setState({playing: !this.state.playing});
        var play = !this.state.playing;
        this.metronome(play);
    }

    metronome = (play) => {
        if(play) {
            let acontext = new AudioContext();
                const metronome = (bpm = this.state.speed, callback, currentBeat = 1) => {
                    const now = acontext.currentTime;

                    let beatsPerSecond = bpm / 60.0;
                    const beatsPerBar = 4;
                    const beatLength = 4 / (beatsPerBar * beatsPerSecond);
                    const freq = currentBeat % beatsPerBar == 1 ? 440 : 880;
                    const zero = 0.00001;

                    let gainNode = acontext.createGain();
                    let osc = acontext.createOscillator();
                    gainNode.connect(acontext.destination);
                    osc.connect(gainNode);
                    gainNode.gain.exponentialRampToValueAtTime(zero, now + beatLength / 16);

                    osc.frequency.value = freq;
                    osc.start(now);
                    osc.stop(now + beatLength);

                    callback(now);
                    osc.onended = () => {
                        metronome(bpm, callback, (currentBeat += 1));
                        osc = null;
                        gainNode = null;
                    }    
            }
            this.setState({context: acontext});

            metronome(this.state.speed, now => {
            });

        } else {
            this.state.context.close();
            this.setState({context: null});
        }
    }

    tapTempo = () => {
        let taps = this.state.tapCount;
        const distanceBetweenTaps = new Date() - this.state.lastTapTime;    
        if (distanceBetweenTaps > 5000) {
            taps = 1;
            this.setState({previousTaps: [60000/distanceBetweenTaps]});
        }  
        else if(taps > 1) {

            let bpm = 60000 / distanceBetweenTaps;
            let tpmArr = [];
            tpmArr.push(...this.state.previousTaps, bpm);
            if(tpmArr.length > 8) {
                tpmArr.splice(0, 1);
            }
            let totalBpm = 0;
            tpmArr.forEach((bpm, index) => {
                totalBpm += bpm;
            });
            
            let avgBpm = totalBpm / tpmArr.length;
            this.setState({averageTPM: avgBpm, speed:parseInt(avgBpm.toString()), previousTaps: tpmArr});

        } 

    }

    tap = () => {
        if(this.state.tapCount == 0) {
            this.setState({tapping: true});
        }

        let startTime = new Date();
        let newCount = this.state.tapCount + 1;
        this.setState({tapCount: newCount, lastTapTime: startTime});
        this.tapTempo();
    }

    render() {


        return(
            <React.Fragment>
                <div className={classes.flexbox}>
                    <button onClick={this.decrease}>&lt;</button>
                    <input className={classes.metText} type='number' onChange={this.speedChangeHandler} value={this.state.speed}/>
                    <button onClick={this.increase}>&gt;</button>
                </div>
                <div>
                    <button className={classes.actBtns} onClick={this.toggleMetronome}>Play</button>
                    <input className={classes.num} type='number'></input>

                </div>
                <div>
                    <button className={classes.actBtns} onClick={this.tap}>Tap</button>
                    <select className={classes.denom}>
                        <option>1</option>
                        <option>2</option>
                        <option>4</option>
                        <option>8</option>
                        <option>16</option>
                        <option>32</option>
                    </select>

                </div>
            </React.Fragment>

        )

    }
}

export default Metronome;