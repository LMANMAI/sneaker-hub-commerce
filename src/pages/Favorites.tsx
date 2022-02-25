import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { Stack, Button, Image, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromFavorites,
  clenFav,
  setFavorites,
} from "../features/sneakersSlice";
import { db } from "../app/firebaseConfig";
import { useEffect, useState } from "react";
import { selectUser } from "../features/userSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const docRef = collection(db, currentUser.uid);
  const [itemsFav, setFavoritesF] = useState<any[]>();

  const deleteFav = async (id: string) => {
    const currentFav = doc(db, currentUser.uid, id);
    await deleteDoc(currentFav);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(docRef);
      setFavoritesF(
        data.docs.map((doc) => ({ ...doc.data(), idColecction: doc.id }))
      );
      itemsFav?.map((item) => {
        dispatch(setFavorites(item));
      });
    };
    getData();
  }, [itemsFav]);

  return (
    <Stack overflow="hidden">
      <Text as="h1" fontSize="2.125rem" fontWeight="bold">
        Favorites{" "}
      </Text>
      <Stack
        direction={{ base: "column", md: "row" }}
        h="100%"
        minHeight="50vh"
        p={2}
        w="80%"
        backgroundColor="#e9e9e986"
        borderRadius="15px"
        alignSelf="center"
        justifyContent="center"
      >
        <Stack
          p={2}
          w="100%"
          overflow="hidden"
          overflowY="auto"
          maxHeight="80vh"
          justifyContent="center"
        >
          {itemsFav && itemsFav?.length > 0 ? (
            <>
              <Stack direction="row" justifyContent="space-between">
                <Button onClick={() => dispatch(clenFav())}>Delete all</Button>
                <Text>Favorites {itemsFav?.length}</Text>
              </Stack>

              <Stack
                spacing={0}
                overflowY="auto"
                overflowX="hidden"
                paddingX={4}
              >
                {itemsFav?.map((item, index) => (
                  <Stack key={index} direction="row">
                    <Stack
                      direction="row"
                      backgroundColor="white"
                      alignItems="center"
                      borderTop="1px solid #e4e4e4"
                      borderBottom="1px solid #e4e4e4"
                      w="100%"
                    >
                      <Link to={`/sneaker/${item?._id}`} className="link_fav">
                        <Stack maxWidth="130px" p="24px">
                          <Image src={item.posterPathImage} />
                        </Stack>
                        <Stack p={2}>
                          <Text fontSize="12px">{item.name}</Text>
                          <Text>${item.price}</Text>
                        </Stack>
                      </Link>
                      <Button
                        variant="unstyled"
                        color="primary.500"
                        border="2px solid"
                        h="fit-content"
                        w="80px"
                        marginRight="20px!important"
                        onClick={() => {
                          deleteFav(item.idColecction);
                          dispatch(removeFromFavorites(item));
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </>
          ) : (
            <Text h="100%" w="100%" textAlign="center" justifySelf="center">
              There are no favorite items yet.
            </Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Favorites;
