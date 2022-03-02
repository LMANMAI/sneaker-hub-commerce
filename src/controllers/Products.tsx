import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import { ISneaker } from "../interfaces";

export const setFavItems = async (userID: any, sneaker: ISneaker) => {
  const docRef = doc(db, "users", userID.idUser);
  const collRef = collection(docRef, "favorites");
  try {
    const faav = await addDoc(collRef, sneaker);
    return faav;
  } catch (error) {
    console.log(error.message);
    return "No se pudo agregar el producto";
  }
};

export const checkFavs = async (userID: any, sneaker: ISneaker) => {
  const docRef = doc(db, "users", userID?.idUser);
  const collRef = collection(docRef, "favorites");
  try {
    const allDodc = await getDocs(collRef);
    const favs: any[] = [];
    let idRef = "";
    allDodc.forEach((doc) => {
      favs.push({ ...doc.data(), idRef: doc.id });
    });
    const items_exits = favs.find((item) => item._id === sneaker._id);
    if (items_exits) {
      return "existe";
    } else {
      setFavItems(userID, sneaker);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const removeFav = async (userID: any, sneaker: ISneaker) => {
  console.log("Este es el item que tengo que borrar", sneaker);

  const docRef = doc(db, "users", userID.idUser);
  const collRef = collection(docRef, "favorites");
  const favArray: any[] = [];
  try {
    const allDodc = await getDocs(collRef);
    allDodc.forEach((doc) => {
      favArray.push({ ...doc.data(), idRef: doc.id });
    });
    const docExist = favArray.find((item) => item._id === sneaker._id);
    if (docExist) {
      console.log(docExist);
      await deleteDoc(docExist.idRef);
    }
  } catch (error) {
    console.log(error.message);
  }
};
