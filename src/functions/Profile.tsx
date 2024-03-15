import {
  doc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const collectionref = "users";
const patchPhotos = "profile-images";

//Datos del perfil
export const updateProfile = async (formdata: any) => {
  // const profileref = doc(db, collectionref, formdata.idUser);
  // return await updateDoc(profileref, {
  //   email: formdata.email,
  //   firstName: formdata.firstName,
  //   confirmacion: formdata.confirmacion,
  //   idToken: formdata.idToken,
  //   idUser: formdata.idUser,
  //   method: formdata.method,
  //   profileIMG: formdata.profileIMG,
  //   rol: formdata.rol,
  // });
};

export const updateProfileWhitoutPhoto = async (url: any, id: string) => {
  // const profileRef = doc(db, collectionref, id);
  // await updateDoc(profileRef, {
  //   profileIMG: url === undefined ? null : url,
  // });
};
export const updateProfileWhithPhoto = async (foto: any, id: string) => {
  // const fecha = Date.now();
  // const patch = foto.name + fecha + foto.lastModified + foto.size;
  // const storage = getStorage();
  // const photoRef = ref(storage, `${patchPhotos}/${patch}`);
  // uploadBytes(photoRef, foto)
  //   .then((snapshoot) => {
  //     getDownloadURL(snapshoot.ref).then((url) => {
  //       updateProfileWhitoutPhoto(url, id);
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("error al subir la imagen", error);
  //   });
};

//Direcciones
export const setUserShippingAddress = async (adress: any, idUser: any) => {
  // console.log(adress, idUser);
  // const docRef = doc(db, "users", idUser);
  // const collectRef = collection(docRef, "addresses");
  // try {
  //   const address = await addDoc(collectRef, adress);
  //   return address;
  // } catch (error) {
  //   return "invalid-address";
  // }
};

export const getAddresses = async (idUser: string) => {
  // const docRef = doc(db, "users", idUser);
  // const collRef = collection(docRef, "addresses");
  // try {
  //   const array: any[] = [];
  //   const allAddress = await getDocs(collRef);
  //   allAddress.forEach((doc) => {
  //     array.push({ ...doc.data(), idRef: doc.id });
  //   });
  //   return array;
  // } catch (error) {
  //   return "error-having-addresses";
  // }
};
