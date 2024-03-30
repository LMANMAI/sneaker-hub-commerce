import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authClient } from "../../functions/Sesion";
import { setUser } from "../../features/userSlice";
interface IPropsFn {
  fn: Function;
}
const Register: React.FC<IPropsFn> = ({ fn }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [user, setUserRegister] = useState({
    displayName: "",
    emailforRegister: "",
    passwordforRegister: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserRegister({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authClient(user);

      if (res.msg === "Correcto") {
        toast({
          title: "Se registro al usuario correctamente.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        setUserRegister({
          displayName: "",
          emailforRegister: "",
          passwordforRegister: "",
        });
        dispatch(setUser(res.userRegistered));
        console.log(res.userRegistered);
      } else if (res.msg === "in_use") {
        toast({
          title: "El correo electrónico ya está registrado.",
          description: res.error,
          status: "warning",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      } else if (res.msg === "password") {
        toast({
          title: "Contraseña incorrecta.",
          description: res.error,
          status: "warning",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      } else if (res.msg === "error") {
        toast({
          title: "Error al autenticar el cliente.",
          description: res.error,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      console.log("Error al autenticar el cliente: ", error.message);
    }
  };
  return (
    <Stack h="100%" p={4}>
      <Text as="h3" textAlign="center" fontWeight="bold">
        Registrate
      </Text>
      <FormControl as="form" autoComplete="off" onSubmit={handleSubmit}>
        <FormLabel htmlFor="displayName">Nombre</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="displayName"
          id="firstName"
          type="text"
          value={user.displayName}
        />

        <FormLabel htmlFor="email">Correo electronico</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="emailforRegister"
          id="emailforRegister"
          type="email"
          value={user.emailforRegister}
        />

        <FormLabel htmlFor="password">Contraseña</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="passwordforRegister"
          type="password"
          id="passwordforRegister"
          value={user.passwordforRegister}
        />
        <Text fontSize="13px" textAlign="center" marginTop={2}>
          ¿Ya tenes una cuenta?
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
    </Stack>
  );
};

export default Register;
