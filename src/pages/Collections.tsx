import { useEffect, useState } from "react";
import { Grid, GridItem, Image } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import { BodyContent } from "../components";
import { ISneaker } from "../interfaces";
import {
  selectSneakerActive,
  selectSneakers,
  setSneaker,
  setSneakerActive,
} from "../features/sneakersSlice";
import { useDispatch, useSelector } from "react-redux";

const Collections = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector(selectSneakers);
  const sneakerActive = useSelector(selectSneakerActive);
  const handleSneaker = (sneaker: ISneaker) => {
    dispatch(setSneakerActive(sneaker));
  };

  useEffect(() => {
    const handleReq = async () => {
      const req = await fetch("https://sneakersapinest.herokuapp.com/sneaker");
      const res = await req.json();
      dispatch(setSneaker(res.sneakers));
    };
    handleReq();
  }, []);

  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(130px, 1fr))"
      paddingY={2}
      gap={4}
    >
      {sneakers.map((sneaker: ISneaker) => (
        <Link
          to={`/Collections/${sneakerActive?.name}`}
          key={sneaker._id}
          onClick={() => handleSneaker(sneaker)}
        >
          <GridItem
            padding={2}
            maxWidth={{ base: "initial", md: "20vw" }}
            minHeight="140px"
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
