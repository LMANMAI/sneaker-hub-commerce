import { Routes, Route } from "react-router-dom";
import {
  Collections,
  NotFound,
  CheckOut,
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

      <Route path="checkverification/*" element={<Verification />} />
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
          // <ProtectedComponent>
          //   <CheckOut />
          // </ProtectedComponent>
          <CheckOut />
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
