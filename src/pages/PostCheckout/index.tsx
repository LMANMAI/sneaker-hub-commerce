import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PostCheckout = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);
  return (
    <Stack marginTop={"60px"}>
      <Card size={"md"}>
        <CardHeader>
          <Heading size="md">Se completo con exito la compra.</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            Vas a poder visualizar la compra en Mis compras con el codigo:
            {queryParams.merchant_order_id}.
          </Text>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default PostCheckout;
