import { Center, Spinner } from "@chakra-ui/react";
import * as React from "react";

export const Loader = (props) => (
    <Center h={props.h || "500px"} >
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='orange.200'
            color='orange.500'
            size='xl'
        />
    </Center>
);
