import { Layout } from "./components";
import { Container, Stack, StackDivider } from "@chakra-ui/react";
import RoutesComponent from "./routes/Routes";
import "./assets/global.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function App(props: any) {
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);
  return (
    <Container maxWidth="container.xl" position="relative">
      <Stack spacing={0} divider={<StackDivider />}>
        <Layout>
          <RoutesComponent />
        </Layout>
      </Stack>
    </Container>
  );
}

export default App;
