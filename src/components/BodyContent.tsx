import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  Badge,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  Icon,
} from "@chakra-ui/react";
import { ISneaker } from "../interfaces";
import PrevIcon from "../icons/PrevIcon";
import { Carrousel, ButtonCount } from "./";
import { useSelector } from "react-redux";
import { selectSneakerActive } from "../features/sneakersSlice";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkFavs, removeFav } from "../controllers/Products";

const BodyContent = () => {
  const sneakerActive = useSelector(selectSneakerActive);
  const navigate = useNavigate();
  if (!sneakerActive) return navigate("/");

  const [toggle, setToggle] = useState<boolean>(false);
  const [showmessage, setShowMessage] = useState<boolean>(false);
  const currentUser = useSelector(selectUser);

  const handleAddStore = async (user: any, sneaker: ISneaker) => {
    const res = await checkFavs(user, sneaker);
    setToggle(true);
    if (res === "existe") {
      // setToggle(true);
    }
  };
  const deleteFav = async (sneaker: ISneaker) => {
    console.log("saco");
    setToggle(false);
    removeFav(currentUser, sneaker);
  };

  useEffect(() => {
    if (showmessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  }, [showmessage]);
  return (
    <>
      <Stack
        marginTop={8}
        onClick={() => {
          navigate(-1);
        }}
        cursor="pointer"
        w="fit-content"
      >
        <Icon as={PrevIcon} />
      </Stack>

      <Stack
        marginTop={6}
        minHeight="80vh"
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box flex={1}>
          <Carrousel images={sneakerActive?.imgs} />
        </Box>

        <Stack
          flex={1}
          spacing={6}
          textAlign={{ base: "center", md: "initial" }}
          position="relative"
          width="100%"
        >
          <Stack className="reflect" display="none"></Stack>

          <Stack>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing={2}
              color="primary.500"
              fontSize="sm"
            >
              Sneaker Company
            </Text>
            <Heading>{sneakerActive?.name}</Heading>
          </Stack>
          <Text color="gray.400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quam
            temporibus cupiditate eum quasi quae assumenda commodi earum amet
            accusantium, adipisci vero eos eligendi repellat aperiam,
            repudiandae quidem dolorem voluptatum!
          </Text>
          <Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <Text
                fontSize="sm"
                fontWeight={700}
                color="gray.400"
                textDecoration="line-through"
              >
                $ {sneakerActive && sneakerActive?.price * 2}
              </Text>
              <Text fontWeight={700} fontSize="2xl">
                $ {sneakerActive?.price}
              </Text>
              <Badge
                color="primary.500"
                colorScheme="primary"
                fontSize="md"
                borderRadius="md"
                paddingX={2}
              >
                %50
              </Badge>
            </Stack>
          </Stack>

          <Stack alignItems="center">
            {showmessage && (
              <Text>Necesitas tener cuenta para agregarlo a favoritos</Text>
            )}
            <Stack direction="row-reverse" justifyContent="center">
              {currentUser && toggle ? (
                <Button
                  fontSize="2xl"
                  fontWeight="bold"
                  color="primary.500"
                  size="lg"
                  onClick={() => {
                    if (!currentUser) {
                      setShowMessage(true);
                      return;
                    } else {
                      deleteFav(sneakerActive);
                    }
                  }}
                >
                  <MdFavorite />
                </Button>
              ) : (
                <Button
                  fontSize="2xl"
                  fontWeight="bold"
                  color="primary.500"
                  size="lg"
                  onClick={() => {
                    if (!currentUser) {
                      setShowMessage(true);
                      return;
                    } else {
                      handleAddStore(currentUser, sneakerActive);
                    }
                  }}
                >
                  <MdFavoriteBorder />
                </Button>
              )}

              <ButtonCount />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default BodyContent;
