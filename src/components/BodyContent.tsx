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
  selectSneakers,
} from "../features/sneakersSlice";
import { Link } from "react-router-dom";
import { filterById } from "../app/helper";
import { NotFound } from "../pages";
import { ISneaker } from "../interfaces";
const BodyContent: React.FC = () => {
  const sneakerActive = useSelector(selectSneakerActive);
  if (!sneakerActive) return <NotFound />;

  const [contador, setContador] = useState<number>(1);
  const dispatch = useDispatch();

  const handleFunction = (sneaker: ISneaker) => {
    dispatch(setBasket(sneaker));
    setContador(contador + sneaker?.quantity + 1);
    console.log(contador);
  };

  const handleRemove = () => {
    if (contador < 1) {
      setContador(1);
      return;
    }
    dispatch(removeOnefromBasket(sneakerActive));
    setContador(contador - 1);
  };
  const newcount = useMemo(() => {
    return sneakerActive.quantity * contador;
  }, [contador, sneakerActive.quantity]);

  useEffect(() => {
    setContador(sneakerActive.quantity);
    console.log(newcount);
  }, [sneakerActive.quantity]);

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
        >
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
                {sneakerActive?.price}
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
              {sneakerActive && sneakerActive?.price * 2}
            </Text>
          </Stack>

          <Stack direction="row">
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
                  handleRemove();
                }}
              >
                -
              </Button>
              <Input
                alignItems="center"
                value={contador}
                onChange={() => handleFunction(sneakerActive)}
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
                onClick={() => handleFunction(sneakerActive)}
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
              onClick={() => handleFunction(sneakerActive)}
            >
              Add to cart
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default BodyContent;
