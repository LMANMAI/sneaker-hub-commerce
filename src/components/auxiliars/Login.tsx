import { Stack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  setUser,
  setError,
  selectError,
  setIdUSer,
  selectUser,
} from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuth,
  signAuthUser,
  clientOnState,
} from "../../controllers/Sesion";
interface IUserVerified {
  idUsuario: string;
  token: any;
}
const Login = (props: any) => {
  const dispatch = useDispatch();
  const errorM = useSelector(selectError);
  const current_user = useSelector(selectUser);
  const [user, setUserM] = useState({
    email: "",
    password: "",
  });
  const [userverificated, setUserVerificated] = useState<any>();
  const [statenotif, setStateNotif] = useState<boolean>(false);
  const [massagenotif, setMessage] = useState<string>("");

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
        console.log(userDB);
        dispatch(setUser(userDB));
      })();
    }
    setUserVerificated(null);
  }, [userverificated, current_user, props.history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signAuthUser(user).then((res) => {
      if (typeof res !== "string") {
        setUserVerificated(res);
      } else if (res === "contraseñaIncorreta") {
        setStateNotif(true);
        setMessage("Contraseña incorrecta");
      } else if (res === "noverificado") {
        setStateNotif(true);
        setMessage("Necesitas verificar el correo");
      } else {
        setStateNotif(true);
        setMessage("Hay un error");
      }
      setUserM({
        email: "",
        password: "",
      });
    });
  };

  return (
    <Stack h="100%" p={4}>
      {errorM && <p>{errorM}</p>}
      <h3>Inicia sesion</h3>
      <FormControl as="form" autoComplete="off" onSubmit={handleSubmit}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="email"
          id="email"
          type="email"
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="password"
          type="password"
          id="password"
        />

        <Button
          colorScheme="primary"
          type="submit"
          mt={6}
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
