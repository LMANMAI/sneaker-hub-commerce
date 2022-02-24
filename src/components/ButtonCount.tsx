import { useEffect, useState, useMemo } from "react";
import { Input, Stack, Button } from "@chakra-ui/react";
import CartIcon from "../icons/Cart";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSneakerActive,
  setBasket,
  removeOnefromBasket,
  selectBasket,
} from "../features/sneakersSlice";
import { NotFound } from "../pages";
import { ISneaker } from "../interfaces";

const ButtonCount = (props: { direction?: string }) => {
  const sneakerActive = useSelector(selectSneakerActive);
  const basket = useSelector(selectBasket);
  if (!sneakerActive) return <NotFound />;
  const [label, setLabel] = useState<string>("Add to cart");
  const [contador, setContador] = useState<number>(0);
  const [conttem, setContTemp] = useState<number>(0);

  const dispatch = useDispatch();
  const newcount = useMemo(() => {
    return sneakerActive.quantity;
  }, [contador, sneakerActive.quantity]);

  const newBasketItemCount = useMemo(() => {
    return basket.filter((item) => item._id === sneakerActive._id);
  }, [basket]);

  const handleAddToBasket = (sneaker: ISneaker, typeBtn: string) => {
    setLabel("Add to cart");

    if (typeBtn === "ADD") {
      for (let index = 0; index < conttem; index++) {
        dispatch(setBasket(sneaker));
      }
      setContTemp(0);
      setContador(contador + 1);
    } else if (typeBtn === "PLUS") {
      setContTemp(conttem + 1);
      setContador(contador + 1);
    }
  };

  const handleRemoveToBasket = (sneaker: ISneaker, typeBtn: string) => {
    //dispatch(removeOnefromBasket(sneakerActive));
    if (contador < 1) return;
    setLabel("Remove from cart");
    if (typeBtn === "REMOVE") {
      for (let index = 0; index < conttem; index++) {
        dispatch(removeOnefromBasket(sneaker));
      }

      setContTemp(0);
    } else if (typeBtn === "REST") {
      setContTemp(conttem + 1);
      setContador(contador - 1);
    }
  };

  const handleFunction = (
    Fn?: Function,
    sneaker?: ISneaker,
    buttontypr?: string
  ) => {
    if (Fn) {
      Fn(sneaker, buttontypr);
    }
  };
  useEffect(() => {
    if (newBasketItemCount.length === 1) {
      setContador(newBasketItemCount[0].quantity);
    } else {
      setContador(0);
      setContTemp(0);
    }
  }, [newBasketItemCount, basket]);
  return (
    <Stack
      direction={{
        base: `${
          props.direction === "column" || props.direction === "row"
            ? props.direction
            : "row"
        }`,
        md: "row",
      }}
      alignItems="center"
      w="fit-content"
    >
      <Stack
        direction="row"
        backgroundColor="gray.100"
        borderRadius="md"
        padding={1}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          colorScheme="primary"
          size="md"
          variant="ghost"
          fontSize="2xl"
          onClick={() => {
            handleFunction(handleRemoveToBasket, sneakerActive, "REST");
          }}
        >
          -
        </Button>
        <Input
          alignItems="center"
          value={contador}
          onChange={() => setContador(contador + newcount)}
          type="number"
          name="contador"
          textAlign="center"
          justifyContent="center"
          width={4}
          border="none"
          variant="unstyled"
        />
        <Button
          colorScheme="primary"
          size="md"
          variant="ghost"
          fontSize="2xl"
          onClick={() => {
            handleFunction(handleAddToBasket, sneakerActive, "PLUS");
          }}
        >
          +
        </Button>
      </Stack>
      <Button
        colorScheme="primary"
        color="white"
        leftIcon={<CartIcon color="#FFF" />}
        size="lg"
        fontSize="xs"
        onClick={() => {
          label === "Add to cart"
            ? handleFunction(handleAddToBasket, sneakerActive, "ADD")
            : handleFunction(handleRemoveToBasket, sneakerActive, "REMOVE");
        }}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default ButtonCount;
