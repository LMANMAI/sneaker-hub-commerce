import { Header, Layout, Footer } from "./components";
import { Container, Stack, StackDivider } from "@chakra-ui/react";
import RoutesComponent from "./routes/Routes";
import "./assets/global.css";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <Container maxWidth="container.lg" overflow="hidden">
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
