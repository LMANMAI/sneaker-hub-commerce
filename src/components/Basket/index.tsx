import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Text,
  Image,
  Stack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import {
  selectBasket,
  selectTotal,
  setBasket,
  removeOnefromBasket,
  selectExceedsLimit,
  removeSneakerBasket,
} from "../../features/sneakersSlice";
import { useSelector, useDispatch } from "react-redux";
import { RemoveIcon } from "../../icons";
import { ISneakerBasket } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
interface IProps {
  setBasketShows: Function;
  basketshows: boolean;
}

const Basket: React.FC<IProps> = ({ basketshows, setBasketShows }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useNavigate();

  const basket = useSelector(selectBasket);
  const totalbasket = useSelector(selectTotal);
  const currentUser = useSelector(selectUser);
  const exceedsLimit = useSelector(selectExceedsLimit);

  const handleRemoveBasket = (sneaker: ISneakerBasket) => {
    dispatch(removeOnefromBasket(sneaker));
  };

  const handleAddBasket = (sneaker: ISneakerBasket) => {
    if (exceedsLimit) {
      toast({
        title: "La cantidad ingresada excede el límite.",
        description: `El limite de unidades para este producto es de ${sneaker.limit}.`,
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
    dispatch(setBasket(sneaker));
  };

  const handleCheckout = async () => {
    if (currentUser !== null) {
      history(`/checkout`);
      setBasketShows(false);
    } else {
      toast({
        title: "Inicia sesion.",
        description:
          "Es necesario que inicies sesion para completar la compra.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Drawer
      isOpen={basketshows}
      placement="right"
      onClose={() => setBasketShows(false)}
      size={"sm"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Carrito</DrawerHeader>

        <DrawerBody>
          {basket && basket.length > 0 ? (
            basket.map((sneaker, index) => (
              <Stack
                direction="row"
                alignItems="center"
                key={index}
                justifyContent="space-around"
              >
                <Image
                  w="40px"
                  h="40px"
                  src={`${import.meta.env.VITE_URL_EP_CLOUD}${
                    sneaker.posterPathImage
                  }`}
                />
                <Stack width="230px">
                  <Stack gap={0}>
                    <Text p={0} m={0} fontSize="12px">
                      {sneaker.name}
                    </Text>
                    <Text p={0} m={0} fontSize="12px">
                      talle: {sneaker.size}
                    </Text>
                  </Stack>
                  <Stack direction="row">
                    <Text fontSize="12px">
                      {sneaker &&
                        sneaker.price &&
                        sneaker.price.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "ARS",
                        })}
                    </Text>
                    <Text fontSize="12px">x {sneaker.quantity}</Text>
                    <Text fontSize="12px" fontWeight="bold">
                      {sneaker.price &&
                        sneaker.quantity &&
                        (sneaker.price * sneaker.quantity).toLocaleString(
                          "es-AR",
                          {
                            style: "currency",
                            currency: "ARS",
                          }
                        )}
                    </Text>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  w="20%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction={"row"}>
                    <button
                      style={{
                        padding: "2px 5px",
                        background: "#e4e4e4",
                        color: "black",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleRemoveBasket(sneaker)}
                    >
                      -
                    </button>
                    <Text>{sneaker.quantity}</Text>
                    <button
                      style={{
                        padding: "2px 5px",
                        background: "#e4e4e4",
                        color: "black",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleAddBasket(sneaker)}
                    >
                      +
                    </button>
                  </Stack>
                  <Stack
                    cursor="pointer"
                    onClick={() => dispatch(removeSneakerBasket(sneaker))}
                  >
                    <Icon as={RemoveIcon} />
                  </Stack>
                </Stack>
              </Stack>
            ))
          ) : (
            <p>Todavia no hay productos en el carrito</p>
          )}
        </DrawerBody>

        <DrawerFooter display={"flex"} flexDirection={"column"}>
          {totalbasket !== undefined &&
            totalbasket !== null &&
            totalbasket !== 0 && (
              <>
                <Text>
                  Total:
                  {totalbasket.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </Text>
                <Button
                  variant="primary"
                  width="250px"
                  alignSelf="center"
                  onClick={handleCheckout}
                >
                  Finalizar compra
                </Button>
              </>
            )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Basket;
