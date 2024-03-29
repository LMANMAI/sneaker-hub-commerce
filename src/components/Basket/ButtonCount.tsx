import { useEffect, useState, useMemo } from "react";
import { Input, Stack, Button } from "@chakra-ui/react";
import CartIcon from "../../icons/Cart";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSneakerActive,
  setBasket,
  selectBasket,
  selectBasketQuantity,
  removeSneakerBasket,
} from "../../features/sneakersSlice";
import { ISneaker } from "../../interfaces";
import { CustomStack } from "./styles";
import FavButton from "../FavouriteButton";

const ButtonCount = (props: { products?: any }) => {
  const dispatch = useDispatch();
  //selects
  const sneakerActive = useSelector(selectSneakerActive);
  const basket = useSelector(selectBasket);
  const basketQuantity = useSelector(selectBasketQuantity);

  //states
  const [contador, setContador] = useState<number>(0);
  const [conttem, setContTemp] = useState<number>(0);
  const [isadd, setIsAdd] = useState<boolean>(true);

  const newBasketItemCount = useMemo(() => {
    return basket.filter((item) => item._id === sneakerActive?._id);
  }, [basket]);

  const handleAddToBasket = (sneaker: ISneaker) => {
    if (conttem > 0) {
      dispatch(setBasket({ ...sneaker, quantity: conttem }));
      setContTemp(0);
    } else {
      dispatch(setBasket({ ...sneaker, quantity: 1 }));
      setContador(contador + 1);
    }
  };

  const handleRemoveToBasket = (sneaker: ISneaker) => {
    dispatch(
      removeSneakerBasket({ ...sneaker, quantity: basketQuantity - contador })
    );
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
    <Stack direction={"row"} alignItems="center" w="fit-content">
      <CustomStack
        direction="row"
        borderRadius="md"
        padding={1}
        alignItems="center"
        justifyContent="center"
      >
        <Button
          size="sm"
          variant="primary"
          fontSize="2xl"
          className={contador === 0 ? `disabled` : ""}
          disabled={contador === 0 ? true : false}
          onClick={() => {
            setContTemp(conttem + 1);
            setContador(contador - 1);
            setIsAdd(false);
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
          width="fit-content"
          maxWidth={"90px"}
          p={0}
          _active={{ outline: "none", border: "none" }}
        />
        <Button
          size="sm"
          variant="primary"
          fontSize="2xl"
          className={props.products.length === 0 ? `disabled` : ""}
          disabled={props.products.length === 0}
          onClick={() => {
            setIsAdd(true);
            setContTemp(conttem + 1);
            setContador(contador + 1);
          }}
        >
          +
        </Button>
      </CustomStack>

      <Button
        variant="primary"
        color="white"
        leftIcon={<CartIcon color="#FFF" />}
        size="sm"
        fontSize="xs"
        transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
        onClick={() => {
          if (sneakerActive && isadd) {
            handleAddToBasket(sneakerActive);
          } else if (sneakerActive && !isadd) {
            handleRemoveToBasket(sneakerActive);
          }
        }}
      >
        {sneakerActive && isadd ? "Agregar al carrito" : "Eliminar del carrito"}
      </Button>
      <FavButton />
    </Stack>
  );
};

export default ButtonCount;
