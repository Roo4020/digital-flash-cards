import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC8oLrqqFbNP7IcuMeQpj7eOUo5Q8BJY5s",
    authDomain: "digital-flash-cards.firebaseapp.com",
    databaseURL: "https://digital-flash-cards.firebaseio.com",
    projectId: "digital-flash-cards",
    storageBucket: "digital-flash-cards.appspot.com",
    messagingSenderId: "810850775470",
    appId: "1:810850775470:web:4314e7c95176057e95583f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION);

createApp(App).use(store).use(router).mount('#app')