import { Link } from "react-router-dom";
import { CardBody } from "@chakra-ui/card";
import { Image, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setSneakerActive } from "../../features/sneakersSlice";
import { ImgProductContainer, CustomCard, CustomHeading } from "./styles";

const CardComponent = ({ sneaker }: any) => {
  const dispatch = useDispatch();
  return (
    <Link
      to={`/${sneaker?._id}`}
      key={sneaker?._id}
      onClick={() => dispatch(setSneakerActive(sneaker))}
    >
      <CustomCard maxW="sm">
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

            <Text color="blue.600" fontSize="2xl">
              ${sneaker.price.toFixed(2)}
            </Text>
          </Stack>
        </CardBody>
      </CustomCard>
    </Link>
  );
};

export default CardComponent;
