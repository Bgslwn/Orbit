import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDG1QaO6ZXgcX4bV8mnxO4PsyTrBiVGyI",
    authDomain: "orbit-d853f.firebaseapp.com",
    projectId: "orbit-d853f",
    storageBucket: "orbit-d853f.appspot.com",
    messagingSenderId: "918788571879",
    appId: "1:918788571879:web:4fbaee3871717313575842",
    measurementId: "G-D6HLEQKJTK"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };