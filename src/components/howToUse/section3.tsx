import {
    Container,
    SimpleGrid,
    Spacer,
} from "@chakra-ui/react";
import * as React from "react";
import { Steps } from './steps'

export const Section3 = () => {
    const boldText = {
        fontWeight: 'bold' as 'bold',
        color: "#dd6b21"
    }
    return (
        <>
            <Container
                as={SimpleGrid}
                maxW="container.lg"
                columns={{ base: 1 }}
                spacing={{ base: 8, lg: 6 }}

                mb={{ lg: 4 }}
            >
                <Spacer />
                {/* step1 */}
                <Steps
                    step="1"
                    heading="Create an account"
<<<<<<< HEAD
                    text="Receive virtual deed dollars from users who want those items or services"
=======
                    text="Receive deed dollars from users who want those items or services"
>>>>>>> develop
                    buttonText="Sign Up"
                    id={"signup"}
                />

                {/* step2*/}
                <Steps
                    step="2"
                    heading="Create a Listing"
<<<<<<< HEAD
                    list={{ title: "List your items or services", items: ["Set a credit price", "Set your experience level or item condition", "Use virtual deed dollars towards other items and services on the site "] }}
=======
                    list={{ title: "List your items or services", items: ["Set a credit price", "Set your experience level or item condition", "Use deed dollars towards other items and services on the site "] }}
>>>>>>> develop
                    buttonText="Create a Listing"
                    id="create"
                />
                {/* step3*/}
                <Steps
                    step="3"
                    heading="Receive virtual deed dollars"
                    text={
                        <text style={{ display: 'block', fontSize: 14, fontWeight: 400 }}>
                            Exchange an item or service and receive virtual deed dollars from users <br /><br />
                            A safe and secure community is important to Good Deeds. <br /><br />
                            The approximate conversion rate is <span style={boldText}>$1 CAD for every 1 credit.</span>
                        </text>
                    }
                    buttonText="Learn more about deed dollars"
                    id="about"
                />{/* step4*/}
                <Steps
                    step="4"
<<<<<<< HEAD
                    heading="Use those deed dollars"
                    text="Use virtual deed dollars towards other items and services on the site"
=======
                    heading="Use those credits"
                    text="Use deed dollars towards other items and services on the site"
>>>>>>> develop

                />
                <Spacer />
                <Spacer />
                <Spacer />
                <Spacer />
            </Container>
        </>
    )

};
