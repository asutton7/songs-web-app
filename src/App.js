import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import SongsNav from './containers/SongsNav/SongsNav';
import Layout from './containers/Layout/Layout';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import SongEditor from './containers/SongEditor/SongEditor';
import {TransitionGroup} from 'react-transition-group';
import withFirebaseAuth from 'react-with-firebase-auth';
import firebase from './firebase';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import 'firebase/auth';

function App() {

  return ( 
    <div className={styles.App}>
        <BrowserRouter>
          <Layout>  
          </Layout>   
        </BrowserRouter>   

    </div>
  );
}

export default App;
