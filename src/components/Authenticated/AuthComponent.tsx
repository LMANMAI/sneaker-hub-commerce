import { Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Login, Register } from ".";

const AuthComponent = () => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <Stack
      direction={"row"}
      width={"300px"}
      height={"380px"}
      overflow={"hidden"}
      zIndex={99}
      position={"relative"}
    >
      <Stack
        padding=".5rem"
        transition="transform 250ms ease-in-out, visibility 250ms ease-in-out"
        position={"absolute"}
        right={"0px"}
        width={"300px"}
        background={"white"}
        transform={login ? "translateX(0%)" : "translateX(-110%)"}
        visibility={login ? "visible" : "hidden"}
        pointerEvents={login ? "all" : "none"}
      >
        <Register fn={setLogin} />
      </Stack>

      <Stack
        padding=".5rem"
        transition="transform 250ms ease-in-out, visibility 250ms ease-in-out"
        position={"absolute"}
        right={"0px"}
        width={"300px"}
        background={"white"}
        transform={login ? "translateX(110%)" : "translateX(0%)"}
        visibility={login ? "hidden" : "visible"}
        pointerEvents={login ? "none" : "all"}
      >
        <Login fn={setLogin} />
      </Stack>
    </Stack>
  );
};

export default AuthComponent;
