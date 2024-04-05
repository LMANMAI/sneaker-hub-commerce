import { useEffect, useState } from "react";
import {
  Heading,
  Stack,
  Text,
  Button,
  Box,
  useColorMode,
  useToast,
  Badge,
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
import { NavLink, useNavigate } from "react-router-dom";

const BodyContent = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useNavigate();

  const [tipoTalle, setTipoTalle] = useState("US");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const sneakerActive = useSelector(selectSneakerActive);
  const { colorMode } = useColorMode();

  const getSneakerActive = async () => {
    const url = window.location.href;
    const segments = url.split("/");
    const lastSegment = segments[segments.length - 1];

    try {
      const { data } = await instance.get(`/product/${lastSegment}`);
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

      const isSelected =
        selectedProduct &&
        selectedProduct._id === sneakerActive._id &&
        selectedProduct.size === talle[tipo];
      const handleClick = () => {
        const selectedSizeLimit = sneakerActive.sizes
          .filter((limitItem) => limitItem.size === talle["US"])
          .map((filteredItem) => {
            return filteredItem.qty;
          });

        const newProduct = {
          _id: sneakerActive._id,
          name: sneakerActive.name,
          price: Number(sneakerActive.price),
          brand: sneakerActive.brand,
          genre: sneakerActive.genre,
          size: talle[tipo],
          limit: Number(selectedSizeLimit[0]),
          quantity: 1,
          posterPathImage: sneakerActive.posterPathImage,
          hasPromotion:
            sneakerActive?.hasModifications?.promotionActive || false,
          promotionDiscount:
            sneakerActive?.hasModifications?.discountPercentage || 0,
          prevPrice:
            sneakerActive?.hasModifications?.previosPrice ||
            sneakerActive.price,
        };

        if (isSelected) {
          setSelectedProduct(null);
        } else {
          setSelectedProduct(newProduct);
        }
      };
      return (
        <li key={index}>
          <button
            className={isSelected ? "selected" : ""}
            disabled={!isActive || isActiveEU || isActiveCM}
            onClick={() => {
              handleClick();
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
            <NavLink to={`/brand/${sneakerActive?.brand}`}>
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
            </NavLink>

            <Heading>{sneakerActive?.name}</Heading>
            {sneakerActive?.hasModifications && (
              <Stack direction={"row"} alignItems={"center"}>
                <Text
                  fontSize="sm"
                  fontWeight={700}
                  color="gray.400"
                  textDecoration="line-through"
                >
                  {sneakerActive?.hasModifications.previosPrice.toLocaleString(
                    "es-AR",
                    {
                      style: "currency",
                      currency: "ARS",
                    }
                  )}
                </Text>
                <Badge
                  backgroundColor={
                    colorMode === "light" ? "primary" : " secondary"
                  }
                  color="white"
                  fontSize="md"
                  borderRadius="md"
                  paddingX={2}
                >
                  %{sneakerActive?.hasModifications.discountPercentage}
                </Badge>
              </Stack>
            )}

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
            <ButtonCount product={selectedProduct} />
          </Stack>
        </Stack>
      </Stack>
    </DetailContainer>
  );
};

export default BodyContent;
