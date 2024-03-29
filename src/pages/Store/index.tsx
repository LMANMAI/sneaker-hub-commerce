import { useEffect, useState } from "react";
import { Grid, Stack, Button, Text, Skeleton } from "@chakra-ui/react";
import { ISneaker } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../../components/Slider";
import { CardComponent, BrandsComponent, Spinkit } from "../../components";
import instance from "../../config";
import { CustomButtonContainer } from "./styles";
import { selectSearch } from "../../features/sneakersSlice";

const Collections = () => {
  const dispatch = useDispatch();
  //selectors
  const searchParams = useSelector(selectSearch);

  //states
  const [loadign, setLoadign] = useState<boolean>(false);
  const [products, setProducts] = useState<ISneaker[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<ISneaker[]>([]);
  const [lastadd, setLastAdd] = useState<ISneaker[]>([]);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentpage, setCurrentPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const handleLastProducts = async () => {
    const { data } = await instance.get(`last`);
    setLastAdd(data.data);
  };

  const getMoreProducts = async () => {
    if (currentpage < totalPages && !loadingMore) {
      setLoadingMore(true);
      await getProducts(currentpage + 1);
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    const { data } = await instance.get(
      `/search?name=${searchParams.toLocaleUpperCase()}&genre=&brand=`
    );
    if (data.status === 200) {
      setSearchedProducts(data.data);
    } else {
      setSearchedProducts([]);
    }
  };
  const getProducts = async (page: number) => {
    const { data } = await instance.get(`?page=${page}&pageSize=${10}`);
    setProducts((prevProducts) => {
      const uniqueNewProducts = data.data.filter(
        (newProduct: ISneaker) =>
          !prevProducts.some(
            (prevProduct) => prevProduct._id === newProduct._id
          )
      );
      return [...prevProducts, ...uniqueNewProducts];
    });
    setTotalPages(data.totalPages);
    setCurrentPage(data.currenPage);
  };

  useEffect(() => {
    handleLastProducts();
    getProducts(1);
  }, []);

  useEffect(() => {
    if (searchParams !== "") {
      handleSearch();
    }
  }, [searchParams]);
  return (
    <Stack>
      {loadign ? (
        <Spinkit />
      ) : searchParams !== "" ? (
        <Stack marginTop="60px">
          <Text>Resultado de la busqueda de :{searchParams}</Text>

          <Grid
            templateColumns={{
              base: "repeat(auto-fit, minmax(150px, 1fr))",
              md: "repeat(auto-fit, minmax(210px, 1fr))",
            }}
            gap={4}
            margin={"20px 0px"}
          >
            {/*Componente item*/}
            {searchedProducts &&
              searchedProducts?.map((sneaker: ISneaker) => (
                <CardComponent sneaker={sneaker} />
              ))}
            {loadingMore && <Skeleton />}
          </Grid>
        </Stack>
      ) : (
        <Stack>
          {/*Slider*/}
          <Stack marginTop="60px">
            <Slider />
          </Stack>

          {/*Productos*/}
          <Text>Ultimos lanzamientos</Text>
          <Grid
            templateColumns={{
              base: "repeat(auto-fit, minmax(150px, 1fr))",
              md: "repeat(auto-fit, minmax(210px, 1fr))",
            }}
            gap={4}
          >
            {/*Componente item*/}
            {lastadd &&
              lastadd?.map((sneaker: ISneaker) => (
                <CardComponent sneaker={sneaker} />
              ))}
          </Grid>

          <BrandsComponent />

          {/*Productos*/}
          <Grid
            templateColumns={{
              base: "repeat(auto-fit, minmax(150px, 1fr))",
              md: "repeat(auto-fit, minmax(210px, 1fr))",
            }}
            gap={4}
            margin={"20px 0px"}
          >
            {/*Componente item*/}
            {products &&
              products?.map((sneaker: ISneaker) => (
                <CardComponent sneaker={sneaker} />
              ))}
            {loadingMore && (
              <>
                <Skeleton height={330} />
                <Skeleton height={330} />
              </>
            )}
          </Grid>

          <CustomButtonContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="primary"
              onClick={() => getMoreProducts()}
              className={
                loadingMore || currentpage === totalPages ? "disabled" : ""
              }
              disabled={loadingMore || currentpage === totalPages}
            >
              Ver más
            </Button>
          </CustomButtonContainer>
        </Stack>
      )}
    </Stack>
  );
};

export default Collections;
