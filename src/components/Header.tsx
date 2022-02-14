import { Stack, Image, Link, Avatar } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import avatar from "../assets/image-avatar.png";
import cart from "../assets/icon-cart.svg";
const Header = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding={8}
    >
      <Stack direction="row" spacing={12} alignItems="center">
        <Image src={logo} />
        <Stack direction="row" fontSize="sm" color="gray.400" spacing={6}>
          <Link>Collections</Link>
          <Link>Man</Link>
          <Link>Woman</Link>
          <Link>Contact</Link>
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
