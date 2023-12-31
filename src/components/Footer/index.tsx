import {
  Box,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import * as React from "react";
import Link from 'next/link';
import {isMobile} from 'react-device-detect';

import Image from "next/image";
import { footerLinks, links, socialLinks } from "./FooterData";
import logo from "../../assets/imgs/footer-logo.png";
import { SocialButton } from "./SocialButton";
export const Footer = () =>  (
 <Box as="footer" bg="secondary.100" color="white" pb="30px" pt="20px">
    <Box maxW="8xl" px="8" mx="auto">
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        pb="7"
        align="flex-start"
        id="top"
      >
        <Box  
          mb="0"
          display="flex" 
          flexDirection={{base: "row", sm: "column"}}
          alignItems={{ base: "center", sm: "start"}}
        >
          <Box ml={{base: "0em", sm: "3.5em"}}>
            <Image src={logo} alt="GoodDeeds" width={68} height={120} />
          </Box>
          <Text 
            fontSize={{base: "10px", sm: "sm"}} 
            fontWeight="600" color={"#E27832"} 
            mb={{base: "20px", sm: "0"}} 
            ms={{base: "30px", sm: "0"}}
          >
            {" "}
            Do Good. Feel Better. Get Rewarded.
          </Text>
        </Box>
        <SimpleGrid
          w="full"
          maxW={{ base: "unset", lg: "2xl" }}
          columns={{ base: 1, lg: 3, sm: 1 }}
          spacing={{ base: "4", md: "2" }}
          fontSize="10px"
          fontWeight="600"
        >
          {links.map((group, idx) => (
            <Box key={idx}>
              <Text fontWeight="medium" mb="2" mt="4" textAlign="left" textTransform="uppercase">

                {/* <Link href={group.href}> */}
                  {group.title}
                {/* </Link> */}
              </Text>
              <Stack as="ul" listStyleType="none" textAlign="left">
                {group.links.map((link, idx) => (
                  <Box as="li" key={idx}>
                    <Link href={link.href}>
                      <Box
                        as="a"
                        href={link.href}
                        _hover={{ textDecor: "underline" }}
                        fontSize="14px"
                        fontWeight="600"
                      >
                        {link.label}
                        {link.badge && (
                          <Box as="span" marginStart="2">
                            {link.badge}
                          </Box>
                        )}
                      </Box>
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
        <HStack spacing="2" mt="8" as="ul">
          {socialLinks.map((link, idx) => (
            <SocialButton key={idx} href={link.href}>
              <Box srOnly>{link.label}</Box>
              {link.icon}
            </SocialButton>
          ))}
        </HStack>
      </Flex>
      <Divider my={{base: "1", sm: "10"}} borderColor="grey.100" />
      <Flex
        direction="row"
        align={{ base: "flex-start", lg: "center" }}
        justify="space-between"
        fontSize="sm"
      >
        <Wrap
          id="bottom"
          spacing={{ base: "4", lg: "8" }}
          mt={{ base: "4", lg: "0" }}
        >
          <WrapItem>
            <Box whiteSpace="nowrap" fontSize={{base: "10px", sm: "14px"}} fontWeight="400">&copy; 2022 Good Deeds</Box>
          </WrapItem>
        </Wrap>
        <Wrap
          id="bottom"
          spacing={{ base: "4", lg: "8" }}
          mt={{ base: "4", lg: "0" }}
        >
          {footerLinks.map((link, idx) => (
            <WrapItem key={idx} width={{base: "100%", sm: "auto"}}>
              <Link href={link.href}>
                <Box cursor="pointer" textAlign="right" width="100%" fontSize={{base: "10px", sm: "14px"}} fontWeight="400">
                  {link.label}
                </Box>
              </Link>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Box>
  </Box>
);
