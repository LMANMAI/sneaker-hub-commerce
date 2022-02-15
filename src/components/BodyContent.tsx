import React from "react";
import {
  Badge,
  Heading,
  Input,
  Stack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import CartIcon from "../icons/Cart";
import { Carrousel } from "./";
import { IProps } from "../interfaces";
import { useParams } from "react-router-dom";
const BodyContent: React.FC<IProps> = ({ sneaker }) => {
  const params = useParams();
  console.log(params);
  return (
    <Stack
      marginTop={6}
      minHeight="80vh"
      direction={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
    >
      <Box flex={1}>
        <Carrousel images={sneaker?.imgs} />
      </Box>

      <Stack flex={1} spacing={6} textAlign={{ base: "center", md: "initial" }}>
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
          <Heading>{sneaker?.name}</Heading>
        </Stack>
        <Text color="gray.400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quam
          temporibus cupiditate eum quasi quae assumenda commodi earum amet
          accusantium, adipisci vero eos eligendi repellat aperiam, repudiandae
          quidem dolorem voluptatum!
        </Text>
        <Stack>
          <Stack spacing={4} direction="row" alignItems="center">
            <Text fontWeight={700} fontSize="2xl">
              $125.00
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
            $200.00{" "}
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
            >
              -
            </Button>
            <Input
              alignItems="center"
              defaultValue="0"
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
          >
            Add to cart
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BodyContent;
