

import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAG0Ao0cFen1rBSglvgk-2gi6I6ew9p3yA",
  authDomain: "kawan-25de3.firebaseapp.com",
  databaseURL: "https://kawan-25de3.firebaseio.com",
  projectId: "kawan-25de3",
  storageBucket: "kawan-25de3.appspot.com",
  messagingSenderId: "459434791745",
  appId: "1:459434791745:web:e4410be7ebcf0e7c2447c0",
  measurementId: "G-JNZEBY4T45"
};
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
