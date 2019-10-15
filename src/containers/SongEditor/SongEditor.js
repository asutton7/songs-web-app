import React, { Component } from 'react';
import firebase from '../../firebase';
import classes from './SongEditor.module.css';
import Record from '@material-ui/icons/FiberManualRecord'
import Play from '@material-ui/icons/PlayArrow'
import { connect } from 'react-redux';
import '../../react-transitions/react-transitions.css';

class SongEditor extends Component {
    state = {
        lyrics: '',
        title: this.props.match.params.title,
        fetchedWords: []
    }

    componentDidMount() {
        const db = firebase.firestore();
        let song = {
            id: null,
            dateLastUpdated: null,
            lyrics: null,
            title: null
        };
        console.log("users/" + firebase.auth().currentUser.email + "/songs/" + this.props.openFolderKeys.join('') + this.props.match.params.id)
        db.collection("users/" + firebase.auth().currentUser.email + "/songs/" + this.props.openFolderKeys.join(''))
            .doc(this.props.match.params.id)
            .get()
            .then((doc) => {
                song.id = doc.id;
                song.dateLastUpdated = doc.data().dateLastUpdated.toDate().toLocaleString();
                song.lyrics = doc.data().lyrics;
                song.title = doc.data().title;
                this.setState({ lyrics: song.lyrics, title: song.title });
            });
    }

    changeHandler = (evt) => {
        this.setState({ lyrics: evt.target.value });
    }

    wordFunctionHandler = (evt) => {
        if(evt.target.name === 'rhyme') {

        } else {

        }
    }

    render() {
        return (
            <div className={[classes.Container, 'react-transition', 'fade-in'].join(' ')}>
                <div style={{display: 'flex'}}>
                    <h1 className={classes.Header}>{this.state.title}</h1>
                    <input className={classes.wordText} placeholder="Type a word here, or highlight a word in your lyrics."></input>


                </div>
                <div style={{display:'flex', height: '65%'}}>
                <textarea placeholder="Write your lyrics here!" className={classes.LyricInput} cols='max' onChange={(event) => this.changeHandler(event)} value={this.state.lyrics}></textarea>
                <div className={classes.wordResults}>
                <button name='rhyme' className={classes.wordButtons}>Rhyme</button>
                    <button name='synonym' className={classes.wordButtons}>Like</button>
                    {this.state.fetchedWords.length === 0 ? 
                        <div className={classes.noWordsContainer}>
                            <div className={classes.noWords}>
                                no words
                            </div>
                        </div> 
                    : 
                        null}
                </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        openFolderKeys: state.openFolderKeys,
    };
}


export default connect(mapStateToProps)(SongEditor);