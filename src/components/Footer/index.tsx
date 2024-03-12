import { Stack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Stack
      alignItems="center"
      paddingY={2}
      fontSize={13}
      backgroundColor={"RED"}
    >
      <p>Made with{" </> "}by Lucas Maidana</p>
    </Stack>
  );
};

export default Footer;
