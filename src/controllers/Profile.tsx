import { doc, updateDoc } from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const collection = "users";
const patchPhotos = "profile-images";
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

export const updateProfileWhitoutPhoto = async (url: any, id: string) => {
  const profileRef = doc(db, collection, id);
  await updateDoc(profileRef, {
    profileIMG: url === undefined ? null : url,
  });
};
export const updateProfileWhithPhoto = async (foto: any, id: string) => {
  const fecha = Date.now();
  const patch = foto.name + fecha + foto.lastModified + foto.size;
  const storage = getStorage();
  const photoRef = ref(storage, `${patchPhotos}/${patch}`);

  uploadBytes(photoRef, foto)
    .then((snapshoot) => {
      getDownloadURL(snapshoot.ref).then((url) => {
        updateProfileWhitoutPhoto(url, id);
      });
    })
    .catch((error) => {
      console.log("error al subir la imagen", error);
    });
};
