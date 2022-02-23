import React from "react";
import { selectUser, selectAutenticated } from "../features/userSlice";
import { useSelector } from "react-redux";
interface IProps {
  children: React.ReactNode;
}
const ProtectedComponent: React.FC<IProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const authenticated = useSelector(selectAutenticated);
  if (!user && authenticated === false) return null;
  return <div>{children}</div>;
};

export default ProtectedComponent;
