import { brands } from "../../components/BrandsMenu/statics";
import { BrandDetailContainer } from "./styles";

const BrandDetail = () => {
  const url = window.location.href;
  const segments = url.split("/");
  const lastSegment = segments[segments.length - 1];

  const checkBrandBG = (brandType: string) => {
    const brand = brands.find(
      (item: any) =>
        item.name.toLocaleUpperCase() === brandType.toLocaleUpperCase()
    );
    if (brand) {
      return brand.bg;
    }
  };
  return (
    <BrandDetailContainer>
      <div className="detail__bg">
        <img
          loading="lazy"
          src={lastSegment ? checkBrandBG(lastSegment) : ""}
          alt={lastSegment}
        />
      </div>

      <div className="content">
        <p> brand detail : {lastSegment}</p>
      </div>

      <div className="background"></div>
    </BrandDetailContainer>
  );
};

export default BrandDetail;
