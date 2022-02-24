import { Stack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { setUser, setError, selectError } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../app/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const dispatch = useDispatch();
  const errorM = useSelector(selectError);
  const [user, setUserM] = useState({
    emaillog: "",
    passwordlog: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserM({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        user.emaillog,
        user.passwordlog
      ).then((userCredential) => {
        dispatch(setUser(userCredential.user));
      });
    } catch (error: any) {
      dispatch(setError(error.message));
      setTimeout(() => {
        dispatch(setError(""));
      }, 2000);
    }
  };
  return (
    <Stack h="100%" p={4}>
      {errorM && <p>{errorM}</p>}
      <h3>Inicia sesion</h3>
      <FormControl as="form" autoComplete="off" onSubmit={handleSubmit}>
        <FormLabel htmlFor="emaillog">Email</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="emaillog"
          id="emaillog"
          type="email"
        />

        <FormLabel htmlFor="passwordlog">Password</FormLabel>
        <Input
          onChange={(e) => handleChange(e)}
          name="passwordlog"
          type="password"
          id="passwordlog"
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
