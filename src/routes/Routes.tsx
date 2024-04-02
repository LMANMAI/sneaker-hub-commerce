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
import { ProtectedComponent } from "../components";
import { BodyContent } from "../components";
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Collections />} />
      <Route path="/:id" element={<BodyContent />} />
      <Route path="/brand/:brand" element={<BrandDetail />} />
      <Route
        path="/configuraciones"
        element={
          <ProtectedComponent>
            <Settings />
          </ProtectedComponent>
        }
      />
      <Route path="/checkout" element={<CheckOut />} />
      <Route
        path="/favoritos"
        element={
          <ProtectedComponent>
            <Favorites />
          </ProtectedComponent>
        }
      />
      <Route
        path="/miscompras"
        element={
          <ProtectedComponent>
            <MyPurchases />
          </ProtectedComponent>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/postcheckout" element={<PostCheckout />} />
    </Routes>
  );
};

export default RoutesComponent;
