import {
    Container,
    SimpleGrid,
    Text,
    Flex,
    Spacer,
    Center
} from "@chakra-ui/react";
import * as React from "react";
import Image1 from '../../assets/imgs/image 11.png'
import Image2 from '../../assets/imgs/image 12.png'
import Image3 from '../../assets/imgs/image 8.png'
import Image4 from '../../assets/imgs/image 16.png'
import { TeamMemberCard } from './teamMemberCard';

export const TeamSection = () => (
    <Flex justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
        <Container
            as={SimpleGrid}
            maxW="container.xl"
            columns={{ base: 1 }}
            spacing={{ base: 6, lg: 6 }}
            mb={{ lg: 4 }}
            py="4"
        >
            <SimpleGrid columns={[2, null, 4]} spacing="40px">
                <TeamMemberCard
                    img={Image3.src}
                    name="Amber Yakutchik"
                    position="Founder and CEO" />
                <TeamMemberCard
                    img={Image1.src}
                    name="Paula Festas"
                    position="President" />
                <TeamMemberCard
                    img={Image2.src}
                    name="Alex Christopoulos"
                    position="Chief Financial Officer" />
                <TeamMemberCard
                    img={Image4.src}
                    name="Jordan Fiksenbaum"
                    position="Chief Visionary Officer"
                />
            </SimpleGrid>
            <Spacer />
            <Spacer />
        </Container >
    </Flex >
);
