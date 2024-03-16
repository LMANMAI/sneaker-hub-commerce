import { Stack, Button, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectUser } from "../../features/userSlice";
import { clearFavs, getProductsFav, removeFav } from "../../functions/Products";

const Favorites = () => {
  const currentUser = useSelector(selectUser);
  const [itexmsFav, setItexmsFav] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getProductsFav(currentUser);
      if (result) setItexmsFav(result);
    })();
  }, [itexmsFav]);

  return (
    <Stack overflow="hidden" marginTop={"65px"}>
      <Text as="h1" fontSize="2.125rem" fontWeight="bold" paddingLeft={"10px"}>
        Favoritos
      </Text>
      {itexmsFav && itexmsFav?.length > 0 ? (
        <Stack
          direction={{ base: "column", md: "row" }}
          minHeight="50vh"
          w="100%"
          alignSelf="center"
          justifyContent="center"
        >
          <Stack w="100%" justifyContent="center">
            <Stack direction="row" justifyContent="space-between" p={"10px"}>
              <Button variant="primary" onClick={() => clearFavs(currentUser)}>
                Borrar todo
              </Button>
              <Text>Favoritos: {itexmsFav?.length}</Text>
            </Stack>

            <Stack spacing={0} overflowY="auto" overflowX="hidden">
              {itexmsFav?.map((item, index) => (
                <Stack key={index} direction="row">
                  <Stack
                    direction="row"
                    alignItems="center"
                    borderTop="1px solid #e4e4e4"
                    borderBottom="1px solid #e4e4e4"
                    w="100%"
                  >
                    <Link to={`/sneaker/${item?._id}`} className="link_fav">
                      <Stack
                        height={"160px"}
                        width="160px"
                        p="10px"
                        overflow={"hidden"}
                      >
                        <Image
                          src={`${import.meta.env.VITE_URL_EP_CLOUD}${
                            item.posterPathImage
                          }`}
                          w={"100%"}
                          h={"100%"}
                          objectFit={"cover"}
                        />
                      </Stack>
                      <Stack p={2}>
                        <Text fontSize="12px">{item.name}</Text>
                        <Text>${item.price.toFixed(2)}</Text>
                      </Stack>
                    </Link>
                    <Button
                      variant="secondary"
                      border="2px solid"
                      h="fit-content"
                      w="80px"
                      marginRight="20px!important"
                      onClick={() => removeFav(currentUser, item)}
                    >
                      Borrar
                    </Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Text textAlign="start" justifySelf="center" paddingLeft={"10px"}>
          Todavia no se guardaron favoritos.
        </Text>
      )}
    </Stack>
  );
};

export default Favorites;
