import { useEffect, useMemo } from "react";
import { Stack, Image, Avatar, Icon, Text, Button } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import avatar from "../assets/image-avatar.png";
import cart from "../assets/icon-cart.svg";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import RemoveIcon from "../icons/RemoveIcon";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ISneaker } from "../interfaces";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBasket,
  selectTotal,
  selectBasketQuantity,
  setSneaker,
  setBasket,
  removeOnefromBasket,
  removeSneakerBasket,
  selectSneakerActive,
} from "../features/sneakersSlice";
const Header = () => {
  const basket = useSelector(selectBasket);
  const totalbasket = useSelector(selectTotal);
  const basketQ = useSelector(selectBasketQuantity);
  const proyectoactivo = useSelector(selectSneakerActive);
  const dispatch = useDispatch();
  ///states
  const [menuposition, setMenuPosition] = useState<boolean>(false);
  const [basketshows, setBasketShows] = useState<boolean>(false);

  useEffect(() => {
    const handleReq = async () => {
      const req = await fetch("https://sneakersapinest.herokuapp.com/sneaker");
      const res = await req.json();
      dispatch(setSneaker(res.sneakers));
    };
    handleReq();
  }, []);

  const count = useMemo(() => {
    return basket.filter((item) => item._id === proyectoactivo?._id);
  }, [basket]);

  const handleRemoveBasket = (sneaker: ISneaker) => {
    if (sneaker.quantity < 1) return;
    dispatch(removeOnefromBasket(sneaker));
  };

  const handleAddBasket = (sneaker: ISneaker) => {
    dispatch(setBasket(sneaker));
  };
  const handleSwichtFilter = (value: boolean) => {
    setMenuPosition(value);
    setBasketShows(value);
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      as="nav"
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
            <NavLink to={`/?gender=MEN`}>Men</NavLink>
            <NavLink to={`/?gender=WOMAN`}>Woman</NavLink>
            <NavLink onClick={() => setMenuPosition(false)} to="reports">
              Reports
            </NavLink>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={6} alignItems="center">
        <Stack>
          <Stack
            direction="row"
            cursor="pointer"
            onClick={() => setBasketShows(!basketshows)}
          >
            <Image width={6} height={6} src={cart} />
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
        <Avatar width={8} height={8} src={avatar} />
      </Stack>
      {basketshows ? (
        <Stack
          position="absolute"
          border="1px solid #e9e9e9"
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          right={{ base: "5%", md: "5%" }}
          top={{ base: "5%", md: "12%" }}
          transition="all 250ms ease"
          backgroundColor="#FFF"
          borderRadius="15px"
          w={{ base: "90vw", md: "300px" }}
          minHeight="200px"
          p={6}
          spacing={2}
          zIndex="99"
        >
          {basket.length > 0 ? (
            basket.map((sneaker, index) => (
              <Stack direction="row" alignItems="center" key={index}>
                <Image w="40px" h="40px" src={sneaker.posterPathImage} />
                <Stack>
                  <Text fontSize="12px">{sneaker.name}</Text>
                  <Stack direction="row">
                    <Text fontSize="12px">$ {sneaker.price}</Text>
                    <Text fontSize="12px">x {sneaker.quantity}</Text>
                    <Text fontSize="12px" fontWeight="bold">
                      ${sneaker.price * sneaker.quantity}
                    </Text>
                  </Stack>
                </Stack>
                <Stack direction="row" w="20%" alignItems="center">
                  <button onClick={() => handleRemoveBasket(sneaker)}>-</button>

                  <button onClick={() => handleAddBasket(sneaker)}>+</button>
                  <Stack
                    cursor="pointer"
                    onClick={() => (
                      dispatch(removeSneakerBasket(sneaker)),
                      setTimeout(() => {
                        setBasketShows(false);
                      }, 1000)
                    )}
                  >
                    <Icon as={RemoveIcon} />
                  </Stack>
                </Stack>
              </Stack>
            ))
          ) : (
            <p>Todavia no hay productos en el carrito</p>
          )}
          {totalbasket != 0 ? (
            <>
              <Text>Total: $ {totalbasket}</Text>
              <Button colorScheme="primary">Checkout</Button>
            </>
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  );
};

export default Header;
