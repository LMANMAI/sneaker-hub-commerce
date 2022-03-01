import {
  applyActionCode,
  checkActionCode,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../app/firebaseConfig";
interface IClient {
  email: string;
  firstName: string;

  method?: string;
  confirmacion?: boolean;
  rol?: string;
}
const collecion = "users";
export const registerClient = async (formData: IClient, clientID: string) => {
  try {
    await setDoc(doc(db, collecion, clientID), {
      email: formData.email,
      firstName: formData.firstName,
      method: "correo",
      confirmacion: false,
      rol: "cliente",
    });
  } catch (error) {
    console.log("Error registrando el usuario");
  }
};

export const authClient = (formData: any) => {
  return createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      console.log("user: ", userCredential);
      const clientID = userCredential.user.uid;
      return sendEmailVerification(userCredential.user).then(() => {
        registerClient(formData, clientID);
        return "Correcto";
      });
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        return "in_use";
      } else if (error.code === "auth/weak-password") {
        return "password";
      }
    });
};

export const verifyEmail = (actionCode: any) => {
  var clientEmail = null;
  return checkActionCode(auth, actionCode)
    .then((info) => {
      console.log("Info: ", info);
      clientEmail = info["data"]["email"];
      applyActionCode(auth, actionCode);
      return clientEmail;
    })
    .catch((error) => {
      if (error.code === "auth/invalid-action-code") {
        return "expire";
      } else {
        return "error";
      }
    });
};
