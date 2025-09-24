import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0L1E4SddbxDqVHjoxJi6gTv7nzNlrCjE",
    authDomain: "app-gio-aula-01.firebaseapp.com",
    projectId: "app-gio-aula-01",
    storageBucket: "app-gio-aula-01.appspot.com", // NÃO ALTERE O .appspot.com
    messagingSenderId: "1066454838582",
    appId: "1:1066454838582:web:92f7878be9ff04b1a81797"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);