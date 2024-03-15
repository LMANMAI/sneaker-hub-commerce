import { Container, Stack, StackDivider, Box } from "@chakra-ui/react";
import RoutesComponent from "./routes/Routes";
import "./assets/global.css";
import { Header, Footer } from "./components";

function App() {
  return (
    <div style={{ backgroundColor: "#edeeef" }}>
      <Header />
      <Container
        maxWidth="container.xl"
        position="relative"
        backgroundColor={"#edeeef"}
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
