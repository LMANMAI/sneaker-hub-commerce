import { useState } from "react";
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

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(210px, 1fr))" gap={4}>
      {sneakers.map((sneaker: ISneaker) => (
        <Link
          to={`/Collections/${sneakerActive?._id}`}
          key={sneaker._id}
          onClick={() => handleSneaker(sneaker)}
        >
          <GridItem
            padding={2}
            maxWidth="250px"
            minHeight="280px"
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
