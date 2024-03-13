import { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Image,
  Stack,
  Button,
  Text,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/card";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import { ISneaker } from "../../interfaces";
import {
  selecBrands,
  selectSneakers,
  selectSearch,
  selectCountLimit,
  selectTotalSneakers,
  setSneakerActive,
  setCounterState,
  setBrandFilter,
} from "../../features/sneakersSlice";
import Spinkit from "../../components/SpinKit";
import { useDispatch, useSelector } from "react-redux";
import { filterByBrand, filterByGender } from "../../app/helper";
import Slider from "../../components/Slider";

const Collections = (props: any) => {
  //states
  const [loadign, setLoadign] = useState<boolean>(true);
  const [secondarray, setSecondArray] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  //selectors
  const dispatch = useDispatch();
  const sneakers = useSelector(selectSneakers);
  const brandsArray = useSelector(selecBrands);
  const search = useSelector(selectSearch);
  const limit = useSelector(selectCountLimit);
  const total = useSelector(selectTotalSneakers);
  //query params
  let [searchParams] = useSearchParams();
  let gender = searchParams.get("gender");
  let brand = searchParams.get("brand");
  const [producfilter, setProductsFilter] = useState<any[]>([]);
  const [countPage, setCountPage] = useState<number>(1);
  const { pathname } = useLocation();

  useEffect(() => {
    if (brandsArray.length === 0 && !gender) {
      setSecondArray([]);
      setProductsFilter(sneakers);
      return;
    } else if (gender) {
      let arrayfilter = filterByGender(total, gender);
      setProductsFilter(arrayfilter);
      return;
    } else if (brand || brandsArray.length > 1) {
      let brand_exist = brandsArray.find((item) => item === brand);

      if (brand_exist) {
        setSecondArray([...secondarray, filterByBrand(total, brand_exist)]);
        return;
      } else {
        const newArray = producfilter.filter((item) => item.brand !== brand);
        setProductsFilter(newArray);
        setSecondArray(newArray);
      }
    }
  }, [gender, brand, brandsArray]);

  useEffect(() => {
    let tempData: any[] = [];
    secondarray.map((item) => {
      tempData = tempData.concat(item);
      setProductsFilter(tempData);
    });
  }, [secondarray]);

  useEffect(() => {
    setTimeout(() => {
      if (sneakers) {
        setLoadign(false);
        setProductsFilter(sneakers);
      }
    }, 300);
  }, [props.history, sneakers]);
  useEffect(() => {
    let array: any = [];
    total?.filter((item) => {
      if (search === "") {
        setProductsFilter(sneakers);
      } else if (item.name.toLowerCase().includes(search.toLocaleLowerCase())) {
        array.push(item);
        setProductsFilter(array);
      }
    });
  }, [search]);

  useEffect(() => {
    dispatch(setCounterState(count));
  }, [count]);

  const brands = [
    {
      name: "Adidas",
      bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/adidas.jpg?alt=media&token=338b9349-f864-475f-816f-5f24615d1338",
    },
    {
      name: "Nike",
      bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/nike.jpg?alt=media&token=6fa99abf-8a57-41e2-bccf-8fc8d9c25f5a",
    },
    {
      name: "New Balance",
      bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/newbalance.jpg?alt=media&token=8f55aea1-8135-4a07-9951-cd2ccd1bf109",
    },
    {
      name: "Air Jordan",
      bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/airjordan.jpg?alt=media&token=07353f34-0766-40c5-8eac-22ea8bb6a47b",
    },
    {
      name: "Yeezy",
      bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/yeezy.jpg?alt=media&token=d11da7ee-b681-44d3-9264-e2602b7612ae",
    },
    {
      name: "Converse",
      bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/converse.jpg?alt=media&token=5558391f-5dc9-4b92-9f39-2869e72e207f",
    },
    {
      name: "Vans",
      bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/asics.jpg?alt=media&token=edb58f7f-3877-4ab8-9851-98e9eef9f1e3",
    },
    {
      name: "revengexstorm",
      bg: "https://firebasestorage.googleapis.com/v0/b/sneakers-commerce.appspot.com/o/revenge.jpg?alt=media&token=2023707a-bec4-4f1a-822b-eea188c9421c",
    },
  ];
  const { colorMode } = useColorMode();
  const handleBrandArray = (brand: string) => {
    dispatch(setBrandFilter(brand));
  };
  return (
    <Stack>
      {loadign ? (
        <Spinkit />
      ) : (
        <>
          {/*Slider*/}
          <Stack marginTop="60px">
            <Slider />
          </Stack>
          {/*Productos*/}
          <Grid
            templateColumns={{
              base: "repeat(auto-fit, minmax(150px, 1fr))",
              md: "repeat(auto-fit, minmax(210px, 1fr))",
            }}
            gap={4}
            placeItems="center"
          >
            {/*Componente item*/}
            {producfilter &&
              producfilter?.map((sneaker: ISneaker, index: number) => (
                <Link
                  to={`/${sneaker?._id}`}
                  key={index}
                  style={{ padding: "10px" }}
                  onClick={() => dispatch(setSneakerActive(sneaker))}
                >
                  <Card maxW="sm">
                    <CardBody>
                      <Image
                        src={`${import.meta.env.VITE_URL_EP_CLOUD}${
                          sneaker.posterPathImage
                        }`}
                        alt="Green double couch with wooden legs"
                        borderRadius={"5px"}
                        width={250}
                        height={150}
                        objectFit={"cover"}
                      />
                      <Stack mt="6" spacing="3">
                        <Heading size="sm">{sneaker.name}</Heading>

                        <Text color="blue.600" fontSize="2xl">
                          ${sneaker.price.toFixed(2)}
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              ))}
          </Grid>
          {/*marcas seleccionadas*/}
          <Stack>
            {pathname === "/" && (
              <Stack padding={2} direction="row">
                {brandsArray.map((item, index) => (
                  <Text
                    key={index}
                    backgroundColor="#cecece"
                    w="fit-content"
                    p="5px"
                    borderRadius="10px"
                    alignItems="center"
                  >
                    {item}
                    <NavLink to={`/?brand=${item}`}>
                      <Text
                        as="strong"
                        cursor="pointer"
                        onClick={() => handleBrandArray(item)}
                        marginLeft="7px"
                      >
                        X
                      </Text>
                    </NavLink>
                  </Text>
                ))}
              </Stack>
            )}
          </Stack>
          {/*marcas*/}
          <Grid
            templateColumns={{
              base: "repeat(auto-fit, minmax(45%, 1fr))",
              md: "repeat(auto-fit, minmax(25%, 1fr))",
            }}
          >
            {pathname === "/" && (
              <>
                {brands.map((item, index) => (
                  <Stack key={index} className="contenedor">
                    <NavLink to={`/?brand=${item.name}`}>
                      <Stack p={2}>
                        <GridItem
                          height={{ base: "100px", md: "120px" }}
                          borderRadius="5px"
                          padding={4}
                          cursor="pointer"
                          transition="transform 250ms ease"
                          _hover={{
                            transform: "scale(1.05)",
                          }}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          background={`url(${item.bg})`}
                          backgroundPosition="center center"
                          onClick={() => {
                            handleBrandArray(item.name);
                          }}
                        >
                          <Text
                            width="fit-content"
                            backgroundColor={
                              colorMode === "light" ? "white" : "gray.800"
                            }
                            padding="5px 10px"
                          >
                            {item.name}
                          </Text>
                        </GridItem>
                      </Stack>
                    </NavLink>
                  </Stack>
                ))}
              </>
            )}
          </Grid>

          <Stack direction="row" justifyContent="center" alignItems="center">
            {count <= 0 ? null : (
              <Button
                variant="primary"
                onClick={() => {
                  setCountPage(countPage - 1);
                  setCount(count - 10);
                }}
              >
                {"<"}
              </Button>
            )}
            <Text>
              Page {countPage} to {Math.ceil(limit / 10)}
            </Text>
            {count + 10 > limit ? null : (
              <Button
                variant="primary"
                onClick={() => {
                  setCount(count + 10);
                  setCountPage(countPage + 1);
                }}
              >
                {">"}
              </Button>
            )}
          </Stack>
          {/*Productos*/}
          <Grid
            templateColumns={{
              base: "repeat(auto-fit, minmax(150px, 1fr))",
              md: "repeat(auto-fit, minmax(210px, 1fr))",
            }}
            gap={4}
            placeItems="center"
          >
            {/*Componente item*/}
            {producfilter &&
              producfilter?.map((sneaker: ISneaker, index: number) => (
                <Link
                  to={`/${sneaker?._id}`}
                  key={index}
                  style={{ padding: "10px" }}
                  onClick={() => dispatch(setSneakerActive(sneaker))}
                >
                  <Card maxW="sm">
                    <CardBody>
                      <Image
                        src={`${import.meta.env.VITE_URL_EP_CLOUD}${
                          sneaker.posterPathImage
                        }`}
                        alt="Green double couch with wooden legs"
                        borderRadius={"5px"}
                        width={250}
                        height={150}
                        objectFit={"cover"}
                      />
                      <Stack mt="6" spacing="3">
                        <Heading size="sm">{sneaker.name}</Heading>

                        <Text color="blue.600" fontSize="2xl">
                          ${sneaker.price.toFixed(2)}
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              ))}
          </Grid>
        </>
      )}
    </Stack>
  );
};

export default Collections;
