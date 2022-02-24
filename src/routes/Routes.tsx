import { Routes, Route } from "react-router-dom";
import {
  Collections,
  Reports,
  NotFound,
  MyOrders,
  Settings,
  Favorites,
} from "../pages";
import { ProtectedComponent } from "../components";
import { BodyContent } from "../components";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route index element={<Collections />} />
      <Route path="/sneaker/:id" element={<BodyContent />} />
      <Route path="/reports" element={<Reports />} />

      <Route
        path="/settings"
        element={
          <ProtectedComponent>
            <Settings />
          </ProtectedComponent>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedComponent>
            <MyOrders />
          </ProtectedComponent>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedComponent>
            <Favorites />
          </ProtectedComponent>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
