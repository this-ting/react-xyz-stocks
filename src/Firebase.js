import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDdbfaxWHfyLR22bK6_sJPrH0-rHNAyNWU',
  authDomain: 'react-xyz-stocks.firebaseapp.com',
  databaseURL: 'https://react-xyz-stocks.firebaseio.com',
  projectId: 'react-xyz-stocks',
  storageBucket: 'react-xyz-stocks.appspot.com',
  messagingSenderId: '309335633325',
  appId: '1:309335633325:web:a8321e55ca9ef500'
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
