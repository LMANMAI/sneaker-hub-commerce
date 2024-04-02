import React from "react";
import { selectUser, selectAutenticated } from "../features/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
interface IProps {
  children: React.ReactNode;
}
const ProtectedComponent: React.FC<IProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const authenticated = useSelector(selectAutenticated);

  if (!user.accessToken && authenticated === false) return <Navigate to="/" />;
  return <>{children}</>;
};

export default ProtectedComponent;
