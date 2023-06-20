import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const UserCard = (props: BoxProps) => (
  <Box
    bg={props.bg ? props.bg : "transparent"}
    maxWidth="2xl"
    p={{ base: "6", md: "8" }}
    rounded={{ sm: "lg" }}
    shadow={{ md: "base" }}
    {...props}
  />
);
