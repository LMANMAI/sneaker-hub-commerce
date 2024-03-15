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
  clientToken: any
) => {
  try {
    await setDoc(doc(db, collecion, clientID), {
      email: formData.emailr,
      firstName: formData.firstName,
      method: "correo",
      confirmacion: false,
      rol: "cliente",
      idToken: clientToken,
      idUser: clientID,
      profileIMG:
        "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg",
    });
  } catch (error) {
    console.log("Error registrando el usuario: ", error);
  }
};

export const authClient = async (formData: any) => {
  // return await createUserWithEmailAndPassword(
  //   auth,
  //   formData.emailr,
  //   formData.passwordr
  // )
  //   .then((userCredential) => {
  //     const clientID = userCredential.user.uid;
  //     let clientToken: string;
  //     userCredential.user?.getIdTokenResult(true).then((idToken) => {
  //       clientToken = idToken.token;
  //     });
  //     return sendEmailVerification(userCredential.user).then(() => {
  //       registerClient(formData, clientID, clientToken);
  //       return "Correcto";
  //     });
  //   })
  //   .catch((error) => {
  //     if (error.code === "auth/email-already-in-use") {
  //       return "in_use";
  //     } else if (error.code === "auth/weak-password") {
  //       return "password";
  //     } else {
  //       console.log(error.message);
  //     }
  //   });
};

export const verifyEmail = (actionCode: any) => {
  // var clientEmail = null;
  // return checkActionCode(auth, actionCode)
  //   .then((info) => {
  //     clientEmail = info["data"]["email"];
  //     applyActionCode(auth, actionCode);
  //     return clientEmail;
  //   })
  //   .catch((error) => {
  //     if (error.code === "auth/invalid-action-code") {
  //       return "expire";
  //     } else {
  //       return "error";
  //     }
  //   });
};

export const signAuthUser = async (formData: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user: { idUsuario: string; emailVerified: boolean; token?: string } =
      {
        idUsuario: userCredential.user.uid,
        emailVerified: userCredential.user.emailVerified,
      };

    if (user.emailVerified) {
      const idTokenResult = await userCredential.user.getIdTokenResult(true);
      user.token = idTokenResult.token;
    }
    localStorage.setItem("idCliente", user?.idUsuario);
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const getUserAuth = async (userverified: any) => {
  console.log(userverified, "userverified");
  const id_user = userverified.idUsuario;
  const docClient = await getDoc(doc(db, collecion, id_user));

  return {
    idCliente: id_user,
    ...docClient.data(),
  };
};

export const setUserSignOut = async () => {
  localStorage.clear();
  await signOut(auth);
};
