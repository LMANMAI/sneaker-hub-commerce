import {
  Box,
  Stack,
  Text,
  Image,
  Table,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
  Divider,
  Button,
  Icon,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasket,
  selectTotal,
  setBasket,
  removeOnefromBasket,
  removeSneakerBasket,
  clearBasket,
} from "../../features/sneakersSlice";
import { RemoveIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { ISneakerBasket } from "../../interfaces";
import { getAddresses } from "../../functions/Profile";
import { setPurchases } from "../../functions/Products";
import { CustomButtonContainer } from "./styles";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import instance from "../../config";

const CheckOut = () => {
  const navigate = useNavigate();
  const toast = useToast();
  initMercadoPago(import.meta.env.VITE_PUBLIC_KEY_MP as string, {
    locale: "es-AR",
  });
  const [addressarray, setArrayAddresses] = useState<any[]>([]);
  const [value, setValue] = useState<any>();
  const [preferenceId, setPreferenceId] = useState<string | null>("");
  const [laodingPreference, setLoadingPreference] = useState<boolean>(false);

  const basket = useSelector(selectBasket);
  const totalBasket = useSelector(selectTotal);
  const current_user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleRemoveBasket = (sneaker: ISneakerBasket) => {
    if (sneaker.quantity < 1) return;
    dispatch(removeOnefromBasket(sneaker));
  };

  const handleAddBasket = (sneaker: ISneakerBasket) => {
    dispatch(setBasket(sneaker));
  };
  const getUserAddresses = async () => {
    const request = await getAddresses(current_user.uid);
    if (request) {
      setArrayAddresses(request);
    }
  };

  const createPreference = async () => {
    try {
      const productsData = basket.map((item: ISneakerBasket) => {
        return {
          title: item.name,
          quantity: item.quantity,
          price: item.price,
          productID: item._id,
        };
      });
      const response = await instance.post(
        "/checkout/create_preference",
        productsData
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };
  const handlePurchase = async () => {
    setLoadingPreference(true);
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      setLoadingPreference(false);
    }
  };

  const handleCompletePurchase = async () => {
    const currentUrl = window.location.href;
    const queryParams: Record<string, string> = {};

    if (currentUrl.includes("?")) {
      const queryString = currentUrl.split("?")[1];
      const queryParamsArray = queryString.split("&");
      queryParamsArray.forEach((param: any) => {
        const [key, value] = param.split("=");
        queryParams[key] = decodeURIComponent(value);
      });
    }
    if (queryParams.status === "approved") {
      const response = await instance.post("/checkout", {
        basket,
      });
      if (response.status === 200) {
        const request = await setPurchases(current_user.uid, basket);
        if (request.status === 200) {
          dispatch(clearBasket());
          sessionStorage.clear();
          localStorage.clear();
          navigate("/");
        }
      }
      setPreferenceId(null);

      toast({
        title: "Se realizo la compra correctamente.",
        description: `Vas a poder visualizar la compra en Mis compras con el id: ${queryParams.merchant_order_id}.`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    } else if (queryParams.status === "pending") {
      setPreferenceId(null);
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
      setPreferenceId(null);
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

  useEffect(() => {
    getUserAddresses();
  }, []);

  return (
    <Box marginTop={"60px"}>
      <Text as="h2" margin={"20px 0px"} fontWeight={"bold"}>
        CARRITO DE COMPRAS
      </Text>
      <Stack direction={{ base: "row" }}>
        <Stack flex="1" direction={{ base: "column", md: "row" }}>
          <Stack flex="2">
            <Stack>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                    <Th>Precio</Th>
                    <Th isNumeric display={{ base: "none", md: "table-cell" }}>
                      Cantidad
                    </Th>
                    <Th isNumeric display={{ base: "none", md: "table-cell" }}>
                      Subtotal
                    </Th>
                    <Th display={{ base: "none", md: "table-cell" }}></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {basket.map((item) => {
                    return (
                      <Tr background={"white"} marginBottom="8px">
                        <Td>
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            gap={"10px"}
                          >
                            <Image
                              w="40px"
                              h="40px"
                              src={`${import.meta.env.VITE_URL_EP_CLOUD}${
                                item.posterPathImage
                              }`}
                            />
                            <Text>{item.name}</Text>
                          </Box>
                        </Td>
                        <Td>
                          {item.price.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </Td>
                        <Td
                          display={{ base: "none", md: "table-cell" }}
                          isNumeric
                        >
                          <Stack direction={"row"}>
                            <button
                              style={{
                                padding: "2px 5px",
                                background: "#e4e4e4",
                                color: "black",
                                borderRadius: "5px",
                              }}
                              onClick={() => handleRemoveBasket(item)}
                            >
                              -
                            </button>
                            <Text> {item.quantity}</Text>
                            <button
                              style={{
                                padding: "2px 5px",
                                background: "#e4e4e4",
                                color: "black",
                                borderRadius: "5px",
                              }}
                              onClick={() => handleAddBasket(item)}
                            >
                              +
                            </button>
                          </Stack>
                        </Td>
                        <Td
                          display={{ base: "none", md: "table-cell" }}
                          isNumeric
                        >
                          {(item.price * item.quantity).toLocaleString(
                            "es-AR",
                            {
                              style: "currency",
                              currency: "ARS",
                            }
                          )}
                        </Td>
                        <Td display={{ base: "none", md: "table-cell" }}>
                          <Stack
                            cursor="pointer"
                            onClick={() => dispatch(removeSneakerBasket(item))}
                          >
                            <Icon as={RemoveIcon} />
                          </Stack>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Stack>
            <Stack marginTop={10}>
              <Text>Enviar a esta dirección</Text>
              {addressarray.length != 0 ? (
                <Stack alignItems="center" p={4}>
                  <RadioGroup
                    value={value}
                    onChange={setValue}
                    defaultValue={
                      addressarray
                        .filter((item) => item.mainAddress === true)
                        .map((item) => item.id)[0]
                    }
                  >
                    {addressarray.map((item) => {
                      return (
                        <Radio name="direccion" value={`${item.id}`}>
                          <Stack p={4} direction="row" alignItems="center">
                            <Stack>
                              <Stack>
                                <Text>{`${item.prov} ${item.mun}`}</Text>
                              </Stack>
                              <Text>
                                {`${item.direc.calle} ${item.direc.alt}`}
                                {" - "}
                                {item.locald}
                              </Text>
                            </Stack>
                          </Stack>
                        </Radio>
                      );
                    })}
                  </RadioGroup>
                </Stack>
              ) : (
                <Text>Por el momento no se ingreso ninguna direccion</Text>
              )}
            </Stack>
          </Stack>

          <Stack
            backgroundColor={"white"}
            flex={1}
            marginTop={"44px"}
            height={"fit-content"}
          >
            <Text
              bg="#E4E4E4"
              fontSize="18px"
              fontWeight="600"
              letterSpacing="0.9px"
              lineHeight="initial"
              padding="16px 0"
              textAlign="center"
              textTransform="uppercase"
              width="100%"
            >
              RESUMEN DE COMPRA
            </Text>

            <Stack p="10px 35px" m="15px 0px">
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Text>Subtotal</Text>
                <Text>
                  {totalBasket !== 0 &&
                    totalBasket.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                </Text>
              </Stack>

              <Divider />

              <Stack direction={"row"} justifyContent={"space-between"}>
                <Text>Total</Text>
                <Text>
                  {totalBasket !== 0 &&
                    totalBasket.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                </Text>
              </Stack>
              <CustomButtonContainer>
                {preferenceId ? (
                  <Stack>
                    <Wallet
                      initialization={{ preferenceId: preferenceId }}
                      customization={{
                        texts: { valueProp: "practicality" },
                      }}
                    />
                  </Stack>
                ) : (
                  <Button
                    alignItems={"center"}
                    gap={"10px"}
                    variant="primary"
                    disabled={!value || !current_user || basket.length === 0}
                    className={
                      basket.length === 0 || !value || !current_user
                        ? "disabled"
                        : ""
                    }
                    onClick={() => handlePurchase()}
                    isLoading={laodingPreference}
                  >
                    Finalizar compra
                    <Icon as={CheckCircleIcon} />
                  </Button>
                )}
              </CustomButtonContainer>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CheckOut;
