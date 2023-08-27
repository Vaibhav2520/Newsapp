import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCch7oOFv7npTO_kT9mQAjqzfTHShZhZXA",
  authDomain: "newsapp-6d.firebaseapp.com",
  projectId: "newsapp-6d",
  storageBucket: "newsapp-6d.appspot.com",
  messagingSenderId: "815921399507",
  appId: "1:815921399507:web:d122eb6c1b1bf14ef53626",
  measurementId: "G-93W3TWE0MK"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { app, auth };