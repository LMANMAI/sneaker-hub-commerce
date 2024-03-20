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
import { useEffect } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { ISneaker } from "../../interfaces";

const CheckOut = () => {
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
  console.log(basket);
  return (
    <Box marginTop={"60px"}>
      <Text as="h2" margin={"20px 0px"} fontWeight={"bold"}>
        CARRITO DE COMPRAS
      </Text>
      <Stack direction={{ base: "row" }}>
        <Stack flex="1" direction={{ base: "column", md: "row" }}>
          <Stack flex="2">
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
                        {(item.price * item.quantity).toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
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

          <Stack backgroundColor={"white"} flex={1} marginTop={"44px"}>
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

              <Button
                alignItems={"center"}
                gap={"10px"}
                variant="primary"
                onClick={() =>
                  alert("ahora deberia completar el checkout con mercado pago")
                }
              >
                Finalizar compra
                <Icon as={CheckCircleIcon} />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CheckOut;
