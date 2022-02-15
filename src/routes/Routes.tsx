import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import { Collections } from "../pages";
import { BodyContent } from "../components";
const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/*" element={<Collections />} />
      <Route path="/Collections" element={<Collections />} />
      <Route path="/Collections/:sneakername" element={<BodyContent />} />
      <Route path="/Contact" element={<div>ContactPage</div>} />
      <Route path="*" element={<div>NotFound</div>} />
    </Routes>
  );
};

export default RoutesComponent;
