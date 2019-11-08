import React, {useState, useEffect, useRef} from 'react';
import classes from './EditorToolbar.module.css';
import {ReactMic} from 'react-mic';
import firebase from '../../../firebase';
import {withRouter} from 'react-router-dom';

const EditorToolbar = (props) => {
    const [recording, setRecording] = useState(false);
    const [firebaseUrl, setFirebaseUrl] = useState("");
    const [audioCurrentDuration, setAudioCurrentDuration] = useState('0:00');
    const [audioCurrentTime, setAudioCurrentTime] = useState('0');
    const [audioDuration, setAudioDuration] = useState('0:00');
    const [initialAudioLoad, setInitialAudioLoad] = useState(true);
    const [playing, setPlaying] = useState(false);
    let storageRef = firebase.storage().ref();
    let userStorageRef = storageRef.child(`songs/${firebase.auth().currentUser.email}`);
    let songStorageRef = userStorageRef.child(props.match.params.id);
    
    useEffect( () => {
        songStorageRef.getDownloadURL().then((url) => {
            setFirebaseUrl(url);
        });
    }, [songStorageRef]);

    const recordingChange = () => {
        setRecording(!recording);
    }

    const onStop = (recordedBlob) => {
        console.log("recordedBlob:", recordedBlob);
        console.log(songStorageRef);
        let audioFile = recordedBlob.blob;
        songStorageRef.put(audioFile).then(() => {
            setFirebaseUrl(songStorageRef.getDownloadURL());
        });
    };

    // const playAudio = () => {
    //     audioPlayer.play();
    //     setPlaying(true);
    // }

    // const stopAudio = () => {
    //     setPlaying(false);
    // }

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
                <button className={classes.saveButton}>Save</button>
                <button className={classes.deleteButton}>Delete</button>
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