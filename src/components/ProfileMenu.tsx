import React from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Switch,
  FormControl,
  FormLabel,
  Avatar,
  Icon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import avatar from "../assets/image-avatar.png";
import { AuthComponent } from "./";
import styled from "@emotion/styled";
import {
  MdOutlineArrowForwardIos,
  MdSettings,
  MdFavoriteBorder,
  MdShoppingBasket,
  MdOutlineExitToApp,
} from "react-icons/md";
import { selectUser, setLogOut } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { ProtectedComponent } from "./";
import { setUserSignOut } from "../controllers/Sesion";
const ListLink = styled(ListItem)`
  height: 50px;
  margin: 7px 0px;
  padding: 5px;
  width: 100%;
  transition: all ease-in-out;
  border-radius: 10px;
  display: flex;
  align-items: center;
  .icon_button {
    display: flex;
    padding: 5px;
    width: calc(60px * 0.5);
    height: calc(60px * 0.5);
    background-color: #d4d4d4;
    border-radius: 50%;
    padding: 5px;
    margin: 2px 5px;
    display: flex;
    align-items: center;
  }
  svg {
    width: 20px;
    height: 20px;
    color: #a8a8a8;
  }
  &:hover {
    background-color: rgba(219, 219, 219, 0.6);
    cursor: pointer;
  }
  &:first-of-type {
    &:hover {
      background-color: transparent;
      cursor: pointer;
    }
  }
`;
interface IProps {
  iconleft?: any;
  iconRight?: any;
  children: React.ReactNode;
}

const ProfileMenu = (props: { fn: Function }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  function ItemMenu(props: IProps) {
    return (
      <ListLink>
        <Icon className="icon_button" as={props.iconleft} />
        {props.children}
        <Icon className="icon_right" as={props.iconRight} />
      </ListLink>
    );
  }
  const handdleOut = () => {
    setUserSignOut();
    dispatch(setLogOut());
  };
  return (
    <Stack
      position="absolute"
      backgroundColor="white"
      top="58px"
      right="9px"
      w="300px"
      p="10px"
      boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
      borderRadius="15px"
      overflow="hidden"
      overflowY="auto"
      // height={height}
      minHeight="400px"
      zIndex="99"
      transition="height 250ms ease"
      className="menu_main"
    >
      <Stack>
        {user ? (
          <ProtectedComponent>
            <Stack
              backgroundColor="white"
              w="100%"
              padding="1rem"
              transition="all 350ms ease"
              className="menu_main"
            >
              <UnorderedList margin="0px">
                <ListLink justifyContent="center">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar width={8} height={8} src={user.profileIMG} />
                    <p>{user.firstName}</p>
                  </Stack>
                </ListLink>
                <hr />
                <Link onClick={() => props.fn(false)} to="/favorites">
                  <ListLink>
                    <Icon className="icon_button" as={MdFavoriteBorder} />
                    <span>Favorites</span>
                  </ListLink>
                </Link>

                <Link onClick={() => props.fn(false)} to="/settings">
                  <ItemMenu
                    iconleft={MdSettings}
                    iconRight={MdOutlineArrowForwardIos}
                  >
                    <span>Settings</span>
                  </ItemMenu>
                </Link>

                <ListLink>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel ml="30px" mb="0">
                      Dark mode
                    </FormLabel>
                    <Switch id="dark_mode" />
                  </FormControl>
                </ListLink>
                <ListLink
                  onClick={() => {
                    handdleOut();
                  }}
                >
                  <Icon className="icon_button" as={MdOutlineExitToApp} />
                  <span>Close</span>
                </ListLink>
              </UnorderedList>
            </Stack>
          </ProtectedComponent>
        ) : (
          <AuthComponent />
        )}
      </Stack>
    </Stack>
  );
};

export default ProfileMenu;
