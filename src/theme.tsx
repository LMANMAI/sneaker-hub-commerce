import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./assets/ButtonStyles";
export default extendTheme({
  colors: {
    primary: "#F26419",
    secondary: "#00b4d8",
  },
  fonts: {
    body: "Kumbh Sans, sans-serif",
  },
  components: {
    Button,
  },
});
