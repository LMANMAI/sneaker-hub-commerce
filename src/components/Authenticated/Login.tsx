import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  setUser,
  setError,
  selectError,
  selectUser,
} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth, signAuthUser } from "../../functions/Sesion";

interface IProps {
  fn: Function;
}
const Login: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const errorM = useSelector(selectError);
  const current_user = useSelector(selectUser);

  const [user, setUserM] = useState({
    email: "",
    password: "",
  });
  const [userverificated, setUserVerificated] = useState<any>();
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
        console.log(response);
        if (typeof response !== "string") {
          setUserVerificated(response);
          dispatch(setUser(response));
          setUserM({
            email: "",
            password: "",
          });
          dispatch(setError(""));
        } else {
          dispatch(setError(response)); // Set error message from response
        }
      } catch (error) {
        console.error("Error signing in:", error);
        dispatch(setError("Ocurrió un error")); // Generic error message
      }
    }
  };
  return (
    <Stack h="100%" p={4}>
      {errorM && (
        <Text
          textAlign="center"
          fontSize="13px"
          backgroundColor="#e4e4e4"
          borderRadius="14px"
          textTransform="initial"
          p={2}
        >
          {errorM}
        </Text>
      )}
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

        <Text fontSize="13px" textAlign="center" alignItems="center">
          ¿No tenes una cuenta?{" "}
          <Button
            variant="unstyled"
            size="fit-content"
            onClick={() => props.fn(true)}
          >
            Registrar
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
