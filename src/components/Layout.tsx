import React from "react";
interface ILayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
