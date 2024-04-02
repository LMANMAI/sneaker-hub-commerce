import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authClient } from "../../functions/Sesion";
import { setUser } from "../../features/userSlice";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
interface IPropsFn {
  fn: Function;
}
const Register: React.FC<IPropsFn> = ({ fn }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [load, setLoad] = useState<boolean>(false);
  const [user, setUserRegister] = useState({
    displayName: "",
    emailforRegister: "",
    passwordforRegister: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserRegister({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
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
        setLoad(false);
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
      setLoad(false);
    } catch (error: any) {
      setLoad(false);
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

        <FormLabel htmlFor="passwordforRegister">Contraseña</FormLabel>
        <InputGroup>
          <Input
            onChange={(e) => handleChange(e)}
            name="passwordforRegister"
            type={showPassword ? "text" : "password"}
            id="passwordforRegister"
            value={user.passwordforRegister}
          />
          <InputRightElement width="2.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              background={"transparent!important"}
              onClick={handleTogglePassword}
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            />
          </InputRightElement>
        </InputGroup>
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
          isLoading={load}
        >
          Registrar
        </Button>
      </FormControl>
    </Stack>
  );
};

export default Register;
