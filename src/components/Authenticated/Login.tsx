import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { setUser, selectUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signAuthUser } from "../../functions/Sesion";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface IProps {
  fn: Function;
}
const Login: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const current_user = useSelector(selectUser);
  const [load, setLoad] = useState<boolean>(false);
  const [user, setUserM] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserM({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    if (!current_user) {
      try {
        const response = await signAuthUser(user);
        if (response.status === 200) {
          dispatch(setUser(response.user));
          setLoad(false);
          setUserM({
            email: "",
            password: "",
          });
        } else {
          setLoad(false);
          toast({
            title: `Error signing in: ${response.msg}`,
            status: "error",
            duration: 3500,
            isClosable: true,
            position: "bottom-right",
          });
        }
      } catch (error: any) {
        setLoad(false);
        toast({
          title: `Error signing in`,
          description: error.message,
          status: "error",
          duration: 3500,
          isClosable: true,
          position: "bottom-right",
        });
        console.error("Error signing in:", error);
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
        <InputGroup>
          <Input
            onChange={(e) => handleChange(e)}
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
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
          isLoading={load}
        >
          Entrar
        </Button>
      </FormControl>
    </Stack>
  );
};

export default Login;
