import { Header, Layout, Footer } from "./components";
import { Container, Stack, StackDivider } from "@chakra-ui/react";
import RoutesComponent from "./routes/Routes";
import "./assets/global.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function App(props: any) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    //const token = localStorage.setItem("idCliente", user?.idCliente);
    const token = localStorage.getItem("idCliente");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid === token) {
        const clientRef = doc(db, "users", token);
        const docClient = getDoc(clientRef).then((item) => {
          dispatch(setUser(item.data()));
        });
      }
    });
    return unsubscribe();
  }, [user, props.history]);
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
