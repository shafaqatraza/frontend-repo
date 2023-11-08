import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import * as React from "react";

interface CardHeaderProps extends FlexProps {
  title: string;
}

export const CardHeader = (props: CardHeaderProps) => {
  const { title, ...flexProps } = props;
  return (
    <Flex justifyContent="space-between" alignItems="center" {...flexProps}>
      <Heading
        size="md"
        fontWeight="extrabold"
        letterSpacing="tight"
        marginEnd="6"
        color="grey.100"
      >
        {title}
      </Heading>
    </Flex>
  );
};
