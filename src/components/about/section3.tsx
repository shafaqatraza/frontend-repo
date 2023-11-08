import {
    Container,
    SimpleGrid,
    Text,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import * as React from "react";
import Image1 from '../../assets/imgs/eco.png'
import Image2 from '../../assets/imgs/public.png'
import Image3 from '../../assets/imgs/group.png'
import { Card } from './card'

export const Section3 = () => (
    <Container
        as={SimpleGrid}
        maxW="container.xl"
        columns={{ base: 1 }}
        spacing={{ base: 6, lg: 6 }}
        mb={{ lg: 4 }}
    >
        <SimpleGrid columns={[1, null, 3]} spacing="40px">
            <Card
                img={Image1.src}
                heading="Community-Focused"
                text="We are passionate about empowering communities to look within and share resources without any monetary requirements. Our goal is that our donation movement extends from an occasional occurrence to a continuous lifestyle, by working on minimizing poverty and supporting our communities." />
            <Card
                img={Image2.src}
                heading="Act of Giving"
                text="It is a universal truth, when we engage in good deeds, we help others and we also reduce our own stress. We encourage our community to do good (and feel better themselves) by creating a cycle that benefits them beyond monetary reward and into a more adaptable, kind and sustainable way of life. " />
            <Card
                img={Image3.src}
                heading="Sustainable Society"
                text="Our mission is to work on encouraging a sustainable future as part of the good deeds journey by reducing waste and nurturing communities. We believe in buying less and sharing more, and that moving away from a consumerist culture by lessening our environmental impact ensures the path to earth’s longevity" />
        </SimpleGrid>

        <Spacer />
        <Spacer />
    </Container>
);
