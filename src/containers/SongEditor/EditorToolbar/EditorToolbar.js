import React, {useState, useEffect} from 'react';
import classes from './EditorToolbar.module.css';
import {ReactMic} from 'react-mic';
import firebase from '../../../firebase';
import {withRouter} from 'react-router-dom';

const EditorToolbar = (props) => {
    const [recording, setRecording] = useState(false);
    const [firebaseUrl, setFirebaseUrl] = useState("");

    let storageRef = firebase.storage().ref();
    let userStorageRef = storageRef.child(`songs/${firebase.auth().currentUser.email}`);
    let songStorageRef = userStorageRef.child(props.match.params.id);
    
    useEffect( () => {
        try{
            songStorageRef.getDownloadURL().then((url) => {
                setFirebaseUrl(url);
            }, () => {});
        } catch(ex) {
            console.log(ex.message);
        }

    }, [songStorageRef]);

    const recordingChange = () => {
        setRecording(!recording);
    }

    const onStop = (recordedBlob) => {
        if (firebase.auth().currentUser.isAnonymous) {
            alert("You can only do this if you create an account. Click the X in the top right and sign in with Google to get started.");
            return;
        }
        console.log("recordedBlob:", recordedBlob);
        console.log(songStorageRef);
        let audioFile = recordedBlob.blob;
        songStorageRef.put(audioFile).then(() => {
            setFirebaseUrl(songStorageRef.getDownloadURL());
        });
    };


    return (
        <div className={classes.Toolbar}>
            {/* <button>Play</button>
            <button>Stop</button> */}
            <button onClick={recordingChange}>{recording ? "Stop" : "Record"}</button>
            {/* <p>{audioCurrentDuration}</p> */}
            <audio style={{width: '75%', margin: '0px 2.5%', height: '70%'}} src={firebaseUrl} controls />
            {/* <input name="songSeek" type='range' value={audioCurrentTime} min='0' max={audioDuration ? audioDuration : 100  }/>
            <p>{audioDuration}</p> */}
            <div className={classes.actionButtons}>
                <button className={classes.saveButton} onClick={props.saveSong}>Save</button>
                <button onClick={props.exit}>Exit</button>
            </div>
            <ReactMic 
                record={recording}
                onStop={onStop}
                mimeType="audio/mp3"
            />
        </div>
    )
}

export default withRouter(EditorToolbar);