import { NavLink, useLocation } from "react-router-dom";
import { Grid, GridItem, Stack, Text, useColorMode } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selecBrands, setBrandFilter } from "../../features/sneakersSlice";
import { brands } from "./statics";
const BrandsComponent = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { colorMode } = useColorMode();
  const brandsArray = useSelector(selecBrands);

  const handleBrandArray = (brand: string) => {
    dispatch(setBrandFilter(brand));
  };
  return (
    <div>
      {/*marcas seleccionadas*/}
      <Stack>
        {pathname === "/" && (
          <Stack padding={"8px 0px"} direction="row">
            {brandsArray.map((item: any, index: number) => (
              <Text
                key={index}
                backgroundColor="#cecece"
                w="fit-content"
                p="2.5px 5px"
                borderRadius="5px"
                alignItems="center"
              >
                {item}
                <NavLink to={`/?brand=${item}`}>
                  <Text
                    as="strong"
                    cursor="pointer"
                    onClick={() => handleBrandArray(item)}
                    marginLeft="5px"
                    fontSize={"10px"}
                  >
                    X
                  </Text>
                </NavLink>
              </Text>
            ))}
          </Stack>
        )}
      </Stack>
      {/*marcas*/}
      <Grid
        templateColumns={{
          base: "repeat(auto-fit, minmax(45%, 1fr))",
          md: "repeat(auto-fit, minmax(22%, 1fr))",
        }}
        gap={"10px"}
      >
        {pathname === "/" && (
          <>
            {brands.map((item, index) => (
              <Stack key={index} className="contenedor">
                <NavLink to={`/?brand=${item.name}`}>
                  <Stack>
                    <GridItem
                      height={{ base: "100px", md: "120px" }}
                      borderRadius="5px"
                      cursor="pointer"
                      transition="transform 250ms ease"
                      _hover={{
                        transform: "scale(1.05)",
                      }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      background={`url(${item.bg})`}
                      backgroundPosition="center center"
                      onClick={() => {
                        handleBrandArray(item.name);
                      }}
                    >
                      <Text
                        width="fit-content"
                        backgroundColor={
                          colorMode === "light" ? "white" : "gray.800"
                        }
                        padding="5px 10px"
                      >
                        {item.name}
                      </Text>
                    </GridItem>
                  </Stack>
                </NavLink>
              </Stack>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};

export default BrandsComponent;
