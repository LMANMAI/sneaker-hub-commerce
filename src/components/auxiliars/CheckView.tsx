import { Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const CheckView = () => {
  return (
    <Stack borderRadius="10px" h="350px" backgroundColor="#128C7E">
      <Stack alignItems="center" justifyContent="center" h="100%" color="white">
        <Icon as={BsFillCheckCircleFill} fontSize="3rem" />
        <Text textAlign="center" fontSize="14px">
          Registered user correctly, check the email to enter
        </Text>
      </Stack>
    </Stack>
  );
};

export default CheckView;
