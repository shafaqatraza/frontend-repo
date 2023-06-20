import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export const BlueBlock: React.FC<{}> = () => {
  const flexObj = {
    flex: {
      base: "0 0 100%",
      md: "0 0 33.333%",
    },
    maxW: { base: "100%", md: "33.33%" },
    px: 4,
  };
  const textHeading = {
    color: "white",
    fontSize: "24px",
    fontWeight: "500",
    mb: "2",
  };

  return (
    <Box bg="#183553" py="20">
      <Flex wrap="wrap">
        <Flex {...flexObj} justify={{ base: "center", md: "flex-end" }}>
          <Box>
            <Text {...textHeading} textAlign="center">
              Donatess
            </Text>
            <Text color="white" fontSize="md" align="center">
              Begin your journey with Good Deeds.
            </Text>
          </Box>
        </Flex>
        <Flex {...flexObj} justify="center" my={{ base: 12, md: 0 }}>
          <Box>
            <Text {...textHeading} textAlign="center">
              Give Back
            </Text>
            <Text color="white" fontSize="md" align="center">
              See your act of kindness be rewared.
            </Text>
          </Box>
        </Flex>
        <Flex {...flexObj} justify={{ base: "center", md: "flex-start" }}>
          <Box>
            <Text {...textHeading} textAlign="center">
              Earn Credits
            </Text>
            <Text color="white" fontSize="md" align="center">
              Use your virtual currency how and when you want to.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
