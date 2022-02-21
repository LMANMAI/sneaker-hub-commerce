import { Image, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface ICarrouselProps {
  images?: string[];
}
const Carrousel: React.FC<ICarrouselProps> = ({ images }) => {
  const [selectedimage, setSelectedImage] = useState<string>();
  const [cursor, setCursorPosition] = useState({
    cursor_x: 0,
    cursor_y: 0,
  });
  const [backgroundProps, setBackgroundProps] = useState({
    background: "",
    size: "",
    position: "",
  });
  useEffect(() => {
    if (images !== undefined) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const img_container = document.querySelector(".img_container");
  const zoomer = document.querySelector(".cursorZoom");
  const resultcontainer = document.querySelector(".reflect");
  const image = document.querySelector(".img");

  const handleMove = (e: any) => {
    if (img_container && zoomer && resultcontainer && image) {
      let x =
        e.clientX -
        img_container.getBoundingClientRect().left -
        zoomer?.getBoundingClientRect().width / 2;
      let y =
        e.clientY -
        img_container.getBoundingClientRect().top -
        zoomer?.getBoundingClientRect().height / 2;
      let minX = 0;
      let minY = 0;
      let maxX =
        img_container.getBoundingClientRect().width -
        zoomer.getBoundingClientRect().width;
      let maxY =
        img_container.getBoundingClientRect().height -
        zoomer.getBoundingClientRect().height;
      if (x <= minX) {
        x = minX;
      } else if (x >= maxX) {
        x = maxX;
      }
      if (y <= minY) {
        y = minY;
      } else if (y >= maxY) {
        y = maxY;
      }

      setCursorPosition({
        cursor_x: x,
        cursor_y: y,
      });
      let fx =
        resultcontainer?.getBoundingClientRect().width /
        zoomer.getBoundingClientRect().width;
      let fy =
        resultcontainer?.getBoundingClientRect().height /
        zoomer.getBoundingClientRect().height;

      resultcontainer.style.backgroundImage = `url(${image.src})`;
      setBackgroundProps({
        background: `url(${image?.src})`,
        size: `${image?.getBoundingClientRect().width * fx}px ${
          image.getBoundingClientRect().height * fy
        }`,
        position: `-${x * fx}px -${y * fy}px`,
      });
      resultcontainer.style.backgroundSize = backgroundProps.size;
      resultcontainer.style.backgroundPosition = backgroundProps.position;
    }
  };

  return (
    <Stack alignItems="center" marginY={5}>
      <Stack
        position="relative"
        className="img_container"
        border="1px solid"
        cursor="pointer"
        //onMouseOut={() => console.log("ahora debera acoultarse")}
        //onMouseMove={(e) => handleMove(e)}
        onMouseMoveCapture={handleMove}
      >
        <Image
          cursor="pointer"
          borderRadius="lg"
          src={selectedimage}
          width={{ base: "initial", md: 345 }}
          className="img"
        />
        <Stack
          className="cursorZoom"
          top={cursor.cursor_y}
          left={cursor.cursor_x}
        ></Stack>
      </Stack>
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
