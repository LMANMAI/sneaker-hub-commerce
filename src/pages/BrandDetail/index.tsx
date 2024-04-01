import { Container, Stack } from "@chakra-ui/react";
import { brands } from "../../components/BrandsMenu/statics";
import { BrandDetailContainer } from "./styles";
import { useEffect, useState } from "react";
import instance from "../../../src/config";
import { ProductList } from "../../../src/components";
import { ISneaker } from "../../../src/interfaces";

const BrandDetail = () => {
  const [products, setProducts] = useState<ISneaker[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const url = window.location.href;
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];

  const checkBrandBG = (brandType: string) => {
    const brand = brands.find(
      (item: any) =>
        item.name.toLocaleUpperCase() ===
        brandType.replace(/%20/g, " ").toLocaleUpperCase()
    );
    if (brand) {
      return brand.bg;
    }
  };

  const getCollectionProducts = async () => {
    setLoad(true);
    const { data } = await instance(
      `/product/search?name=&genre=&brand=${lastSegment.toLocaleUpperCase()}`
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
            <ProductList
              products={products}
              loadingMore={load}
              skeletonCount={3}
            />
            {errorMessage && <p>{errorMessage}</p>}
          </Stack>
        </Stack>
      </Container>

      <div className="background"></div>
    </BrandDetailContainer>
  );
};

export default BrandDetail;
