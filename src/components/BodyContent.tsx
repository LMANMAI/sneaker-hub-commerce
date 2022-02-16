import React, { useState } from "react";
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
import { ISneaker } from "../interfaces";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSneakerActive,
  setSneakerActive,
  setBasket,
} from "../features/sneakersSlice";
import { Link } from "react-router-dom";
const BodyContent: React.FC = () => {
  const [contador, setContador] = useState<number>(1);
  const dispatch = useDispatch();
  const sneakerActive = useSelector(selectSneakerActive);
  if (sneakerActive === null) return <p>error</p>;

  const handleBasket = (sneaker: ISneaker) => {
    dispatch(setBasket(sneaker));
  };

  const handleFunction = (sneaker: ISneaker, times: number) => {
    for (let i = 0; i < times; i++) {
      handleBasket(sneakerActive);
    }
    setContador(1);
  };
  return (
    <>
      <Link to="/Collections">
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
              {sneakerActive?.price * 2}
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
                  if (contador > 0) {
                    setContador(contador - 1);
                  }
                }}
              >
                -
              </Button>
              <Input
                alignItems="center"
                value={contador}
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
                onClick={() => setContador(contador + 1)}
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
              onClick={() => handleFunction(sneakerActive, contador)}
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
