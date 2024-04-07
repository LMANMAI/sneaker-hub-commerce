import React from "react";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
interface IProps {
  children: React.ReactNode;
  userId: string;
}
const ProtectedComponent: React.FC<IProps> = ({ userId, children }) => {
  const user = useSelector(selectUser);

  if (!user.accessToken && userId === "") return <Navigate to="/" />;
  return <>{children}</>;
};

export default ProtectedComponent;
