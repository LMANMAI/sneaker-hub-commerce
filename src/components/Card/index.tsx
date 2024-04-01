import { Link } from "react-router-dom";
import { CardBody } from "@chakra-ui/card";
import { Image, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setSneakerActive } from "../../features/sneakersSlice";
import { ImgProductContainer, CustomCard, CustomHeading } from "./styles";
import FavButton from "../FavouriteButton";

const CardComponent = ({ sneaker }: any) => {
  const dispatch = useDispatch();
  return (
    <CustomCard maxW="sm">
      <Link
        to={`/${sneaker?._id}`}
        key={sneaker?._id}
        onClick={() => dispatch(setSneakerActive(sneaker))}
      >
        <CardBody padding={"0px"}>
          <ImgProductContainer>
            <Image
              src={`${import.meta.env.VITE_URL_EP_CLOUD}${
                sneaker.posterPathImage
              }`}
              alt={sneaker.name}
              borderRadius={"2.5px"}
              className="sneaker-image"
            />
          </ImgProductContainer>
          <Stack padding={"20px"}>
            <CustomHeading size="sm" fontSize={"12px"}>
              {sneaker.name}
            </CustomHeading>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <Text color="blue.600" fontSize=" 15px">
                {sneaker?.price.toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                })}
              </Text>
            </Stack>
          </Stack>
        </CardBody>
      </Link>
      <div className="favouritebutton">
        <FavButton variant="ghost" />
      </div>
    </CustomCard>
  );
};

export default CardComponent;
