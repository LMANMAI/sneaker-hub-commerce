import { useState, useRef, useEffect, useMemo } from "react";
import { Stack, Text, Avatar, Icon } from "@chakra-ui/react";
import avatar from "../assets/image-avatar.png";
import styled from "@emotion/styled";
import {
  MdOutlineArrowForwardIos,
  MdSettings,
  MdFavoriteBorder,
  MdShoppingBasket,
  MdOutlineExitToApp,
} from "react-icons/md";
const ListLink = styled(Text)`
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

const ProfileMenu: React.FC = () => {
  const [menu, setMenuPosition] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const menureflect = document.querySelector(".menu_container");
  const menumain = document.querySelector(".menu_main");

  function ItemMenu(props: IProps) {
    return (
      <ListLink>
        <Icon className="icon_button" as={props.iconleft} />
        {props.children}
        <Icon
          className="icon_right"
          as={props.iconRight}
          onClick={() => {
            setMenuPosition(!menu);
            if (menureflect) {
              setHeight(menureflect?.getBoundingClientRect().height);
            }
          }}
        />
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
      boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
      borderRadius="15px"
      overflow="hidden"
      minHeight="310px"
      height={height}
      transition="height 250ms ease"
    >
      <Stack
        listStyleType="none"
        position="absolute"
        top="0px"
        left="0px"
        w="100%"
        padding="1rem"
        transition="all 350ms ease"
        transform={menu ? "translateX(-110%)" : "translateX(0%)"}
        className="menu_main"
      >
        <ListLink justifyContent="center">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Avatar width={8} height={8} src={avatar} /> <p>My Profile</p>
          </Stack>
        </ListLink>
        <hr />
        <ListLink>
          <Icon className="icon_button" as={MdFavoriteBorder} />
          Favorites
        </ListLink>
        <ItemMenu
          iconleft={MdShoppingBasket}
          iconRight={MdOutlineArrowForwardIos}
        >
          Wishlist
        </ItemMenu>

        <ItemMenu iconleft={MdSettings} iconRight={MdOutlineArrowForwardIos}>
          Settings
        </ItemMenu>
        <ListLink>
          <Icon className="icon_button" as={MdOutlineExitToApp} />
          Close
        </ListLink>
      </Stack>

      <Stack
        position="absolute"
        top="0px"
        left="0px"
        w="100%"
        padding="1rem"
        transition="all 350ms ease"
        transform={menu ? "translateX(0%)" : "translateX(110%)"}
        className="menu_container"
      >
        <button
          onClick={() => {
            setMenuPosition(false);
            if (menumain) {
              setHeight(menumain?.getBoundingClientRect().height);
            }
          }}
        >
          s{`<-`}
        </button>
        <ListLink>menu</ListLink>
        <ListLink>menu</ListLink>
        <ListLink>menu</ListLink>
        <ListLink>menu</ListLink>
        <ListLink>menu</ListLink>
        <ListLink>menu</ListLink>
        <ListLink>menu</ListLink>
        <ListLink>menu</ListLink>
      </Stack>
    </Stack>
  );
};

export default ProfileMenu;
