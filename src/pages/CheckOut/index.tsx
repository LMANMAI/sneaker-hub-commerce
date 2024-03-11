import { Box, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectBasket, selectTotal } from "../../features/sneakersSlice";

const CheckOut = () => {
  const basket = useSelector(selectBasket);
  const totalBasket = useSelector(selectTotal);

  return (
    <Box>
      <Text as="h2">CheckOut</Text>
      <Stack direction={{ base: "column", md: "row" }}>
        <Stack flex="1">
          <Stack>
            {basket.map((item) => (
              <p key={item._id}>{item.name}</p>
            ))}
          </Stack>
          <p>Direccion</p>
        </Stack>
        <Stack w="150px">
          <p>""ticket""</p>
          {totalBasket !== 0 && <p>{totalBasket}</p>}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CheckOut;
