import { Stack, Box, Text, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../features/userSlice";

interface IPropsStack {
  children: React.ReactNode;
  border?: boolean;
}
function StackContainer({ children, border }: IPropsStack) {
  return (
    <Stack
      borderY={border ? "1px solid #f0f0f0" : "none"}
      padding="25px"
      marginY={4}
    >
      {children}
    </Stack>
  );
}

const Settings = () => {
  const currentUser = useSelector(selectUser);
  const [disabledstate, setDisabled] = useState<boolean>(false);
  console.log(currentUser);
  return (
    <Stack h="100%" p={2}>
      <Text as="h1" fontSize="2.125rem" fontWeight="bold">
        Settings
      </Text>
      <Box minHeight="70vh">
        <Stack>
          <Box
            w="100%"
            minHeight="250px"
            borderTopLeftRadius="100px"
            background="linear-gradient(331deg, rgb(251 246 249) 0%, rgba(244,244,244,1) 35%, rgb(248 254 255) 100%)"
            backdropBlur="18px"
          ></Box>
          <Stack paddingLeft={{ base: "10px ", md: "250px" }}>
            <Stack
              w="100%"
              h="100%"
              maxHeight="150px"
              maxWidth="150px"
              top={{ base: "240px", md: "280px" }}
              left={{ base: "50px", md: "100px" }}
              border="4px solid white"
              borderRadius="100%"
              backgroundColor="gray"
              position="absolute"
            ></Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack>
                <Text as="h2" fontSize="2.125rem" fontWeight="bold">
                  Profile
                </Text>
                <Text>Update your photo and some details </Text>
              </Stack>
              <Button onClick={() => setDisabled(!disabledstate)}>
                {disabledstate ? "Save" : "Update"}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <StackContainer>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Text w="30%" mb="8px" textAlign="end">
              Name:
            </Text>
            <Input
              disabled={!disabledstate ? true : false}
              placeholder="Here is a sample placeholder"
              size="sm"
              maxWidth="450px"
              type="text"
              borderRadius="10px"
              padding="20px"
            />
          </Stack>
        </StackContainer>

        <StackContainer border={true}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Text w="30%" mb="8px" textAlign="end">
              Email:
            </Text>
            <Input
              disabled={!disabledstate ? true : false}
              placeholder="Here is a sample placeholder"
              size="sm"
              maxWidth="450px"
              type="text"
              borderRadius="10px"
              padding="20px"
            />
          </Stack>
        </StackContainer>

        <StackContainer>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Text w="30%" mb="8px" textAlign="end">
              Password:
            </Text>
            <Input
              disabled={!disabledstate ? true : false}
              placeholder="Here is a sample placeholder"
              size="sm"
              maxWidth="450px"
              type="text"
              borderRadius="10px"
              padding="20px"
            />
          </Stack>
        </StackContainer>
        <Button>Clear Favorites</Button>
      </Box>
    </Stack>
  );
};

export default Settings;
