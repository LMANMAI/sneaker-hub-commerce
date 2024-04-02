import {
  Stack,
  Box,
  Text,
  Button,
  Input,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
  Radio,
  RadioGroup,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  setUserShippingAddress,
  getAddresses,
} from "../../functions/Profile";
import { removeAddress } from "../../functions/Profile";
import { clearFavs } from "../../functions/Products";
import { selectUser, setUser } from "../../features/userSlice";
import { SelectBody } from "../../components";
import { CustomButton } from "./styles";
import { DeleteIcon } from "@chakra-ui/icons";
interface IPropsStack {
  children: React.ReactNode;
  border?: boolean;
}
interface Address {
  direc: {
    calle: string;
    alt: string;
  };
  locald: string;
  prov: string;
  mun: string;
  mainAddress?: boolean;
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

const Settings = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  //states
  const [usersettigns, setUSerSettings] = useState<any>({
    email: currentUser.email,
    displayName: currentUser.firstName || "",
    accessToken: currentUser.idToken || "",
    uid: currentUser.idUser,
    profileIMG: currentUser.profileIMG || "",
  });
  const [adress, setAdress] = useState<Address>({
    prov: "",
    mun: "",
    locald: "",
    direc: {
      calle: "",
      alt: "",
    },
  });
  const [load, setLoad] = useState<boolean>(false);
  const [disabledstate, setDisabled] = useState<boolean>(false);
  const [addressarray, setArrayAddresses] = useState<any[]>([]);
  const [value, setValue] = useState<any>();
  const [isAddressComplete, setIsAddressComplete] = useState<boolean>(false);
  //modal
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  const handleAddress = async () => {
    setLoad(true);
    if (adress) {
      const request = await setUserShippingAddress(adress, currentUser.uid);

      if (request.status === 200) {
        setLoad(false);
        setArrayAddresses(request.data);
        setAdress({
          prov: "",
          mun: "",
          locald: "",
          direc: {
            calle: "",
            alt: "",
          },
        });
        onClose();
        setIsAddressComplete(false);
      } else {
        setLoad(false);
        setArrayAddresses([]);
      }
    }
  };
  const getUserAddresses = async () => {
    const request = await getAddresses(currentUser.uid);
    if (request) {
      setArrayAddresses(request);
    }
  };
  const handleClearFavs = async () => {
    setLoad(true);
    const request = await clearFavs(currentUser);
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
    const request = await removeAddress(currentUser.uid, addressId);
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
              <Image src={currentUser.profileIMG} />
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
                    placeholder="You will be able to change the password soon"
                    size="sm"
                    maxWidth="450px"
                    type="text"
                    borderRadius="10px"
                  />
                </Stack>
              </StackContainer>

              <StackContainer>
                <Modal
                  closeOnOverlayClick={false}
                  blockScrollOnMount={true}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Agregar direccion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <SelectBody
                        setObjetc={setAdress}
                        setIsAddressComplete={setIsAddressComplete}
                      />
                    </ModalBody>

                    <ModalFooter>
                      <CustomButton
                        variant="primary"
                        mr={3}
                        onClick={() => {
                          handleAddress();
                        }}
                        isLoading={load}
                        className={!isAddressComplete ? "disabled" : ""}
                      >
                        Guardar direccion
                      </CustomButton>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
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
              <Button variant="primary" onClick={onOpen} isLoading={load}>
                Agregar dirección
              </Button>
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
