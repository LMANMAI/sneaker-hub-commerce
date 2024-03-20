import { useState, useEffect } from "react";
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
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasket,
  selectBasketQuantity,
  selectCount,
  setSneaker,
  setSearch,
  setCounterLimit,
} from "../../features/sneakersSlice";

import { selectUser } from "../../features/userSlice";
import { Basket, ProfileMenu } from "..";
import instance from "../../config";

const Header = () => {
  const basket = useSelector(selectBasket);
  const basketQ = useSelector(selectBasketQuantity);
  const currentUser = useSelector(selectUser);
  const counter = useSelector(selectCount);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  ///states
  const [menuposition, setMenuPosition] = useState<boolean>(false);
  const [basketshows, setBasketShows] = useState<boolean>(false);
  const [profilemenu, setProfileMenuState] = useState<boolean>(false);
  //const { colorMode } = useColorMode();
  const handleReq = async () => {
    // const reqLength = await fetch(`${import.meta.env.VITE_URL_EP}`);
    // const data = await reqLength.json();
    // dispatch(setTotalSneaker(data.sneakers));
    // dispatch(setCounterLimit(data.sneakers.length));
    // const req = await fetch(
    //   `${import.meta.env.VITE_URL_EP}?limit=10&offset=${counter}`
    // );
    // const res = await req.json();
    // dispatch(setSneaker(res.sneakers));
    const { data } = await instance.get(`?page=${1}&pageSize=${10}`);
    dispatch(setCounterLimit(data.totalPages));
    dispatch(setSneaker(data.data));
  };
  useEffect(() => {
    handleReq();
  }, [pathname, counter]);
  const { colorMode } = useColorMode();

  const handleSwichtFilter = (value: boolean) => {
    setMenuPosition(value);
    setBasketShows(value);
  };

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
            padding={2}
            onChange={(e) => {
              dispatch(setSearch(e.target.value));
            }}
          />
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
              setProfileMenuState(false);
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
                  {basketQ}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
        <ProfileMenu fn={setProfileMenuState} />
      </Stack>

      <Basket basketshows={basketshows} setBasketShows={setBasketShows} />
    </Stack>
  );
};

export default Header;
