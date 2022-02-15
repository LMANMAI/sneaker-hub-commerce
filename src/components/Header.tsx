import { Stack, Image, Avatar } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import avatar from "../assets/image-avatar.png";
import cart from "../assets/icon-cart.svg";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      as="nav"
    >
      <Stack direction="row" spacing={12} alignItems="center">
        <NavLink to="/">
          <Image src={logo} />
        </NavLink>
        <Stack direction="row" fontSize="sm" color="gray.400" spacing={6}>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/Collections"
          >
            Collections
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/Men"
          >
            Men
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/Woman"
          >
            Woman
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/Contact"
          >
            Contact
          </NavLink>
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
