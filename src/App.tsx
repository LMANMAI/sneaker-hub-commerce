import { Container, Stack, StackDivider, Box } from "@chakra-ui/react";
import RoutesComponent from "./routes/Routes";
import "./assets/global.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Header, Footer } from "./components";

function App(props: any) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  useEffect(() => {
    const token = localStorage.getItem("idCliente");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid === token) {
        const clientRef = doc(db, "users", token);
        getDoc(clientRef).then((item) => {
          dispatch(setUser(item.data()));
        });
      }
    });
    return unsubscribe();
  }, [props.history, currentUser]);

  return (
    <div style={{ backgroundColor: "#F9FAFC" }}>
      <Header />
      <Container
        maxWidth="container.xl"
        position="relative"
        backgroundColor={"#F9FAFC"}
        padding={"0px"}
      >
        <Stack spacing={0} divider={<StackDivider />}>
          <Box height="fit-content" minHeight="100dvh" marginTop={2} p={4}>
            <RoutesComponent />
          </Box>
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
