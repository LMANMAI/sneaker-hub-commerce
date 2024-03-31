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
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasket,
  selectTotal,
  setBasket,
  removeOnefromBasket,
  removeSneakerBasket,
} from "../../features/sneakersSlice";
import { RemoveIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { ISneaker } from "../../interfaces";
import { getAddresses } from "../../functions/Profile";
import { CustomButtonContainer } from "./styles";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const CheckOut = () => {
  initMercadoPago("YOUR_PUBLIC_KEY", { locale: "es-AR" });
  const [addressarray, setArrayAddresses] = useState<any[]>([]);
  const [value, setValue] = useState<any>();
  const [preferenceId, setPreferenceId] = useState<string>("");

  const basket = useSelector(selectBasket);
  const totalBasket = useSelector(selectTotal);
  const current_user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!current_user) {
      navigate("/");
    }
  }, [current_user]);

  const handleRemoveBasket = (sneaker: ISneaker) => {
    if (sneaker.quantity < 1) return;
    dispatch(removeOnefromBasket(sneaker));
  };

  const handleAddBasket = (sneaker: ISneaker) => {
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
      const response = await axios.post(
        "https://localhost:3000/create_preference",
        {
          title: "Prueba",
          quantity: basket.length,
          price: totalBasket.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          }),
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePurchase = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

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
                <Button
                  alignItems={"center"}
                  gap={"10px"}
                  variant="primary"
                  disabled={!value}
                  className={!value ? "disabled" : ""}
                  onClick={() => handlePurchase()}
                >
                  Finalizar compra
                  <Icon as={CheckCircleIcon} />
                </Button>
                {preferenceId && (
                  <Wallet
                    initialization={{ preferenceId: preferenceId }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                  />
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
