import {
  Stack,
  Box,
  Text,
  Button,
  Input,
  FormControl,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  updateProfileWhithPhoto,
  setUserShippingAddress,
  getAddresses,
} from "../../functions/Profile";
import { clearFavs } from "../../functions/Products";
import { selectUser, setUser } from "../../features/userSlice";
import { SelectBody } from "../../components";
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
      //justifyContent="center"
      direction="row"
    >
      {children}
    </Stack>
  );
}

const Settings = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  //states
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
  const [adress, setAdress] = useState({
    prov: "",
    mun: "",
    locald: "",
    direc: {},
  });
  const [disabledstate, setDisabled] = useState<boolean>(false);
  const [foto, setFoto] = useState<any>(undefined);
  const [fotopreview, setPreview] = useState<any>(currentUser.profileIMG);
  const [addressarray, setArrayAddresses] = useState<any[]>([]);
  const [value, setValue] = useState<any>();
  //modal
  const { firstName } = usersettigns;
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const eliminarImage = () => {
    setFoto(undefined);
    setPreview(undefined);
  };
  const saveImage = (e: any) => {
    e.preventDefault();
    const userId = currentUser.idUser;
    if (foto === undefined) {
      setFoto(undefined);
      setPreview(fotopreview);
      updateProfileWhithPhoto(fotopreview, userId);
    } else {
      updateProfileWhithPhoto(foto, userId);
      setFoto(undefined);
      setPreview(fotopreview);
    }
  };
  const changeImage = (e: any) => {
    let selectImage;
    if (e.target.files && e.target.files.length === 1) {
      selectImage = e.target.files[0];
      setFoto(selectImage);
    }
  };

  useEffect(() => {
    if (!foto) {
      return;
    }
    const fotcargada = new FileReader();
    fotcargada.onload = () => {
      setPreview(fotcargada.result);
    };
    fotcargada.readAsDataURL(foto);
  }, [foto]);

  // useEffect(() => {
  //   (async () => {
  //     const res = await getAddresses(currentUser.idUser);
  //     if (typeof res !== "string") setArrayAddresses(res);
  //   })();
  // }, [addressarray]);

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
              <Image src={fotopreview} />
            </Stack>
          </Stack>
        </Stack>
        <FormControl onSubmit={(e) => handleSubmit(e)}>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            marginTop={"50px"}
          >
            <Stack direction={{ base: "column", md: "row" }} width={"100%"}>
              <Button variant="primary" onClick={onOpen}>
                Agregar dirección
              </Button>
              <Button
                variant="secondary"
                onClick={() => clearFavs(currentUser)}
              >
                Limpíar favoritos
              </Button>
            </Stack>

            <Button
              variant="primary"
              width={{ base: "100%", md: "fit-content" }}
              type={disabledstate ? "submit" : "button"}
              onClick={() => {
                setDisabled(!disabledstate);
              }}
            >
              {disabledstate ? "Guardar" : "Actualizar"}
            </Button>
          </Stack>
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
                    defaultValue={firstName}
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
                <Stack direction={{ base: "column", sm: "row" }}>
                  <Text width={{ base: "100%", md: "35%" }}>
                    Foto de perfil
                  </Text>

                  <Input
                    disabled={!disabledstate ? true : false}
                    type="file"
                    accept=".jpg"
                    alignSelf="center"
                    border="none"
                    paddingLeft={"0px"}
                    onChange={(e) => changeImage(e)}
                  />
                  {foto !== undefined && (
                    <Stack direction="row">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => saveImage(e)}
                      >
                        Cambiar imagen
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => eliminarImage()}
                      >
                        Cancelar
                      </Button>
                    </Stack>
                  )}
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
                      <SelectBody setObjetc={setAdress} />
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        variant="primary"
                        mr={3}
                        onClick={() => {
                          if (adress) {
                            setUserShippingAddress(adress, currentUser.idUser);
                          }
                          setAdress({
                            prov: "",
                            mun: "",
                            locald: "",
                            direc: {},
                          });
                          onClose();
                        }}
                      >
                        Guardar direccion
                      </Button>
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
                <Stack alignItems="center" p={4}>
                  <RadioGroup value={value} onChange={setValue}>
                    {addressarray.map((item) => (
                      <Radio
                        name="direccion"
                        value={`${item.direc.calle} ${item.direc.alt}`}
                      >
                        <Stack
                          p={4}
                          direction="row"
                          alignItems="center"
                          w="80%"
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
                        </Stack>
                      </Radio>
                    ))}
                  </RadioGroup>
                </Stack>
              ) : (
                <Text>Por el momento no se ingreso ninguna direccion</Text>
              )}
            </Stack>
          </Stack>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default Settings;
