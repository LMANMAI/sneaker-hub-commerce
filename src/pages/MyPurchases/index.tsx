import { useEffect, useState } from "react";
import { Skeleton, Stack, Text, Image } from "@chakra-ui/react";
import { selectUser } from "../../features/userSlice";
import { getMyPurchases } from "../../functions/Products";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyPurchases = () => {
  const currentUser = useSelector(selectUser);

  const [load, setLoad] = useState<boolean>(false);
  const [purchases, setPreviousPurchases] = useState<any[]>([]);

  const getFavouriteProducts = async () => {
    setLoad(true);
    const result = await getMyPurchases(currentUser);
    if (result.status === 200) {
      setLoad(false);
      setPreviousPurchases(result.data);
    }
  };
  useEffect(() => {
    getFavouriteProducts();
  }, []);

  const handleGetTotalPurchase = (products: any) => {
    const totalReducer = (accumulator: any, currentValue: any) =>
      accumulator + currentValue.price;
    const total = products.reduce(totalReducer, 0);
    return total.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  return (
    <Stack overflow="hidden" marginTop={"65px"}>
      <Text as="h1" fontSize="2.125rem" fontWeight="bold" paddingLeft={"10px"}>
        Mis compras
      </Text>
      {load ? (
        <Stack>
          <Skeleton height="160px" />
          <Skeleton height="160px" />
        </Stack>
      ) : purchases && purchases?.length > 0 ? (
        <Stack
          direction={{ base: "column", md: "row" }}
          minHeight="50vh"
          w="100%"
          alignSelf="center"
          justifyContent="center"
        >
          <Stack w="100%" justifyContent="center">
            <Stack spacing={0} overflowY="auto" overflowX="hidden">
              {purchases?.map((item, index) => {
                return (
                  <Stack
                    marginY={5}
                    background={"rgba(0, 0, 0, 0.06)"}
                    padding={5}
                  >
                    <Text>Compra #{index + 1}</Text>
                    {item.sneaker.map((subitem: any) => {
                      return (
                        <Stack>
                          <Link to={`/${subitem?._id}`} className="link_fav">
                            <Stack
                              height={"160px"}
                              width="160px"
                              p="10px"
                              overflow={"hidden"}
                            >
                              <Image
                                src={`${import.meta.env.VITE_URL_EP_CLOUD}${
                                  subitem.posterPathImage
                                }`}
                                w={"100%"}
                                h={"100%"}
                                objectFit={"cover"}
                              />
                            </Stack>
                            <Stack p={2}>
                              <Text fontSize="12px">{subitem.name}</Text>
                              <Text>
                                {subitem.price.toLocaleString("es-AR", {
                                  style: "currency",
                                  currency: "ARS",
                                })}
                              </Text>
                            </Stack>
                          </Link>
                        </Stack>
                      );
                    })}
                    <Text>
                      Total de la compra: {handleGetTotalPurchase(item.sneaker)}
                    </Text>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Text textAlign="start" justifySelf="center" paddingLeft={"10px"}>
          Todavia no realizaste ninguna compra.
        </Text>
      )}
    </Stack>
  );
};

export default MyPurchases;
