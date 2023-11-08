import {
    Container,
    SimpleGrid,
    Text,
    Spacer,
} from "@chakra-ui/react";
import * as React from "react";

export const Section2 = () => (
    <Container
        as={SimpleGrid}
        maxW="container.xl"
        columns={{ base: 1 }}
        spacing={{ base: 8, lg: 6 }}

        mb={{ lg: 4 }}
    >
        <Spacer />
        {/* <Flex justifyContent="start" alignItems="center" > */}
        <Text fontSize={24} color="primary.300"
            pl="6"
            fontWeight={500}>
            Do Good. Feel Better. Get Rewarded.
        </Text>
        <Text fontSize={14}
            // color="primary.300"
            pl="6"
            fontWeight={400}>
            Good Deeds is a platform where contributions are rewarded by encouraging reciprocity through the offering of goods and services. In exchange for donating things that you no longer need or providing services, you earn deed dollars that can be used in the marketplace. We believe that a good deed should be rewarded and that a non-monetized society can help shape communities and beyond.
            <br />
            <br />
            Good Deeds is the world’s first 100% free-to-use marketplace that promotes and recompenses the act of giving. By giving away things we may no longer need, we create a cycle of kindness + reward that helps reduce the environmental impact on the planet, while also promoting mental and physical benefits, nurturing relationships and expanding our social influence.
        </Text>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        {/* </Flex> */}

    </Container>
);
