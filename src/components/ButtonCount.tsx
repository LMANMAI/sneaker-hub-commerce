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
import { ISneaker } from "../interfaces";

const ButtonCount = (props: { direction?: string }) => {
  const sneakerActive = useSelector(selectSneakerActive);
  const basket = useSelector(selectBasket);

  const [contador, setContador] = useState<number>(0);
  const [conttem, setContTemp] = useState<number>(0);
  const [isadd, setIsAdd] = useState<boolean>(true);
  const dispatch = useDispatch();

  const newBasketItemCount = useMemo(() => {
    return basket.filter((item) => item._id === sneakerActive?._id);
  }, [basket]);

  const handleAddToBasket = (sneaker: ISneaker) => {
    if (conttem > 0) {
      for (let index = 0; index < conttem; index++) {
        dispatch(setBasket(sneaker));
        setContador(contador + conttem);
      }
    } else {
      dispatch(setBasket(sneaker));
      setContTemp(conttem + conttem);
      setContador(contador + conttem);
    }
    setContTemp(0);
  };

  const handleRemoveToBasket = (sneaker: ISneaker) => {
    if (contador < 0) return;
    if (conttem > 0) {
      for (let index = 0; index < conttem; index++) {
        dispatch(removeOnefromBasket(sneaker));
      }
      setContTemp(0);
    } else {
      dispatch(removeOnefromBasket(sneaker));
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
        borderRadius="md"
        padding={1}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          size="md"
          variant="primary"
          fontSize="2xl"
          disabled={contador <= 0 ? true : false}
          onClick={() => {
            setContTemp(conttem + 1);
            setContador(contador - 1);
            if (contador < 0) {
              setIsAdd(false);
            } else {
              setIsAdd(false);
            }
          }}
        >
          -
        </Button>
        <Input
          alignItems="center"
          value={contador}
          onChange={() => setContador(contador + 1)}
          type="number"
          name="contador"
          textAlign="center"
          justifyContent="center"
          border="none"
          backgroundColor="transparent"
          width="50px"
        />
        <Button
          size="md"
          variant="primary"
          fontSize="2xl"
          onClick={() => {
            setIsAdd(true);
            setContTemp(conttem + 1);
            setContador(contador + 1);
          }}
        >
          +
        </Button>
      </Stack>
      <Button
        variant="primary"
        color="white"
        leftIcon={<CartIcon color="#FFF" />}
        size="lg"
        fontSize="xs"
        onClick={() => {
          if (isadd && sneakerActive) {
            handleAddToBasket(sneakerActive);
          } else if (sneakerActive) {
            handleRemoveToBasket(sneakerActive);
          }
        }}
      >
        {isadd ? "Add to cart" : "Remove"}
      </Button>
    </Stack>
  );
};

export default ButtonCount;
