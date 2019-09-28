import React, {Component} from 'react';
import classes from './Metronome.module.css';

class Metronome extends Component {

    state = {
        speed: 120,
        tapCount: 0,
        tapping: false,
        lastTapTime: null,
        averageTPM: null,
        previousTaps: [],
        playing: false,
        context: null,
        timeSigDenom: 4,
        timeSigNum: 4
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
                    const beatsPerBar = this.state.timeSigDenom; //beatsperbar = numerator, beatlength = denominator
                    const beatLength = 4 / (beatsPerBar * beatsPerSecond);
                    const freq = currentBeat % this.state.timeSigNum === 1 ? 440 : 880;
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
            let tpmArr = [...this.state.previousTaps, bpm];
            if(tpmArr.length > 8) {
                tpmArr.splice(0, 1);
            }
            let totalBpm = 0;
            tpmArr.forEach((bpm, index) => {
                totalBpm += bpm;
            });
            
            let avgBpm = totalBpm / tpmArr.length;
            if(avgBpm > 240) {avgBpm = 240;}
            this.setState({averageTPM: avgBpm, speed:parseInt(avgBpm.toString()), previousTaps: tpmArr});

        } 

    }

    tap = () => {
        if(this.state.tapCount === 0) {
            this.setState({tapping: true});
        }

        let startTime = new Date();
        let newCount = this.state.tapCount + 1;
        this.setState({tapCount: newCount, lastTapTime: startTime});
        this.tapTempo();
    }

    setDenom = (event) => {
        this.setState({timeSigDenom: event.target.value});
    }

    setNum = (event) => {
        this.setState({timeSigNum: event.target.value});
        if(event.target.value > 31) {
            this.setState({timeSigNum: 31})
        }
    }

    render() {


        return(
            <React.Fragment>
                    <p className={classes.metTextVal}>{this.state.speed}</p>
                    <input className={classes.metText} type='range' min="1" max="240" onChange={this.speedChangeHandler} value={this.state.speed}/>
                <button className={classes.actBtns} onClick={this.toggleMetronome}>Play</button>
                <button className={classes.actBtns} onClick={this.tap}>Tap</button>
                <div>
                <p className={classes.timeSigLbl}>Time Sig</p>
                <input className={classes.num} value={this.state.timeSigNum} onChange={event => this.setNum(event)} type='number' min='1' max="31"></input>
                <hr className={classes.hr}/>
                <div className={classes.denom} onChange={event => this.setDenom(event)}>
                        <input id="1d" value="1" type="radio" name="denom"></input><label htmlFor="1d">1</label>
                        <input id="2d" value = "2" type="radio" name="denom"></input><label htmlFor="2d">2</label>
                        <input defaultChecked id="4d" value="4" type="radio" name="denom"></input> <label htmlFor="4d">4</label>
                        <input id="8d" value="8" type="radio" name="denom"></input><label htmlFor="8d">8</label>
                        <input id="16d" value="16" type="radio" name="denom"></input><label htmlFor="16d">16</label>
                        <input id="32d" value="32" type="radio" name="denom"></input><label htmlFor="32d">32</label>


                </div>

                </div>
                <div className={classes.expand} onClick={this.props.toggleSize}></div>

            </React.Fragment>

        )

    }
}

export default Metronome;