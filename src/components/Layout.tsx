import { Box, Button, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Footer, Header } from "./";
interface ILayoutProps {
  children?: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const [counter, setCounter] = useState<number>(10);
  return (
    <>
      <Header limit={counter} />
      <Box height="fit-content" minHeight="100vh" marginTop={2} p={4}>
        {children}
      </Box>
      <Stack alignItems="center" justifyContent="center">
        <Button w="fit-content" onClick={() => setCounter(counter + 10)}>
          ver mas
        </Button>
      </Stack>
      <Footer />
    </>
  );
};

export default Layout;
