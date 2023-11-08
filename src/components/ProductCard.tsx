import {
  AspectRatio,
  Box,
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FavouriteButton } from "./FavouriteButton";
import NoImage from '../../src/assets/imgs/no-image.png'
import { baseImgUrl } from '../../src/components/Helper/index'

interface Props {
  product: any;
  rootProps?: StackProps;
}

export const ProductCard = (props: Props) => {
  const { product, rootProps } = props;
  const { title, media, credit_amount } = product;
  return (
    <Stack spacing={useBreakpointValue({ base: "4", md: "5" })} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={
              media.length > 0
                ? `${media[0].path}/${media[0].image}`
                : NoImage.src
            }
            alt={title}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: "md", md: "xl" })}
          />
        </AspectRatio>
        <FavouriteButton
          position="absolute"
          top="2"
          right="2"
          aria-label={`Add ${title} to your favourites`}
        />
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            fontSize={{base: "14px", sm: "md"}}
          >
            {title}
          </Text>
          <Text fontWeight="bold" fontSize={{base: "14px", sm: "md"}}> {credit_amount} deed dollars</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
