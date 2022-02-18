import { Routes, Route } from "react-router-dom";
import { Collections, Reports, NotFound } from "../pages";
import { BodyContent } from "../components";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route index element={<Collections />} />
      <Route path="/sneaker/:id" element={<BodyContent />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
