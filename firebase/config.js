// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfWufi00269wHqr-I5ETdHeUOrEHKsqdg",
  authDomain: "sign-up-in-346710.firebaseapp.com",
  projectId: "sign-up-in-346710",
  storageBucket: "sign-up-in-346710.appspot.com",
  messagingSenderId: "117246456364",
  appId: "1:117246456364:web:657800d0f5c96812219789",
  measurementId: "G-H2GJLPBJV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;