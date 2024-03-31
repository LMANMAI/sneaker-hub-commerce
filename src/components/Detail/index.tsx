import React, { useEffect, useState } from "react";
import {
  Heading,
  Stack,
  Text,
  Button,
  Box,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { Carrousel, ButtonCount } from "..";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSneakerActive,
  setSneakerActive,
} from "../../features/sneakersSlice";
import { DetailContainer } from "./styles";
import { brands } from "../BrandsMenu/statics";
import { sizes } from "./statics";
import instance from "../../../src/config";
import { useNavigate } from "react-router-dom";

const BodyContent: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useNavigate();
  const [tipoTalle, setTipoTalle] = useState("US");
  const [products, setProducts] = useState<any>([]);

  const sneakerActive = useSelector(selectSneakerActive);
  const { colorMode } = useColorMode();

  const getSneakerActive = async () => {
    const url = window.location.href;
    const segments = url.split("/");
    const lastSegment = segments[segments.length - 1];

    try {
      const { data } = await instance.get(`/${lastSegment}`);
      dispatch(setSneakerActive(data.product));
    } catch (error) {
      toast({
        title: "Ocurrio un error al consultar el producto.",
        description: "Es posible que el producto no se encuentre disponible.",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      setTimeout(() => {
        history("/");
      }, 500);
    }
  };
  const checkBrandBG = (brandType: string) => {
    const brand = brands.find(
      (item) => item.name.toLocaleUpperCase() === brandType
    );
    if (brand) {
      return brand.bg;
    }
  };

  const converSize = (tipo: string) => {
    if (!sneakerActive) return [];

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
    if (!sneakerActive) {
      getSneakerActive();
    }
  }, []);

  useEffect(() => {
    if (products.length !== 0) {
      console.log(products, "products");
    }
  }, [products]);

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
          {sneakerActive && (
            <Carrousel
              posterPath={sneakerActive ? sneakerActive?.posterPathImage : ""}
              images={sneakerActive?.imgs}
            />
          )}
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
