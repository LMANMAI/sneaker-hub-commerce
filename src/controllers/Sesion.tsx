import {
  applyActionCode,
  checkActionCode,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../app/firebaseConfig";

interface IClient {
  email: string;
  firstName: string;
  method?: string;
  confirmacion?: boolean;
  rol?: string;
}

const collecion = "users";

export const registerClient = async (
  formData: IClient,
  clientID: string,
  clientToken: string
) => {
  console.log("cliente id", clientID);
  try {
    await setDoc(doc(db, collecion, clientID), {
      email: formData.email,
      firstName: formData.firstName,
      method: "correo",
      confirmacion: false,
      rol: "cliente",
      idToken: clientToken,
    });
  } catch (error) {
    console.log("Error registrando el usuario");
  }
};

export const authClient = (formData: any) => {
  return createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      const clientID = userCredential.user.uid;
      const clientToken = userCredential.user.accessToken;
      return sendEmailVerification(userCredential.user).then(() => {
        registerClient(formData, clientID, clientToken);
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

export const signAuthUser = (formData: any) => {
  return signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      const emailverified = userCredential.user.emailVerified;
      const user = {
        idUsuario: userCredential?.user?.uid,
        token: userCredential?.user?.accessToken,
      };
      if (emailverified) {
        return user;
      } else {
        return "noverificado";
      }
    })
    .catch((error) => {
      if (error.code === "auth/wrog-password") {
        return "contraseñaIncorreta";
      } else {
        return "error";
      }
    });
};

export const getUserAuth = async (userverified: any) => {
  const id_user = userverified.idUsuario;
  const clientRef = doc(db, collecion, id_user);
  const docClient = await getDoc(clientRef);
  return {
    idCliente: id_user,
    ...docClient.data(),
  };
};
