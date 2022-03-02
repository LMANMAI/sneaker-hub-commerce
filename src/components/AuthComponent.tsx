import { Button, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Login, Register } from "./auxiliars";
import { useDispatch } from "react-redux";
import { setMenuHeight } from "../features/userSlice";

const AuthComponent = () => {
  const [login, setLogin] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMenuHeight(login));
  }, [login]);
  return (
    <div>
      <Stack
        position="absolute"
        left="0px"
        w="100%"
        padding="1rem"
        transition="250ms ease"
        transform={login ? "translateX(0%)" : "translateX(-110%)"}
      >
        <Register fn={setLogin} />
      </Stack>

      <Stack
        position="absolute"
        left="0px"
        w="100%"
        padding="1rem"
        transition="250ms ease"
        transform={login ? "translateX(110%)" : "translateX(0%)"}
      >
        <Login fn={setLogin} />
      </Stack>
    </div>
  );
};

export default AuthComponent;
