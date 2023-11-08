import { HStack, Icon, StackProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineStarBorder, MdStar } from "react-icons/md";

export const NewRating = (props) => {
    const { defaultValue = 0, max = 5, size = "md", setRatingValue } = props;
    const color = useColorModeValue("gray.300", "gray.600");
    const activeColor = useColorModeValue("primary.300", "primary.300");
    return (
        <HStack spacing="3" justifyContent={"center"} >
            {Array.from({ length: max })
                .map((_, index) => index + 1)
                .map((index) => (
                    index <= defaultValue ?
                        (<MdStar
                            key={index}
                            as={FaStar}
                            onClick={() => setRatingValue(index)}
                            fontSize={"42px"}
                            color={"#E27832"}
                        />) :
                        (<MdOutlineStarBorder
                            key={index}
                            onClick={() => setRatingValue(index)}
                            as={FaStar}
                            fontSize={"42px"}
                            color={"#E27832"}
                        />)
                ))}
        </HStack>
    );
};
