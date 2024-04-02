import { Routes, Route } from "react-router-dom";
import {
  Collections,
  NotFound,
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

  const loadUserState = () => {
    const hasAUser = sessionStorage.getItem("user");
    if (hasAUser === null) {
      return undefined;
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
        element={<Settings user={user || userState.user} />}
      />
      <Route
        path="/checkout"
        element={<CheckOut userID={user.idUser || userState.user.idUser} />}
      />
      <Route
        path="/favoritos"
        element={<Favorites userID={user.idUser || userState.user.idUser} />}
      />
      <Route
        path="/miscompras"
        element={<MyPurchases userID={user.idUser || userState.user.idUser} />}
      />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/postcheckout/:query"
        element={<PostCheckout userID={user.idUser || userState.user.idUser} />}
      />
    </Routes>
  );
};

export default RoutesComponent;
