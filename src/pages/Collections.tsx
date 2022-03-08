import { useEffect, useMemo, useState } from "react";
import { Grid, GridItem, Image, Stack } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { ISneaker } from "../interfaces";
import {
  selecBrands,
  selectSneakerActive,
  selectSneakers,
  setSneakerActive,
} from "../features/sneakersSlice";
import Spinkit from "../components/SpinKit";
import { useDispatch, useSelector } from "react-redux";
import { filterByBrand, filterByGender } from "../app/helper";

const Collections = (props: any) => {
  //states
  const [loadign, setLoadign] = useState<boolean>(true);

  const [secondarray, setSecondArray] = useState<any[]>([]);
  //selectors
  const dispatch = useDispatch();
  const sneakers = useSelector(selectSneakers);
  const brandsArray = useSelector(selecBrands);
  //query params
  let [searchParams] = useSearchParams();
  let gender = searchParams.get("gender");
  let brand = searchParams.get("brand");
  const [producfilter, setProductsFilter] = useState<any[]>([]);
  useEffect(() => {
    if (!brandsArray && !brand && !gender) {
      setProductsFilter([]);
      setSecondArray([]);
      setProductsFilter(sneakers);
    } else if (gender) {
      let arrayfilter = filterByGender(sneakers, gender);
      setProductsFilter(arrayfilter);
    } else if (brand || brandsArray.length > 1) {
      let brand_exist = brandsArray.find((item) => item === brand);
      if (brand_exist && brand) {
        setSecondArray([...secondarray, filterByBrand(sneakers, brand)]);
      } else {
        console.log(
          "Aca deberia de eliminar la marca y sacar los priductos filtrados",
          brand
        );
        const newArray = producfilter.filter((item) => item.brand !== brand);
        setProductsFilter(newArray);
      }
    }
  }, [gender, brand, brandsArray]);

  useEffect(() => {
    let tempData: any[] = [];
    secondarray.map((item) => {
      //console.log("Este es array", item);
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
  return (
    <Stack>
      {loadign ? (
        <Spinkit />
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(auto-fit, minmax(150px, 1fr))",
            md: "repeat(auto-fit, minmax(210px, 1fr))",
          }}
          gap={4}
          placeItems="center"
        >
          {producfilter &&
            producfilter?.map((sneaker: ISneaker, index: number) => (
              <Link
                to={`/${sneaker?._id}`}
                key={index}
                onClick={() => dispatch(setSneakerActive(sneaker))}
              >
                <GridItem
                  padding={2}
                  maxWidth="250px"
                  minHeight="250px"
                  height="100%"
                  borderRadius="15px"
                  textAlign="center"
                  boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                >
                  <Image src={sneaker.posterPathImage} />
                  <p>{sneaker.name}</p>
                </GridItem>
              </Link>
            ))}
        </Grid>
      )}
    </Stack>
  );
};

export default Collections;
