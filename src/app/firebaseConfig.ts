import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// console.log(import.meta.env.API_KEY);

//Base de datos Principal
// const firebaseConfig = {
//   apiKey: "AIzaSyAA4kBMNLGsS4gqjq5eLdlgrElaRGuFm-A",
//   authDomain: "fe-mentors.firebaseapp.com",
//   projectId: "fe-mentors",
//   storageBucket: "fe-mentors.appspot.com",
//   messagingSenderId: "792842318173",
//   appId: "1:792842318173:web:f78c9170c2b38af80cb8b4",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDkGrT3YCt6EnXmxQxbGD_-IASmupo-iH4",
  authDomain: "commerce-168bf.firebaseapp.com",
  projectId: "commerce-168bf",
  storageBucket: "commerce-168bf.appspot.com",
  messagingSenderId: "653344790593",
  appId: "1:653344790593:web:da1ba8a38d140faef10ec0",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
