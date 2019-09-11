import React from 'react';
import styles from './Song.module.css';
import MoreVert from '@material-ui/icons/MoreVert'
import Folder from '@material-ui/icons/Folder';
import {NavLink} from 'react-router-dom';

const song = (props) => {
    let LorF = null;
    if(props.isSong){
        LorF = props.lyrics;
    } else {
        LorF = <Folder/>;
    }

    return (
        <div onClick={() => props.songClick(props.id, props.title)} className={props.isSong ? styles.Song : [styles.Song, styles.Folder].join(' ')}>
            <p className={styles.SongTitle}>{props.title}</p>
            <MoreVert className={styles.optionsBtn}/>
            <p className={styles.Lyrics}>{LorF}</p>
            <div className={styles.InfoRow}>
                <div className={styles.SongDate}>{props.lastUpdated}</div>
            </div>

        </div>
    )
}

export default song;