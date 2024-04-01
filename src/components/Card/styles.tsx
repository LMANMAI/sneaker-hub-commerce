import styled from "@emotion/styled";
import { Card } from "@chakra-ui/card";
import { Heading } from "@chakra-ui/react";

export const ImgProductContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  .sneaker-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .sneaker-image:hover {
    transform: scale(1.05);
  }
`;

export const CustomCard = styled(Card)`
  transition: all 250ms ease-in-out;
  position: relative;
  z-index: 1;
  &:hover {
    -webkit-box-shadow: 10px 10px 72px -25px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 72px -25px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 72px -25px rgba(0, 0, 0, 0.75);
    .icon__favourite svg{  background: red;}
    .favouritebutton{
      display: block;
    }
  }

  .icon__favourite{
    align-items: center;
    background: hsla(0, 0%, 100%, .7);
    border: 0;
    border-radius: 50%;
    color: #3483fa;
    content: "";
    cursor: pointer;
    display: flex;
    justify-content: center;
    svg{
      width: 15px;
      height: 15px;
      line-height: 1em;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
        &:hover{
          background: red;
        }
    }
   }
  }

  .favouritebutton {
    position: absolute;
    z-index: 99;
    right: 5px;
    top: 5px;
    display: none;
  }
`;

export const CustomHeading = styled(Heading)`
  color: #333;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  max-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
