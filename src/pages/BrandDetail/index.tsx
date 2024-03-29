import { Container, Grid, Skeleton, Stack } from "@chakra-ui/react";
import { brands } from "../../components/BrandsMenu/statics";
import { BrandDetailContainer } from "./styles";
import { useEffect, useState } from "react";
import instance from "../../../src/config";
import { CardComponent } from "../../../src/components";
import { ISneaker } from "../../../src/interfaces";

const BrandDetail = () => {
  const [products, setProducts] = useState<ISneaker[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const url = window.location.href;
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];

  const checkBrandBG = (brandType: string) => {
    console.log(brandType);
    const brand = brands.find(
      (item: any) =>
        item.name.toLocaleUpperCase() ===
        brandType.replace(/%20/g, " ").toLocaleUpperCase()
    );
    console.log(brand);
    if (brand) {
      return brand.bg;
    }
  };

  const getCollectionProducts = async () => {
    console.log(lastSegment);
    setLoad(true);
    const { data } = await instance(
      `/search?name=&genre=&brand=${lastSegment.toLocaleUpperCase()}`
    );

    if (data.status === 200) {
      setProducts(data.data);
      setLoad(false);
    } else if (data.status === 204) {
      setProducts([]);
      setLoad(false);
      setErrorMessage("No se encontraron productos de esta marca.");
    } else {
      setProducts([]);
      setLoad(false);
      setErrorMessage(
        "Hubo un problema al cargar los productos. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  useEffect(() => {
    getCollectionProducts();
  }, []);

  return (
    <BrandDetailContainer>
      <div className="detail__bg">
        <img
          loading="lazy"
          src={lastSegment ? checkBrandBG(lastSegment) : ""}
          alt={lastSegment.replace(/%20/g, " ")}
        />
        <p>{lastSegment.replace(/%20/g, " ")}</p>
      </div>

      <Container maxWidth="container.xl" className="content">
        <Stack direction={"row"}>
          <Stack flex={2}>
            <Grid
              templateColumns={{
                base: "repeat(auto-fit, minmax(150px, 1fr))",
                md: "repeat(auto-fit, minmax(210px, 1fr))",
              }}
              gap={4}
              margin={"20px 0px"}
            >
              {load ? (
                <>
                  <Skeleton height={330} />
                  <Skeleton height={330} />
                  <Skeleton height={330} />
                  <Skeleton height={330} />
                  <Skeleton height={330} />
                </>
              ) : (
                products &&
                products?.map((sneaker: ISneaker) => (
                  <CardComponent sneaker={sneaker} />
                ))
              )}
            </Grid>
            {errorMessage && <p>{errorMessage}</p>}
          </Stack>
        </Stack>
      </Container>

      <div className="background"></div>
    </BrandDetailContainer>
  );
};

export default BrandDetail;
