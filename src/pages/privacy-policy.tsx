import { Box } from '@chakra-ui/react'
import {
  Spacer,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Container,
  SimpleGrid,
  UnorderedList,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption
} from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import { Section1 } from '../components/howToUse/section1'
import HeadingAndText from '../components/headingAndText'
import { isMobile } from 'react-device-detect'
import fav from "../assets/imgs/favicon.ico"

const PrivacyPolicy = () => {
  return (
    <Box style={{overflowX:"hidden"}}>
      <Head>
        {/* <title>Good Deeds | PrivacyPolicy Good Deeds</title> */}
        <title>Good Deeds | An Online Marketplace of Opportunities</title>
        <link rel="icon" href={fav.src} />
        <meta name="title" content="A marketplace of opportunity" />
        <meta name="description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
        <meta name="keywords" content="Marketplace, Goodddeds, Canada, Toronto, Ontario, Community" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />

        <meta property="og:title" content="A marketplace of opportunity" />
        <meta property="og:description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
        <meta property="og:image" content="/gd-favicon.ico" />
        {/* <meta property="og:url" content="" /> */}
        <meta property="og:site_name" content="Good Deeds" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=UA-230154537-1`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-230154537-1', {
                        page_path: window.location.pathname,
                        });
                    `,
          }}
        />
      </Head>
      <Navbar />
        
        <h1 className="privacy-heading">Privacy <span style={{color:"#E27832"}}>Policy</span></h1>
      <div className=" privacy-policy-content">
      <Container
        as={SimpleGrid}
        maxW="5xl"
        columns={{ base: 1 }}
        spacing={{ base: 8, lg: 6 }}
        // py={{ base: 10, sm: 10, lg: 12 }}
        // mb={{ lg: 4 }}
        mt={20}
        mb={20}
      >
        <Box >
          <Text className="mb-4">
          This privacy policy (our "Privacy Policy") sets out the information gathering and dissemination practices of Good Deeds LLC. and/or its affiliates and subsidiaries (references to, "GOOD DEEDS ", "we", "us", or "our" are references to Good Deeds LLC.) in the use of our website (our "Website") and/or or mobile application (together the “Platform”) , including the trade listing service and collection and use of Good Deeds credits (collectively with the Platform, the "Services"). By using our Services, you are consenting to our Privacy Policy and the collection, use and disclosure of your personal information by GOOD DEEDS as outlined herein. If our Privacy Policy is not acceptable to you, please do not submit any of your personal information.
          </Text>
          <Text className="mb-4">
          We may update the Privacy Policy from time to time and you are responsible for periodically reviewing the most current version of the Privacy Policy on our Website. Your continued use of our Services or submission of information will be deemed your conclusive acceptance of our updated Privacy Policy.
          </Text>
          <Text>
          In our Privacy Policy, the phrase "Service Providers" includes, but is not limited to, any licensors, suppliers, information providers or other third parties that provide, from time to time, any data, information, content, application, tool or service for purposes of the Services.
          </Text>
        </Box>
        <Accordion allowToggle allowMultiple>
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}} className="border-top-0">
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                  width={"fit-content"}
                  
                >
                  Collecting, Using and Disclosing Information
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px={0} pb={4}>
              <br></br>
              
              <Text>
              Our Privacy Policy describes our policies regarding the collection, use and disclosure of the personal information that we (or our Service Providers on our behalf) collect about you through our Services such as your name, address, phone number, e-mail address as well as your GOOD DEEDS transaction history. We may collect this information when you subscribe to, or sign up for, certain services, tools or features that we provide, when you fill out forms made available through our Services, when you e-mail us with general inquiries or with your comments or suggestions, or otherwise in connection with your use of our Services. We will limit the personal information we collect to what we need for the purposes for which it was collected and will use such personal information for such purposes. If we wish to use your personal information for any other purpose, we will obtain your consent before using the information.
              </Text>
              <br></br>
              <AccordionItem py="5px">
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="20px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="black"
                >
                  WHAT TYPES OF INFORMATION DOES GOOD DEEDS GATHER ABOUT ITS USERS?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0} textAlign={'justify'}>
              <br></br>
              <Text>
              We receive, store and process information that you make available to us when accessing or using our Platform and Services. In particular:
              </Text>
              <br></br>
              <Text>
              We receive, store and process information that you make available to us when accessing or using our Platform and Services. In particular:
              </Text>
              <br></br>
              <Text>
                When you register or update the details of your user account, or when you supply ID verification information, GOOD DEEDS collects your name, username, email address, and, if you opt-in to location services, your location. This personal information is used to administer your account, provide you the Services and contact you, including sending you notifications about the Services.
              </Text>
              <br></br>
              <Text>
              When you sign up for a GOOD DEEDS account in order to earn and use Good Deeds credits, we will also collect your phone number to use for second-factor authentication.
              </Text>
              <br></br>
              <Text>
              When you access or use the Platform, such as to search for or post, give or receive goods or services, post comments or reviews, or communicate with other users, GOOD DEEDS will keep track of your transactions, posts, comments and likes, ratings and reviews, and transaction history so that you have a record of your activity on the Services.
              </Text>
              <br></br>

              <Text>
              If you use the chat function of the Services, GOOD DEEDS keeps a record of your chat history.
              </Text>
              <br></br>
              <Text>
              If you link your account on a third party site (e.g. Facebook) to your GOOD DEEDS account GOOD DEEDS will obtain the Personal Information that you have provided to the third party site, to the extent allowed by your settings with the third party site and authorized by you; and
              </Text>
              <br></br>
              <Text>
              GOOD DEEDS also keeps track of your usage patterns, for example that pages that you visit, for the analytics purposes so that GOOD DEEDS can monitor and improve the Services.
              </Text>
              <br></br>
              <Text>
              If you use Good Deeds credits, GOOD DEEDS will keep track of the amount of the transaction, the date of the transaction, as well as the party with which you made the transaction in order to facilitate the transfer of the Good Deeds credits.
              </Text>
          
            </AccordionPanel>
          </AccordionItem>
             

            </AccordionPanel>
          </AccordionItem>

          
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Storing of Information and Restricting Access
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0} >
              <br></br>
              <Text>
              We may store your personal information (in encrypted form where we believe it to be highly sensitive) in electronic databases or e-mail boxes hosted by us or our Service Providers, for periods of time and with safeguards that we believe are reasonable depending on the nature and sensitivity of the information. Access to the information is restricted in accordance with our security protocols.
              </Text>
              <br></br>
              <Text>
              GOOD DEEDS stores its Services data, including personal information, on servers located in the United States where it is subject to U.S. law and may be made available to U.S. government authorities under court order or other lawful access regimes. By using the Services, you consent to your personal information being stored and processed in the United States.
              </Text>
              <br></br>
              <Text>
              Certain features on our Website are password-protected to prevent unauthorized access. You are responsible for the confidentiality and use of such passwords.
              </Text>
              <br></br>

              <Text>
              Due to the nature of Internet communications and evolving technologies, we cannot provide assurance that the personal information we collect will remain free from loss, interception, misuse or alteration by third parties and we and our Service Providers shall have no liability for any loss, interception, misuse or alteration.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}} className="ps-md-0">
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Automatic Collection of Information
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              In some cases, we may collect information about you that may or may not be personally identifiable. Examples of this type of information include your Internet protocol (IP) address, the type of Internet browser you are using, the type of computer operating system you are using, and the advertisement or domain name of the website from which you linked to our Services. The collection, use, disclosure and storage of such information will be in accordance with our Privacy Policy, including for the purpose of optimizing user experience of our Services.
              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Mobile Data
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0} >
              <br></br>
              <Text>
              When you use certain features of the Platform, in particular our mobile applications we may receive, store and process different types of information about your location, including general information (e.g., IP address, zip/postal code) and more specific information (e.g., GPS-based functionality on mobile devices used to access the Platform or specific features of the platform). If you access the Platform through a mobile device and you do not want your device to provide us with location-tracking information, you can disable the GPS or other location-tracking functions on your device, provided your device allows you to do this. See your device manufacturer's instructions for further details.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Log Data
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              We may also receive, store and process Log Data, which is information that is automatically recorded by our servers whenever you access or use the Platform, regardless of whether you are registered with GOOD DEEDS or logged in to your GOOD DEEDS account, such as your IP Address, the date and time you access or use the Platform, the hardware and software you are using, referring and exit pages and URLs, the number of clicks, pages viewed and the order of those pages, and the amount of time spent on particular pages.
              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Cookies
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              Some pages on our Website use a technology called "cookies". A cookie is a token that a server gives to your browser when you access a website. Cookies are capable of storing many types of data. Cookies may be placed by us or a third party. Cookies help provide additional functionality to our Website or help provide and analyze our Website traffic and usage information. For instance, our server may set a cookie that keeps you from having to enter a password more than once during a visit to our Website. In all cases in which cookies are used, we will not collect personally-identifiable information except with your permission. With most Internet browsers, you can erase cookies from your computer hard drive, block all cookies, or receive a warning before a cookie is stored. Please refer to your browser instructions or help screen to learn more about these functions.
              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                 Third-party social plugins
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              Our Platform may use social plugins which are provided and operated by third-party companies, such as Facebook or Linkedin’s Login / Share with Instagram, Twitter, Snapchat etc..
              </Text>
              <br></br>
              <Text>
              As a result of this, you may send to the third-party company the information that you are viewing on a certain part of our Platform. If you are not logged into your account with the third-party company, then the third party may not know your identity. If you are logged into your account with the third-party company, then the third party may be able to link information about your visit to our Platform to your account with them. Similarly, your interactions with the social plugin may be recorded by the third party.
              </Text>
              <br></br>
              <Text>
              Please refer to the third party's privacy policy to find out more about its data practices, such as what data is collected about you and how the third party uses such data.
              </Text>
              <br></br>
              
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                 Meetups
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              The Platform may allow registered account holders to organize, search for or participate in offline events ("Meetups") in selected cities.              </Text>
              <br></br>
              <Text>
              If you organize a Meetup or indicate that you will attend one, this information, together with some of your public information (such as your profile picture and public profile page) and any messages that you post about that Meetup, will be visible to users who browse the event. However, GOOD DEEDS will never disclose where you are staying to another meetup user.              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Releasing Information
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              We may provide your personal information to other persons but only if:
              </Text>
              <br></br>
              <Text>
              we have your consent;
              </Text>
              <br></br>
              <Text>
              we provide the information to Service Providers who assist us in serving you and who have agreed to appropriate contractual provisions regarding the protection of personal information in accordance with applicable law; or
              </Text>
              <br></br>
              <Text>
              we are required or otherwise permitted to do so by law, regulation or court order.
              </Text>
              <br></br>
              <Text>
              We may send your personal information outside of the country for the purposes set out herein, including for process and storage by Service Providers in connection with such purposes, and you should note that while such information is out of the country, it is subject to the laws of the country in which it is held, and may be subject to disclosure to the governments, courts or law enforcement or regulatory agencies of such other country, pursuant to the laws of such country.
              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Business Transfers by GOOD DEEDS
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              If GOOD DEEDS undertakes or is involved in any merger, acquisition, reorganization, sale of assets or bankruptcy or insolvency event, then we may sell, transfer or share some or all of our assets, including your Personal Information. In this event, we will notify you before your Personal Information is transferred and becomes subject to a different privacy policy.              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  How to change or delete your information, or cancel your GOOD DEEDS account?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              You may review, update, correct or delete the Personal Information in your GOOD DEEDS account. If you would like to correct your information or cancel your GOOD DEEDS account entirely, you can do so by contacting us at info@my-good-deeds.com. Please also note that any reviews, forum postings and similar materials posted by you may continue to be publicly available on the Platform in association with your first name, even after your GOOD DEEDS account is cancelled.              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Securing your personal information
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              We are continuously implementing and updating administrative, technical, and physical security measures to help protect your Personal Information against unauthorized access, destruction or alteration. However, no method of transmission over the Internet, and no method of storing electronic information, can be 100% secure. So, we cannot guarantee the absolute security of your transmissions to us and of your Personal Information that we store.              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pt="5px" pb={"22px"} style={{borderColor:"black"}}>
            <h2>
              <AccordionButton className="ps-md-0">
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="700"
                  fontSize="24px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Respecting and Responding to Your Privacy Concerns
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              You have the option to refuse or withdraw consent to the collection, use and disclosure of your personal information, and we will respect your choices. If you wish to exercise this option or if you have any questions or enquiries with respect to our privacy policies or procedures, please send a written request to: info@my-good-deeds.com. We will investigate and respond to your concerns about any aspect of our handling of your information. Your opinion matters to us! If you'd like to provide feedback to us about this Privacy Policy, please email us at info@my-good-deeds.com              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
              <Text className="fw-bold">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ OUR PRIVACY POLICY, UNDERSTAND IT AND AGREE TO ALL OF THE TERMS AND CONDITIONS IN OUR PRIVACY POLICY.
              </Text>
      </Container>
      </div>

      {/* <div className="d-md-none">
      <p className="privacy-policy mt-5 mb-5">
    <span className="privacy">Privacy</span> <span className="policy">Policy</span>
</p>
<div className="text-center">
<p className="p-privacy mb-5">This privacy policy (our "Privacy Policy") sets out the information gathering and dissemination practices of Good Deeds LLC. and/or its affiliates and subsidiaries (references to, "GOOD DEEDS ", "we", "us", or "our" are references to Good Deeds Canadian Inc.) in the use of our website (our "Website") and/or or mobile application (together the “Platform”) , including the trade listing service and collection and use of Good Deeds deed dollars (collectively with the Platform, the "Services"). By using our Services, you are consenting to our Privacy Policy and the collection, use and disclosure of your personal information by GOOD DEEDS as outlined herein. If our Privacy Policy is not acceptable to you, please do not submit any of your personal information.

<span className="d-block mt-5">We may update the Privacy Policy from time to time and you are responsible for periodically reviewing the most current version of the Privacy Policy on our Website. Your continued use of our Services or submission of information will be deemed your conclusive acceptance of our updated Privacy Policy.</span>
<span className="d-block mt-5">
In our Privacy Policy, the phrase "Service Providers" includes, but is not limited to, any licensors, suppliers, information providers or other third parties that provide, from time to time, any data, information, content, application, tool or service for purposes of the Services.
</span>
</p>
</div>
      </div> */}

      <Footer />
    </Box>
  )
}

export default PrivacyPolicy
