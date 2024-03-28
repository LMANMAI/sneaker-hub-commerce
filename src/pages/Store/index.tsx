import { useEffect, useState } from "react";
import { Grid, Stack, Button, Text } from "@chakra-ui/react";
import { ISneaker } from "../../interfaces";
import {
  selectSneakers,
  selectSearch,
  selectCountLimit,
  selectTotalSneakers,
  setCounterState,
} from "../../features/sneakersSlice";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../../components/Slider";
import { CardComponent, BrandsComponent, Spinkit } from "../../components";
import instance from "../../config";

const Collections = (props: any) => {
  //states
  const [loadign, setLoadign] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  //selectors
  const dispatch = useDispatch();
  const sneakers = useSelector(selectSneakers);
  const search = useSelector(selectSearch);
  const limit = useSelector(selectCountLimit);
  const total = useSelector(selectTotalSneakers);
  //query params
  const [producfilter, setProductsFilter] = useState<any[]>([]);
  const [countPage, setCountPage] = useState<number>(1);
  const [lastadd, setLastAdd] = useState<any>([]);

  const handleLastProducts = async () => {
    const { data } = await instance.get(`last`);
    setLastAdd(data.data);
  };

  useEffect(() => {
    handleLastProducts();
  }, []);

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
            {producfilter &&
              producfilter?.map((sneaker: ISneaker) => (
                <CardComponent sneaker={sneaker} />
              ))}
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
            <Text>ver mas</Text>
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
        </>
      )}
    </Stack>
  );
};

export default Collections;
