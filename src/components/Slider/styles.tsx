import styled from "@emotion/styled";
import Slider from "react-slick";
export const SliderContainer = styled.div`
  width: 100%;
  margin: 10px auto;
  margin-bottom: 28px;
  padding: 0px 20px;
  .slick-list {
    heigth: fit-contain;
  }
  img {
    width: 100%;
    object-fit: cover;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const Carrousel = styled(Slider)`
  & > button,
  .slick-prev:before,
  .slick-next:before {
    height: 100%;
    background: #000;
    color: white;
  }
  .slick-next,
  .slick-prev {
    color: black;
  }
`;
