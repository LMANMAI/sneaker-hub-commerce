import { Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Login, Register } from ".";

const AuthComponent = () => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div style={{ overflow: "hidden" }}>
      <Stack
        padding="1rem"
        transition="transform 250ms ease-in-out"
        transform={login ? "translateX(0%)" : "translateX(-110%)"}
        visibility={login ? "visible" : "hidden"}
        pointerEvents={login ? "all" : "none"}
      >
        <Register fn={setLogin} />
      </Stack>

      <Stack
        position="absolute"
        top="0px"
        padding="1rem"
        transition="transform 150ms ease-in-out, visibility 175ms ease-in-out"
        transform={login ? "translateX(110%)" : "translateX(0%)"}
        visibility={login ? "hidden" : "visible"}
        pointerEvents={login ? "none" : "all"}
      >
        <Login fn={setLogin} />
      </Stack>
    </div>
  );
};

export default AuthComponent;
