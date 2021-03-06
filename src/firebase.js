import firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAEeZQj_NCBHDl1tsE-eTOszZYDAvZvW08",
  authDomain: "liverpoolfc-2df96.firebaseapp.com",
  databaseURL: "https://liverpoolfc-2df96.firebaseio.com",
  projectId: "liverpoolfc-2df96",
  storageBucket: "liverpoolfc-2df96.appspot.com",
  messagingSenderId: "614576990786",
  appId: "1:614576990786:web:658baa21db188579"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');
const firebasePositions = firebaseDB.ref('positions');

export {
  firebase,
  firebaseDB,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers,
  firebasePositions
}