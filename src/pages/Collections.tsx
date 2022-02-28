import { useEffect, useMemo } from "react";
import { Grid, GridItem, Image } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { ISneaker } from "../interfaces";
import {
  selectSneakerActive,
  selectSneakers,
  setSneakerActive,
} from "../features/sneakersSlice";
import { useDispatch, useSelector } from "react-redux";
import { filterByBrand, filterByGender } from "../app/helper";

const Collections = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector(selectSneakers);
  const sneakerActive = useSelector(selectSneakerActive);

  let [searchParams] = useSearchParams();
  let gender = searchParams.get("gender");
  let brand = searchParams.get("brand");
  const sneakersF = useMemo(() => {
    if (!gender && !brand) return sneakers;
    else if (gender) {
      return filterByGender(sneakers, gender);
    } else if (brand) {
      return filterByBrand(sneakers, brand);
    }
  }, [gender, sneakers, brand]);
  useEffect(() => {
    dispatch(setSneakerActive(null));
  }, []);
  return (
    <Grid
      templateColumns={{
        base: "repeat(auto-fit, minmax(150px, 1fr))",
        md: "repeat(auto-fit, minmax(210px, 1fr))",
      }}
      gap={4}
      placeItems="center"
    >
      {sneakersF &&
        sneakersF?.map((sneaker: ISneaker) => (
          <Link
            to={`/sneaker/${sneakerActive?._id}`}
            key={sneaker._id}
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
  );
};

export default Collections;
