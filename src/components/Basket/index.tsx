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
  removeSneakerBasket,
} from "../../features/sneakersSlice";
import { useSelector, useDispatch } from "react-redux";
import { RemoveIcon } from "../../icons";
import { ISneaker } from "../../interfaces";
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

  const handleRemoveBasket = (sneaker: ISneaker) => {
    if (sneaker.quantity < 1) return;
    dispatch(removeOnefromBasket(sneaker));
  };

  const handleAddBasket = (sneaker: ISneaker) => {
    dispatch(setBasket({ ...sneaker, quantity: 1 }));
  };

  const handleCheckout = () => {
    if (currentUser !== null) {
      history("/checkout");
      setBasketShows(false);
    } else {
      setBasketShows(false);
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

  console.log(basket, "basket");
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
                <Stack>
                  <Text fontSize="12px">{sneaker.name}</Text>
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
                    onClick={() => (
                      dispatch(removeSneakerBasket(sneaker)),
                      setTimeout(() => {
                        setBasketShows(false);
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
