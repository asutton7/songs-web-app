import React from 'react';
import styles from './Song.module.css';
import Delete from '@material-ui/icons/Delete'
import Folder from '@material-ui/icons/Folder';
import {connect} from 'react-redux';

const song = (props) => {
    let LorF = null;
    if(props.isSong){
        LorF = props.lyrics;
    } else {
        LorF = <Folder/>;
    }

    return (
        <div onClick={(e) => props.songClick(props.id, props.title, [...props.openFolderKeys], e)} className={props.isSong ? styles.Song : [styles.Song, styles.Folder].join(' ')}>
            <p className={styles.SongTitle}>{props.title}</p>
            <Delete className={styles.optionsBtn} onClick={(e) => props.deleteSong(props.id, e)}/>
            <p className={styles.Lyrics}>{LorF}</p>
            <div className={styles.InfoRow}>
                <div className={styles.SongDate}>{props.lastUpdated}</div>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        openFolderKeys: state.openFolderKeys,
    };
}

export default connect(mapStateToProps)(song);