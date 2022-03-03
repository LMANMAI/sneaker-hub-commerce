import {
  Stack,
  Box,
  Text,
  Button,
  Input,
  FormControl,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../controllers/Profile";
import { clearFavs } from "../controllers/Products";
import { selectUser, setUser } from "../features/userSlice";

interface IPropsStack {
  children: React.ReactNode;
  border?: boolean;
}
function StackContainer({ children, border }: IPropsStack) {
  return (
    <Stack
      borderY={border ? "1px solid #f0f0f0" : "none"}
      padding="25px"
      marginY={4}
    >
      {children}
    </Stack>
  );
}

const Settings = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const [usersettigns, setUSerSettings] = useState<any>({
    email: currentUser.email,
    firstName: currentUser.firstName,
    confirmacion: currentUser.confirmacion,
    idToken: currentUser.idToken,
    idUser: currentUser.idUser,
    method: currentUser.method,
    profileIMG: currentUser.profileIMG,
    rol: currentUser.rol,
  });
  const [disabledstate, setDisabled] = useState<boolean>(false);
  const { firstName, email } = usersettigns;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUSerSettings({
      ...usersettigns,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      const newprofile = await updateProfile(usersettigns);
      dispatch(setUser(newprofile));
    })();
  };
  return (
    <Stack h="100%" p={2}>
      <Text as="h1" fontSize="2.125rem" fontWeight="bold">
        Settings
      </Text>
      <Box minHeight="70vh">
        <Stack>
          <Box
            w="100%"
            minHeight="250px"
            borderTopLeftRadius="100px"
            background="linear-gradient(331deg, rgb(251 246 249) 0%, rgba(244,244,244,1) 35%, rgb(248 254 255) 100%)"
            backdropBlur="18px"
          ></Box>
          <Stack paddingLeft={{ base: "10px ", md: "250px" }}>
            <Stack
              w="100%"
              h="100%"
              maxHeight="150px"
              maxWidth="150px"
              top={{ base: "240px", md: "280px" }}
              left={{ base: "50px", md: "100px" }}
              border="4px solid white"
              borderRadius="100%"
              backgroundColor="gray"
              overflow="hidden"
              position="absolute"
            >
              <Image src={usersettigns.profileIMG} />
            </Stack>
          </Stack>
        </Stack>
        <FormControl>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Stack>
              <Text as="h2" fontSize="2.125rem" fontWeight="bold">
                Profile
              </Text>
              <Text>Update your photo and some details </Text>
            </Stack>
            <Button
              type={disabledstate ? "submit" : "button"}
              onClick={(e) => {
                setDisabled(!disabledstate);
                if (disabledstate) {
                  handleSubmit(e);
                }
              }}
            >
              {disabledstate ? "Save" : "Update"}
            </Button>
          </Stack>
          <StackContainer>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Text w="30%" mb="8px" textAlign="end">
                Name:
              </Text>
              <Input
                disabled={!disabledstate ? true : false}
                defaultValue={firstName}
                onChange={handleChange}
                placeholder="Primer Nombre"
                size="sm"
                maxWidth="450px"
                type="text"
                borderRadius="10px"
                padding="20px"
                name="firstName"
              />
            </Stack>
          </StackContainer>

          <StackContainer border={true}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Text w="30%" mb="8px" textAlign="end">
                Email:
              </Text>
              <Input
                disabled={!disabledstate ? true : false}
                value={email}
                name="email"
                onChange={handleChange}
                placeholder="Email"
                size="sm"
                maxWidth="450px"
                type="text"
                borderRadius="10px"
                padding="20px"
              />
            </Stack>
          </StackContainer>

          <StackContainer>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Text w="30%" mb="8px" textAlign="end">
                Password:
              </Text>
              <Input
                disabled
                placeholder="You will be able to change the password soon"
                size="sm"
                maxWidth="450px"
                type="text"
                borderRadius="10px"
                padding="20px"
              />
            </Stack>
          </StackContainer>
        </FormControl>
        <Button onClick={() => clearFavs(currentUser)}>Clear Favorites</Button>
      </Box>
    </Stack>
  );
};

export default Settings;
