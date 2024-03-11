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
} from "@chakra-ui/react";
import { AuthComponent } from "..";
import styled from "@emotion/styled";
import {
  MdOutlineArrowForwardIos,
  MdSettings,
  MdFavoriteBorder,
  MdOutlineExitToApp,
} from "react-icons/md";
import { selectUser, setUser } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { ProtectedComponent } from "..";
import { setUserSignOut } from "../../functions/Sesion";
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
    border-radius: 50%;
    padding: 5px;
    margin: 2px 5px;
    display: flex;
    align-items: center;
  }
  svg {
    width: 20px;
    height: 20px;
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
  colormode: any;
}
function ItemMenu(props: IProps) {
  return (
    <ListLink>
      <Icon
        color="white"
        className="icon_button"
        as={props.iconleft}
        backgroundColor={props.colormode === "light" ? "primary" : "secondary"}
      />
      {props.children}
      <Icon className="icon_right" as={props.iconRight} />
    </ListLink>
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
    <Stack
      position="absolute"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 8px 18px"
      backgroundColor={colorMode === "light" ? "white" : "gray.800"}
      top="58px"
      right="9px"
      w="300px"
      p="10px"
      borderRadius="15px"
      overflow="hidden"
      overflowY="auto"
      minHeight="345px"
      zIndex="99"
      transition="height 250ms ease"
      className="menu_main"
    >
      <Stack>
        {user ? (
          <ProtectedComponent>
            <Stack
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
                  </ListLink>
                </Link>

                <Link onClick={() => props.fn(false)} to="/settings">
                  <ItemMenu
                    iconleft={MdSettings}
                    iconRight={MdOutlineArrowForwardIos}
                    colormode={colorMode}
                  >
                    <Text color={colorMode === "light" ? "gray.800" : "white"}>
                      Settings
                    </Text>
                  </ItemMenu>
                </Link>

                {/* <ListLink>
                  {/* <FormControl display="flex" alignItems="center">
                    <FormLabel ml="30px" mb="0">
                      Dark mode
                    </FormLabel>
                    <Switch
                      id="dark_mode"
                      onChange={(e) => console.log(e.target.checked)}
                    />
                  </FormControl> 
                  
                </ListLink> */}
                <ListLink
                  onClick={() => {
                    handdleOut();
                  }}
                >
                  <Icon
                    color="white"
                    className="icon_button"
                    as={MdOutlineExitToApp}
                    backgroundColor={
                      colorMode === "light" ? "primary" : "secondary"
                    }
                  />
                  <Text color={colorMode === "light" ? "gray.800" : "white"}>
                    Close
                  </Text>
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
