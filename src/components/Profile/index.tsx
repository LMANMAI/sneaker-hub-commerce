import React from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Avatar,
  Icon,
  ListItem,
  UnorderedList,
  useColorMode,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { AuthComponent } from "..";
import styled from "@emotion/styled";
import {
  MdOutlineArrowForwardIos,
  MdSettings,
  MdFavoriteBorder,
  MdOutlineExitToApp,
} from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { selectUser, setUser } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { ProtectedComponent } from "..";
import { setUserSignOut } from "../../functions/Sesion";

interface IProps {
  iconleft?: any;
  iconRight?: any;
  children: React.ReactNode;
  colormode: any;
}
function ItemMenu(props: IProps) {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Icon
        className="icon_button"
        as={props.iconleft}
        color={props.colormode === "light" ? "primary" : "secondary"}
      />
      {props.children}
    </Stack>
  );
}
const ProfileMenu = (props: { fn: Function }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { colorMode } = useColorMode();
  const handdleOut = () => {
    setUserSignOut();
    dispatch(setUser(null));
  };
  return (
    <Menu>
      <MenuButton
        background={"transparent"}
        _hover={{ background: "transparent" }}
        _active={{ background: "transparent" }}
        as={Button}
        rightIcon={
          <Stack direction={"row"} alignItems={"center"} gap={0}>
            {user && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar width={8} height={8} src={user.profileIMG} />
              </Stack>
            )}
            <ChevronDownIcon />
          </Stack>
        }
      ></MenuButton>
      {user ? (
        <MenuList>
          <MenuItem onClick={() => props.fn(false)}>
            <Link to="/favorites" style={{ width: "100%" }}>
              <Stack direction={"row"} alignItems={"center"}>
                <Icon
                  className="icon_button"
                  as={MdFavoriteBorder}
                  color={colorMode === "light" ? "primary" : "secondary"}
                />
                <Text color={colorMode === "light" ? "gray.800" : "white"}>
                  Favoritos
                </Text>
              </Stack>
            </Link>
          </MenuItem>

          <MenuItem onClick={() => props.fn(false)}>
            <Link to="/settings" style={{ width: "100%" }}>
              <ItemMenu
                iconleft={MdSettings}
                iconRight={MdOutlineArrowForwardIos}
                colormode={colorMode}
              >
                <Text color={colorMode === "light" ? "gray.800" : "white"}>
                  Configuraciones
                </Text>
              </ItemMenu>
            </Link>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handdleOut();
            }}
            gap={"0.5rem"}
          >
            <Icon
              className="icon_button"
              as={MdOutlineExitToApp}
              color={colorMode === "light" ? "primary" : "secondary"}
            />
            <Text color={colorMode === "light" ? "gray.800" : "white"}>
              Salir
            </Text>
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <AuthComponent />
        </MenuList>
      )}
    </Menu>
  );
};

export default ProfileMenu;
