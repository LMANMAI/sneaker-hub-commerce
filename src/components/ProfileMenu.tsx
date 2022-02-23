import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Stack,
  Switch,
  FormControl,
  FormLabel,
  Avatar,
  Icon,
  Button,
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
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { selectUser, selectMenuHeight, setLogOut } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { ProtectedComponent } from "./";
import { signOut } from "firebase/auth";
import { auth } from "../app/firebaseConfig";
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
  component?: string;
}

const ProfileMenu: React.FC = () => {
  const [menu, setMenuPosition] = useState<boolean>(false);
  const [height, setHeight] = useState<number>();
  const [component, setComponent] = useState<string | undefined>("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const menu_login = useSelector(selectMenuHeight);
  const menureflect = document.querySelector(".menu_container");
  const menumain = document.querySelector(".menu_main");
  useEffect(() => {
    //console.log(menumain?.getBoundingClientRect().height);
  }, [menu, menu_login]);

  function ItemMenu(props: IProps) {
    return (
      <ListLink
        onClick={() => {
          setMenuPosition(!menu);
          setComponent(props.component);
          if (menureflect) {
            setHeight(menureflect?.getBoundingClientRect().height);
          }
        }}
      >
        <Icon className="icon_button" as={props.iconleft} />
        {props.children}
        <Icon className="icon_right" as={props.iconRight} />
      </ListLink>
    );
  }

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
      {user ? (
        <ProtectedComponent>
          <Stack
            backgroundColor="white"
            position="absolute"
            top="0px"
            left="0px"
            w="100%"
            padding="1rem"
            transition="all 350ms ease"
            transform={menu ? "translateX(-110%)" : "translateX(0%)"}
            className="menu_main"
          >
            <UnorderedList margin="0px">
              <ListLink justifyContent="center">
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Avatar width={8} height={8} src={avatar} /> <p>My Profile</p>
                </Stack>
              </ListLink>
              <hr />
              <ListLink>
                <Icon className="icon_button" as={MdFavoriteBorder} />
                <span>Favorites</span>
              </ListLink>
              <ItemMenu
                iconleft={MdShoppingBasket}
                iconRight={MdOutlineArrowForwardIos}
                component="mis ordenes"
              >
                <span> My orders</span>
              </ItemMenu>

              <ItemMenu
                iconleft={MdSettings}
                iconRight={MdOutlineArrowForwardIos}
                component="mis configuraciones"
              >
                <span>Settings</span>
              </ItemMenu>
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
                  signOut(auth).then(() => {
                    dispatch(setLogOut());
                  });
                }}
              >
                <Icon className="icon_button" as={MdOutlineExitToApp} />
                <span>Close</span>
              </ListLink>
            </UnorderedList>
          </Stack>

          <Stack
            position="absolute"
            backgroundColor="white"
            top="0px"
            left="0px"
            w="100%"
            padding="1rem"
            transition="all 350ms ease"
            transform={menu ? "translateX(0%)" : "translateX(110%)"}
            className="menu_container"
          >
            <Button
              variant="unstyled"
              outline="none"
              border="none"
              onClick={() => {
                setMenuPosition(false);
                if (menumain) {
                  setHeight(menumain?.getBoundingClientRect().height);
                }
                setComponent("");
              }}
            >
              <MdOutlineArrowBackIos />
            </Button>
            {component && (
              <Stack>
                <p>{component}</p>
              </Stack>
            )}
          </Stack>
        </ProtectedComponent>
      ) : (
        <AuthComponent />
      )}
    </Stack>
  );
};

export default ProfileMenu;
