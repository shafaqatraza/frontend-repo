import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Spacer
} from "@chakra-ui/react";
import * as React from "react";
import BannerImage from '../../assets/imgs/ourvalue.png'

export const LastSection = () => (
    <Container
        as={SimpleGrid}
        maxW="container.xl"
        columns={{ base: 1 }}
        spacing={{ base: 8, lg: 6 }}
        // py={{ base: 10, sm: 10, lg: 12 }}
        mb={{ lg: 4 }}
        padding="0px !important"
    >
        <Spacer />
        <Spacer />
        <Flex justifyContent="center" alignItems="center" >
            <Image
                src={BannerImage.src}
                alt={"banner Image"}

            />
        </Flex>
        <Spacer />
        <Spacer />
        <Spacer />
    </Container>
);
