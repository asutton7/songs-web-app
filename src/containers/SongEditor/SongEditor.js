import React, {Component} from 'react';
import firebase from '../../firebase';
import classes from './SongEditor.module.css';
import Record from '@material-ui/icons/FiberManualRecord'
import Play from '@material-ui/icons/PlayArrow'

class SongEditor extends Component {
    constructor(props){
        super(props);
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
        db.collection("users/" +firebase.auth().currentUser.email+ "/songs/").doc(this.props.match.params.id)
            .get()
            .then((doc) => {
                song.id = doc.id;
                song.dateLastUpdated = doc.data().dateLastUpdated.toDate().toLocaleString();
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