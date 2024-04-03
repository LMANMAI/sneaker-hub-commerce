import { NavLink, useLocation } from "react-router-dom";
import { Grid, GridItem, Stack, Text, useColorMode } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setBrandFilter } from "../../features/sneakersSlice";
import { brands } from "./statics";
const BrandsComponent = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { colorMode } = useColorMode();

  const handleBrandArray = (brand: string) => {
    dispatch(setBrandFilter(brand));
  };
  return (
    <div>
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
                <NavLink to={`/brand/${item.name}`}>
                  <Stack>
                    <GridItem
                      height={{ base: "70px", md: "90px" }}
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
