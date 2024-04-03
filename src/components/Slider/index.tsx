import { Carrousel, SliderContainer } from "./styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { detailBrandCarrousel } from "./statics";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <BiChevronRight />,
    prevArrow: <BiChevronLeft />,
  };

  return (
    <SliderContainer>
      <Carrousel {...settings}>
        {detailBrandCarrousel.map((item: any, index: number) => {
          return (
            <div style={{ width: 300 }}>
              <Link to={`/brand/${item.brand}`}>
                <img src={item.src} alt={`Slide ${index}`} />
              </Link>{" "}
            </div>
          );
        })}
      </Carrousel>
    </SliderContainer>
  );
}
