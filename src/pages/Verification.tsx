import { useState, useEffect } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import {
  BsFillCheckCircleFill,
  BsAlarmFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { verifyEmail } from "../controllers/Sesion";
const Verification = () => {
  const [checkEmail, setCheckEmail] = useState<string>("waiting");
  const [clientEmail, setClientEmail] = useState<string>("");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let verificationCode = query.get("oobCode");
  let verificationMode = query.get("mode");

  useEffect(() => {
    if (verificationCode !== null && verificationMode === "verifyEmail") {
      verifyEmail(verificationCode).then((res) => {
        if (res === "error") {
          setCheckEmail("error");
        } else if (res === "expire") {
          setCheckEmail("expire");
        } else {
          setCheckEmail("verificado");
          setClientEmail(res);
        }
      });
    }
  }, [verificationMode, verificationCode]);
  return (
    <Box
      backgroundColor="#FFF"
      w="100vw"
      h="100%"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="99"
    >
      <Stack alignItems="center" justifyContent="center" h="100%">
        {checkEmail === "verificado" && (
          <>
            <Stack fontSize="8rem" color="#128C7E">
              <BsFillCheckCircleFill />
            </Stack>
            <Text fontSize="1.575rem" color="#128C7E" textAlign="center">
              Thank you for registering now you can <Link to="/">log in</Link>{" "}
              with the email : <span>{clientEmail}</span>
            </Text>{" "}
          </>
        )}

        {checkEmail !== "verificado" && (
          <>
            <Stack
              fontSize="8rem"
              color={checkEmail === "waiting" ? "#FF9900" : "#E60023"}
            >
              {checkEmail === "waiting" ? (
                <BsAlarmFill />
              ) : (
                <BsFillXCircleFill />
              )}
            </Stack>
            <Text
              fontSize="1.575rem"
              color={checkEmail === "waiting" ? "#FF9900" : "#E60023"}
            >
              {checkEmail === "waiting" && "Procesando la accion"}
              {checkEmail === "error" && "Ocurrio un Error"}
              {checkEmail === "expire" && "Expiro"}
            </Text>{" "}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Verification;
