import {
    Image,
    Text,
    Flex
} from "@chakra-ui/react";
import * as React from "react";

export const Card = (props: any) => {
    let {
        img,
        heading,
        text
    } = props
    return (
        <div>
            <Flex
                justifyContent="center"
            >
                <Image
                    src={img}
                    alt={"img"}
                    draggable="false"
                />
            </Flex>
            <Text
                py="3"
                fontSize="24"
                fontWeight="500"
                textAlign="center"
            >
                {heading}
            </Text>
            <Text
                textAlign="center"
                px="3"
                fontSize="14px"
            >
                {text}
            </Text>
        </div>
    )

}


