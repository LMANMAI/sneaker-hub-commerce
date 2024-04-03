import { useEffect, useState } from "react";
import { Stack, Button, Text } from "@chakra-ui/react";
import { ISneaker } from "../../interfaces";
import { useSelector } from "react-redux";
import Slider from "../../components/Slider";
import { ProductList, BrandsComponent, Spinkit } from "../../components";
import instance from "../../config";
import { CustomButtonContainer } from "./styles";
import { selectSearch } from "../../features/sneakersSlice";

const Collections = () => {
  //selectors
  const searchParams = useSelector(selectSearch);

  //states
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ISneaker[]>([]);
  const [searchedProducts, setSearchedProducts] = useState<ISneaker[]>([]);
  const [lastedProducts, setLastAdd] = useState<ISneaker[]>([]);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentpage, setCurrentPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [loadLatestProducts, setLoadLatestProducts] = useState<boolean>(false);

  const handleLastProducts = async () => {
    setLoadLatestProducts(true);
    const { data } = await instance.get(`/product/last`);
    if (data.status === 200) {
      setLoadLatestProducts(false);
      setLastAdd(data.data);
    } else {
      setLoadLatestProducts(false);
      setLastAdd([]);
    }
  };

  const getMoreProducts = async () => {
    if (currentpage < totalPages && !loadingMore) {
      setLoadingMore(true);
      await getProducts(currentpage + 1);
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    const { data } = await instance.get(
      `/product/search?name=${searchParams.toLocaleUpperCase()}&genre=&brand=`
    );
    if (data.status === 200) {
      setLoading(false);
      setSearchedProducts(data.data);
    } else {
      setLoading(false);
      setSearchedProducts([]);
    }
  };
  const getProducts = async (page: number) => {
    const { data } = await instance.get(`/product?page=${page}&pageSize=${10}`);
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
      {loading ? (
        <Spinkit />
      ) : searchParams !== "" ? (
        <Stack marginTop="60px">
          <Text>
            Resultado de la busqueda de: {searchParams.toLocaleUpperCase()}
          </Text>
          <ProductList products={searchedProducts} loadingMore={loadingMore} />
        </Stack>
      ) : (
        <Stack>
          {/*Slider*/}
          <Stack marginTop="60px">
            <Slider />
          </Stack>

          {/*Ultimos Productos*/}
          <Text fontSize={"25px"} fontWeight={"bold"}>
            Ultimos lanzamientos
          </Text>
          <ProductList
            products={lastedProducts}
            loadingMore={loadLatestProducts}
          />

          <BrandsComponent />

          {/*Productos*/}
          <ProductList
            products={products}
            loadingMore={loadingMore}
            skeletonCount={2}
          />
          <CustomButtonContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="primary"
              onClick={() => getMoreProducts()}
              isLoading={loadingMore}
              className={
                loadingMore || currentpage === totalPages ? "disabled" : ""
              }
              disabled={loadingMore || currentpage === totalPages}
              display={currentpage === totalPages ? "none" : "inline-flex"}
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
