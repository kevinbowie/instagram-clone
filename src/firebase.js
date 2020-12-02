import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBltGDYMBwBFhryGKMeeTCLrlRL1RdnUDI",
  authDomain: "instagram-clone-0211.firebaseapp.com",
  databaseURL: "https://instagram-clone-0211.firebaseio.com",
  projectId: "instagram-clone-0211",
  storageBucket: "instagram-clone-0211.appspot.com",
  messagingSenderId: "371241635579",
  appId: "1:371241635579:web:c66b477a71e8842df5ea5e",
  measurementId: "G-XMZYMCX7WH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
