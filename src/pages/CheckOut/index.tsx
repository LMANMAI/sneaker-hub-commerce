import {
  Box,
  Stack,
  Text,
  Image,
  Table,
  TableCaption,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectBasket, selectTotal } from "../../features/sneakersSlice";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useEffect } from "react";
const CheckOut = () => {
  const basket = useSelector(selectBasket);
  const totalBasket = useSelector(selectTotal);
  const current_user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!current_user) {
      navigate("/");
    }
  }, [current_user]);

  console.log(basket);
  return (
    <Box marginTop={"60px"}>
      <Text as="h2">CARRITO DE COMPRAS</Text>
      <Stack direction={{ base: "row" }}>
        <Stack flex="1">
          <Stack>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Precio</Th>
                  <Th isNumeric>Cantidad</Th>
                  <Th isNumeric>Subtotal</Th>
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
                      <Td isNumeric>{item.quantity}</Td>
                      <Td isNumeric>
                        {(item.price * item.quantity).toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Stack>
          <Stack> {totalBasket !== 0 && <p>total :{totalBasket}</p>}</Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CheckOut;
