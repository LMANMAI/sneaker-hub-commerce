import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../app/firebaseConfig";
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
import { useSelector, useDispatch } from "react-redux";
import {
  selectSneakerActive,
  selectFavorites,
  setSneakerActive,
  selectIDCollection,
  removeFromFavorites,
} from "../features/sneakersSlice";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { NotFound } from "../pages";
import { useEffect, useState } from "react";
const BodyContent: React.FC = () => {
  const sneakerActive = useSelector(selectSneakerActive);
  if (!sneakerActive) return <NotFound />;
  const [toggle, setToggle] = useState<boolean>(false);
  const itemsFav = useSelector(selectFavorites);
  const currentUser = useSelector(selectUser);
  const id_collection = useSelector(selectIDCollection);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddStore = async (sneaker: ISneaker) => {
    const sneakerCollection = collection(db, currentUser?.uid);
    console.log("agrego");
    try {
      await addDoc(sneakerCollection, {
        ...sneaker,
        toggle: true,
      });
    } catch (error) {}
  };
  const deleteFav = async (sneaker: ISneaker) => {
    console.log("saco");
    let newSneaker = itemsFav.find((item) => sneaker._id === sneakerActive._id);
    if (currentUser !== undefined && newSneaker === undefined) {
      let favRem = doc(db, currentUser?.uid, sneaker._id);
      dispatch(removeFromFavorites(sneaker));
      deleteDoc(favRem);
    }
  };

  useEffect(() => {
    let sneakerexist = itemsFav.find((item) => item._id === sneakerActive._id);
    if (sneakerexist) {
      setToggle(true);
    }
  }, [sneakerActive]);
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
          <Stack direction="row-reverse" justifyContent="center">
            {currentUser && toggle ? (
              <Button
                fontSize="2xl"
                fontWeight="bold"
                color="primary.500"
                size="lg"
                onClick={() => {
                  setToggle(false);
                  deleteFav(sneakerActive);
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
                  setToggle(true);
                  handleAddStore(sneakerActive);
                }}
              >
                <MdFavoriteBorder />
              </Button>
            )}
            <ButtonCount />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default BodyContent;
