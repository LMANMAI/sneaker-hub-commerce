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
  useEffect(() => {
    if (userverificated) {
      (async () => {
        const userDB = await getUserAuth(userverificated);
        localStorage.setItem("idCliente", userDB?.idCliente);
        dispatch(setUser(userDB));
      })();
    }
    setUserVerificated(null);
  }, [userverificated, current_user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signAuthUser(user).then((res) => {
      if (typeof res !== "string") {
        setUserVerificated(res);
      } else if (res === "contraseñaIncorreta") {
        dispatch(setError("Contraseña incorrecta"));
      } else if (res === "noverificado") {
        dispatch(setError("Necesitas verificar el correo"));
      } else {
        dispatch(setError("Hay un error"));
      }
      setUserM({
        email: "",
        password: "",
      });
      setTimeout(() => {
        dispatch(setError(""));
      }, 1000);
    });
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
      </FormControl>

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
        type="submit"
        mt={2}
        w="100%"
        border="none"
        outline="none"
      >
        Entrar
      </Button>
    </Stack>
  );
};

export default Login;
