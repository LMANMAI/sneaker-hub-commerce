import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import { getUserAuth } from "./Sesion";

interface Address {
  id: string;
  prov: string;
  mun: string;
  locald: string;
  direc: {
    piso: string;
    calle: string;
    dpto: string;
    alt: string;
  };
  mainAddress?: boolean;
}

//Datos del perfil
export const updateProfile = async (formdata: any) => {
  try {
    const profileref = doc(db, "users", formdata.idUser);
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
  console.log(idUser);
  try {
    const userDocRef = doc(db, "users", idUser);
    const addressesCollectionRef = collection(userDocRef, "addresses");
    const querySnapshot = await getDocs(addressesCollectionRef);

    let mainAddressFound = false;
    const addresses: Address[] = querySnapshot.docs.map((doc) => {
      const addressData = {
        id: doc.id,
        ...doc.data(),
      } as Address;

      if (!mainAddressFound && addressData.mainAddress) {
        mainAddressFound = true;
        return { ...addressData, mainAddress: true };
      }

      return addressData;
    });

    return addresses;
  } catch (error) {
    console.error("Error al obtener las direcciones:", error);
    throw new Error("Error al obtener las direcciones");
  }
};

export const removeAddress = async (userID: any, addressId: string) => {
  try {
    const userDocRef = doc(db, "users", userID);
    const addressDocRef = doc(userDocRef, "addresses", addressId);
    await deleteDoc(addressDocRef);
    const addresses = await getAddresses(userID);
    return { addresses, status: 200, msg: "" };
  } catch (error) {
    return {
      addresses: [],
      status: 500,
      msg: "Error al eliminar la dirección",
    };
  }
};
