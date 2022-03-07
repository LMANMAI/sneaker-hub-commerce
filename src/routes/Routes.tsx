import { Routes, Route } from "react-router-dom";
import {
  Collections,
  Reports,
  NotFound,
  MyOrders,
  Settings,
  Favorites,
  Verification,
} from "../pages";
import { ProtectedComponent } from "../components";
import { BodyContent } from "../components";
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Collections />} />
      <Route path="/:id" element={<BodyContent />} />
      <Route path="/reports" element={<Reports />} />
      {/**Protejer esta ruta */}
      <Route path="/checkverification/*" element={<Verification />} />
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
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default RoutesComponent;
