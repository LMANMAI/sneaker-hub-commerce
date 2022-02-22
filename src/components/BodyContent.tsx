import React, { useEffect, useState, useMemo } from "react";
import {
  Badge,
  Heading,
  Input,
  Stack,
  Text,
  Button,
  Box,
  Icon,
} from "@chakra-ui/react";
import CartIcon from "../icons/Cart";
import PrevIcon from "../icons/PrevIcon";
import { Carrousel } from "./";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSneakerActive,
  setSneakerActive,
  setBasket,
  removeOnefromBasket,
  selectBasket,
} from "../features/sneakersSlice";
import { Link } from "react-router-dom";
import { NotFound } from "../pages";
import { ISneaker } from "../interfaces";
const BodyContent: React.FC = () => {
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
    <>
      <Link to="/">
        <Stack
          marginTop={8}
          onClick={() => dispatch(setSneakerActive(null))}
          cursor="pointer"
        >
          <Icon as={PrevIcon} />
        </Stack>
      </Link>

      <Stack
        marginTop={6}
        minHeight="80vh"
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box flex={1}>
          <Carrousel images={sneakerActive?.imgs} />
        </Box>

        <Stack
          flex={1}
          spacing={6}
          textAlign={{ base: "center", md: "initial" }}
          position="relative"
          width="100%"
        >
          <Stack className="reflect" display="none"></Stack>

          <Stack>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing={2}
              color="primary.500"
              fontSize="sm"
            >
              Sneaker Company
            </Text>
            <Heading>{sneakerActive?.name}</Heading>
          </Stack>
          <Text color="gray.400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quam
            temporibus cupiditate eum quasi quae assumenda commodi earum amet
            accusantium, adipisci vero eos eligendi repellat aperiam,
            repudiandae quidem dolorem voluptatum!
          </Text>
          <Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <Text fontWeight={700} fontSize="2xl">
                $ {sneakerActive?.price}
              </Text>
              <Badge
                color="primary.500"
                colorScheme="primary"
                fontSize="md"
                borderRadius="md"
                paddingX={2}
              >
                %50
              </Badge>
            </Stack>
            <Text
              fontSize="sm"
              fontWeight={700}
              color="gray.400"
              textDecoration="line-through"
            >
              $ {sneakerActive && sneakerActive?.price * 2}
            </Text>
          </Stack>

          <Stack direction="row" justifyContent="center">
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
                minWidth={12}
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
                  : handleFunction(
                      handleRemoveToBasket,
                      sneakerActive,
                      "REMOVE"
                    );
              }}
            >
              {label}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default BodyContent;
