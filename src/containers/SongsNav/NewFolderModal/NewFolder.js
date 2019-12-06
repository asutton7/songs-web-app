import React, { useState } from 'react';
import classes from './NewFolder.module.css';

const NewFolderModal = (props) => {
    const [folderTitle, setTitle] = useState('');

    return (
        <div className={classes.newFolderContainer}>
            <h2>Name your new folder:</h2>
            <input className={classes.newFolderText} value={folderTitle} onChange={event => setTitle(event.target.value)} type="text"/>
            <div className={classes.buttonsContainer}>
            <button className={classes.createButton} onClick={() => props.createNewFolder(folderTitle)}>Create</button>
            <button className={classes.cancelButton} onClick={props.toggleFolderModal}>Cancel</button>
            </div>
        </div>
    );
}

export default NewFolderModal;