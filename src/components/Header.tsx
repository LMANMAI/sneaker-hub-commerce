import { Stack, Image, Avatar, Icon } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import avatar from "../assets/image-avatar.png";
import cart from "../assets/icon-cart.svg";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const Header = () => {
  const [menuposition, setMenuPosition] = useState<boolean>(false);
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
          onClick={() => setMenuPosition(!menuposition)}
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
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuPosition(false)}
              to="/Collections"
            >
              Collections
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuPosition(false)}
              to="/Men"
            >
              Men
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuPosition(false)}
              to="/Woman"
            >
              Woman
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuPosition(false)}
              to="/Contact"
            >
              Contact
            </NavLink>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={6} alignItems="center">
        <Image width={6} height={6} src={cart} />
        <Avatar width={8} height={8} src={avatar} />
      </Stack>
    </Stack>
  );
};

export default Header;
