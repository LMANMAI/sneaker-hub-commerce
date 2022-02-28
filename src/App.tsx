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
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./app/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const favs = useSelector(selectFavorites);

  const getData = async (id: string) => {
    const docRef = collection(db, id);
    const data = await getDocs(docRef);
    let itemsFav = data.docs.map((doc) => ({
      ...doc.data(),
      idColecction: doc.id,
      toggle: true,
    }));

    itemsFav?.map((item) => {
      dispatch(setFavorites(item));
      dispatch(setIDCollection(item.idColecction));
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        getData(user.uid);
      } else {
        dispatch(setUser(null));
      }
    });

    return unsubscribe();
  }, []);

  useEffect(() => {
    getData(currentUser?.uid);
  }, [favs]);

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
