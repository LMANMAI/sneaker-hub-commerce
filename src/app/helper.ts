import { ISneaker } from "../interfaces";
// import { db } from "../app/firebaseConfig";
// import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectUser } from "../features/userSlice";
// import {
//   removeFromFavorites,
//   clenFav,
//   setFavorites,
// } from "../features/sneakersSlice";

// const dispatch = useDispatch();
// const currentUser = useSelector(selectUser);
// const docRef = collection(db, currentUser.uid);
// const [itemsFav, setFavoritesF] = useState<any[]>();

function filterByGender(sneakers: ISneaker[], gender: string) {
  return sneakers.filter((item) => item.genre === gender);
}

function filterByBrand(sneakers: ISneaker[], brand: string) {
  return sneakers.filter((item) => item.brand === brand);
}

export { filterByGender, filterByBrand };

// export const deleteFav = async (id: string) => {
//   const currentFav = doc(db, currentUser.uid, id);
//   await deleteDoc(currentFav);
// };

// export const getData = async () => {
//   const data = await getDocs(docRef);
//   setFavoritesF(
//     data.docs.map((doc) => ({ ...doc.data(), idColecction: doc.id }))
//   );
//   itemsFav?.map((item) => {
//     dispatch(setFavorites(item));
//   });
// };
