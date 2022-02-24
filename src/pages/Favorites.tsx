import { useState } from "react";
import { Stack, Button, Image, Text, Checkbox, Select } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectFavorites,
  removeFromFavorites,
} from "../features/sneakersSlice";
const Favorites = () => {
  const itemsFav = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <Stack overflow="hidden">
      <h1>Favorites </h1>
      <Stack
        direction={{ base: "column", md: "row" }}
        h="100%"
        minHeight="50vh"
        p={2}
        backgroundColor="#e9e9e986"
        borderRadius="15px"
      >
        <Stack width={{ base: "100%", md: "20%" }}>
          <p>Ordenar por</p>
          <Select>
            <option value="option1">Mayor precio</option>
            <option value="option2">Menor Precio</option>
            <option value="option3">Articulos de Mujer</option>
            <option value="option3">Articulos de Hombre</option>
          </Select>
        </Stack>
        <Stack
          flex="2"
          p={2}
          overflow="hidden"
          overflowY="auto"
          maxHeight="80vh"
        >
          {itemsFav.length > 0 ? (
            <>
              <Stack w="100%" direction="row" justifyContent="space-between">
                <Checkbox
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, e.target.checked])
                  }
                >
                  Eliminar Seleccionados
                </Checkbox>
                <Text>Favoritos {itemsFav.length}</Text>
              </Stack>

              <Stack
                spacing={0}
                overflowY="auto"
                overflowX="hidden"
                paddingX={4}
              >
                {itemsFav.map((item) => (
                  <Stack key={item._id} direction="row">
                    <Checkbox
                      className="checkL"
                      isChecked={false}
                      onChange={(e) =>
                        setCheckedItems([e.target.checked, false])
                      }
                    ></Checkbox>

                    <Stack
                      direction="row"
                      backgroundColor="white"
                      alignItems="center"
                      borderTop="1px solid #e4e4e4"
                      borderBottom="1px solid #e4e4e4"
                      w="100% "
                    >
                      <Link to={`/sneaker/${item?._id}`} className="link_fav">
                        <Stack w="100%" maxWidth="130px" p="24px">
                          <Image w="100%" src={item.posterPathImage} />
                        </Stack>
                        <Stack p={2}>
                          <Text fontSize="12px">{item.name}</Text>
                          <Text>${item.price}</Text>
                        </Stack>
                      </Link>
                      <Button
                        variant="unstyled"
                        color="primary.500"
                        border="2px solid"
                        h="fit-content"
                        w="80px"
                        marginRight="20px!important"
                        onClick={() => dispatch(removeFromFavorites(item))}
                      >
                        Eliminar
                      </Button>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </>
          ) : (
            <p>Todavia no hay items favoritos</p>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Favorites;
