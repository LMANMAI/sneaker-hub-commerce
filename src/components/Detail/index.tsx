import React, { useEffect, useState } from "react";
import {
  Heading,
  Stack,
  Text,
  Button,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import { Carrousel, ButtonCount } from "..";
import { useSelector } from "react-redux";
import { selectSneakerActive } from "../../features/sneakersSlice";
import { DetailContainer } from "./styles";
import { brands } from "../BrandsMenu/statics";
import { sizes } from "./statics";
const BodyContent: React.FC = () => {
  const [tipoTalle, setTipoTalle] = useState("US");
  const [products, setProducts] = useState<any>([]);

  const sneakerActive = useSelector(selectSneakerActive);
  const { colorMode } = useColorMode();

  const checkBrandBG = (brandType: string) => {
    const brand = brands.find(
      (item) => item.name.toLocaleUpperCase() === brandType
    );
    if (brand) {
      return brand.bg;
    }
  };

  const converSize = (tipo: string) => {
    if (!sneakerActive || sneakerActive.sizes.length === 0) return [];

    return sizes.map((talle: any, index) => {
      const isActive = sneakerActive.sizes.some(
        (s: any) => s.size === talle.US
      );

      const isActiveEU = sneakerActive.sizes.some(
        (s: any) => s.size === talle.EU
      );
      const isActiveCM = sneakerActive.sizes.some(
        (s: any) => s.size === talle.CM
      );

      return (
        <li key={index}>
          <button
            disabled={!isActive || isActiveEU || isActiveCM}
            onClick={() => {
              console.log("desde el talle:", talle["US"]);
              setProducts(sneakerActive);
            }}
          >
            {`${tipo} ${talle[tipo]} `}
          </button>
        </li>
      );
    });
  };

  const handleType = (tipo: string) => {
    setTipoTalle(tipo);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(products, "products");
  }, [products]);

  console.log(sneakerActive);
  return (
    <DetailContainer>
      <div
        className="detail__bg"
        style={{
          background: `url(${
            sneakerActive ? checkBrandBG(sneakerActive?.brand) : ""
          })`,
        }}
      ></div>
      <Stack className="detail__content">
        <Box flex={1}>
          <Carrousel
            posterPath={sneakerActive ? sneakerActive?.posterPathImage : ""}
            images={sneakerActive?.imgs}
          />
        </Box>
        <Stack
          flex={1}
          spacing={6}
          textAlign={"start"}
          position="relative"
          width="100%"
          padding={"0px 15px"}
        >
          <Stack className="reflect" display="none"></Stack>

          <Stack>
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              letterSpacing={2}
              variant="primary"
              fontSize="sm"
              color={colorMode === "light" ? "primary" : " secondary"}
            >
              {sneakerActive?.brand.toLocaleUpperCase()}
            </Text>
            <Heading>{sneakerActive?.name}</Heading>
            <Text fontWeight={700} fontSize="2xl">
              {sneakerActive?.price.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </Text>
          </Stack>

          <Stack>
            <Stack display={"flex"} direction={"row"}>
              <Button
                variant={tipoTalle === "US" ? "primary" : "secondary"}
                size="sm"
                fontSize="xs"
                onClick={() => handleType("US")}
              >
                US
              </Button>
              <Button
                variant={tipoTalle === "EU" ? "primary" : "secondary"}
                size="sm"
                fontSize="xs"
                onClick={() => handleType("EU")}
              >
                EU
              </Button>
              <Button
                variant={tipoTalle === "CM" ? "primary" : "secondary"}
                size="sm"
                fontSize="xs"
                onClick={() => handleType("CM")}
              >
                CM
              </Button>
            </Stack>
            <ul className="size_grid">{converSize(tipoTalle)}</ul>
          </Stack>
          <Stack>
            <ButtonCount products={products} />
          </Stack>
        </Stack>
      </Stack>
    </DetailContainer>
  );
};

export default BodyContent;
