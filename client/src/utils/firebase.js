
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyByRKHOVbxNlhdeYnt7uqHLipGNRf8sXT8",
  authDomain: "aiinterviewandresumeanalyzer.firebaseapp.com",
  projectId:  "aiinterviewandresumeanalyzer",
  storageBucket: "aiinterviewandresumeanalyzer.firebasestorage.app",
  messagingSenderId:"294607848962",
  appId:  "1:294607848962:web:086b583b162c4c3fac491b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}