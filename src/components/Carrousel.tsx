import { Image, Stack } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent, useRef } from "react";

interface ICarrouselProps {
  images?: string[];
}
const Carrousel: React.FC<ICarrouselProps> = ({ images }) => {
  const [selectedimage, setSelectedImage] = useState<string>();
  const [cursor, setCursor] = useState({
    cursor_x: 0,
    cursor_y: 0,
  });
  const [imgreflect, setIMGReflect] = useState<string>("");
  const [backgroundprops, setBackProps] = useState({
    size: "",
    position: "",
  });

  useEffect(() => {
    if (images !== undefined) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const container = document.querySelector(".img_container");
  const image = document.querySelector(".img");
  const zoom = document.querySelector(".cursorZoom");
  const result = document.querySelector(".result");

  const containerRect = container?.getBoundingClientRect();
  const imageRect = image?.getBoundingClientRect();
  const zoomRect = zoom?.getBoundingClientRect();
  const resultRect = result?.getBoundingClientRect();

  function zoomImage(e: any) {
    //console.log("zoom image", e.clientX, e.clientY);
    const { x, y } = getMousePos(e);
    if (image && resultRect && zoomRect && imageRect) {
      setCursor({
        cursor_x: x,
        cursor_y: y,
      });
      setIMGReflect(`${image.src}`);

      let fx = resultRect?.width / zoomRect?.width;
      let fy = resultRect?.height / zoomRect?.height;
      setBackProps({
        size: `${imageRect.width * fx}px -${imageRect.height * fy}`,
        position: `-${x * fx}px -${y * fy}px`,
      });
    }
    // console.log(imgreflect);
  }
  function getMousePos(e: any) {
    if (containerRect && zoomRect) {
      let x = e.clientX - containerRect?.left - zoomRect?.width / 2;
      let y = e.clientY - containerRect?.top - zoomRect?.height / 2;

      let minX = 0;
      let minY = 0;
      let maxX = containerRect.width - zoomRect?.width;
      let maxY = containerRect.height - zoomRect.height;
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

      return { x, y };
    }
  }
  const handleMove = (e: any) => {
    getMousePos(e);
    zoomImage(e);
  };
  return (
    <Stack alignItems="center" marginY={5}>
      <Stack
        position="relative"
        overflow="hidden"
        className="img_container"
        border="1px solid"
        onMouseMove={(e) => handleMove(e)}
      >
        <Image
          cursor="pointer"
          borderRadius="lg"
          src={selectedimage}
          width={{ base: "initial", md: 345 }}
          className="img"

          // onMouseLeave={() => setCurrentIMG("")}
          //ref="ImgContainer"
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
      <Stack
        width="345px"
        height="345px"
        overflow="hidden"
        border="1px solid red"
        backgroundRepeat="no-repeat"
        backgroundImage={imgreflect}
        backgroundPosition={backgroundprops.position}
        backgroundSize={backgroundprops.size}
        className="result"
      >
        {/* <Image src={currentIMg} border="1px solid red" transform="scale(3)" /> */}
      </Stack>
    </Stack>
  );
};

export default Carrousel;
