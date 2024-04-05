import { Stack, Button } from "@chakra-ui/react";
import CartIcon from "../../icons/Cart";
import { useDispatch } from "react-redux";
import { setBasket } from "../../features/sneakersSlice";
import { ISneakerBasket } from "../../interfaces";
import { CustomStack } from "./styles";
import FavButton from "../FavouriteButton";

const ButtonCount = ({ product }: { product: ISneakerBasket }) => {
  const dispatch = useDispatch();
  const handleAddToBasket = (sneaker: ISneakerBasket) => {
    dispatch(
      setBasket({
        _id: sneaker._id,
        name: sneaker.name,
        price: Number(sneaker.price),
        brand: sneaker.brand,
        genre: sneaker.genre,
        posterPathImage: sneaker.posterPathImage,
        size: sneaker.size,
        quantity: 1,
        limit: sneaker.limit,
        hasPromotion: sneaker.hasPromotion,
        promotionDiscount: sneaker.promotionDiscount,
        prevPrice: sneaker.prevPrice,
      })
    );
  };

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
          variant="primary"
          color="white"
          leftIcon={<CartIcon color="#FFF" />}
          size="sm"
          fontSize="xs"
          className={product ? "" : "disabled"}
          title={
            product
              ? "Agregar al carrito"
              : "Seleccionar talle para agregar al carrito"
          }
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          onClick={() => {
            handleAddToBasket(product);
          }}
        >
          Agregar al carrito
        </Button>
      </CustomStack>
      <FavButton />
    </Stack>
  );
};

export default ButtonCount;
