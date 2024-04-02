import { Stack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPurchases } from "../../functions/Products";
import { selectBasket, clearBasket } from "../../features/sneakersSlice";
import instance from "../../config";

const PostCheckout = ({ userID }: { userID: string }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const basket = useSelector(selectBasket);

  const currentUrl = window.location.href;
  const queryParams: Record<string, string> = {};

  if (currentUrl.includes("-?")) {
    const queryString = currentUrl.split("?")[1];
    const queryParamsArray = queryString.split("&");
    queryParamsArray.forEach((param: any) => {
      const [key, value] = param.split("=");
      queryParams[key] = decodeURIComponent(value);
    });
  }

  const handleCompletePurchase = async () => {
    if (queryParams.status === "approved") {
      const response = await instance.post("/checkout", {
        basket,
      });
      if (response.status === 200) {
        const request = await setPurchases(userID, basket);
        if (request.status === 200) {
          dispatch(clearBasket());
          sessionStorage.removeItem("basketState");
          localStorage.removeItem("basketState");

          navigate("/");
        }
      }
      toast({
        title: "Se realizo la compra correctamente.",
        description: `Vas a poder visualizar la compra en Mis compras con el id: ${queryParams.merchant_order_id}.`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    } else if (queryParams.status === "pending") {
      toast({
        title: "Se esta procesando la compra.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    } else if (
      queryParams.status === "failure" ||
      queryParams.status === "null"
    ) {
      toast({
        title: "Ocurrio un error en la compra.",
        description: "Volve a intentarlo en unos momentos.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    handleCompletePurchase();
  }, []);
  return <Stack marginTop={"60px"}></Stack>;
};

export default PostCheckout;
