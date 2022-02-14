import { Image, Stack } from "@chakra-ui/react";
import { useState } from "react";

interface ICarrouselProps {
  images: string[];
}
const Carrousel: React.FC<ICarrouselProps> = ({ images }) => {
  const [selectedimage, setSelectedImage] = useState<string>(images[0]);
  return (
    <Stack alignItems="center" marginY={5}>
      <Image
        cursor="pointer"
        borderRadius="lg"
        src={selectedimage}
        width={345}
        height={345}
      />
      <Stack direction="row">
        {images.map((image) => (
          <Image
            cursor="pointer"
            opacity={selectedimage === image ? 0.5 : 1}
            borderColor={
              selectedimage === image ? "5px solid primary.500" : "transparent"
            }
            borderRadius="lg"
            key={image}
            src={image}
            width={20}
            height={20}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Carrousel;
