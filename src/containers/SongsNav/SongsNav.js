import React, {Component} from 'react';
import Song from '../../components/Songs/Song/Song';
import firebase from '../../firebase';
import classes from './SongsNav.module.css';
import NewSong from '@material-ui/icons/Add';
import NewFolder from '@material-ui/icons/CreateNewFolder';
import {withRouter} from 'react-router-dom';
import EmptySongsNav from './EmptySongsNav/EmptySongsNav';

class SongsNav extends Component {
    state = {
        songs: [],
        currentDir: 'root'
    }
    
    componentDidMount() {

        console.log(firebase.auth().currentUser.email);
        const db = firebase.firestore();
        let songsArray = [];
        // SORT BY FOLDER THEN SONG BY LAST UPDATED. MAYBE ADD WAY FOR USERS TO SEARCH / SORT BY OTHER OPTIONS
        db.collection("users/"+firebase.auth().currentUser.email +"/songs")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    songsArray.push({
                        id: doc.data().id,
                        dateLastUpdated: doc.data().dateLastUpdated,
                        lyrics: doc.data().lyrics,
                        title: doc.data().title,
                        isSong: doc.data().isSong
                    });
                });
                this.setState({songs: songsArray});
            });
            
        }
    

    songClickHandler = (songId, songTitle) => {
        this.props.history.push('songs/' +songId + '/' + songTitle);
    }

    render() {
        let songsList = <p>Loading...</p>
        console.log(this.state.songs.length);
        if(this.state.songs.length != 0) {
            songsList = this.state.songs.map(song => {  
                return  <Song 
                    id={song.id}
                    lastUpdated = {song.dateLastUpdated}
                    lyrics = {song.lyrics}
                    title = {song.title}
                    isSong = {song.isSong}
                    key = {song.id}
                    songClick= {this.songClickHandler}
                />
            }) 
        } else {
            songsList = <EmptySongsNav/>
        }


        return (
        <React.Fragment>
            <div className={classes.SongsNav}>
            {songsList}
            </div>
            <button className={classes.addNewSongBtn}><NewSong/></button>
            <button className={classes.addNewFolderBtn}><NewFolder/></button>
        </React.Fragment>
        );
    }
}

export default withRouter(SongsNav);