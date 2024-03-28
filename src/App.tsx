import { Container, Stack, StackDivider, Box } from "@chakra-ui/react";
import RoutesComponent from "./routes/Routes";
import "./assets/global.css";
import { Header, Footer } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";
import { auth } from "./app/firebaseConfig";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const shouldApplyBackgroundColor = location.pathname.startsWith("/brand");

  useEffect(() => {
    // Mantengo la sesion iniciada
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: any) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("authToken", token);
        dispatch(setUser(firebaseUser));
      } else {
        localStorage.removeItem("authToken");
        dispatch(setUser(null));
      }
    });

    return unsubscribe;
  }, []);

  console.log(shouldApplyBackgroundColor);
  return (
    <div
      style={{
        backgroundColor: !shouldApplyBackgroundColor
          ? "#edeeef"
          : "transparent",
      }}
    >
      <Header />
      <Container
        maxWidth={!shouldApplyBackgroundColor ? "container.xl" : ""}
        p={!shouldApplyBackgroundColor ? "0px 20px" : "0px"}
        position="relative"
      >
        <Stack spacing={0} divider={<StackDivider />}>
          <Box height="fit-content" minHeight="100dvh" p={"10px 0px"}>
            <RoutesComponent />
          </Box>
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
