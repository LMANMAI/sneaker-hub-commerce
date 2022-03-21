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
} from "../controllers/Profile";
import { clearFavs } from "../controllers/Products";
import { selectUser, setUser } from "../features/userSlice";
import { SelectBody } from "../components";
interface IPropsStack {
  children: React.ReactNode;
  border?: boolean;
}
function StackContainer({ children, border }: IPropsStack) {
  return (
    <Stack
      borderY={border ? "1px solid #f0f0f0" : "none"}
      padding="15px"
      marginY={2}
      alignItems="center"
      justifyContent="center"
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
  const { firstName, email } = usersettigns;
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
  useEffect(() => {
    (async () => {
      const res = await getAddresses(currentUser.idUser);
      if (typeof res !== "string") setArrayAddresses(res);
    })();
  }, [addressarray]);
  useEffect(() => {
    console.log(value);
  }, [value]);
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
              <Image src={fotopreview} />
            </Stack>
          </Stack>
        </Stack>
        <FormControl onSubmit={(e) => handleSubmit(e)}>
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
            <Stack direction="row">
              <Button
                variant="primary"
                type={disabledstate ? "submit" : "button"}
                onClick={(e) => {
                  setDisabled(!disabledstate);
                }}
              >
                {disabledstate ? "Save" : "Update"}
              </Button>
            </Stack>
          </Stack>
          <Divider orientation="horizontal" marginY={4} />
          <Stack direction={{ base: "column", md: "row" }}>
            {/* Datos del usuario */}
            <Stack alignItems="baseline">
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
              <StackContainer>
                <Stack direction="column">
                  <Text mb="8px">Image:</Text>
                  <Input
                    disabled={!disabledstate ? true : false}
                    w="fit-content"
                    type="file"
                    accept=".jpg"
                    alignSelf="center"
                    border="none"
                    onChange={(e) => changeImage(e)}
                  />
                  {foto !== undefined && (
                    <Stack direction="row">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => saveImage(e)}
                      >
                        Change Image
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => eliminarImage()}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </StackContainer>

              <StackContainer>
                <Button variant="primary" onClick={onOpen}>
                  Add addresses
                </Button>
                <Button
                  variant="primary"
                  onClick={() => clearFavs(currentUser)}
                >
                  Clear Favorites
                </Button>
                <Modal
                  closeOnOverlayClick={false}
                  blockScrollOnMount={true}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add addresses</ModalHeader>
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
                        Add address
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </StackContainer>
            </Stack>

            {/* Direcciones del usuario */}
            <Stack w="100%">
              <Text as="h3" textAlign="center">
                My addresses
              </Text>
              <Stack alignItems="center" p={4} justifyContent="center">
                <RadioGroup value={value} onChange={setValue}>
                  {addressarray.map((item) => (
                    <Radio
                      name="direccion"
                      value={`${item.direc.calle} ${item.direc.alt}`}
                    >
                      <Stack p={4} direction="row" alignItems="center" w="80%">
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
            </Stack>
          </Stack>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default Settings;
