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
    <Stack direction={"row"}>
      <Icon
        color="white"
        className="icon_button"
        as={props.iconleft}
        backgroundColor={props.colormode === "light" ? "primary" : "secondary"}
      />
      {props.children}
      <Icon className="icon_right" as={props.iconRight} />
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
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}></MenuButton>
      {user ? (
        <MenuList>
          <MenuItem>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Avatar width={8} height={8} src={user.profileIMG} />
              <p>{user.firstName}</p>
            </Stack>
          </MenuItem>
          <MenuItem onClick={() => props.fn(false)}>
            {/* <Link  to="/favorites"> */}
            <Stack
              direction={"row"}
              onClick={() => (window.location.href = "/favorites")}
            >
              <Icon
                color="white"
                className="icon_button"
                as={MdFavoriteBorder}
                backgroundColor={
                  colorMode === "light" ? "primary" : "secondary"
                }
              />
              <Text color={colorMode === "light" ? "gray.800" : "white"}>
                Favorites
              </Text>
            </Stack>
          </MenuItem>
          <MenuItem onClick={() => props.fn(false)}>
            {/* <Link  to="/settings"> */}
            <ItemMenu
              iconleft={MdSettings}
              iconRight={MdOutlineArrowForwardIos}
              colormode={colorMode}
            >
              <Text color={colorMode === "light" ? "gray.800" : "white"}>
                Settings
              </Text>
            </ItemMenu>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handdleOut();
            }}
          >
            <Icon
              color="white"
              className="icon_button"
              as={MdOutlineExitToApp}
              backgroundColor={colorMode === "light" ? "primary" : "secondary"}
            />
            <Text color={colorMode === "light" ? "gray.800" : "white"}>
              Close
            </Text>
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <MenuItem>
            {" "}
            <AuthComponent />
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

export default ProfileMenu;
