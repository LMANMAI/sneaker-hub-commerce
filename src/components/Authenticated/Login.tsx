import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  setUser,
  setError,
  selectError,
  selectUser,
} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signAuthUser } from "../../functions/Sesion";

interface IProps {
  fn: Function;
}
const Login: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const current_user = useSelector(selectUser);

  const [user, setUserM] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserM({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!current_user) {
      try {
        const response = await signAuthUser(user);
        if (typeof response !== "string") {
          dispatch(setUser(response));
          setUserM({
            email: "",
            password: "",
          });
          dispatch(setError(""));
        } else {
        }
      } catch (error) {
        console.error("Error signing in:", error);
        dispatch(setError("Ocurrió un error"));
      }
    }
  };
  return (
    <Stack h="100%" p={4}>
      <Text as="h3" textAlign="center" fontWeight="bold">
        Ingresar
      </Text>
      <FormControl as="form" autoComplete="off" onSubmit={handleSubmit}>
        <FormLabel htmlFor="email">Correo electronico</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="email"
          id="email"
          type="email"
        />

        <FormLabel htmlFor="password">Contraseña</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="password"
          type="password"
          id="password"
        />
        <Stack height={"80px"} />
        <Text fontSize="13px" textAlign="center" alignItems="center">
          ¿No tenes una cuenta?{" "}
          <Button
            variant="unstyled"
            size="fit-content"
            onClick={() => props.fn(true)}
          >
            Registrate
          </Button>
        </Text>

        <Button
          variant="primary"
          mt={2}
          type="submit"
          w="100%"
          border="none"
          outline="none"
        >
          Entrar
        </Button>
      </FormControl>
    </Stack>
  );
};

export default Login;
