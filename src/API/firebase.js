/* eslint-disable no-plusplus */
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCQMY48wRtIw4xsJTtgRsUYa8m3mz4XpHs',
    authDomain: 'care-sync-web-v4.firebaseapp.com',
    projectId: 'care-sync-web-v4',
    storageBucket: 'care-sync-web-v4.appspot.com',
    messagingSenderId: '100822148575',
    appId: '1:100822148575:web:2d720401587b49a661106a',
};

// Initialize Firebase
firebase.initializeApp(config);

export const db = firebase.firestore();

export default firebase;
