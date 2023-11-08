import {
  Box,
  HStack,
  Img,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import * as React from "react";
import { Rating } from "./Rating";
import { Product } from "../utils/_Data";
import { baseImgUrl } from './Helper/index'

interface Props {
  product: any;
  rootProps?: StackProps;
}

export const TestimonialCard = (props: Props) => {
  const { product, rootProps } = props;
  // console.log("jjjjjjjP", product);
  const { listing_title, buyer_review, buyer_rating, full_name, avatar, user_id, username } = product;
  return (
    <Stack
      spacing={useBreakpointValue({ base: "4", md: "5" })}
      {...rootProps}
      backgroundColor={"grey.200"}
      borderRadius={6}
      className="testimonials-wrap"
      style={{ height: '100%', justifyContent: 'space-between' }}
    >
      <Box position="relative">
        <Text
          fontSize="md"
          fontWeight="medium"
          color={useColorModeValue("main.1000", "gray.400")}
          p={5}
        >
          {listing_title}
        </Text>
        <HStack ml={5}>
          <Rating defaultValue={buyer_rating} size="sm" />
        </HStack>
        <Text
          fontSize="sm"
          fontWeight="normal"
          color={useColorModeValue("main.1000", "gray.400")}
          p={5}
          pb={0}
          width={320}
          fontStyle="italic"
        >
          {buyer_review}
        </Text>
      </Box>
      <HStack spacing="4" p={5} pt={0}>
        <Link href={`/profile/${username}`}>
          <Img
            border=" 4px solid #E27832"
            w="12"
            h="12"
            alt="Kunle Panther"
            rounded="full"
            objectFit="cover"
            src={avatar
              ? `${avatar}`
              : 'https://images.unsplash.com/photo-1547037579-f0fc020ac3be?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8YWZyaWNhJTIwbWFuJTIwc21pbGluZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
            }
          />
        </Link>
        <Box>
          <Link href={`/profile/${username}`}>
            <Text as="cite" fontStyle="normal" fontWeight="medium" fontSize="sm">
              {username}
            </Text>
          </Link>
        </Box>
      </HStack>
    </Stack>
  );
};
