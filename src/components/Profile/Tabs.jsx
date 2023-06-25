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
  import { Rating } from "../../components/Rating";
  import React, { useState, useEffect } from "react";
  import { ProductSingleCard } from "../../components/ProductSingleCard";
  import { ProductGrid } from "../ProductGrid";
  import moment from 'moment';
  import { userId } from '../../components/Helper/index';
  import { isMobile } from "react-device-detect";


  export const MyTabs = (props) => {

    const { listingData, transactionData } = props;
    const [transactionList, setTransactionList] = useState([]);

    useEffect(() => {
      let tmp = transactionData;
      tmp.sort((a, b) => a.id < b.id ? 1 : -1);
      let allData = tmp.length > 0 && tmp.map((item) => {
        let printCredit = `+${item.credits}`;
        let showRating = false;
        if (item.transection_type === 'sale') {
          showRating = true;
          if (userId === item.received_by.id) {
            printCredit = `+${item.credits}`;
          } else {
            printCredit = `-${item.credits}`;
          }
        }

        if (userId !== item.received_by.id && item.status === "On Hold" || item.status === "Completed") {
          return (
            <>
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <div style={{ width: "40%" }}>
                  <h2 className="font-bold">{item.transection_type === "referral" ? "Referral" : item.transection_type === "signup" ? "Sign Up" : item.listing.title}</h2>
                  {showRating &&
                    <div className="py-2">
                      <Rating />
                    </div>
                  }
                  <p className="text-sm">{item.received_by.full_name}</p>
                  <p className="text-sm text-gray-400">{moment(item.created_at).fromNow()}</p>
                </div>
                <div>
                  <Text fontSize={30} color="primary.300" fontWeight={600}>
                    {printCredit}
                  </Text>
                  <p className="text-sm text-color-yellow  text-right">
                  deed dollars
                  </p>
                </div>
              </div>
              <Divider my="5" borderColor="grey.300" />
            </>
          )
        }

        if (userId === item.received_by.id && item.status === "Completed") {
            return (
              <>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div style={{ width: "40%" }}>
                    <h2 className="font-bold">{item.transection_type === "referral" ? "Referral" : item.transection_type === "signup" ? "Sign Up" : item.listing.title}</h2>
                    {showRating &&
                      <div className="py-2">
                        <Rating />
                      </div>
                    }
                    <p className="text-sm">{item.received_by.full_name}</p>
                    <p className="text-sm text-gray-400">{moment(item.created_at).fromNow()}</p>
                  </div>
                  <div>
                    <Text fontSize={30} color="primary.300" fontWeight={600}>
                      {printCredit}
                    </Text>
                    <p className="text-sm text-color-yellow  text-right">
                    deed dollars
                    </p>
                  </div>
                </div>
                <Divider my="5" borderColor="grey.300" />
              </>
            )
          }

      });
      setTransactionList(allData)
    }, [transactionData])
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
                  <Text zIndex="100">Active Listing</Text>
                </Tab>
                <Tab
                  _focus={{ outline: "none" }}
                  _selected={{ color: "orange.400" }}
                  borderRadius="30px"
                  px="8"
                >
                  <Text zIndex="100">Transactions</Text>
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
                      <ProductSingleCard isImageEdit={true} isEdit={true} key={product.id} product={product} />
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
              <TabPanel minH={"40%"}>
                <Center>
                  <Box w={isMobile ? "100%" : "60%"}>
                    {transactionList}
                  </Box>
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    );
  };
