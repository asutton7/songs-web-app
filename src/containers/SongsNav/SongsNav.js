import React, {Component} from 'react';
import Song from '../../components/Songs/Song/Song';
import firebase from '../../firebase';
import classes from './SongsNav.module.css';
import NewSong from '@material-ui/icons/Add';
import NewFolder from '@material-ui/icons/CreateNewFolder';
import GoBack from '@material-ui/icons/ArrowBack'
import {withRouter} from 'react-router-dom';
import EmptySongsNav from './EmptySongsNav/EmptySongsNav';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions'


class SongsNav extends Component {
    state = {
        loading: true
    }
    
    componentDidMount() {
        const db = firebase.firestore();
        let songsArray = [];
        // SORT BY FOLDER THEN SONG BY LAST UPDATED. MAYBE ADD WAY FOR USERS TO SEARCH / SORT BY OTHER OPTIONS
        console.log("users/"+firebase.auth().currentUser.email +"/songs/"+(this.props.openFolderKeys.length > 0 ? this.props.openFolderKeys.join('') : ''));
        db.collection("users/"+firebase.auth().currentUser.email +"/songs/"+(this.props.openFolderKeys.length > 0 ? this.props.openFolderKeys.join('') : ''))
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
                console.log(songsArray);
                this.props.setSongs(songsArray);
                this.setState({loading:false});
            });
            
    }    
    
    songClickHandler = (songId, songTitle) => {       
        this.props.history.push(
            {
                pathname:'songs/' +songId + '/' + songTitle,
            });
    }

    createNewSong = () => {
        const db = firebase.firestore();
        db.collection("users/"+firebase.auth().currentUser.email+"/songs/"+this.props.openFolderKeys.join('')).add(
            {
                isSong: true,
                lyrics: '',
                title: 'NewSong',
                dateLastUpdated: new Date()
            }
        ).then((song) => {
            this.props.history.push({
                pathname: 'songs/' + song.id + '/' + song.title,
            });
        })
    }

    render() {
        let songsList = <p>Loading...</p>
        if(this.props.songs) {
            songsList = this.props.songs.map(song => {  
                return  <Song 
                    id={song.id}
                    lastUpdated = {song.dateLastUpdated}
                    lyrics = {song.lyrics}
                    title = {song.title}
                    isSong = {song.isSong}
                    key = {song.id}
                    songClick= {song.isSong ? this.songClickHandler : this.props.onDrillIn}
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
        if(this.props.openFolderKeys.length > 0) {
            goBackClasses = [...goBackClasses, classes.goBackBtnVisible]
        }
        let breadCrumbs = null;

        return (
        <React.Fragment>
            <div className={classes.SongsNav}>
            {songsList}
            {breadCrumbs}
            </div>
            <div className={classes.buttonsFlex}>
            <button className={goBackClasses.join(' ')} onClick={() => this.props.onDrillOut(this.props.openFolderKeys, this.props.openFolderNames)}><GoBack/></button>
            <button className={classes.addNewSongBtn} onClick={this.createNewSong}><NewSong/></button>
            <button className={classes.addNewFolderBtn}><NewFolder/></button>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        openFolderKeys: state.openFolderKeys,
        openFolderNames: state.openFolderNames,
        songs: state.songs
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDrillIn: (folderKey, folderTitle, openFolderKeys) => dispatch(actionCreators.drillIn(folderKey, folderTitle, [...openFolderKeys, folderKey+'/songs/'] || '')),
        onDrillOut: (openFolderKeys, openFolderNames) => dispatch(actionCreators.drillOut([...openFolderKeys], [...openFolderNames])),
        setSongs: (songsArr) => dispatch(actionCreators.setSongs(songsArr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SongsNav));