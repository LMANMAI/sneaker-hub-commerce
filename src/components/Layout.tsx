import { Box } from "@chakra-ui/react";
import React from "react";
interface ILayoutProps {
  children?: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <Box height="fit-content" minHeight="100vh" marginTop={2} p={4}>
      {children}
    </Box>
  );
};

export default Layout;
