
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAAF8xSdnLkWMO6z4rETIb1nPbT1PA1Ywg",
  authDomain: "fbtc-7d1a8.firebaseapp.com",
  projectId: "fbtc-7d1a8",
  storageBucket: "fbtc-7d1a8.appspot.com",
  messagingSenderId: "521334848190",
  appId: "1:521334848190:web:1f0f455d35f314ffe83cef",
  measurementId: "G-C9065W1E9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth , provider};