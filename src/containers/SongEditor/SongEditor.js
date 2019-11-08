import React, { Component } from 'react';
import firebase from '../../firebase';
import classes from './SongEditor.module.css';
import { connect } from 'react-redux';
import '../../react-transitions/react-transitions.css';
import Words from '../../api/datamuseAgent';
import Word from './WordComponent/Word';
import EditorToolbar from './EditorToolbar/EditorToolbar';
import OverlayContainer from '../OverlayContainer/OverlayContainer';

class SongEditor extends Component {
    state = {
        lyrics: '',
        title: '',
        fetchedWords: [],
        loadingWords: false,
        selectedWord: '',
        songId: ""
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
                this.setState({ lyrics: song.lyrics, title: song.title, songId: song.id });
            });
    }

    changeHandler = (evt) => {
        this.setState({ lyrics: evt.target.value });
    }

    selectedWordChangeHandler = (evt) => {
        this.setState({ selectedWord: evt.target.value });
    }

    wordFunctionHandler = async (evt) => {
        const word = this.state.selectedWord;
        this.setState({ loadingWords: true });
        if (evt.target.name === 'rhyme') {
            const wordsList = await Words.rhymeList(word);
            this.setState({ fetchedWords: [...wordsList], loadingWords: false })
        } else {
            const wordsList = await Words.synonymList(word);
            this.setState({ fetchedWords: [...wordsList], loadingWords: false })
        }
    }



    render() {

        return (
            <div className={[classes.Container, 'react-transition', 'fade-in'].join(' ')}>
                <div style={{ display: 'flex' }}>
                    <h1 className={classes.Header}>{this.state.title}</h1>
                    <input value={this.state.selectedWord} onChange={this.selectedWordChangeHandler} className={classes.wordText} placeholder="Type a word here, or highlight a word in your lyrics."></input>


                </div>
                <div style={{ display: 'flex', height: '65%' }}>
                    <textarea placeholder="Write your lyrics here!" className={classes.LyricInput} cols='max' onChange={(event) => this.changeHandler(event)} value={this.state.lyrics}></textarea>
                    <div className={classes.wordResults}>
                        <div style={{ display: 'flex' }}>
                            <button onClick={this.wordFunctionHandler} name='rhyme' className={classes.wordButtons}>Rhyme</button>
                            <button onClick={this.wordFunctionHandler} name='synonym' className={classes.wordButtons}>Like</button>
                        </div>
                        {this.state.fetchedWords.length === 0 && !this.state.loadingWords ?
                            <div className={classes.noWordsContainer}>
                                <div className={classes.noWords}>
                                    no words
                                </div>
                            </div>
                            :
                            this.state.loadingWords ?
                                <div className={classes.loadingIcon}></div>
                                :
                                <div className={classes.wordResultsContainer}>
                                    {this.state.fetchedWords.map((wordObj, index) => (
                                        <Word word={wordObj.word} />
                                    ))}
                                </div>}
                    </div>
                </div>
                <EditorToolbar songId={this.state.songId}/>
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