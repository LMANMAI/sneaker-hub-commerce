import { useEffect, useState } from "react";
import { Skeleton, Stack, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import instance from "../../config";
const MyPurchases = ({ userID }: { userID: string }) => {
  const [load, setLoad] = useState<boolean>(false);
  const [purchases, setPreviousPurchases] = useState<any[]>([]);

  const getFavouriteProducts = async () => {
    setLoad(true);
    const { data } = await instance(`checkout/${userID}`);
    if (data.status === 200) {
      setLoad(false);
      setPreviousPurchases(data.orders);
    } else {
      setLoad(false);
      setPreviousPurchases([]);
    }
  };
  useEffect(() => {
    getFavouriteProducts();
  }, []);

  const handleGetTotalPurchase = (products: any) => {
    const totalReducer = (accumulator: any, currentValue: any) =>
      accumulator + currentValue.unit_price;
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
              {purchases?.map((item) => {
                return (
                  <Stack
                    marginY={5}
                    background={"rgba(0, 0, 0, 0.06)"}
                    padding={5}
                  >
                    <Text>Compra #{item.orderId}</Text>
                    {item.items.map((subitem: any) => {
                      return (
                        <Stack>
                          <Link to={`/${subitem?.id}`} className="link_fav">
                            <Stack
                              height={"100px"}
                              width="100px"
                              p="10px"
                              overflow={"hidden"}
                            >
                              <Image
                                src={`${subitem.picture_url}`}
                                w={"100%"}
                                h={"100%"}
                                objectFit={"cover"}
                              />
                            </Stack>
                            <Stack p={2}>
                              <Text fontSize="12px">{subitem.title}</Text>
                              <Text fontSize="12px">
                                Unidades: {subitem.quantity}
                              </Text>
                              <Text>
                                {subitem.unit_price.toLocaleString("es-AR", {
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
                      Total de la compra: {handleGetTotalPurchase(item.items)}
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
