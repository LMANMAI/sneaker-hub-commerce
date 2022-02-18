import { Image, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface ICarrouselProps {
  images?: string[];
}
const Carrousel: React.FC<ICarrouselProps> = ({ images }) => {
  const [selectedimage, setSelectedImage] = useState<string>();
  useEffect(() => {
    if (images !== undefined) {
      setSelectedImage(images[0]);
    }
  }, [images]);
  return (
    <Stack alignItems="center" marginY={5}>
      <Image
        cursor="pointer"
        borderRadius="lg"
        src={selectedimage}
        width={{ base: "initial", md: 345 }}
        className="img"
      />
      <Image
        src={selectedimage}
        width="100px"
        border="1px solid red"
        className="clip img"
      />

      <Stack direction="row">
        {images?.map((image) => (
          <Image
            cursor="pointer"
            opacity={selectedimage === image ? 0.5 : 1}
            borderColor={
              selectedimage === image ? "5px solid primary.500" : "transparent"
            }
            borderRadius="lg"
            key={image}
            src={image}
            width={{ base: 14, md: 20 }}
            height={{ base: 14, md: 20 }}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Carrousel;
