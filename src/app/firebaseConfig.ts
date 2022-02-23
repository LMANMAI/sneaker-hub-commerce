import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAA4kBMNLGsS4gqjq5eLdlgrElaRGuFm-A",
  authDomain: "fe-mentors.firebaseapp.com",
  projectId: "fe-mentors",
  storageBucket: "fe-mentors.appspot.com",
  messagingSenderId: "792842318173",
  appId: "1:792842318173:web:f78c9170c2b38af80cb8b4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
