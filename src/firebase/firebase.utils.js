import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDktSwFpfXXdsb15zLE08rbtNmVBXLz3F8",
    authDomain: "crwn-db-8f8e3.firebaseapp.com",
    databaseURL: "https://crwn-db-8f8e3.firebaseio.com",
    projectId: "crwn-db-8f8e3",
    storageBucket: "",
    messagingSenderId: "845709277104",
    appId: "1:845709277104:web:62e44c160a0511d6"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;