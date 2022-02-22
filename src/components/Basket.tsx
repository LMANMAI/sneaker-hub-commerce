import React, { useMemo } from "react";
import { Stack, Image, Icon, Text, Button } from "@chakra-ui/react";
import {
  selectBasket,
  selectTotal,
  setBasket,
  removeOnefromBasket,
  removeSneakerBasket,
} from "../features/sneakersSlice";
import { useSelector, useDispatch } from "react-redux";
import { RemoveIcon } from "../icons";
import { ISneaker } from "../interfaces";
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

  return (
    <Stack
      position="absolute"
      border="1px solid #e9e9e9"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      right="0px"
      top="60px"
      transition="all 250ms ease"
      backgroundColor="#FFF"
      borderRadius="15px"
      w={{ base: "90vw", md: "300px" }}
      minHeight="200px"
      p={6}
      spacing={2}
      zIndex="99"
      textAlign="center"
    >
      {basket.length > 0 ? (
        basket.map((sneaker, index) => (
          <Stack direction="row" alignItems="center" key={index}>
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
            <Stack direction="row" w="20%" alignItems="center">
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
          <Button colorScheme="primary">Checkout</Button>
        </>
      ) : null}
    </Stack>
  );
};

export default Basket;
