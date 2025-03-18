// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfNkodCC9GmkRhtaE60vLeofn8SbiRoQs",
  authDomain: "tle-eliminators-140f7.firebaseapp.com",
  projectId: "tle-eliminators-140f7",
  storageBucket: "tle-eliminators-140f7.firebasestorage.app",
  messagingSenderId: "174758325656",
  appId: "1:174758325656:web:32a42aab3df074b1c50fed",
  measurementId: "G-ELD3TYJ70P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const logout = () => {
  return signOut(auth);
};
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};