// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBtwlgaAmqFR9rpQ-b6chUDV-6QGaNdnQ",
  authDomain: "order-n-pay.firebaseapp.com",
  projectId: "order-n-pay",
  storageBucket: "order-n-pay.appspot.com",
  messagingSenderId: "198387957066",
  appId: "1:198387957066:web:37cd03ae01e54e79be55b3",
  measurementId: "G-4QG8HNSB8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = getAuth

export default app;