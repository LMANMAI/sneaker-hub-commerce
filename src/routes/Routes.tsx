import { Routes, Route } from "react-router-dom";
import {
  Collections,
  NotFound,
  CheckOut,
  Settings,
  Favorites,
  BrandDetail,
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
        path="/settings"
        element={
          <ProtectedComponent>
            <Settings />
          </ProtectedComponent>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedComponent>
            <CheckOut />
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
