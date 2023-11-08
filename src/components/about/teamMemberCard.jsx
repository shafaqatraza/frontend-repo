import {
    Image,
    Text,
    Flex
} from "@chakra-ui/react";
import * as React from "react";

export const TeamMemberCard = (props) => {
    let {
        img,
        name,
        position
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
                pt="10"
                fontSize="20"
                fontWeight="500"
                textAlign="center"
                color={"white"}
            >
                {name}
            </Text>
            <Text
                textAlign="center"
                px="3"
                fontSize="16px"
                color={"white"}
            >
                {position}
            </Text>
        </div>
    )

}


