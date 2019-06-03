import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBz7EtsB5KjAiXwnmlR0wEUnTjYGF1Jvko",
    authDomain: "sync-way.firebaseapp.com",
    databaseURL: "https://sync-way.firebaseio.com",
    projectId: "sync-way",
    storageBucket: "sync-way.appspot.com",
    messagingSenderId: "260224707509",
    appId: "1:260224707509:web:42ff5146a8347324"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;