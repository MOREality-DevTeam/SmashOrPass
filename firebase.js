// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzIiEeM1XmqoPuVHG0mKPxlqLM03x2Xlo",
  authDomain: "smashorpass-d347h.firebaseapp.com",
  projectId: "smashorpass-d347h",
  storageBucket: "smashorpass-d347h.appspot.com",
  messagingSenderId: "829561224169",
  appId: "1:829561224169:web:57915005ed98bc61692978"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };