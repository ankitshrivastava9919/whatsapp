import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCRdSlj20A-HuqsF00Wmgugr1z9TPAr6DA",
    authDomain: "whatsapp-ankit.firebaseapp.com",
    projectId: "whatsapp-ankit",
    storageBucket: "whatsapp-ankit.appspot.com",
    messagingSenderId: "418150181261",
    appId: "1:418150181261:web:ddd4d04d506e7c446075c4",
    measurementId: "G-K7G4196LT5"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;