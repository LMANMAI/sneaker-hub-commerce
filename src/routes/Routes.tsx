import { Routes, Route } from "react-router-dom";
import {
  Collections,
  CheckOut,
  Settings,
  Favorites,
  BrandDetail,
  PostCheckout,
  MyPurchases,
} from "../pages";
import ProtectedComponent from "./ProtectedComponent";
import { BodyContent } from "../components";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const RoutesComponent = () => {
  const user = useSelector(selectUser);

  const userID = user ? user.idUser : "";

  const loadUserState = () => {
    const hasAUser = sessionStorage.getItem("user");
    if (hasAUser === null) {
      return {};
    }
    return JSON.parse(hasAUser);
  };
  const userState = loadUserState();

  return (
    <Routes>
      <Route path="/" element={<Collections />} />
      <Route path="/:id" element={<BodyContent />} />
      <Route path="/brand/:brand" element={<BrandDetail />} />
      <Route
        path="/configuraciones"
        element={<Settings user={user || userState?.user || ""} />}
      />
      <Route
        path="/checkout"
        element={
          <ProtectedComponent userId={userID || userState?.user?.idUser || ""}>
            <CheckOut user={user || userState?.user || ""} />
          </ProtectedComponent>
        }
      />
      <Route
        path="/favoritos"
        element={
          <ProtectedComponent userId={userID || userState?.user?.idUser || ""}>
            <Favorites userID={userID || userState?.user?.idUser || ""} />
          </ProtectedComponent>
        }
      />
      <Route
        path="/miscompras"
        element={
          <ProtectedComponent userId={userID || userState?.user?.idUser || ""}>
            <MyPurchases userID={userID || userState?.user?.idUser || ""} />
          </ProtectedComponent>
        }
      />

      <Route
        path="/postcheckout/:query"
        element={
          <ProtectedComponent userId={userID || userState?.user?.idUser || ""}>
            <PostCheckout />
          </ProtectedComponent>
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
