import React, { Component } from 'react';
import Song from '../../components/Songs/Song/Song';
import firebase from '../../firebase';
import classes from './SongsNav.module.css';
import NewSong from '@material-ui/icons/Add';
import NewFolder from '@material-ui/icons/CreateNewFolder';
import GoBack from '@material-ui/icons/ArrowBack'
import { withRouter } from 'react-router-dom';
import EmptySongsNav from '../../components/EmptySongsNav/EmptySongsNav';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions'
import NewFolderModal from '../../components/NewFolderModal/NewFolder';

class SongsNav extends Component {
    state = {
        loading: true,
        folderModal: false
    }

    componentDidMount() {
        const db = firebase.firestore();
        let songsArray = [];
        // SORT BY FOLDER THEN SONG BY LAST UPDATED. MAYBE ADD WAY FOR USERS TO SEARCH / SORT BY OTHER OPTIONS
        console.log("users/" + (firebase.auth().currentUser.isAnonymous ? "sampleuser" : firebase.auth().currentUser.email) + "/songs/" + (this.props.openFolderKeys.length > 0 ? this.props.openFolderKeys.join('') : ''));
        db.collection("users/" + (firebase.auth().currentUser.isAnonymous ? "sampleuser" : firebase.auth().currentUser.email) + "/songs/" + (this.props.openFolderKeys.length > 0 ? this.props.openFolderKeys.join('') : ''))
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
                this.setState({ loading: false });
            });

    }

    songClickHandler = (songId, event) => {
        this.props.history.push(
            {
                pathname: 'songs/' + songId,
            });
    }

    createNewSong = () => {
        if (firebase.auth().currentUser.isAnonymous) {
            alert("You can only do this if you create an account. Click the X in the top right and sign in with Google to get started.");
            return;
        }
        const db = firebase.firestore();
        db.collection("users/" + firebase.auth().currentUser.email + "/songs/" + this.props.openFolderKeys.join('')).add(
            {
                isSong: true,
                lyrics: '',
                title: 'NewSong',
                dateLastUpdated: new Date()
            }
        ).then((song) => {
            this.props.history.push({
                pathname: 'songs/' + song.id,
            });
        })


    }

    deleteSong = (id, event) => {
        if (firebase.auth().currentUser.isAnonymous) {
            alert("You can only do this if you create an account. Click the X in the top right and sign in with Google to get started.");
            event.stopPropagation();
            return;
        }
        const db = firebase.firestore();
        const conf = window.confirm("Are you sure you want to delete this song?");
        if (conf)
            db.collection("users/" + firebase.auth().currentUser.email + "/songs/" + this.props.openFolderKeys.join('')).doc(id).delete().then(() => {
                db.collection("users/" + firebase.auth().currentUser.email + "/songs/" + (this.props.openFolderKeys.length > 0 ? this.props.openFolderKeys.join('') : ''))
                    .get()
                    .then((querySnapshot) => {
                        let songsArray = [];

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
                    })
            });

        event.stopPropagation();
    }

    toggleFolderModal = () => {
        this.setState({ folderModal: !this.state.folderModal });
    }

    createNewFolder = (name) => {
        if (firebase.auth().currentUser.isAnonymous) {
            alert("You can only do this if you create an account. Click the X in the top right and sign in with Google to get started.");
            return;
        }
        const db = firebase.firestore();
        console.log(name);
        db.collection("users/" + firebase.auth().currentUser.email + "/songs/" + this.props.openFolderKeys.join('')).add(
            {
                isSong: false,
                lyrics: '',
                title: name,
                dateLastUpdated: new Date()
            }).then(() => {
                db.collection("users/" + firebase.auth().currentUser.email + "/songs/" + (this.props.openFolderKeys.length > 0 ? this.props.openFolderKeys.join('') : ''))
                    .get()
                    .then((querySnapshot) => {
                        let songsArray = [];

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
                        this.setState({ loading: false, folderModal: false });
                    });
            });

    }

    render() {
        let songsList = <p>Loading...</p>
        if (this.props.songs.length > 0) {
            songsList = this.props.songs.map(song => {
                return <Song
                    id={song.id}
                    lastUpdated={song.dateLastUpdated}
                    lyrics={song.lyrics}
                    title={song.title}
                    isSong={song.isSong}
                    key={song.id}
                    songClick={song.isSong ? this.songClickHandler : this.props.onDrillIn}
                    deleteSong={this.deleteSong}
                />
            })
        } else if (this.state.loading) {
            songsList = <div className={classes.loadingSongsScreen}><div className={classes.loadingIcon}></div></div>;
        }
        else {
            songsList = <EmptySongsNav />
        }

        //setting go back button css class and folder bread crumbs
        let goBackClasses = [classes.goBackBtn];
        if (this.props.openFolderKeys.length > 0) {
            goBackClasses = [...goBackClasses, classes.goBackBtnVisible]
        }

        return (
            <React.Fragment>
                {this.state.folderModal ? <NewFolderModal createNewFolder={(name) => this.createNewFolder(name)} toggleFolderModal={this.toggleFolderModal} /> : null}
                <div className={this.state.loading ? [classes.SongsNav] : [classes.SongsNav, 'react-transition', 'swipe-up'].join(' ')}>
                    {songsList}
                </div>
                <div className={classes.buttonsFlex}>
                    <button className={goBackClasses.join(' ')} onClick={() => this.props.onDrillOut(this.props.openFolderKeys, this.props.openFolderNames)}><GoBack /></button>
                    <button className={classes.addNewSongBtn} onClick={this.createNewSong}><NewSong /></button>
                    <button className={classes.addNewFolderBtn} onClick={this.toggleFolderModal}><NewFolder /></button>
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
        onDrillIn: (folderKey, folderTitle, openFolderKeys) => dispatch(actionCreators.drillIn(folderKey, folderTitle, [...openFolderKeys, folderKey + '/songs/'] || '')),
        onDrillOut: (openFolderKeys, openFolderNames) => dispatch(actionCreators.drillOut([...openFolderKeys], [...openFolderNames])),
        setSongs: (songsArr) => dispatch(actionCreators.setSongs(songsArr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SongsNav));