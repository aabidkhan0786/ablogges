import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCIqxlW_HrcGcbQ1dwzw_7wQRSsdduioQE",
    authDomain: "ablogges.firebaseapp.com",
    projectId: "ablogges",
    storageBucket: "ablogges.appspot.com",
    messagingSenderId: "217871809575",
    appId: "1:217871809575:web:e06581bdb176d603c86202"
  };

  if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const storage = firebase.storage();
  const db = firebase.firestore();
  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

  export {auth,db,storage,serverTimestamp};