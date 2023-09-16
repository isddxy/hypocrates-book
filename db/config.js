import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCEW0KSsI-fhUGgC66qhrExXSL70Re2Jz8",
    authDomain: "hypocrates-book.firebaseapp.com",
    databaseURL: "https://hypocrates-book-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hypocrates-book",
    storageBucket: "hypocrates-book.appspot.com",
    messagingSenderId: "589976586335",
    appId: "1:589976586335:web:8a77750c25a760d34cf3ea",
    measurementId: "G-PC3J6DX8NV"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const db = firebase.firestore();

export const getTasks = () => {
    return db.collection('tasks')
        .get()
        .then(result => result.docs)
        .then(docs => docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        createdAt: doc.data().createdAt,
        completedAt: doc.data().completedAt,
        isTask: doc.data().isTask,
        })))
}

export { firebase };