import { useState, useEffect } from "react";
import { Stack, Image, Icon, Text, Grid, GridItem } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { Cart, MenuIcon, CloseIcon } from "../icons";
import { IoCaretDownOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasket,
  selectBasketQuantity,
  setSneaker,
} from "../features/sneakersSlice";

import { Basket, ProfileMenu } from "./";
const brands = [
  {
    name: "Adidas",
    bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/adidas.jpg?alt=media&token=338b9349-f864-475f-816f-5f24615d1338",
  },
  {
    name: "Nike",
    bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/nike.jpg?alt=media&token=6fa99abf-8a57-41e2-bccf-8fc8d9c25f5a",
  },
  {
    name: "New Balance",
    bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/newbalance.jpg?alt=media&token=8f55aea1-8135-4a07-9951-cd2ccd1bf109",
  },
  {
    name: "Air Jordan",
    bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/airjordan.jpg?alt=media&token=07353f34-0766-40c5-8eac-22ea8bb6a47b",
  },
  {
    name: "Yeezy",
    bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/yeezy.jpg?alt=media&token=d11da7ee-b681-44d3-9264-e2602b7612ae",
  },
  {
    name: "Converse",
    bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/converse.jpg?alt=media&token=5558391f-5dc9-4b92-9f39-2869e72e207f",
  },
  {
    name: "Vans",
    bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/asics.jpg?alt=media&token=edb58f7f-3877-4ab8-9851-98e9eef9f1e3",
  },
  {
    name: "revengexstorm",
    bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/revenge.jpg?alt=media&token=2023707a-bec4-4f1a-822b-eea188c9421c",
  },
];
const Header = () => {
  const basket = useSelector(selectBasket);
  const basketQ = useSelector(selectBasketQuantity);
  const { pathname } = useLocation();
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
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        h="60px"
        as="nav"
        className="header"
      >
        <Stack
          direction="row"
          spacing={{ base: 4, md: 12 }}
          alignItems="center"
        >
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
              <NavLink
                to={`/?gender=MEN`}
                onClick={() => setMenuPosition(false)}
              >
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
        {profilemenu && <ProfileMenu fn={setProfileMenuState} />}
        {basketshows ? <Basket Fn={setBasketShows} /> : null}
      </Stack>
      <Stack marginY={pathname === "/" ? "20px" : ""}>
        <Grid
          templateColumns={{
            base: "repeat(auto-fit, minmax(45%, 1fr))",
            md: "repeat(auto-fit, minmax(20%, 1fr))",
          }}
          gap={2}
          padding={2}
        >
          {pathname === "/" &&
            brands.map((item, index) => (
              <NavLink to={`/?brand=${item.name}`} key={index}>
                <GridItem
                  height="170px"
                  borderRadius="20px"
                  padding={4}
                  cursor="pointer"
                  transition="transform 250ms ease"
                  _hover={{
                    transform: "scale(1.05)",
                  }}  
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  background={`url(${item.bg})`}
                  backgroundPosition="center center"
                >
                  <Text
                    width="fit-content"
                    backgroundColor="white"
                    padding="5px 10px"
                  >
                    {item.name}
                  </Text>
                </GridItem>
              </NavLink>
            ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Header;
