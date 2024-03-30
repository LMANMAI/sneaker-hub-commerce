import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../app/firebaseConfig";

export const getUserAuth = async (user: any) => {
  const docClient = await getDoc(doc(db, "users", user));

  return {
    idCliente: user,
    ...docClient.data(),
  };
};

export const registerClient = async (
  user: any,
  clientID: string,
  clientToken: any
) => {
  if (!user.emailforRegister && !user.passwordforRegister) return;
  try {
    await setDoc(doc(db, "users", clientID), {
      email: user.emailforRegister,
      firstName: user.displayName,
      idToken: clientToken,
      idUser: clientID,
      profileIMG:
        "https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg",
    });
    const userRegistered = await getUserAuth(clientID);
    return userRegistered;
  } catch (error) {
    console.log("Error registrando el usuario: ", error);
  }
};

export const authClient = async (user: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.emailforRegister,
      user.passwordforRegister
    );

    const clientID = userCredential.user.uid;
    const idToken = await userCredential.user.getIdTokenResult(true);
    const clientToken = idToken.token;
    const request = await registerClient(user, clientID, clientToken);
    return { msg: "Correcto", userRegistered: request };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      return { msg: "in_use", error: "" };
    } else if (error.code === "auth/weak-password") {
      return { msg: "password", error: "" };
    } else {
      console.log(
        "Error al autenticar el cliente, mensaje de error desde el serv: ",
        error.message
      );
      return { msg: "error", error: error.message };
    }
  }
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
      localStorage.setItem("authToken", user.token);
    }

    localStorage.setItem("idCliente", user.idUsuario);
    const request = await getUserAuth(user.idUsuario);
    return request;
  } catch (error) {
    console.error(error);
  }
};

export const setUserSignOut = async () => {
  localStorage.clear();
  await signOut(auth);
};
