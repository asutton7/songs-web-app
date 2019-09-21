import React, {Component} from 'react';
import Song from '../../components/Songs/Song/Song';
import firebase from '../../firebase';
import classes from './SongsNav.module.css';
import NewSong from '@material-ui/icons/Add';
import NewFolder from '@material-ui/icons/CreateNewFolder';
import GoBack from '@material-ui/icons/ArrowBack'
import {withRouter} from 'react-router-dom';
import EmptySongsNav from './EmptySongsNav/EmptySongsNav';

class SongsNav extends Component {
    state = {
        songs: [],

        loading: true
    }
    
    componentDidMount() {
        console.log('mounted');
        console.log(firebase.auth().currentUser.email);
        const db = firebase.firestore();
        let songsArray = [];
        // SORT BY FOLDER THEN SONG BY LAST UPDATED. MAYBE ADD WAY FOR USERS TO SEARCH / SORT BY OTHER OPTIONS
        console.log("users/"+firebase.auth().currentUser.email +"/songs/");
        db.collection("users/"+firebase.auth().currentUser.email +"/songs/")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    console.log(doc);
                    songsArray.push({
                        id: doc.id,
                        dateLastUpdated: doc.data().dateLastUpdated.toDate().toLocaleString(),
                        lyrics: doc.data().lyrics,
                        title: doc.data().title,
                        isSong: doc.data().isSong
                    });
                });
                this.setState({songs: songsArray, loading:false});
            });
            
    }    
    
    songClickHandler = (songId, songTitle) => {       
        this.props.history.push(
            {
                pathname:'songs/' +songId + '/' + songTitle,
            });
    }
    // THIS CODE WAS USED FOR THE FOLDER NAVIGATIon. WILL BE CHANGING THIS WITH ADDITION OF REDUX //
    /*folderClickHandler = (folderId, folderTitle) => {
        this.setState({loading:true});

        const db = firebase.firestore();
        let currentDir = [...this.state.currentDir, folderId+'/songs/'];
        let folderTitles = [...this.state.dirFolderTitles, folderTitle];
        let songsArray = [];

        db.collection("users/"+firebase.auth().currentUser.email +"/songs/"+currentDir.join())
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                console.log(doc);
                songsArray.push({
                    id: doc.id,
                    dateLastUpdated: doc.data().dateLastUpdated.toDate().toLocaleString(),
                    lyrics: doc.data().lyrics,
                    title: doc.data().title,
                    isSong: doc.data().isSong
                });
            });
            this.setState({songs: songsArray, loading:false, currentDir: currentDir, dirFolderTitles: folderTitles});
        });


    }

    goBackClickHandler = () => {

        const db = firebase.firestore();
        let currentDir = this.state.currentDir;
        let folderTitles = this.state.dirFolderTitles;
        currentDir.pop();
        folderTitles.pop();
        let songsArray = [];
        
        db.collection("users/"+firebase.auth().currentUser.email +"/songs/"+currentDir.join())
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                console.log(doc);
                songsArray.push({
                    id: doc.id,
                    dateLastUpdated: doc.data().dateLastUpdated.toDate().toLocaleString(),
                    lyrics: doc.data().lyrics,
                    title: doc.data().title,
                    isSong: doc.data().isSong
                });
            });
            this.setState({songs: songsArray, loading:false, currentDir: currentDir, dirFolderTitles: folderTitles});
        });
    }*/

    createNewSong = () => {
        const db = firebase.firestore();
        db.collection("users/"+firebase.auth().currentUser.email+"/songs/"+this.state.currentDir.join()).add(
            {
                isSong: true,
                lyrics: '',
                title: 'NewSong',
                dateLastUpdated: new Date()
            }
        ).then((song) => {
            this.props.history.push({
                pathname: 'songs/' + song.id + '/' + song.title,
                state: {currentDir: this.state.currentDir, dirFolderTitles: this.state.dirFolderTitles},
                props: {navigateToFolder: this.navigateToFolder}
            });
        })
    }

    render() {
        let songsList = <p>Loading...</p>
        console.log(this.state.songs.length);
        if(this.state.songs.length !== 0) {
            songsList = this.state.songs.map(song => {  
                return  <Song 
                    id={song.id}
                    lastUpdated = {song.dateLastUpdated}
                    lyrics = {song.lyrics}
                    title = {song.title}
                    isSong = {song.isSong}
                    key = {song.id}
                    songClick= {song.isSong ? this.songClickHandler : this.folderClickHandler}
                />
            }) 
        } else if(this.state.loading) {
            songsList = <div className={classes.loadingSongsScreen}><div className={classes.loadingIcon}></div></div>;
        } 
        else {
            songsList = <EmptySongsNav/>
        }

        //setting go back button css class and folder bread crumbs
        let goBackClasses = [classes.goBackBtn];
        let breadCrumbs = null;

        return (
        <React.Fragment>
            <div className={classes.SongsNav}>
            {songsList}
            {breadCrumbs}
            </div>
            <button className={goBackClasses.join(' ')} onClick={this.goBackClickHandler}><GoBack/></button>
            <button className={classes.addNewSongBtn} onClick={this.createNewSong}><NewSong/></button>
            <button className={classes.addNewFolderBtn}><NewFolder/></button>
        </React.Fragment>
        );
    }
}

export default withRouter(SongsNav);