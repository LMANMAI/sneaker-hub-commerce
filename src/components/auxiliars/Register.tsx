import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { setError, selectError, setUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authClient } from "../../controllers/Sesion";
import { CheckView } from "./";
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
    authClient(user).then((res) => {
      if (res === "Correcto") {
        setCheck(true);
        setTimeout(() => {
          dispatch(setError(""));
          setCheck(false);
        }, 1500);
      } else if (res === "in_use") {
        setCheck(false);
        dispatch(setError("email ya registrado"));
      } else if (res === "password") {
        setCheck(false);
        dispatch(setError("password incorrecto"));
      }
    });
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
            Don't have an account?
          </Text>
          <FormControl as="form" autoComplete="off" onSubmit={handleSubmit}>
            <FormLabel htmlFor="firstName">Name</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="firstName"
              id="firstName"
              type="text"
            />

            <FormLabel htmlFor="emailr">Email</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="emailr"
              id="emailr"
              type="email"
            />

            <FormLabel htmlFor="passwordr">Password</FormLabel>
            <Input
              onChange={(e) => handleChange(e)}
              name="passwordr"
              type="password"
              id="passwordr"
            />
            <Text fontSize="13px" textAlign="center">
              Do you already have an account?
              <Button
                variant="unstyled"
                size="fit-content"
                onClick={() => fn(false)}
              >
                log in
              </Button>
            </Text>
            <Button
              colorScheme="primary"
              type="submit"
              mt={2}
              w="100%"
              border="none"
              outline="none"
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
