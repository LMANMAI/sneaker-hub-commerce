import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { setError, selectError } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authClient } from "../../functions/Sesion";
import { CheckView } from ".";
interface IPropsFn {
  fn: Function;
}
const Register: React.FC<IPropsFn> = ({ fn }) => {
  const dispatch = useDispatch();
  const errorM = useSelector(selectError);

  const [check, setCheck] = useState<boolean>(false);
  const [user, setUserRegister] = useState({
    firstName: "",
    emailr: "",
    passwordr: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegister({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // authClient(user).then((res) => {
    //   if (res === "Correcto") {
    //     setCheck(true);
    //     setTimeout(() => {
    //       dispatch(setError(""));
    //       setCheck(false);
    //     }, 1500);
    //   } else if (res === "in_use") {
    //     setCheck(false);
    //     dispatch(setError("email ya registrado"));
    //   } else if (res === "password") {
    //     setCheck(false);
    //     dispatch(setError("password incorrecto"));
    //   }
    // });
    setUserRegister({
      firstName: "",
      emailr: "",
      passwordr: "",
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

      {check ? (
        <CheckView />
      ) : (
        <>
          <Text as="h3" textAlign="center" fontWeight="bold">
            Registrate
          </Text>
          <FormControl as="form" autoComplete="off" onSubmit={handleSubmit}>
            {/* <FormLabel htmlFor="firstName">Nombre</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="firstName"
              id="firstName"
              type="text"
            /> */}

            <FormLabel htmlFor="emailr">Correo electronico</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="emailr"
              id="emailr"
              type="email"
            />

            <FormLabel htmlFor="passwordr">Contraseña</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="passwordr"
              type="password"
              id="passwordr"
            />
            <Text fontSize="13px" textAlign="center">
              ¿Ya tenes una cuenta?{" "}
              <Button
                variant="unstyled"
                size="fit-content"
                onClick={() => fn(false)}
              >
                Ingresar
              </Button>
            </Text>
            <Button
              variant="primary"
              type="submit"
              mt={2}
              w="100%"
              border="none"
              outline="none"
              onClick={(e) => handleSubmit(e)}
            >
              Registrar
            </Button>
          </FormControl>
        </>
      )}
    </Stack>
  );
};

export default Register;
