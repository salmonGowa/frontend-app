import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy8V-Lys2xxrj0RlU5g5joJWFQpJ_im6A",
  authDomain: "salms-c7bd8.firebaseapp.com",
  projectId: "salms-c7bd8",
  storageBucket: "salms-c7bd8.firebasestorage.app",
  messagingSenderId: "192954297145",
  appId: "1:192954297145:web:17ba2a05be1aa5eb5256e8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();