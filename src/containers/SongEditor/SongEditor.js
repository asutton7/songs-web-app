import React, {Component} from 'react';
import firebase from '../../firebase';
import classes from './SongEditor.module.css';
import Record from '@material-ui/icons/FiberManualRecord'
import Play from '@material-ui/icons/PlayArrow'
import {withRouter} from 'react-router-dom';
import { TweenLite, Tween, Expo } from 'gsap';
import { TimelineLite } from 'gsap';

class SongEditor extends Component {
    constructor(props){
        super(props);
        this.animateHeader = null;
    }
    
    state = {
        lyrics: '',
        title: this.props.match.params.title
    }
    
    componentDidMount () {
        const db = firebase.firestore();
        let song = {
            id: null,
            dateLastUpdated: null,
            lyrics: null,
            title: null
        };
        // SORT BY FOLDER THEN SONG BY LAST UPDATED. MAYBE ADD WAY FOR USERS TO SEARCH / SORT BY OTHER OPTIONS
        db.collection("users/aaronsutton82@gmail.com/songs").doc(this.props.match.params.id)
            .get()
            .then((doc) => {
                console.log(doc.data());
                song.id = doc.data().id;
                song.dateLastUpdated = doc.data().dateLastUpdated;
                song.lyrics = doc.data().lyrics;
                song.title = doc.data().title;  
                this.setState({lyrics: song.lyrics, title: song.title});
            });
    }

    changeHandler = (evt) => {
        this.setState({lyrics: evt.target.value});
    }

    render () {
        return (
                    <div className={classes.Container}>     
                        <div>
                            <h1 className={classes.Header}>{this.state.title}</h1>
                        </div>  
                        <textarea placeholder="Write your lyrics here!" className={classes.LyricInput} cols='max' onChange={(event) => this.changeHandler(event)} value={this.state.lyrics}></textarea>
                        <div className={classes.Toolbar}>
                            <button className={[classes.ActionBtn, classes.Play].join(' ')}><span><Play  /> Play  </span></button>
                            <button className={[classes.ActionBtn, classes.Record].join(' ')}><Record className={classes.icon}/> Rec </button>
                            <hr style={{
                                display: 'inline', 
                                width:'100%',
                                margin:'0px 40px'
                            }}/>
                        </div>
                    </div>
        );

    }
}

export default SongEditor;