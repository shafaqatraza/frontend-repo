import {
  Box,
  Flex,
  Divider,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Center,
  Stack
} from "@chakra-ui/react";
import { Rating } from "../Rating";
import React, { useState, useEffect } from "react";
import { PublicProductSingleCard } from "../PublicProductSingleCard";
import { ProductGrid } from "../ProductGrid";
import moment from 'moment';
import { userId } from '../Helper/index';
import { isMobile } from "react-device-detect";


export const PublicProfileTabs = (props) => {

  const { listingData } = props;

  return (
    <Box mt="10">
      <Box minH={"400px"}>
        <Tabs>
          <Flex justify="center">
            <TabList
              bg="gray.200"
              color="gray.400"
              borderRadius="30px"
              borderColor="#d3d3d3"
              borderWidth="1px"
              overflow="hidden"
              position="relative"
            >

              <Tab
                _focus={{ outline: "none" }}
                _selected={{ color: "orange.400" }}
                borderRadius="30px"
                px="8"
              >
                <Text zIndex="100">Active Listing </Text>
              </Tab>


              <TabIndicator
                bg="white"
                h="100%"
                borderRadius="30px"
                position="absolute"
                zIndex="10"
              />
            </TabList>
          </Flex>
          <TabPanels>

            <TabPanel>
              <Box
                maxW="7xl"
                mx="auto"
                minH={"40%"}
                px={{ base: "4", md: "8", lg: "12" }}
                py={{ base: "6", md: "8", lg: "12" }}
              >
                <ProductGrid>
                  {listingData.length > 0 && listingData.map((product, index) => (
                    <PublicProductSingleCard isImageEdit={true} isEdit={true} key={product.id} product={product} />
                  )
                  )}
                  {listingData.length === 0 &&
                    <Center h="150px" >
                      <Stack spacing={2} textAlign={"center"}>
                        <Text fontWeight={500} fontSize={18}>No Results Found</Text>
                      </Stack>
                    </Center>}
                </ProductGrid>
              </Box>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
