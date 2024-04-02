import {
  Stack,
  Button,
  Image,
  Text,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectUser } from "../../features/userSlice";
import { clearFavs, getProductsFav, removeFav } from "../../functions/Products";
import instance from "../../../src/config";
import { ISneaker } from "../../../src/interfaces";

const Favorites = () => {
  const toast = useToast();

  const currentUser = useSelector(selectUser);
  const [itexmsFav, setItexmsFav] = useState<ISneaker[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  const getFavouriteProducts = async () => {
    setLoad(true);
    const result = await getProductsFav(currentUser);
    if (result.status === 200) {
      const promises = result.data.map(({ sneaker }) => {
        return instance.get(`/product/${sneaker}`);
      });
      try {
        const responses = await Promise.all(promises);
        const results = responses.map((response) => response.data.product);
        setLoad(false);
        setItexmsFav(results);
      } catch (error) {
        console.error("Error al realizar las consultas:", error);
      }
    }
  };
  const handleClearFavs = async () => {
    const request = await clearFavs(currentUser);
    if (request === "eliminados") {
      toast({
        title: "Todos los elementos fueron eliminados.",
        description: "Eliminaste todos los favoritos con exito.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  const handleRemoveOneItem = async (item: ISneaker) => {
    const request = await removeFav(currentUser, item);
    if (request && request.status === 200) {
      const promises = request.data.map(({ sneaker }) => {
        return instance.get(`/product/${sneaker}`);
      });
      try {
        const responses = await Promise.all(promises);
        const results = responses.map((response) => response.data.product);

        setItexmsFav(results);
      } catch (error) {
        console.error("Error al realizar las consultas:", error);
      }
      toast({
        title: `${item.name} se elimino de los favoritos.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  useEffect(() => {
    getFavouriteProducts();
  }, []);

  return (
    <Stack overflow="hidden" marginTop={"65px"}>
      <Text as="h1" fontSize="2.125rem" fontWeight="bold" paddingLeft={"10px"}>
        Favoritos
      </Text>
      {load ? (
        <Stack>
          <Skeleton height="160px" />
          <Skeleton height="160px" />
        </Stack>
      ) : itexmsFav && itexmsFav?.length > 0 ? (
        <Stack
          direction={{ base: "column", md: "row" }}
          minHeight="50vh"
          w="100%"
          alignSelf="center"
          justifyContent="center"
        >
          <Stack w="100%" justifyContent="center">
            <Stack direction="row" justifyContent="space-between" p={"10px"}>
              <Button variant="primary" onClick={() => handleClearFavs()}>
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
                    <Link to={`/${item?._id}`} className="link_fav">
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
                        <Text>
                          {item.price.toLocaleString("es-AR", {
                            style: "currency",
                            currency: "ARS",
                          })}
                        </Text>
                      </Stack>
                    </Link>
                    <Button
                      variant="secondary"
                      border="2px solid"
                      h="fit-content"
                      w="80px"
                      marginRight="20px!important"
                      onClick={() => {
                        handleRemoveOneItem(item);
                      }}
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
