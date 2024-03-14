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
    transform: scale(1.1);
  }
`;

export const CustomCard = styled(Card)`
  transition: all 250ms ease-in-out;
  &:hover {
    -webkit-box-shadow: 10px 10px 72px -25px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 72px -25px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 72px -25px rgba(0, 0, 0, 0.75);
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