import {
  Box,
  Container,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import Router from "next/router";
import img from '../../assets/imgs/couch.jpg';
import img2 from '../../assets/imgs/service-img2.jpg';

interface IfirstChildProps {
  type: string
}

export default function BigCards(props: IfirstChildProps) {
  return (
    <Box position={"relative"}>
      <Text
        fontSize="24px"
        fontWeight="500"
        pt={{ base: 4, sm: 10, md: 5, lg: 1 }}
        px={{ base: 4, sm: 3, md: 5, lg: 6, xl: 14 }}
      >
        Start browsing to find items and services
      </Text>{" "}
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 6 }}
        py={{ base: 10, sm: 10, lg: 12 }}
        ml={{ xl: 12 }}
      >
        <Stack spacing={{ base: 5, md: 15 }}>
          <Box
            h={"100%"}
            maxW={"400px"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            maxH={"267px"}
            onClick={() => {
              Router.push({
                pathname: "/browse",
                query: { activeTab: 0, type: props.type },
              });
            }}
          >
            <Image
              src={img.src}
              alt={"main image 1"}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={12}
              cursor={"pointer"}
            />
          </Box>

          <Text fontSize="md" textAlign="center" maxW={"400px"}>
            Items
          </Text>
        </Stack>
        <Stack
          spacing={{ base: 5, md: 15 }}
          onClick={() => {
            Router.push({
              pathname: "/browse",
              query: { activeTab: 1, type: props.type },
            });
          }}
        >
          <Box
            h={"100%"}
            maxW={"400px"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            maxH={"267px"}
          >
            <Image
              src={img2.src}
              alt={"main image 1"}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={12}
              cursor={"pointer"}
            />
          </Box>

          <Text fontSize="md" textAlign="center" maxW={"400px"} marginTop={5}>
            Services
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
