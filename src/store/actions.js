import firebase from '../firebase';

export const DRILL_IN = 'DRILL_IN';
export const DRILL_OUT = 'DRILL_OUT';
export const SET_SONGS = "SET_SONGS";
export const MOVE_TO_FOLDER = "MOVE_TO_FOLDER";
export const setSongs = (songsArr) => {
    return {
        type: SET_SONGS,
        songsArr: [...songsArr]
    }
}

export const saveMoveToFolder = (openFolderKeys, openFolderTitles, songsArray) => {
    return {
        type: MOVE_TO_FOLDER,
        fKeys: openFolderKeys,
        fNames: openFolderTitles,
        songsArr: songsArray
    }
}

export const moveToFolder = (targetIndex, openFolders, folderTitles) => {
    return dispatch => {
        let currentLength = openFolders.length;

        if(targetIndex < 0) {
            openFolders = [];
            folderTitles = [];
        } else {
            openFolders.splice(targetIndex+1);
            folderTitles.splice(targetIndex+1);
        }
        if(openFolders.length === currentLength) {
            // do not cause side effects if in same directory.
            return;
        }

        const db = firebase.firestore();
        let songsArray = [];

        console.log(openFolders);
        db.collection("users/"+firebase.auth().currentUser.email+"/songs/"+openFolders.join(''))
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
        dispatch(saveMoveToFolder(openFolders, folderTitles, songsArray));
        });
    }
}

export const saveDrillIn = (folderKey, folderTitle, songsArray) => {
    return {
        type: DRILL_IN,
        fKey: folderKey,
        fName: folderTitle,
        songsArr: songsArray
    };
}

export const drillIn = (folderKey, folderTitle, openFolders) => {
    return dispatch => {
        const db = firebase.firestore();
        let songsArray = [];
        console.log("users/"+firebase.auth().currentUser.email +"/songs/"+openFolders.join(''));
        db.collection("users/"+firebase.auth().currentUser.email +"/songs/"+openFolders.join(''))
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
                dispatch(saveDrillIn(folderKey, folderTitle, songsArray));
            });
    }


}

export const saveDrillOut = (songsArray, openFolderKeys, openFolderNames) => {
    return {
        type: DRILL_OUT,
        songsArr: songsArray,
        openFolderKeys: openFolderKeys,
        openFolderNames: openFolderNames
    }
}

export const drillOut = (openFolderKeys, openFolderNames) => {
    return dispatch => {
        const db = firebase.firestore();
        let songsArray = [];
        openFolderKeys.pop();
        openFolderNames.pop();
        console.log("users/"+firebase.auth().currentUser.email +"/songs/"+(openFolderKeys.length > 0 ? openFolderKeys.join('') : ''));
        db.collection("users/"+firebase.auth().currentUser.email +"/songs/"+(openFolderKeys.length > 0 ? openFolderKeys.join('') : ''))
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
                dispatch(saveDrillOut(songsArray, openFolderKeys, openFolderNames));
            });
    }
}