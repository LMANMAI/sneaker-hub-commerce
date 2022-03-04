import { Box } from "@chakra-ui/react";
import React from "react";
import { Footer, Header } from "./";
interface ILayoutProps {
  children?: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box height="fit-content" minHeight="100vh" marginTop={2} p={4}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
