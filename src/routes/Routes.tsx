import { Routes, Route } from "react-router-dom";
import { Collections, Reports } from "../pages";
import { BodyContent } from "../components";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/*" element={<Collections />} />
      <Route path="/Collections" element={<Collections />} />
      <Route path="/Collections/*" element={<Collections />} />
      <Route path="/Collections/:id" element={<BodyContent />} />
      <Route path="/Reports" element={<Reports />} />
      <Route path="*" element={<div>NotFound</div>} />
    </Routes>
  );
};

export default RoutesComponent;
