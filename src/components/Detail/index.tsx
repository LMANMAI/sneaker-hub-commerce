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
    // if (res === "existe") {
    //   setToggle(true);
    // }
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          textAlign={"start"}
          position="relative"
          width="100%"
          padding={"0px 15px"}
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
              {sneakerActive?.brand.toLocaleUpperCase()}
            </Text>
            <Heading>{sneakerActive?.name}</Heading>
            <Text fontWeight={700} fontSize="2xl">
              {sneakerActive?.price.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </Text>
          </Stack>
          <Stack>
            <Stack display={"flex"} direction={"row"}>
              <Button>US</Button>
              <Button>EU</Button>
              <Button>CM</Button>
            </Stack>
            <ul className="size_grid">
              <li>3.5 us</li>
              <li>4 us</li>
              <li>4.5 us</li>
              <li>5 us</li>
              <li>5.5 us</li>
              <li>6 us</li>
              <li>6.5 us</li>
              <li>7 us</li>
              <li>7.5 us</li>
              <li>8 us</li>
              <li>8.5 us</li>
              <li>9 us</li>
              <li>9.5 us</li>
              <li>10 us</li>
              <li>10.5 us</li>
              <li>11 us</li>
              <li>11.5 us</li>
              <li>12 us</li>
              <li>12.5 us</li>
              <li>13 us</li>
              <li>13.5 us</li>
              <li>14 us</li>
              <li>14.5 us</li>
              <li>15 us</li>
              <li>15.5 us</li>
              <li>16 us</li>
              <li>16.5 us</li>
              <li>17 us</li>
              <li>17.5 us</li>
              <li>18 us</li>
            </ul>
          </Stack>
          <Stack>
            <Stack
              spacing={4}
              display={"flex"}
              direction={{ base: "column", md: "row" }}
              alignItems="center"
              justifyContent="center"
            >
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
      </Stack>
    </DetailContainer>
  );
};

export default BodyContent;
