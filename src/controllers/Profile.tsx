import { doc, updateDoc } from "firebase/firestore";
import { db } from "../app/firebaseConfig";

const collection = "users";
export const updateProfile = async (formdata: any) => {
  const profileref = doc(db, collection, formdata.idUser);

  return await updateDoc(profileref, {
    email: formdata.email,
    firstName: formdata.firstName,
    confirmacion: formdata.confirmacion,
    idToken: formdata.idToken,
    idUser: formdata.idUser,
    method: formdata.method,
    profileIMG: formdata.profileIMG,
    rol: formdata.rol,
  });
};
