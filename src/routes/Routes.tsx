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
        element={<CheckOut user={user || userState?.user || ""} />}
      />
      <Route
        path="/favoritos"
        element={<Favorites userID={userID || userState?.user?.idUser || ""} />}
      />
      <Route
        path="/miscompras"
        element={
          <MyPurchases userID={userID || userState?.user?.idUser || ""} />
        }
      />
      <Route
        path="/postcheckout/:query"
        element={
          <PostCheckout userID={userID || userState?.user?.idUser || ""} />
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
