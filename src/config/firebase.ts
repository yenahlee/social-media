// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY0flKIBya-uCKxVuxeSf9jMX563fadi0",
  authDomain: "social-media-ecaf5.firebaseapp.com",
  projectId: "social-media-ecaf5",
  storageBucket: "social-media-ecaf5.appspot.com",
  messagingSenderId: "651003600768",
  appId: "1:651003600768:web:0086c433ff1239d7d2ab65",
  measurementId: "G-8PZX2B8K8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);