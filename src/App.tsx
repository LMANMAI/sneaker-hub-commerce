import { Header, BodyContent, Footer } from "./components";
import { Container, Stack, StackDivider } from "@chakra-ui/react";
import Layout from "./components/Layout";
function App() {
  return (
    <Container maxWidth="container.lg">
      <Stack spacing={0} divider={<StackDivider />}>
        <Header />
        <BodyContent />
        <Footer />
      </Stack>
    </Container>
  );
}

export default App;
