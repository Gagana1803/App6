//firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjJ2V2yfcmvbSETo2MgFXcTqBaxfRL2nI",
  authDomain: "app5-6ce10.firebaseapp.com",
  projectId: "app5-6ce10",
  storageBucket: "app5-6ce10.appspot.com",
  messagingSenderId: "759903058934",
  appId: "1:759903058934:web:dc895c8f5725643eb5e5d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;
