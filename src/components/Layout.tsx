import { Box } from "@chakra-ui/react";
import React from "react";
interface ILayoutProps {
  children?: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <Box minHeight="70vh" h="100%" marginTop={2} p={4}>
      {children}
    </Box>
  );
};

export default Layout;
