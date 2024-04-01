import { useState } from "react";
import {
  Stack,
  Image,
  Icon,
  Text,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
import { Cart } from "../../icons";
import { IoSearchOutline } from "react-icons/io5";
import { CloseIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasket,
  selectBasketQuantity,
  setSearch,
  selectSearch,
} from "../../features/sneakersSlice";

import { Basket, ProfileMenu } from "..";
const Header = () => {
  const navigate = useNavigate();
  const basket = useSelector(selectBasket);
  const basketQuantity = useSelector(selectBasketQuantity);
  const searchParams = useSelector(selectSearch);
  const dispatch = useDispatch();
  ///states
  const [basketshows, setBasketShows] = useState<boolean>(false);
  const { colorMode } = useColorMode();

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      h="60px"
      as="nav"
      backgroundColor={colorMode === "light" ? "white" : "gray.800"}
      className="header"
      position="fixed"
      width="100%"
      left="0px"
      top={"0px"}
      zIndex="99"
    >
      <Stack
        direction="row"
        spacing={{ base: 4, md: 12 }}
        alignItems="center"
        paddingLeft={"15px"}
      >
        <Stack>
          <NavLink to="/">
            <Image
              filter={colorMode === "light" ? "" : "invert(100%)"}
              src={logo}
            />
          </NavLink>
        </Stack>
        <Stack
          flex="1"
          maxWidth={"50%"}
          direction="row"
          alignItems="center"
          border="1px solid #e3e3e3"
          borderRadius="5px"
          paddingX={2}
        >
          <Icon as={IoSearchOutline} cursor="pointer" />
          <Input
            type="text"
            variant="unstyled"
            value={searchParams}
            padding={2}
            onChange={(e) => {
              if (window.location.pathname !== "/") {
                navigate("/");
              }
              dispatch(setSearch(e.target.value));
            }}
          />
          {searchParams.length > 0 && (
            <CloseIcon
              w={2.5}
              h={2.5}
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                dispatch(setSearch(""));
              }}
            />
          )}
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        padding={"0px 10px"}
      >
        <Stack>
          <Stack
            direction="row"
            cursor="pointer"
            onClick={() => {
              setBasketShows(true);
            }}
          >
            <Icon as={Cart} width={`calc(60px * 0.8)`} height={6} />
            <Stack position="absolute">
              {basket.length > 0 && (
                <Text
                  backgroundColor={
                    colorMode === "light" ? "primary" : "secondary"
                  }
                  color="white"
                  borderRadius="100%"
                  w="15px"
                  h="15px"
                  textAlign="center"
                  position="relative"
                  top="10px"
                  fontSize="10px"
                >
                  {basketQuantity}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
        <ProfileMenu />
      </Stack>

      <Basket basketshows={basketshows} setBasketShows={setBasketShows} />
    </Stack>
  );
};

export default Header;
