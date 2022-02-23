import { useState, useEffect } from "react";
import { Stack, Image, Icon, Text } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { Cart, MenuIcon, CloseIcon } from "../icons";
import { IoCaretDownOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasket,
  selectBasketQuantity,
  setSneaker,
} from "../features/sneakersSlice";

import { Basket, ProfileMenu } from "./";

const Header = () => {
  const basket = useSelector(selectBasket);
  const basketQ = useSelector(selectBasketQuantity);

  const dispatch = useDispatch();
  ///states
  const [menuposition, setMenuPosition] = useState<boolean>(false);
  const [basketshows, setBasketShows] = useState<boolean>(false);
  const [profilemenu, setProfileMenuState] = useState<boolean>(false);

  useEffect(() => {
    const handleReq = async () => {
      const req = await fetch("https://sneakersapinest.herokuapp.com/sneaker");
      const res = await req.json();
      dispatch(setSneaker(res.sneakers));
    };
    handleReq();
  }, []);

  const handleSwichtFilter = (value: boolean) => {
    setMenuPosition(value);
    setBasketShows(value);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      h="60px"
      as="nav"
      className="header"
    >
      <Stack direction="row" spacing={{ base: 4, md: 12 }} alignItems="center">
        <Stack
          cursor="pointer"
          display={{ base: "initial", md: "none" }}
          w="30px"
          onClick={() => {
            setMenuPosition(!menuposition);
            setBasketShows(false);
          }}
        >
          <Icon as={MenuIcon} />
        </Stack>
        {menuposition && (
          <Stack
            position="absolute"
            w="100vw"
            h="100vh"
            top="0"
            backgroundColor="#000"
            opacity="70%"
            transition="all 220ms ease-in-out"
          />
        )}
        <NavLink to="/">
          <Image src={logo} />
        </NavLink>
        <Stack
          direction={{ base: "column", md: "row" }}
          fontSize="sm"
          spacing={6}
          h={{ base: "100vh", md: "initial" }}
          position={{ base: "fixed", md: "initial" }}
          zIndex="99"
          width={{ base: "45vw", md: "initial" }}
          backgroundColor="white"
          color={{ base: "#000", md: "gray.400" }}
          top={{ base: 0, md: "initial" }}
          left={{ base: menuposition ? "0" : "-50vw", md: "initial" }}
          transition="350ms ease"
        >
          <Stack
            cursor="pointer"
            display={{ base: "initial", md: "none" }}
            w="30px"
            onClick={() => setMenuPosition(!menuposition)}
            marginTop={4}
          >
            <Icon as={CloseIcon} />
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 0, md: 6 }}
          >
            <NavLink onClick={() => handleSwichtFilter(false)} to="/">
              Collections
            </NavLink>
            <NavLink to={`/?gender=MEN`} onClick={() => setMenuPosition(false)}>
              Men
            </NavLink>
            <NavLink
              to={`/?gender=WOMAN`}
              onClick={() => setMenuPosition(false)}
            >
              Woman
            </NavLink>
            <NavLink
              onClick={() => {
                setMenuPosition(false);
                setProfileMenuState(false);
              }}
              to="reports"
            >
              Reports
            </NavLink>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack>
          <Stack
            direction="row"
            cursor="pointer"
            onClick={() => {
              setBasketShows(!basketshows);
              setProfileMenuState(false);
            }}
          >
            <Icon as={Cart} width={`calc(60px * 0.8)`} height={6} />
            <Stack position="absolute">
              {basket.length > 0 && (
                <Text
                  backgroundColor="primary.500"
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
        <Stack direction="row" spacing={0} alignItems="center">
          <Icon
            as={IoCaretDownOutline}
            width={`calc(60px * 0.8)`}
            height={4}
            cursor="pointer"
            onClick={() => {
              setProfileMenuState(!profilemenu);
              setBasketShows(false);
            }}
          />
        </Stack>
      </Stack>
      {profilemenu && <ProfileMenu />}
      {basketshows ? <Basket Fn={setBasketShows} /> : null}
    </Stack>
  );
};

export default Header;
