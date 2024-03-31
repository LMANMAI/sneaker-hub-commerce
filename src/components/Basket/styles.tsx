import { Stack } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const CustomStack = styled(Stack)`
  .disabled {
    border: 1px solid rgb(153, 153, 153);
    background-color: rgb(209, 209, 209);
    color: rgb(102, 102, 102);
    cursor: not-allowed;
    &:hover {
      background-color: rgb(209, 209, 209);
    }
  }
`;
