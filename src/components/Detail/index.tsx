import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  Badge,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { ISneaker } from "../../interfaces";
import { Carrousel, ButtonCount } from "..";
import { useSelector } from "react-redux";
import { selectSneakerActive } from "../../features/sneakersSlice";
import { selectUser } from "../../features/userSlice";
import { DetailContainer } from "./styles";
import { checkFavs, removeFav } from "../../functions/Products";
import { brands } from "../BrandsMenu/statics";

const BodyContent: React.FC = () => {
  const sneakerActive = useSelector(selectSneakerActive);
  const currentUser = useSelector(selectUser);
  const [toggle, setToggle] = useState<boolean>(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (sneakerActive) {
      verificated(currentUser, sneakerActive);
    }
  }, []);

  const verificated = async (user: any, sneaker: ISneaker) => {
    const res = await checkFavs(user, sneaker);
    if (res === "existe") {
      setToggle(true);
    }
  };
  const handleAddStore = async (user: any, sneaker: ISneaker) => {
    verificated(user, sneaker);
    setToggle(true);
  };
  const deleteFav = async (sneaker: ISneaker) => {
    setToggle(false);
    removeFav(currentUser, sneaker);
  };

  const checkBrandBG = (brandType: string) => {
    const brand = brands.find(
      (item) => item.name.toLocaleUpperCase() === brandType
    );
    if (brand) {
      return brand.bg;
    }
  };

  return (
    <DetailContainer>
      <div
        className="detail__bg"
        style={{
          background: `url(${
            sneakerActive ? checkBrandBG(sneakerActive?.brand) : ""
          })`,
        }}
      ></div>
      <Stack className="detail__content">
        <Box flex={1}>
          <Carrousel
            posterPath={sneakerActive ? sneakerActive?.posterPathImage : ""}
            images={sneakerActive?.imgs}
          />
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
              variant="primary"
              fontSize="sm"
              color={colorMode === "light" ? "primary" : " secondary"}
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
            <Stack
              spacing={4}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontSize="sm"
                fontWeight={700}
                color="gray.400"
                textDecoration="line-through"
              >
                $ {sneakerActive && sneakerActive?.price * 2}
              </Text>
              <Text fontWeight={700} fontSize="2xl">
                $ {sneakerActive?.price}
              </Text>
              <Badge
                backgroundColor={
                  colorMode === "light" ? "primary" : " secondary"
                }
                color="white"
                fontSize="md"
                borderRadius="md"
                paddingX={2}
              >
                %50
              </Badge>
            </Stack>
          </Stack>

          <Stack alignItems="center">
            <Stack direction="row-reverse" justifyContent="center">
              {currentUser && (
                <>
                  {toggle ? (
                    <Button
                      fontSize="2xl"
                      fontWeight="bold"
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        if (!currentUser) {
                          return;
                        } else if (sneakerActive) {
                          deleteFav(sneakerActive);
                        }
                      }}
                    >
                      <MdFavorite />
                    </Button>
                  ) : (
                    <Button
                      fontSize="2xl"
                      fontWeight="bold"
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        if (!currentUser) {
                          return;
                        } else if (sneakerActive) {
                          handleAddStore(currentUser, sneakerActive);
                        }
                      }}
                    >
                      <MdFavoriteBorder />
                    </Button>
                  )}
                </>
              )}

              <ButtonCount />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </DetailContainer>
  );
};

export default BodyContent;