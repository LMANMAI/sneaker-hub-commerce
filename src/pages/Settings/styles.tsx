import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const CustomButton = styled(Button)`
  &.disabled {
    border: 1px solid rgb(153, 153, 153);
    background-color: rgb(209, 209, 209);
    color: rgb(102, 102, 102);
    cursor: not-allowed;
    pointer-events: none;
    &:hover {
      background-color: rgb(209, 209, 209);
    }
  }
`;
