import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import { getUserAuth } from "./Sesion";
//Datos del perfil
export const updateProfile = async (formdata: any) => {
  try {
    const profileref = doc(db, "users", formdata.uid);
    await updateDoc(profileref, {
      email: formdata.email,
      firstName: formdata.firstName,
      accessToken: formdata.accessToken,
      uid: formdata.uid,
      profileIMG: formdata.profileIMG,
    });
    const request = await getUserAuth(formdata.uid);
    return { data: request, status: 200, msg: "" };
  } catch (error: any) {
    return { data: [], status: 500, msg: error.message };
  }
};

//Direcciones
export const setUserShippingAddress = async (adress: any, idUser: any) => {
  const docRef = doc(db, "users", idUser);
  const collectRef = collection(docRef, "addresses");
  try {
    await addDoc(collectRef, adress);
    const address = await getAddresses(idUser);
    return { data: address, status: 200, msg: "" };
  } catch (error: any) {
    return { data: [], msg: error.msg, status: 500 };
  }
};

export const getAddresses = async (idUser: string) => {
  try {
    const userDocRef = doc(db, "users", idUser);
    const addressesCollectionRef = collection(userDocRef, "addresses");
    const querySnapshot = await getDocs(addressesCollectionRef);

    const firstAddress = querySnapshot.docs[0]
      ? {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
          mainAddress: true,
        }
      : null;
    const addresses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return [firstAddress, ...addresses];
  } catch (error) {
    console.error("Error al obtener las direcciones:", error);
    throw new Error("Error al obtener las direcciones");
  }
};
