import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { Collections } from "../pages";
import { BodyContent } from "../components";
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<BodyContent />} />
      <Route path="/Collections" element={<Collections />} />
      <Route path="/Men" element={<div>MenPage</div>} />
      <Route path="/Woman" element={<div>WomanPage</div>} />
      <Route path="/Contact" element={<div>ContactPage</div>} />
      <Route path="*" element={<div>NotFound</div>} />
    </Routes>
  );
};

export default RoutesComponent;
