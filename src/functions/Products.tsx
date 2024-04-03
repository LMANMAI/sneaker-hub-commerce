import {
  doc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import { ISneaker } from "../interfaces";

export const setFavItems = async (userID: string, sneaker: string) => {
  const docRef = doc(db, "users", userID);
  const collRef = collection(docRef, "favorites");
  try {
    const faav = await addDoc(collRef, { sneaker });
    return faav;
  } catch (error) {
    console.log(error);
    return "No se pudo agregar el producto";
  }
};

export const checkFavs = async (userID: any, sneaker: ISneaker) => {
  const docRef = doc(db, "users", userID);
  const collRef = collection(docRef, "favorites");
  try {
    const allDocs = await getDocs(collRef);
    const favs: any[] = [];
    allDocs.forEach((doc) => {
      favs.push({ ...doc.data(), idRef: doc.id });
    });

    const itemExists = favs.find((item) => item.sneaker === sneaker._id);
    if (itemExists) {
      return "existe";
    } else {
      const addedItemRef = await setFavItems(userID, sneaker._id);
      return addedItemRef ? "agregado" : "No se pudo agregar el producto";
    }
  } catch (error) {
    console.log(error);
    return "No se pudo verificar los favoritos";
  }
};

export const removeFav = async (userID: any, sneaker: ISneaker) => {
  const docRef = doc(db, "users", userID);
  const collRef = collection(docRef, "favorites");
  const favArray: any[] = [];
  try {
    const allDodc = await getDocs(collRef);
    allDodc.forEach((doc) => {
      favArray.push({ ...doc.data(), idRef: doc.id });
    });
    const docExist = favArray.find((item) => item.sneaker === sneaker._id);
    if (docExist) {
      await deleteDoc(doc(db, "users", userID, "favorites", docExist.idRef));
      const favitems = await getProductsFav(userID);
      return favitems;
    }
  } catch (error) {
    console.log(error);
    return {
      msg: "No se pudo eliminar de los favoritos",
      status: 500,
      data: [],
    };
  }
};

export const getProductsFav = async (user: any) => {
  const docRef = doc(db, "users", user);
  const collRef = collection(docRef, "favorites");
  try {
    const array: any[] = [];
    const allFavs = await getDocs(collRef);
    allFavs.forEach((doc) => {
      array.push({ ...doc.data(), idRef: doc.id });
    });
    return { data: array, status: 200 };
  } catch (error) {
    console.log(error);
    return { data: [], status: 500 };
  }
};

export const clearFavs = async (user: any) => {
  try {
    const favsCollectionRef = collection(db, "users", user, "favorites");
    const favsSnapshot = await getDocs(favsCollectionRef);
    const deletePromises = favsSnapshot.docs.map((doc) => {
      return deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises);
    return "eliminados";
  } catch (error: any) {
    console.error("Error al intentar eliminar los favoritos:", error);
    return `Error al intentar eliminar los favoritos: ${error.mesagge}`;
  }
};

export const setPurchases = async (userID: string, sneaker: any) => {
  const docRef = doc(db, "users", userID);
  const collRef = collection(docRef, "purchases");
  try {
    const purchase = await addDoc(collRef, { sneaker });
    return { purchase: purchase, status: 200, msg: "" };
  } catch (error) {
    console.log(error);
    return { msg: "No se pudo agregar el producto", status: 500, purchase: [] };
  }
};

export const getMyPurchases = async (user: any) => {
  const docRef = doc(db, "users", user);
  const collRef = collection(docRef, "purchases");
  try {
    const array: any[] = [];
    const allP = await getDocs(collRef);
    allP.forEach((doc) => {
      array.push({ ...doc.data(), idRef: doc.id });
    });
    return { data: array, status: 200 };
  } catch (error) {
    console.log(error);
    return { data: [], status: 500 };
  }
};
