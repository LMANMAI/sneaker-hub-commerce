import { Image, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface ICarrouselProps {
  images?: string[];
  posterPath: string;
}
const Carrousel: React.FC<ICarrouselProps> = ({ images, posterPath }) => {
  const [selectedimage, setSelectedImage] = useState<string>(posterPath);
  const [render, setRender] = useState<boolean>(false);
  const [cursor, setCursorPosition] = useState({
    cursor_x: 0,
    cursor_y: 0,
  });
  const [backgroundProps, setBackgroundProps] = useState({
    background: "",
    size: "",
    position: "",
  });

  const img_container = document.querySelector<HTMLElement>(".img_container");
  const zoomer = document.querySelector<HTMLElement>(".cursorZoom");
  const resultcontainer = document.querySelector<HTMLElement>(".reflect");
  const image = document.querySelector<HTMLImageElement>(".img");

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
      zoomer.style.left = x + "px";
      zoomer.style.top = y + "px";
      let fx =
        resultcontainer.getBoundingClientRect().width /
        zoomer.getBoundingClientRect().width;
      let fy =
        resultcontainer.getBoundingClientRect().height /
        zoomer.getBoundingClientRect().height;

      setBackgroundProps({
        background: `url(${image?.src})`,
        size: `${image?.getBoundingClientRect().width * fx}px ${
          image.getBoundingClientRect().height * fy
        }px`,
        position: `-${x * fx}px -${y * fy}px`,
      });
      resultcontainer.style.backgroundImage = backgroundProps.background;
      resultcontainer.style.backgroundSize = backgroundProps.size;
      resultcontainer.style.backgroundPosition = backgroundProps.position;
    }
    setRender(true);
  };
  useEffect(() => {
    if (render && resultcontainer) {
      resultcontainer.style.display = "block";
    } else if (!render && resultcontainer) {
      resultcontainer.style.display = "none";
    }
  }, [render]);

  return (
    <Stack
      marginY={5}
      direction={{ base: "column", md: "row-reverse" }}
      justifyContent={"center"}
      padding={"10px 15px"}
    >
      <Stack
        position="relative"
        className="img_container"
        cursor="pointer"
        onMouseMoveCapture={handleMove}
        onMouseLeave={() => setRender(false)}
        width={{ base: 245, md: 300, lg: 350 }}
        height={{ base: 300, md: 350, lg: 400 }}
      >
        <Image
          cursor="pointer"
          borderRadius="5px"
          src={`${import.meta.env.VITE_URL_EP_CLOUD}${selectedimage}`}
          className="img"
          width={"100%"}
          height={"100%"}
          objectFit={"cover"}
        />
        <Stack
          className="cursorZoom"
          top={cursor.cursor_y}
          left={cursor.cursor_x}
        ></Stack>
      </Stack>
      <Stack direction={{ base: "row", md: "column" }} height={"100%"}>
        <Image
          cursor="pointer"
          borderRadius="5px"
          src={`${import.meta.env.VITE_URL_EP_CLOUD}${posterPath}`}
          width={{ base: "50px", md: "85px" }}
          height={{ base: "50px", md: "85px" }}
          onClick={() => setSelectedImage(posterPath)}
        />
        {images?.map((image) => {
          return (
            <Image
              cursor="pointer"
              opacity={selectedimage === image ? 0.5 : 1}
              borderColor={
                selectedimage === image ? "5px solid primary" : "transparent"
              }
              borderRadius="5px"
              key={image}
              src={`${import.meta.env.VITE_URL_EP_CLOUD}${image}`}
              width={{ base: "50px", md: "85px" }}
              height={{ base: "50px", md: "85px" }}
              flexDirection={"column"}
              onClick={() => setSelectedImage(image)}
              objectFit={"cover"}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Carrousel;
