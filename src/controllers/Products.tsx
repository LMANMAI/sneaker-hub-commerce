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
import { Favorites } from "../pages";

export const setFavItems = async (
  userID: any,
  sneaker: ISneaker,
  idRef: string
) => {
  const docRef = doc(db, "users", userID.idUser);
  const collRef = collection(docRef, "favorites");
  try {
    // console.log(idRef);
    const faav = await addDoc(collRef, sneaker);
    return faav;
  } catch (error) {
    console.log(error);
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
      setFavItems(userID, sneaker, idRef);
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFav = async (userID: any, sneaker: ISneaker) => {
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
      await deleteDoc(
        doc(db, "users", userID.idUser, "favorites", docExist.idRef)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductsFav = async (user: any) => {
  const docRef = doc(db, "users", user?.idUser);
  const collRef = collection(docRef, "favorites");
  try {
    const array: any[] = [];
    const allFavs = await getDocs(collRef);
    allFavs.forEach((doc) => {
      array.push({ ...doc.data(), idRef: doc.id });
    });
    return array;
  } catch (error) {
    console.log(error);
  }
  console.log(user);
};

export const clearFavs = async (user: any) => {
  try {
    const array = await getProductsFav(user);
    if (array) {
      for (let index = 0; index < array.length; index++) {
        await deleteDoc(
          doc(db, "users", user.idUser, "favorites", array[index].idRef)
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
