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
  console.log(userID);
  const docRef = doc(db, "users", userID?.uid);
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
      const addedItemRef = await setFavItems(userID.uid, sneaker._id);
      return addedItemRef ? "agregado" : "No se pudo agregar el producto";
    }
  } catch (error) {
    console.log(error);
    return "No se pudo verificar los favoritos";
  }
};

export const removeFav = async (userID: any, sneaker: ISneaker) => {
  const docRef = doc(db, "users", userID.uid);
  const collRef = collection(docRef, "favorites");
  const favArray: any[] = [];
  try {
    const allDodc = await getDocs(collRef);
    allDodc.forEach((doc) => {
      favArray.push({ ...doc.data(), idRef: doc.id });
    });
    const docExist = favArray.find((item) => item.sneaker === sneaker._id);
    if (docExist) {
      await deleteDoc(
        doc(db, "users", userID.uid, "favorites", docExist.idRef)
      );
    }
  } catch (error) {
    console.log(error);
    return "No se pudo eliminar de los favoritos";
  }
};

export const getProductsFav = async (user: any) => {
  const docRef = doc(db, "users", user?.uid);
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
    const { uid } = user;
    const favsCollectionRef = collection(db, "users", uid, "favorites");
    const favsSnapshot = await getDocs(favsCollectionRef);
    const deletePromises = favsSnapshot.docs.map((doc) => {
      return deleteDoc(doc.ref);
    });

    await Promise.all(deletePromises);

    console.log("Todos los favoritos han sido eliminados correctamente.");
    return "eliminados";
  } catch (error) {
    console.error("Error al intentar eliminar los favoritos:", error);
  }
};
