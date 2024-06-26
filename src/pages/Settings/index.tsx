import {
  Stack,
  Box,
  Text,
  Button,
  Input,
  Image,
  Divider,
  Radio,
  RadioGroup,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile, getAddresses } from "../../functions/Profile";
import { removeAddress } from "../../functions/Profile";
import { clearFavs } from "../../functions/Products";
import { setUser } from "../../features/userSlice";
import { DeleteIcon } from "@chakra-ui/icons";
import { AdressButton } from "../../components";
interface IPropsStack {
  children: React.ReactNode;
  border?: boolean;
}

function StackContainer({ children, border }: IPropsStack) {
  return (
    <Stack
      borderY={border ? "1px solid #f0f0f0" : "none"}
      padding="5px"
      alignItems="center"
      direction="row"
    >
      {children}
    </Stack>
  );
}

const Settings = ({ user }: { user: any }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  //states
  const [usersettigns, setUSerSettings] = useState<any>({
    email: user.email,
    displayName: user.firstName || "",
    accessToken: user.idToken || "",
    idUser: user.idUser,
    profileIMG: user.profileIMG || "",
  });

  const [load, setLoad] = useState<boolean>(false);
  const [disabledstate, setDisabled] = useState<boolean>(false);
  const [addressarray, setArrayAddresses] = useState<any[]>([]);
  const [value, setValue] = useState<any>();
  //modal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUSerSettings({
      ...usersettigns,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    const newprofile = await updateProfile(usersettigns);
    if (newprofile.status === 200) {
      dispatch(setUser(newprofile.data));
      setLoad(false);
      toast({
        title: "Perfil actualizado correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      setLoad(false);
      toast({
        title: "Ocurrio un error actulizando el perfil.",
        description: newprofile.msg,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const getUserAddresses = async () => {
    const request = await getAddresses(user.idUser);
    if (request) {
      setArrayAddresses(request);
    }
  };
  const handleClearFavs = async () => {
    setLoad(true);
    const request = await clearFavs(user.idUser);
    if (request === "eliminados") {
      setLoad(false);
      toast({
        title: "Favoritos eliminados.",
        description: "Todos los favoritos fueron removidos de la lista.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      setLoad(false);
      toast({
        title: "Ocurrio un error.",
        description: request,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  const handleDeleteAddress = async (addressId: any) => {
    const request = await removeAddress(user.idUser, addressId);
    if (request.status === 200) {
      setArrayAddresses(request.addresses);
      toast({
        title: "Dirección eliminada con exito.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    } else if (request.status === 500) {
      setArrayAddresses([]);
      toast({
        title: "Ocurrio un error.",
        description: request.msg,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  useEffect(() => {
    getUserAddresses();
  }, []);

  return (
    <Stack h="100%" p={2} marginTop={"65px"}>
      <Stack direction={"column"}>
        <Text as="h1" fontSize="2.125rem" fontWeight="bold">
          Configuraciones
        </Text>
        <Text>Actualizar foto y algunos datos del perfil.</Text>
      </Stack>
      <Box minHeight="70vh">
        <Stack>
          <Box
            w="100%"
            minHeight="250px"
            borderTopRightRadius="100px"
            border="5px solid white"
            background="linear-gradient(331deg, rgb(227 227 227) 0%, rgba(244, 244, 244, 1) 35%, rgb(235 235 235) 100%)"
            backdropBlur="18px"
          ></Box>
          <Stack>
            <Stack
              w="100%"
              h="100%"
              maxHeight="150px"
              maxWidth="150px"
              top={{ base: "300px", md: "280px" }}
              left={{ base: "50px", md: "100px" }}
              border="5px solid white"
              borderRadius="100%"
              backgroundColor="#c1c1c1"
              overflow="hidden"
              position="absolute"
            >
              <Image src={user.profileIMG} />
            </Stack>
          </Stack>
        </Stack>

        <Stack>
          <Divider orientation="horizontal" marginY={4} />
          <Stack direction={"column"}>
            {/* Datos del usuario */}
            <Stack alignItems="baseline" width={"100%"}>
              <StackContainer>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  <Text textAlign="end">Nombre:</Text>
                  <Input
                    disabled={!disabledstate ? true : false}
                    defaultValue={usersettigns.displayName}
                    onChange={handleChange}
                    placeholder="Primer Nombre"
                    size="sm"
                    maxWidth="450px"
                    type="text"
                    borderRadius="10px"
                    name="firstName"
                  />
                </Stack>
              </StackContainer>
              <StackContainer>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  <Text textAlign="end">Contraseña:</Text>
                  <Input
                    disabled
                    placeholder="Se podra cambiar la contraseña proximamente."
                    size="sm"
                    maxWidth="450px"
                    type="text"
                    borderRadius="10px"
                  />
                </Stack>
              </StackContainer>
            </Stack>
            <Divider orientation="horizontal" marginY={4} />
            {/* Direcciones del usuario */}
            <Stack w="100%">
              <Text as="h3">Mis direcciones</Text>

              {addressarray.length != 0 ? (
                <Stack p={4}>
                  <RadioGroup
                    value={value}
                    onChange={setValue}
                    display={"flex"}
                    flexDirection={{ base: "column", md: "row" }}
                    defaultValue={
                      addressarray
                        .filter((item) => item.mainAddress === true)
                        .map((item) => item.id)[0]
                    }
                  >
                    {addressarray.map((item) => {
                      return (
                        <Radio name="direccion" value={`${item.id}`}>
                          <Stack
                            p={4}
                            maxWidth={"400px"}
                            minWidth={"200px"}
                            direction="row"
                            alignItems="center"
                            justifyContent={"space-around"}
                            _hover={{ "> button": { visibility: "visible" } }}
                          >
                            <Stack>
                              <Text>
                                {`${item.direc.calle} ${item.direc.alt}`} -{" "}
                                {item.locald}
                              </Text>
                              <Stack>
                                <Text>{`${item.prov} ${item.mun}`}</Text>
                              </Stack>
                            </Stack>
                            <IconButton
                              aria-label="Eliminar dirección"
                              icon={<DeleteIcon />}
                              onClick={() => handleDeleteAddress(item.id)}
                              size="sm"
                              visibility="hidden"
                            />
                          </Stack>
                        </Radio>
                      );
                    })}
                  </RadioGroup>
                </Stack>
              ) : (
                <Text>Por el momento no se ingreso ninguna direccion</Text>
              )}
            </Stack>
          </Stack>

          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            marginTop={"50px"}
          >
            <Stack direction={{ base: "column", md: "row" }} width={"100%"}>
              <AdressButton
                user={user}
                load={load}
                setLoad={setLoad}
                setArrayAddresses={setArrayAddresses}
              />
              <Button
                variant="secondary"
                isLoading={load}
                onClick={() => handleClearFavs()}
              >
                Limpíar favoritos
              </Button>
            </Stack>

            <Button
              variant="primary"
              width={{ base: "100%", md: "fit-content" }}
              type={disabledstate ? "submit" : "button"}
              isLoading={load}
              onClick={(e) => {
                setDisabled(!disabledstate);
                if (disabledstate) {
                  handleSubmit(e);
                }
              }}
            >
              {disabledstate ? "Guardar" : "Actualizar"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Settings;
