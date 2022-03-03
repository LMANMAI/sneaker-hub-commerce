import {
  applyActionCode,
  checkActionCode,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../app/firebaseConfig";

interface IClient {
  emailr: string;
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
  console.log(formData, clientID, clientToken);
  try {
    await setDoc(doc(db, collecion, clientID), {
      email: formData.emailr,
      firstName: formData.firstName,
      method: "correo",
      confirmacion: false,
      rol: "cliente",
      idToken: clientToken,
      idUser: clientID,
    });
  } catch (error) {
    console.log("Error registrando el usuario: ");
  }
};

export const authClient = (formData: any) => {
  return createUserWithEmailAndPassword(
    auth,
    formData.emailr,
    formData.passwordr
  )
    .then((userCredential) => {
      const clientID = userCredential.user.uid;
      const clientToken = userCredential.user?.accessToken;
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
      } else {
        console.log(error.message);
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

export const setUserSignOut = async () => {
  try {
    await signOut(auth).then(() => {
      localStorage.removeItem("idCliente");
    });
    return "exit";
  } catch (error) {
    console.log(error);
  }
};
