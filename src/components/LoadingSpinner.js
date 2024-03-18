import React from 'react';
import {
    Center,
    Spinner,
  } from "@chakra-ui/react";
const LoadingSpinner = () => {
    return (
        <Center h={"300px"}>
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="orange.200"
                color="orange.500"
                size="xl"
            />
        </Center>
    );
};

export default LoadingSpinner;
