
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBHgi3E2IyzlAAI4NRAk5RCV-FdME9uA9k",
    authDomain: "songwriterssuite-1f53f.firebaseapp.com",
    databaseURL: "https://songwriterssuite-1f53f.firebaseio.com",
    projectId: "songwriterssuite-1f53f",
    storageBucket: "songwriterssuite-1f53f.appspot.com",
    messagingSenderId: "671317064035",
    appId: "1:671317064035:web:484596e935b9f512",
    name: 'Songs'
  };


firebase.initializeApp(firebaseConfig);

export default firebase;    