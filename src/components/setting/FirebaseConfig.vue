<script lang="ts">
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
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
  appId: "1:198387957066:web:94815acc51b7e715be55b3",
  measurementId: "G-R95ZZWE9YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default app;
</script>