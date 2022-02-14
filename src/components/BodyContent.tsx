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

import Image1 from "../assets/image-product-1.jpg";
import Image2 from "../assets/image-product-2.jpg";
import Image3 from "../assets/image-product-3.jpg";
import Image4 from "../assets/image-product-4.jpg";

const BodyContent = () => {
  return (
    <Stack
      marginTop={6}
      minHeight="80vh"
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Box flex={1}>
        <Carrousel images={[Image1, Image2, Image3, Image4]} />
      </Box>

      <Stack flex={1} spacing={6}>
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
          <Heading>Fall limited edition sneakers</Heading>
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
              value="0"
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
