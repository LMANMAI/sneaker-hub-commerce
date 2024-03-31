import { Routes, Route } from "react-router-dom";
import {
  Collections,
  NotFound,
  CheckOut,
  Settings,
  Favorites,
  Verification,
  BrandDetail,
} from "../pages";
import { ProtectedComponent } from "../components";
import { BodyContent } from "../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBasket } from "../features/sneakersSlice";
const RoutesComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const basketData = sessionStorage.getItem("basket");
    console.log(basketData);
    if (basketData) {
      const parsedBasket = JSON.parse(basketData);
      parsedBasket.map((item: any) => dispatch(setBasket(item)));
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Collections />} />
      <Route path="/:id" element={<BodyContent />} />
      <Route path="/brand/:brand" element={<BrandDetail />} />
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
