import { Header, Layout, Footer } from "./components";
import { Container, Stack, StackDivider } from "@chakra-ui/react";
import RoutesComponent from "./routes/Routes";
import "./assets/global.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./features/userSlice";
import {
  setFavorites,
  selectFavorites,
  setIDCollection,
} from "./features/sneakersSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./app/firebaseConfig";
import { getDocs, collection, onSnapshot, query } from "firebase/firestore";
import { ISneaker } from "./interfaces";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const favs = useSelector(selectFavorites);
  const [favsdata, setDataFav] = useState<any[]>([]);

  // const getData = async (id: string) => {
  //   const docRef = collection(db, id);
  //   const data = await getDocs(docRef);
  //   let itemsFav = data.docs.map((doc) => ({
  //     ...doc.data(),
  //     toggle: true,
  //   }));

  //   itemsFav?.map((item) => {
  //     dispatch(setFavorites(item));
  //   });
  // };
  const getData = async (id: string) => {
    const q = await query(collection(db, id));
    await onSnapshot(q, (querySnapshot) => {
      setDataFav(
        querySnapshot.docs.map((doc) => ({
          favsdata: doc.data(),
        }))
      );
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        if (typeof user?.uid === "string") {
          getData(user?.uid);
        }
        console.log(favsdata);
      } else {
        dispatch(setUser(null));
      }
    });
    return unsubscribe();
  }, []);
  useEffect(() => {}, []);

  return (
    <Container maxWidth="container.xl" position="relative">
      <Stack spacing={0} divider={<StackDivider />}>
        <Header />
        <Layout>
          <RoutesComponent />
        </Layout>
        <Footer />
      </Stack>
    </Container>
  );
}

export default App;
