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
import { isMobile } from 'react-device-detect';

import Image from "next/image";
import { footerLinks, links, socialLinks } from "./FooterData";
import logo from "../../assets/imgs/footer-logo.png";
import { SocialButton } from "./SocialButton";
import footerfacebook from "../../assets/imgs/footerfacebook.png";
import footertwiter from "../../assets/imgs/footertwitter.png";
import footerlinkedIn from "../../assets/imgs/footerlinkedin.png";
import footeryoutube from "../../assets/imgs/footeryoutube.png";
import footerinsta from "../../assets/imgs/footerinstagram.png";
import footertiktok from "../../assets/imgs/footerTiktok.png";


export const Footer = () => (
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
          flexDirection={{ base: "row", sm: "column" }}
          alignItems={{ base: "center", sm: "start" }}
        >
          <Box ml={{ base: "0em", xl: "3.5em", sm:"1em" }}>
            <Image src={logo} alt="GoodDeeds" width={68} height={120} />
          </Box>
          <Text
            fontSize={{ base: "10px", sm: "10px" }}
            fontWeight="600" color={"#E27832"}
            mb={{ base: "20px", sm: "0" }}
            ms={{ base: "30px", sm: "0" }}
          >
            {" "}
            Where Charity Meets Community
          </Text>
        </Box>
        <SimpleGrid
          w="full"
          maxW={{ base: "unset", lg: "3xl" }}
          columns={{ base: 1, lg: 4, sm: 1 }}
          spacing={{ base: "4", md: "12" }}
          fontSize="10px"
          fontWeight="600"
          className="ms-md-5"
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
        <div className=" me-4 mt-4 d-flex">
          <a href="https://www.facebook.com/gooddeeds.ca" target="_blank" className="me-3"><img src={footerfacebook.src} width='30px'  alt="" /></a>
          {/* <a href="https://twitter.com/GoodDee20643366" target="_blank" className="me-3"><img src={footertwiter.src} width='30px'  alt="" /></a> */}
          <a href="https://www.linkedin.com/company/good-deeds-llc-1/" target="_blank" className="me-3"><img src={footerlinkedIn.src} width='30px'  alt="" /></a>
          {/* <a href="#" className="me-3"><img src={footeryoutube.src} width='30px'  alt="" /></a> */}
          <a href="https://www.tiktok.com/@gooddeedsllc" target="_blank" className="me-3"><img src={footertiktok.src} width='30px'  alt="" /></a>
          <a href="https://www.instagram.com/gooddeedsllc/" target="_blank"><img src={footerinsta.src} width='30px' alt="" /></a>
        </div>
        {/* <HStack spacing="2" mt="8" as="ul">
          {socialLinks.map((link, idx) => (
            <SocialButton key={idx} href={link.href}>
              <Box srOnly>{link.label}</Box>
              {link.icon}
            </SocialButton>
          ))}
        </HStack> */}
      </Flex>
      <Divider mb={{ base: "1", sm: "6" }} borderColor="grey.100" />
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
            <Box whiteSpace="nowrap" fontSize={{ base: "10px", sm: "10px" }} fontWeight="400">&copy; 2023 Good Deeds</Box>
          </WrapItem>
        </Wrap>
        <Wrap
          id="bottom"
          spacing={{ base: "4", lg: "8" }}
          mt={{ base: "4", lg: "0" }}
        >
          {footerLinks.map((link, idx) => (
            <WrapItem key={idx} width={{ base: "100%", sm: "auto" }}>
              <Link href={link.href}>
                <Box cursor="pointer" textAlign="right" width="100%" fontSize={{ base: "10px", sm: "10px" }} fontWeight="400">
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
