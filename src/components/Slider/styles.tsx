import styled from "@emotion/styled";
import Slider from "react-slick";
export const SliderContainer = styled.div`
  width: 100%;
  margin: 10px auto;
  margin-bottom: 28px;
  img {
    width: 100%;
    object-fit: contain;
    &:hover {
      cursor: pointer;
    }
  }
`;
export const Carrousel = styled(Slider)`
  & > button,
  .slick-prev:before,
  .slick-next:before {
    color: #000 !important;
  }
`;
