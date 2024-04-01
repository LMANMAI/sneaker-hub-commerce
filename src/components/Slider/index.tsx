import { Carrousel, SliderContainer } from "./styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
    <SliderContainer>
      <Carrousel {...settings}>
        {[
          {
            src: "https://essential.vteximg.com.br/arquivos/ids/461284/Retro5RagingBull-1600x576.jpg?v=637653208921000000",
          },
          {
            src: "https://essential.vteximg.com.br/arquivos/ids/460189/Grid-DarkDreams1600x576.jpg?v=637649908228000000",
          },
          {
            src: "https://essential.vteximg.com.br/arquivos/ids/469125/BannerWeb-MoveToZero1600x576.png?v=637673899532070000",
          },
          {
            src: "https://grid0.vtexassets.com/assets/vtex.file-manager-graphql/images/ceb83362-7be8-4bf8-a1c4-46327c2ecbd6___6e18f8308c33dc5799df67c86e1b15e1.jpg",
          },
          {
            src: "https://grid0.vtexassets.com/assets/vtex.file-manager-graphql/images/be79b8a5-3dab-406c-a4c3-720892113880___91229e58abe26cc3592e67729d22fa33.jpg",
          },
        ].map((item: any) => {
          return (
            <div style={{ width: 300 }}>
              <img src={item.src} />
            </div>
          );
        })}
      </Carrousel>
    </SliderContainer>
  );
}
