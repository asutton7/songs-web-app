import * as actionTypes from './actions';

const initialState ={
    openFolderKeys: [],
    openFolderNames: [],
    songs: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.DRILL_IN:
            return {
                openFolderKeys: [...state.openFolderKeys, action.fKey+'/songs/'],
                openFolderNames: [...state.openFolderNames, action.fName],
                songs: [...action.songsArr]
            }
        case actionTypes.DRILL_OUT:
            return {
                openFolderKeys: [...action.openFolderKeys],
                openFolderNames: [...action.openFolderNames],
                songs: [...action.songsArr]    
            }
        case actionTypes.SET_SONGS :
            return{
                ...state,
                songs: [...action.songsArr]
            }
        case actionTypes.MOVE_TO_FOLDER: 
            return {
                openFolderKeys: [...action.fKeys],
                openFolderNames: [...action.fNames],
                songs: [...action.songsArr]
            }
        default: return state;
    }
}


export default reducer;