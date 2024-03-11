import React from "react";
import {
  Stack,
  Image,
  Icon,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import {
  selectBasket,
  selectTotal,
  setBasket,
  removeOnefromBasket,
  removeSneakerBasket,
} from "../../features/sneakersSlice";
import { useSelector, useDispatch } from "react-redux";
import { RemoveIcon } from "../../icons";
import { ISneaker } from "../../interfaces";
import { Link } from "react-router-dom";
interface IProps {
  Fn: Function;
}
const Basket: React.FC<IProps> = ({ Fn }) => {
  const dispatch = useDispatch();
  const basket = useSelector(selectBasket);
  const totalbasket = useSelector(selectTotal);

  const handleRemoveBasket = (sneaker: ISneaker) => {
    if (sneaker.quantity < 1) return;
    dispatch(removeOnefromBasket(sneaker));
  };

  const handleAddBasket = (sneaker: ISneaker) => {
    dispatch(setBasket(sneaker));
  };
  const { colorMode } = useColorMode();
  return (
    <Stack
      position="absolute"
      boxShadow="rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
      right="0px"
      top="60px"
      transition="all 250ms ease"
      borderRadius="15px"
      w={{ base: "98vw", md: "500px" }}
      height="fit-content"
      p={4}
      spacing={2}
      zIndex="99"
      textAlign="center"
      backgroundColor={colorMode === "light" ? "white" : "#1a202c"}
    >
      {basket.length > 0 ? (
        basket.map((sneaker, index) => (
          <Stack
            direction="row"
            alignItems="center"
            key={index}
            justifyContent="center"
          >
            <Image w="40px" h="40px" src={sneaker.posterPathImage} />
            <Stack>
              <Text fontSize="12px">{sneaker.name}</Text>
              <Stack direction="row">
                <Text fontSize="12px">$ {sneaker.price}</Text>
                <Text fontSize="12px">x {sneaker.quantity}</Text>
                <Text fontSize="12px" fontWeight="bold">
                  ${sneaker.price * sneaker.quantity}
                </Text>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              w="20%"
              alignItems="center"
              justifyContent="center"
            >
              <button onClick={() => handleRemoveBasket(sneaker)}>-</button>

              <button onClick={() => handleAddBasket(sneaker)}>+</button>
              <Stack
                cursor="pointer"
                onClick={() => (
                  dispatch(removeSneakerBasket(sneaker)),
                  setTimeout(() => {
                    Fn(false);
                  }, 1000)
                )}
              >
                <Icon as={RemoveIcon} />
              </Stack>
            </Stack>
          </Stack>
        ))
      ) : (
        <p>Todavia no hay productos en el carrito</p>
      )}
      {totalbasket != 0 ? (
        <>
          <Text>Total: $ {totalbasket}</Text>
          <Button
            variant="primary"
            //backgroundColor="primary"
            width="250px"
            alignSelf="center"
          >
            <Link to="/checkout">Checkout</Link>
          </Button>
        </>
      ) : null}
    </Stack>
  );
};

export default Basket;
