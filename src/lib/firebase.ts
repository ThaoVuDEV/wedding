import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5MCVxFzj7xQvi6_pWd2wjxgi4XJkUov8",
  authDomain: "dienchinh.firebaseapp.com",
  projectId: "dienchinh",
  storageBucket: "dienchinh.firebasestorage.app",
  messagingSenderId: "127524264961",
  appId: "1:127524264961:web:47deffd74c775f2d8e3400",
  measurementId: "G-BN1XF0HTRS",
};

const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
