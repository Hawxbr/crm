import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBLGZqyIg9vnS-zFyHEbDNQPD8dTIq4tbA",
    authDomain: "hawx-crm.firebaseapp.com",
    projectId: "hawx-crm",
    storageBucket: "hawx-crm.appspot.com",
    messagingSenderId: "133107730383",
    appId: "1:133107730383:web:6d3b9f4580a271e08674ba",
    measurementId: "G-HWHLVWP9PH"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, "gs://controle-de-cobranca.appspot.com");

export { db, storage  };