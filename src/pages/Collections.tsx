import { useEffect, useState } from "react";
import { Stack, Grid, GridItem, Image } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import { BodyContent } from "../components";
import { ISneaker } from "../interfaces";

const Collections = () => {
  const [sneakers, setSneaker] = useState<ISneaker[]>([]);
  const [sneakerActive, setActive] = useState<ISneaker>();
  const handleSneaker = (sneaker: ISneaker) => {
    setActive(sneaker);
  };

  useEffect(() => {
    const handleReq = async () => {
      const req = await fetch("https://sneakersapinest.herokuapp.com/sneaker");
      const res = await req.json();
      setSneaker(res.sneakers);
    };
    handleReq();
  }, []);
  return (
    <>
      <Grid
        templateColumns="repeat(auto-fit, minmax(130px, 1fr))"
        paddingY={2}
        gap={4}
      >
        {sneakers?.map((sneaker: ISneaker) => (
          <Link to={`sneaker/${sneakerActive?.name}`} key={sneaker._id}>
            <GridItem
              padding={2}
              minHeight="140px"
              borderRadius="15px"
              textAlign="center"
              boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
              onClick={() => handleSneaker(sneaker)}
            >
              <Image src={sneaker.posterPathImage} />
              <p>{sneaker.name}</p>
            </GridItem>
          </Link>
        ))}
      </Grid>
      <Routes>
        <Route
          path="sneaker/:sneaker"
          element={<BodyContent sneaker={sneakerActive} />}
        />
      </Routes>
    </>
  );
};

export default Collections;
