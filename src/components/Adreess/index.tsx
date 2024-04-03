import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import SelectBody from "../Select";
import { CustomButton } from "./styles";
import { setUserShippingAddress } from "../../functions/Profile";

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

function StackContainer({
  children,
  border,
}: {
  children?: any;
  border?: any;
}) {
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

const AdressesComponent = ({
  user,
  load,
  setLoad,
  setArrayAddresses,
}: {
  user: any;
  load: boolean;
  setLoad: Function;
  setArrayAddresses: Function;
}) => {
  const [isAddressComplete, setIsAddressComplete] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adress, setAdress] = useState<Address>({
    prov: "",
    mun: "",
    locald: "",
    direc: {
      calle: "",
      alt: "",
    },
  });
  const handleAddress = async () => {
    setLoad(true);
    if (adress) {
      const request = await setUserShippingAddress(adress, user.idUser);

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

  return (
    <div>
      <Button variant="primary" onClick={onOpen} isLoading={load}>
        Agregar dirección
      </Button>
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
    </div>
  );
};

export default AdressesComponent;
