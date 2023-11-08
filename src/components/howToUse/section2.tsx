import { Container, SimpleGrid, Image, Flex } from "@chakra-ui/react";
import * as React from "react";
import BannerImage from "../../assets/imgs/how-to-use.jpg";

export const Section2 = () => (
  <Container
    as={SimpleGrid}
    maxW="7xl"
    columns={{ base: 1 }}
    spacing={{ base: 8, lg: 6 }}
    // py={{ base: 10, sm: 10, lg: 12 }}
    mb={{ lg: 4 }}
  >
    <Flex justifyContent="center" alignItems="center">
      {/* <Image src={BannerImage.src} alt={"banner Image"} /> */}
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/fSJkT_hYWVY`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Good Deeds - How it works"
      />
    </Flex>
  </Container>
);
