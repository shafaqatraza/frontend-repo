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

const PrivacyPolicy = () => {
  return (
    <Box>
      <Head>
        {/* <title>Good Deeds | PrivacyPolicy Good Deeds</title> */}
        <title>Good Deeds | An Online Marketplace of Opportunities</title>
        <link rel="icon" href="/favicon.ico" />
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
      <div className="d-none d-md-block">

      <Section1 title="Privacy Policy" />
      </div>
      <div className="d-none d-md-block">
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
        <Box textAlign={'justify'}>
          <Text>
            This privacy policy (our "Privacy Policy") sets out the
            information gathering and dissemination practices of Good Deeds
            LLC. and/or its affiliates and subsidiaries (references to, "GOOD
            DEEDS ", "we", "us", or "our" are references to Good Deeds Canadian Inc.)
            in the use of our website (our "Website") and/or or mobile
            application (together the “Platform”) , including the trade
            listing service and collection and use of Good Deeds deed dollars
            (collectively with the Platform, the "Services"). By using our
            Services, you are consenting to our Privacy Policy and the
            collection, use and disclosure of your personal information by
            GOOD DEEDS as outlined herein. If our Privacy Policy is not
            acceptable to you, please do not submit any of your personal
            information.
          </Text>
          <br></br>
          <Text>
            We may update the Privacy Policy from time to time and you are
            responsible for periodically reviewing the most current version of
            the Privacy Policy on our Website. Your continued use of our
            Services or submission of information will be deemed your
            conclusive acceptance of our updated Privacy Policy.{' '}
          </Text>
          <br></br>
          <Text>
            In our Privacy Policy, the phrase "Service Providers" includes,
            but is not limited to, any licensors, suppliers, information
            providers or other third parties that provide, from time to time,
            any data, information, content, application, tool or service for
            purposes of the Services.
          </Text>
        </Box>
        <Accordion allowToggle allowMultiple>
          <AccordionItem py="5px">
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="20px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  PRIVACY POLICY
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} textAlign={'justify'}>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Collecting, Using and Disclosing Information
              </Text>
              <br></br>
              <Text>
                Our Privacy Policy describes our policies regarding the
                collection, use and disclosure of the personal information
                that we (or our Service Providers on our behalf) collect about
                you through our Services such as your name, address, phone
                number, e-mail address as well as your GOOD DEEDS transaction
                history. We may collect this information when you subscribe
                to, or sign up for, certain services, tools or features that
                we provide, when you fill out forms made available through our
                Services, when you e-mail us with general inquiries or with
                your comments or suggestions, or otherwise in connection with
                your use of our Services. We will limit the personal
                information we collect to what we need for the purposes for
                which it was collected and will use such personal information
                for such purposes. If we wish to use your personal information
                for any other purpose, we will obtain your consent before
                using the information.
              </Text>
              <br></br>
              <Text>
                Our Services are licensed, not sold. We grant you a
                non-exclusive, non-transferable, limited licence to install
                our Application, or access our Website, on any single mobile
                device, tablet, or similar technology solely to be used in
                connection with our Services for your private, personal, use.
                Our Services are protected by copyright and other intellectual
                property laws and treaties and are owned by us or our service
                providers. You agree that you will not copy, attempt to
                reverse engineer, modify, translate or disassemble our
                Services in whole or in part. You may not use or export or
                re-export our Services except as permitted under the law of
                the United States and Canada and the laws of the jurisdiction
                in which our Services were obtained. We may automatically
                check and update the version of our Services which you are
                using in order to improve the performance and capabilities of
                our Services.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                WHAT TYPES OF INFORMATION DOES GOOD DEEDS GATHER ABOUT ITS
                USERS?
              </Text>
              <br></br>
              <Text>
                We receive, store and process information that you make
                available to us when accessing or using our Platform and
                Services. In particular:
              </Text>
              <br></br>
              <Text>
                When you register or update the details of your user account,
                or when you supply ID verification information, GOOD DEEDS
                collects your name, username, email address, and, if you
                opt-in to location services, your location. This personal
                information is used to administer your account, provide you
                the Services and contact you, including sending you
                notifications about the Services.
              </Text>
              <br></br>

              <Text>
                When you sign up for a GOOD DEEDS account in order to earn and
                use Good Deeds deed dollars, we will also collect your phone number
                to use for second-factor authentication.
              </Text>
              <br></br>
              <Text>
                When you access or use the Platform, such as to search for or
                post, give or receive goods or services, post comments or
                reviews, or communicate with other users, GOOD DEEDS will keep
                track of your transactions, posts, comments and likes, ratings
                and reviews, and transaction history so that you have a record
                of your activity on the Services.
              </Text>
              <br></br>
              <Text>
                If you use the chat function of the Services, GOOD DEEDS keeps
                a record of your chat history.
              </Text>
              <br></br>
              <Text>
                If you link your account on a third party site (e.g. Facebook)
                to your GOOD DEEDS account GOOD DEEDS will obtain the Personal
                Information that you have provided to the third party site, to
                the extent allowed by your settings with the third party site
                and authorized by you; and
              </Text>
              <br></br>
              <Text>
                GOOD DEEDS also keeps track of your usage patterns, for
                example that pages that you visit, for the analytics purposes
                so that GOOD DEEDS can monitor and improve the Services.
              </Text>
              <br></br>
              <Text>
                If you use Good Deeds deed dollars, GOOD DEEDS will keep track of
                the amount of the transaction, the date of the transaction, as
                well as the party with which you made the transaction in order
                to facilitate the transfer of the Good Deeds deed dollars.
              </Text>

              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Storing of Information and Restricting Access
              </Text>
              <br></br>
              <Text>
                We may store your personal information (in encrypted form
                where we believe it to be highly sensitive) in electronic
                databases or e-mail boxes hosted by us or our Service
                Providers, for periods of time and with safeguards that we
                believe are reasonable depending on the nature and sensitivity
                of the information. Access to the information is restricted in
                accordance with our security protocols.
              </Text>
              <br></br>
              <Text>
                GOOD DEEDS stores its Services data, including personal
                information, on servers located in the United States where it
                is subject to Canadian law and may be available to Canadian goverment under court order or other lawful
                access regimes. By using the Services, you consent to your
                personal information being stored and processed in the United
                States.
              </Text>
              <br></br>
              <Text>
                Certain features on our Website are password-protected to
                prevent unauthorized access. You are responsible for the
                confidentiality and use of such passwords.
              </Text>
              <br></br>
              <Text>
                Due to the nature of Internet communications and evolving
                technologies, we cannot provide assurance that the personal
                information we collect will remain free from loss,
                interception, misuse or alteration by third parties and we and
                our Service Providers shall have no liability for any loss,
                interception, misuse or alteration.
              </Text>

              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Automatic Collection of Information
              </Text>
              <br></br>
              <Text>
                In some cases, we may collect information about you that may
                or may not be personally identifiable. Examples of this type
                of information include your Internet protocol (IP) address,
                the type of Internet browser you are using, the type of
                computer operating system you are using, and the advertisement
                or domain name of the website from which you linked to our
                Services. The collection, use, disclosure and storage of such
                information will be in accordance with our Privacy Policy,
                including for the purpose of optimizing user experience of our
                Services.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Mobile Data
              </Text>
              <br></br>

              <Text>
                When you use certain features of the Platform, in particular
                our mobile applications we may receive, store and process
                different types of information about your location, including
                general information (e.g., IP address, zip/postal code) and
                more specific information (e.g., GPS-based functionality on
                mobile devices used to access the Platform or specific
                features of the platform). If you access the Platform through
                a mobile device and you do not want your device to provide us
                with location-tracking information, you can disable the GPS or
                other location-tracking functions on your device, provided
                your device allows you to do this. See your device
                manufacturer's instructions for further details.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Log Data
              </Text>
              <br></br>
              <Text>
                We may also receive, store and process Log Data, which is
                information that is automatically recorded by our servers
                whenever you access or use the Platform, regardless of whether
                you are registered with GOOD DEEDS or logged in to your GOOD
                DEEDS account, such as your IP Address, the date and time you
                access or use the Platform, the hardware and software you are
                using, referring and exit pages and URLs, the number of
                clicks, pages viewed and the order of those pages, and the
                amount of time spent on particular pages.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Cookies
              </Text>
              <br></br>
              <Text>
                Some pages on our Website use a technology called "cookies". A
                cookie is a token that a server gives to your browser when you
                access a website. Cookies are capable of storing many types of
                data. Cookies may be placed by us or a third party. Cookies
                help provide additional functionality to our Website or help
                provide and analyze our Website traffic and usage information.
                For instance, our server may set a cookie that keeps you from
                having to enter a password more than once during a visit to
                our Website. In all cases in which cookies are used, we will
                not collect personally-identifiable information except with
                your permission. With most Internet browsers, you can erase
                cookies from your computer hard drive, block all cookies, or
                receive a warning before a cookie is stored. Please refer to
                your browser instructions or help screen to learn more about
                these functions.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >

              </Text>

              <br></br>
              <Text>
                As a result of this, you may send to the third-party company
                the information that you are viewing on a certain part of our
                Platform. If you are not logged into your account with the
                third-party company, then the third party may not know your
                identity. If you are logged into your account with the
                third-party company, then the third party may be able to link
                information about your visit to our Platform to your account
                with them. Similarly, your interactions with the social plugin
                may be recorded by the third party.
              </Text>
              <br></br>
              <Text>
                Please refer to the third party's privacy policy to find out
                more about its data practices, such as what data is collected
                about you and how the third party uses such data.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Meetups
              </Text>
              <br></br>
              <Text>
                The Platform may allow registered account holders to organize,
                search for or participate in offline events ("Meetups") in
                selected cities.
              </Text>
              <br></br>
              <Text>
                If you organize a Meetup or indicate that you will attend one,
                this information, together with some of your public
                information (such as your profile picture and public profile
                page) and any messages that you post about that Meetup, will
                be visible to users who browse the event. However, GOOD DEEDS
                will never disclose where you are staying to another meetup
                user.
              </Text>

              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Releasing Information
              </Text>
              <br></br>
              <Text>
                We may provide your personal information to other persons but
                only if:
              </Text>
              <br></br>
              <Text>we have your consent;</Text>
              <br></br>
              <Text>
                we provide the information to Service Providers who assist us
                in serving you and who have agreed to appropriate contractual
                provisions regarding the protection of personal information in
                accordance with applicable law; or
              </Text>
              <br></br>
              <Text>
                we are required or otherwise permitted to do so by law,
                regulation or court order.
              </Text>
              <br></br>
              <Text>
                We may send your personal information outside of the country
                for the purposes set out herein, including for process and
                storage by Service Providers in connection with such purposes,
                and you should note that while such information is out of the
                country, it is subject to the laws of the country in which it
                is held, and may be subject to disclosure to the governments,
                courts or law enforcement or regulatory agencies of such other
                country, pursuant to the laws of such country.
              </Text>
              <br></br>

              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Business Transfers by GOOD DEEDS
              </Text>
              <br></br>
              <Text>
                If GOOD DEEDS undertakes or is involved in any merger,
                acquisition, reorganization, sale of assets or bankruptcy or
                insolvency event, then we may sell, transfer or share some or
                all of our assets, including your Personal Information. In
                this event, we will notify you before your Personal
                Information is transferred and becomes subject to a different
                privacy policy.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                How to change or delete your information, or cancel your GOOD
                DEEDS account?
              </Text>
              <br></br>
              <Text>
                You may review, update, correct or delete the Personal
                Information in your GOOD DEEDS account. If you would like to
                correct your information or cancel your GOOD DEEDS account
                entirely, you can do so by contacting us at
                support@gooddeeds.ca. Please also note that any reviews,
                forum postings and similar materials posted by you may
                continue to be publicly available on the Platform in
                association with your first name, even after your GOOD DEEDS
                account is cancelled.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Securing your personal information
              </Text>
              <br></br>
              <Text>
                We are continuously implementing and updating administrative,
                technical, and physical security measures to help protect your
                Personal Information against unauthorized access, destruction
                or alteration. However, no method of transmission over the
                Internet, and no method of storing electronic information, can
                be 100% secure. So, we cannot guarantee the absolute security
                of your transmissions to us and of your Personal Information
                that we store.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Respecting and Responding to Your Privacy Concerns
              </Text>
              <br></br>
              <Text>
                You have the option to refuse or withdraw consent to the
                collection, use and disclosure of your personal information,
                and we will respect your choices. If you wish to exercise this
                option or if you have any questions or enquiries with respect
                to our privacy policies or procedures, please send a written
                request to: support@gooddeeds.ca. We will investigate and
                respond to your concerns about any aspect of our handling of
                your information. Your opinion matters to us! If you'd like to
                provide feedback to us about this Privacy Policy, please email
                us at support@gooddeeds.ca
              </Text>
              <br></br>
              <Text>
                BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ OUR
                PRIVACY POLICY, UNDERSTAND IT AND AGREE TO ALL OF THE TERMS
                AND CONDITIONS IN OUR PRIVACY POLICY.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem py="5px">
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="20px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  SERVICES POLICY
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} textAlign={'justify'}>
              <br></br>
              <Text>
                The sale or offer of services that are illegal or sexual, or
                violate our User Agreement, are not allowed on Good Deeds. To
                ensure Good Deeds remains a safe and lawful marketplace, we
                don't allow the sale or offer of services for personal or
                sexual relationships, advice, friendship on social media, or
                traffic-drivers for websites.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                What is the policy?
              </Text>
              <br></br>
              <Text>The following services are not allowed:</Text>
              <br></br>
              <Text>
                <UnorderedList>
                  <ListItem>
                    Personal relationships, including in-person or online
                    relationships
                  </ListItem>
                  <ListItem>
                    Dating, sexual contact or escort services
                  </ListItem>
                  <ListItem>
                    Offer to become "friends" or "followers" on social media
                    sites
                  </ListItem>
                  <ListItem>
                    such User Content does not consist of or constitute
                    unsolicited or unauthorized advertising, promotional
                    materials, "junk mail," "spam," "chain letters," "pyramid
                    schemes," or any other form of solicitation;
                  </ListItem>
                  <ListItem>Personal advice or coaching</ListItem>
                  <ListItem>Website traffic-driving services</ListItem>
                </UnorderedList>
              </Text>
              <br></br>

              <Text>
                Activity that doesn't follow Good Deeds policy could result in
                a range of actions including for example: administratively
                ending or canceling listings, hiding or demoting all listings
                from search results, lowering user rating, exchanging
                restrictions, and account suspension. All deed dollars exchanged in
                relation to listings or accounts on which we take any action
                will not be refunded or otherwise credited to your account.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem py="5px">
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="20px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  ACCESSIBILITY
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} textAlign={'justify'}>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Introduction
              </Text>
              <br></br>
              <Text>
                Good Deeds Canada Inc. is committed to building a community enabled by
                people and supported by technology that’s open to the broadest
                audience possible. We’re committed to ensuring digital
                accessibility for people with disabilities. We are continually
                improving the user experience for everyone, and applying the
                relevant accessibility standards. By connecting people, we
                strive to unleash the entrepreneurial spirit that resides
                within the community and help people of all abilities realize
                their full potential. “Good Deeds Product and Services”
                includes:
              </Text>
              <br></br>
              <Text>
                <UnorderedList>
                  <ListItem>Gooddeeds.ca</ListItem>
                </UnorderedList>
              </Text>
              <br></br>

              <Text>
                Activity that doesn't follow Good Deeds policy could result in
                a range of actions including for example: administratively
                ending or canceling listings, hiding or demoting all listings
                from search results, lowering user rating, exchanging
                restrictions, and account suspension. All deed dollars exchanged in
                relation to listings or accounts on which we take any action
                will not be refunded or otherwise credited to your account.
              </Text>

              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Diversity & Inclusion
              </Text>
              <br></br>
              <Text>
                Our pledge to provide digital accessibility for people with
                disabilities is one of the ways we demonstrate our commitment
                to Diversity & Inclusion.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Feedback
              </Text>
              <br></br>
              <Text>
                We welcome your feedback on the accessibility of eBay
                Products. Please let us know if you encounter accessibility
                barriers while using any eBay Product:
              </Text>
              <br></br>
              <Text>
                <UnorderedList>
                  <ListItem>E-mail: accessbility@gooddeeds.ca </ListItem>
                </UnorderedList>
              </Text>

              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Technical Specifications
              </Text>
              <br></br>
              <Text>
                Accessibility of Good Deeds products and services relies on
                the following technologies to work with the particular
                combination of web browser and any assistive technologies or
                plugins installed on your computer:
              </Text>
              <br></br>
              <Text>
                <UnorderedList>
                  <ListItem>HTML</ListItem>
                  <ListItem>WAI-ARIA</ListItem>
                  <ListItem>CSS</ListItem>
                  <ListItem>JavaScript</ListItem>
                </UnorderedList>
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Conformance Standard
              </Text>
              <br></br>
              <Text>
                The Web Content Accessibility Guidelines (WCAG) define
                requirements for designers and developers to improve
                accessibility for people with disabilities. It defines three
                levels of conformance: Level A, Level AA, and Level AAA.
              </Text>
              <br></br>
              <Text>
                While we strive for WCAG 2.0 Level AA conformance on all eBay
                Products, we follow some Level AAA Success Criteria, for
                example:
              </Text>
              <br></br>
              <Text>
                <UnorderedList>
                  <ListItem>
                    Providing visually hidden text for ambiguous links and
                    buttons
                  </ListItem>
                </UnorderedList>
              </Text>
              <br></br>
              <Text>
                Additionally, we follow some WCAG 2.1 Success Criteria, for
                example:
              </Text>
              <br></br>
              <Text>
                <UnorderedList>
                  <ListItem>
                    Providing sufficient contrast for non-text content
                  </ListItem>
                  <ListItem>Supporting multiple device orientations</ListItem>
                  <ListItem>Ensuring sufficient touch target sizes</ListItem>
                </UnorderedList>
              </Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem py="5px">
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="20px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  DIVERSITY AND INCLUSION
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} textAlign={'justify'}>
              <br></br>
              <Text>
                At Good Deeds a diverse, inclusive, and equitable workplace is
                one where all employees and volunteers, whatever their gender,
                race, ethnicity, national origin, age, sexual orientation or
                identity, education or disability, feels valued and respected.
                We are committed to a non-discriminatory approach and provide
                equal opportunity for employment and advancement in all of our
                departments, programs, and worksites. We respect and value
                diverse life experiences and heritages and ensure that all
                voices are valued and heard.
              </Text>
              <br></br>
              <Text>The following services are not allowed:</Text>
              <br></br>
              <Text>
                We’re committed to modeling diversity and inclusion for the
                entire online marketplace community, and to maintaining an
                inclusive environment with equitable treatment for all.
              </Text>
              <br></br>
              <Text>
                To provide informed, authentic leadership for cultural equity,
                Good Deeds strives to:
              </Text>
              <br></br>
              <Text>
                <UnorderedList>
                  <ListItem>
                    {' '}
                    See diversity, inclusion, and equity as connected to our
                    mission and critical to ensure the well-being of our staff
                    and the communities we serve.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Acknowledge and dismantle any inequities within our
                    policies, systems, programs, and services, and continually
                    update and report organization progress.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Explore potential underlying, unquestioned assumptions
                    that interfere with inclusiveness.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Advocate for and support board-level thinking about how
                    systemic inequities impact our organization’s work, and
                    how best to address that in a way that is consistent with
                    our mission.
                  </ListItem>
                  <ListItem>Personal advice or coaching</ListItem>
                  <ListItem>
                    {' '}
                    Practice and encourage transparent communication in all
                    interactions.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Commit time and resources to expand more diverse
                    leadership within our board, staff, committee, and
                    advisory bodies.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Lead with respect and tolerance. We expect all employees
                    to embrace this notion and to express it in workplace
                    interactions and through everyday practices.
                  </ListItem>
                </UnorderedList>
              </Text>
              <br></br>
              <Text>
                Good Deeds abides by the following action items to help
                promote diversity and inclusion in our workplace:
              </Text>
              <br></br>
              <Text>
                <UnorderedList>
                  <ListItem>
                    {' '}
                    Pursue cultural competency throughout our organization by
                    creating substantive learning opportunities and formal,
                    transparent policies.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Generate and aggregate quantitative and qualitative
                    research related to equity to make incremental, measurable
                    progress toward the visibility of our diversity,
                    inclusion, and equity efforts. Once the content is curated
                    it will be added to our website so others can access.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Improve our cultural leadership pipeline by creating and
                    supporting programs and policies that foster leadership
                    that reflects the diversity of society.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Pool resources and expand offerings for underrepresented
                    constituents by connecting with other arts organizations
                    committed to diversity and inclusion efforts.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Develop and present sessions on diversity, inclusion, and
                    equity to provide information and resources internally,
                    and to members, the community, and the online marketplace
                    industry.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Develop a system for being more intentional and conscious
                    of bias during the hiring, promoting, or evaluating
                    process. Train our hiring team on equitable practices.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Include a salary range with all public job descriptions.
                  </ListItem>
                  <ListItem>
                    {' '}
                    Advocate for public and private-sector policy that
                    promotes diversity, inclusion, and equity. Challenge
                    systems and policies that create inequity, oppression and
                    disparity.
                  </ListItem>
                </UnorderedList>
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem py="5px">
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="20px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  TRUST & SAFETY POLICY
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} textAlign={'justify'}>
              <br></br>
              <Text>
                Good Deeds is committed to creating fantastic and safe
                experiences.{' '}
              </Text>
              <br></br>
              <Accordion allowToggle allowMultiple>
                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      1. INTRODUCTION
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      This Global Privacy Policy (“Privacy Policy”) describes
                      how Good Deeds, Inc. will gather, use, and maintain your
                      Personal Information on the Good Deeds Platform. It will
                      also explain your legal rights with respect to that
                      information.
                    </Text>
                    <br></br>
                    <Text>
                      By using the Good Deeds Platform, you confirm that you
                      have read and understand this Privacy Policy, and our
                      Global Terms of Service (together referred to herein as
                      the “Agreement”). The Agreement governs the use of the
                      Good Deeds Platform. Good Deeds will collect, use, and
                      maintain information consistent with the Agreement.
                    </Text>
                    <br></br>
                    <Text>
                      If you are a California resident or data subject in
                      Europe, please see the “Additional Disclosures for
                      California Residents” and “Additional Disclosures for
                      Data Subjects in the European Economic Area (EEA) and
                      Switzerland” sections, respectively. If you have any
                      questions or wish to exercise your rights and choices,
                      please contact us as set out in the “Contact Us” section
                      below.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      2. GENERAL TERMS
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>In this Privacy Policy:</Text>
                    <br></br>
                    <Text>
                      <UnorderedList>
                        <ListItem>
                          Good Deeds, Inc. may be referred to as "Good Deeds,"
                          “we,” “our,” or “us.”
                        </ListItem>
                        <ListItem>
                          We call a user of the Good Deeds Platform “User,”
                          “Users,” “you,” “your,” or “Client”,” as
                          appropriate.
                        </ListItem>
                        <ListItem>
                          The community platform that we offer at our website
                          (www.gooddeeds.ca){' '}
                        </ListItem>
                        <ListItem>
                          The mobile applications (whether on iOS or Android)
                          are referred to as the “Apps.”
                        </ListItem>
                        <ListItem>
                          Good Deeds’s Sites, Apps and related services,
                          information and communications are collectively
                          referred to as the “Good Deeds Platform.”
                        </ListItem>
                        <ListItem>
                          “Terms of Service” refers to our Global Terms of
                          Service, which can be found here. This Privacy
                          Policy is incorporated into, and considered a part
                          of, the Terms of Service.
                        </ListItem>
                      </UnorderedList>
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      3. INFORMATION COLLECTION
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>A. INFORMATION YOU PROVIDE TO GOOD DEEDS</Text>
                    <Text
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="18px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      A. INFORMATION YOU PROVIDE TO GOOD DEEDS
                    </Text>

                    <br></br>
                    <Text>
                      Good Deeds collects certain personally identifiable
                      information about you, including information that is
                      reasonably capable of being associated with you
                      (“Information”). Examples of Information that Good Deeds
                      collects include but are not limited to:
                    </Text>
                    <br></br>
                    <Text>
                      Contact Information. This may include your first and
                      last name, postal address, telephone number, and email
                      address.
                    </Text>
                    <br></br>
                    <Text>
                      Identity Information. If you are a User, we may collect
                      Personal Information, such as your date of birth and
                      address, national identification number if applicable,
                      together with the result of basic criminal record checks
                      as provided by you, or by our Third Party Agents (as
                      defined below), as applicable and to the extent
                      permitted by law in your jurisdiction, and to validate
                      your identity.
                    </Text>
                    <br></br>
                    <Text>
                      Promotional Information. Certain offerings of the Good
                      Deeds Platform, such as newsletters, surveys, contests,
                      and the like are optional and so you are not required to
                      enter them or to give us your data in connection with
                      them. Where you do consent to take advantage of Good
                      Deeds Platform offerings, we will use your data to (as
                      applicable) send you newsletters and other
                      communications that are tailored based on information we
                      have about you, or to operate and manage the survey,
                      contest or similar offering in connection with our
                      legitimate interest in promoting our business and the
                      Good Deeds Platform. To opt-out of receiving marketing
                      communications from us, please see the Choice/Opt-Out
                      section below.
                    </Text>
                    <br></br>
                    <Text>
                      Content Information. You also may choose to send Good
                      Deeds Personal Information in an email or chat message
                      containing inquiries about the Good Deeds Platform and
                      we use this Information in order to help us respond to
                      your inquiry. We also collect content within any
                      messages you exchange with other Users through the
                      Service (such as through our chat functionality), and we
                      will never use or share such information for marketing
                      purposes.
                    </Text>
                    <br></br>
                    <Text>
                      We require that you furnish your Contact Information
                      when you register an account with us in order to provide
                      services through the Good Deeds Platform. For example,
                      if you are a Client, we collect your first and last
                      name, email address, and your zip or postal code in
                      order to create and administer your Good Deeds account.
                      We also collect additional information in order to
                      facilitate your booking request, such as information
                      about the task you are seeking, the time, date and
                      location of the task. If you are a User, we collect your
                      first and last name, email address, mobile phone number
                      and zip or postal code in order to create and administer
                      your Good Deeds account and facilitate communications
                      between you and your Clients through the Platform. We
                      also collect information about your Services, rates, and
                      skills, as well as Identity Information.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      4. INFORMATION GOOD DEEDS COLLECTS AUTOMATICALLY
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      We automatically collect certain information when you
                      use the Service. The categories of information we
                      automatically collect and have collected, including in
                      the last 12 months, are as follows:
                    </Text>
                    <br></br>
                    <Text>
                      Service Use Data, including data about features you use,
                      pages you visit, emails and advertisements you view,
                      portions of the Good Deeds Platform that you view and
                      interact with, the time of day you browse, and your
                      referring and exiting pages.
                    </Text>
                    <br></br>
                    <Text>
                      Device Data, including data about the type of device or
                      browser you use, your device’s operating system, your
                      internet service provider, your device’s regional and
                      language settings, and device identifiers such as IP
                      address and Ad Id. When you visit and interact with the
                      Good Deeds Platform, Good Deeds may collect certain
                      information automatically through cookies or other
                      technologies, including, but not limited to, the type of
                      computer or mobile device you use, your mobile device’s
                      unique device ID, the IP address of your computer or
                      mobile device, your operating system, the type(s) of
                      internet browser(s) you use, and information about the
                      way you use the Good Deeds Platform (“Device
                      Information”). We may use Device Information to monitor
                      the geographic regions from which Users navigate the
                      Good Deeds Platform, and for security and fraud
                      prevention purposes. Use of any IP-masking technologies
                      or similar technologies (like the TOR network) may
                      render portions of the Good Deeds Platform unavailable
                      and are forbidden on the Good Deeds Platform.
                    </Text>
                    <br></br>
                    <Text>
                      Location Data, including imprecise location data (such
                      as location derived from an IP address or data that
                      indicates a city or postal code level), and, with your
                      consent, precise location data (such as
                      latitude/longitude data). When you visit the Good Deeds
                      Platform via a native mobile application, we use, with
                      your consent when required under applicable law, GPS
                      technology (or other similar technology) to determine
                      your current location in order to determine the city you
                      are located in and display a relevant location map. We
                      will not share your current location obtained in this
                      manner with other Users.
                    </Text>
                    <br></br>
                    <Text>
                      We also use various Tracking Technologies (“Tracking
                      Technologies”) to automatically collect information when
                      you use the Good Deeds Platform, including the
                      following:
                    </Text>
                    <br></br>
                    <Text>
                      Cookies. When you visit websites our Sites, your browser
                      may automatically transmit information to these websites
                      throughout the visit. In a similar way, when you use our
                      mobile applications, we will access and use mobile
                      device IDs to recognize your device. We use “cookies”
                      and equivalent technologies to collect information
                      through our Site and Apps. Cookies are small data files
                      stored on your device that act as a unique tag to
                      identify your browser.
                    </Text>
                    <br></br>
                    <Text>
                      Persistent cookies help with personalizing your
                      experience, remembering your preferences, and supporting
                      security features. Additionally, persistent cookies
                      allow us to bring you advertising both on and off the
                      Platform. Persistent cookies may remain on your device
                      for extended periods of time, and generally may be
                      controlled through your browser settings. We utilize
                      persistent cookies that only Good Deeds can read and
                      use, and access mobile device IDs to:
                    </Text>
                    <br></br>
                    <Text>
                      <UnorderedList>
                        <ListItem>
                          {' '}
                          save your login information for future logins to the
                          Good Deeds Platform;
                        </ListItem>
                        <ListItem>
                          {' '}
                          assist in processing items during checkout;
                        </ListItem>
                        <ListItem> hold session information; and</ListItem>
                        <ListItem> track user preferences.</ListItem>
                        <ListItem>
                          Session cookies make it easier for you to navigate
                          our website and expire when you close your browser.
                          We utilize session ID cookies and similar
                          technologies to:
                        </ListItem>
                        <ListItem>
                          {' '}
                          enable certain features of the Good Deeds Platform;
                        </ListItem>
                        <ListItem>
                          {' '}
                          better understand how you interact with the Sites
                          and the Good Deeds Platform;
                        </ListItem>
                        <ListItem>
                          {' '}
                          monitor usage by our Users and web traffic routing
                          on the Good Deeds Platform;
                        </ListItem>
                        <ListItem>
                          {' '}
                          track the number of entries in Good Deeds
                          promotions, sweepstakes and contests; and
                        </ListItem>
                        <ListItem>
                          {' '}
                          identify visited areas of the Good Deeds Platform.
                        </ListItem>
                      </UnorderedList>
                    </Text>
                    <br></br>
                    <Text>
                      Unlike persistent cookies, session cookies are deleted
                      from your computer when you log off from the Good Deeds
                      Platform and then close your browser.
                    </Text>
                    <br></br>
                    <Text>
                      Exhibit A sets out the different categories of cookies
                      that the Good Deeds Platform uses and why we use them.
                    </Text>
                    <br></br>
                    <Text>
                      We may work with third party advertisers who may also
                      place or read persistent cookies on your browser, and we
                      may use Flash cookies (or local shared objects) to store
                      your preferences or display content based upon what you
                      view on the Sites to personalize your visit.
                    </Text>
                    <br></br>
                    <Text>
                      You can instruct your browser, by changing its options,
                      to stop accepting cookies or to prompt you before
                      accepting a cookie from the websites you visit. If you
                      do not accept cookies, however, you will not be able to
                      use all portions or all functionalities of the Good
                      Deeds Platform.
                      <br></br>
                      <br></br>
                      To change your cookie settings for cookies on the Sites,
                      please click on the following addresses based on the
                      browser you use: Internet Explorer, Safari, Chrome,
                      Firefox, and Opera.
                      <br></br>
                      <br></br>
                      Pixels. We and our Third Party Agents may also use
                      "pixel tags," "web beacons," "clear GIFs," or similar
                      means in connection with the Good Deeds Platform and
                      HTML-formatted email messages to, among other things,
                      track the actions of Users and email recipients,
                      determine the success of marketing campaigns, and
                      compile statistics about Site usage and response rates.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      5. GOOD DEEDS'S USE OF INFORMATION
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      We collect and use information for business and
                      commercial purposes in accordance with the practice
                      described in this Privacy Policy. Our business purposes
                      for collecting and using information include:
                    </Text>
                    <br></br>

                    <br></br>
                    <Text>
                      <UnorderedList>
                        <ListItem>
                          {' '}
                          To operate and make available the Good Deeds
                          Platform. We use your data to connect you with other
                          users to enable the posting of, selection for,
                          completion of, and virtual deed dollars for products or
                          Services, in order to fulfill our contracts with
                          users;
                        </ListItem>
                        <ListItem>
                          {' '}
                          For fraud prevention, on the basis of our legitimate
                          interests in ensuring a safe and secure environment
                          in which Clients and users can meet and conduct
                          business, and in order to comply with our legal
                          obligations;
                        </ListItem>
                        <ListItem>
                          {' '}
                          For formal volunteer positions, criminal background,
                          and right to work checks, if applicable, and to the
                          extent permitted by local law.{' '}
                        </ListItem>
                        <ListItem>
                          {' '}
                          For service providers, platform users are encouraged
                          to background check and verify identity of service
                          providers in order to ensure the safety of our users
                          both online and offline, preventing or detecting
                          unlawful acts, protecting the public against
                          dishonesty, and maintaining the integrity of the
                          Good Deeds Platform given that users often interact
                          directly with Clients and may enter their homes;
                        </ListItem>
                        <ListItem>
                          {' '}
                          To analyze Good Deeds Platform usage as necessary
                          for our legitimate interest in improving the Good
                          Deeds Platform to grow our business;
                        </ListItem>
                        <ListItem>
                          {' '}
                          To contact you and deliver (via email, SMS, push
                          notifications, or otherwise) transactional
                          information, administrative notices, marketing
                          notifications, offers and communications relevant to
                          your use of the Good Deeds Platform, with your
                          consent when required under applicable law, as
                          necessary for our legitimate interests in proper
                          communication and engagement with our Users and in
                          promoting our business;
                        </ListItem>
                        <ListItem>
                          {' '}
                          To provide you with customer support in order to
                          fulfill our contracts with users;
                        </ListItem>
                        <ListItem>
                          {' '}
                          For internal market research for our legitimate
                          interest in improving the Good Deeds Platform to
                          grow our business;
                        </ListItem>
                        <ListItem>
                          {' '}
                          For troubleshooting problems for our legitimate
                          interests in ensuring a safe and secure environment
                          in which users can meet;
                        </ListItem>
                        <ListItem>
                          {' '}
                          To assist users in the resolution of complaints and
                          disputes between them, as necessary for our
                          legitimate interests in facilitating good relations
                          among users;
                        </ListItem>
                        <ListItem>
                          {' '}
                          To enforce our Terms of Service and our legitimate
                          interests in ensuring our Agreement is complied
                          with; and
                        </ListItem>
                        <ListItem>
                          {' '}
                          As otherwise set forth in the Agreement.
                        </ListItem>
                      </UnorderedList>
                    </Text>
                    <br></br>
                    <Text>
                      Interest-Based Advertising. Ads are a standard part of
                      user experience on the Internet, and Good Deeds believes
                      that targeted advertising enhances this experience. Good
                      Deeds and affiliate third parties may use cookies and
                      other technologies to place ads where they believe
                      interested users will see them. In addition to banner
                      ads, Good Deeds may advertise products, companies and
                      events that we think might interest you through the
                      email address you provide. We may incorporate Tracking
                      Technologies into our own Service (including our website
                      and emails) as well as into our ads displayed on other
                      websites and services. Some of these Tracking
                      Technologies may track your activities across time and
                      services for purposes of associating the different
                      devices you use, and delivering relevant ads and/or
                      other content to you (“Interest-Based Advertising”).
                      <br></br>
                      <br></br>
                      For more information and to understand your choices
                      regarding third party ads, please see the “Cookies and
                      Other Technologies and Interest-Based Advertising” in
                      Exhibit A. Advertising and marketing is carried out as
                      necessary for our legitimate interests in providing an
                      engaging and relevant experience, promoting our
                      services, and growing our business.
                      <br></br>
                      <br></br>
                      Analytics and Market Analysis. Good Deeds may analyze
                      information (“Market Analysis”) as necessary for our
                      legitimate interests in providing an engaging and
                      relevant experience, and promoting and growing the Good
                      Deeds Platform.
                      <br></br>
                      <br></br>
                      Good Deeds uses information to offer services to users
                      who express an interest in these services, through a
                      poll for example, or to Users who can be presumed to
                      have an interest based on results from our Market
                      Analysis. We do this as necessary for our legitimate
                      interests in providing an engaging and relevant
                      experience, promoting our services, and growing our
                      business.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      6. INFORMATION SHARING
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      We only share the Information we collect about you as
                      described in this Privacy Policy or as described at the
                      time of collection or sharing, including as follows:
                      <br></br>
                      <br></br>
                      Third Party Agents. We share information, including
                      Identity Information, with entities that process
                      information on our behalf for our business purposes.
                      Third Party Agents assist us with services such as
                      virtual deed dollars processing, data analytics, marketing
                      and advertising, website hosting, fraud prevention and
                      detection, communication services, and technical
                      support. We contractually prohibit our Third Party
                      Agents from retaining, using, or disclosing information
                      about you for any purposes other than performing the
                      services for us, although we may permit them to use
                      information that does not identify you (including
                      information that has been aggregated or de-identified)
                      for any purpose except as prohibited by applicable law.
                      <br></br>
                      <br></br>
                      To operate the Good Deeds Platform, we may share your
                      information with our agents, representatives, vendors
                      and service providers (“Third Party Agents”) so they can
                      provide us with support services as follows:
                    </Text>
                    <br></br>

                    <br></br>
                    <Text>
                      <UnorderedList>
                        <ListItem> Email origination;</ListItem>
                        <ListItem>
                          {' '}
                          Identity checks (currently carried out carried out
                          by our provider Sterling in U.S. and Canada), to the
                          extent permitted by applicable law;
                        </ListItem>
                        <ListItem>
                          {' '}
                          Customer relationship management services;{' '}
                        </ListItem>
                        <ListItem>
                          {' '}
                          To otherwise help us provide the Good Deeds
                          Platform.{' '}
                        </ListItem>
                      </UnorderedList>
                    </Text>
                    <br></br>
                    <Text>
                      Partners. Some Good Deeds content is "sponsored by" or
                      "presented by" other companies. If you connect to the
                      Good Deeds Platform through a co-branded version of our
                      Good Deeds Platform or otherwise participate in one of
                      our partner programs, we may share information about
                      your use of the Good Deeds Platform with that Partner in
                      order to offer the integrated platform and to evaluate
                      the partner program. We may also share your information
                      with our Partners in order to receive additional
                      information about you, or in order to create offers that
                      may be of interest to you. Please check such Partner’s
                      privacy policy before revealing information about
                      yourself. If you don't want these Partners to have your
                      Personal Information, you can choose to not participate.
                      <br></br>
                      <br></br>
                      Promotions. When you voluntarily enter a sweepstakes,
                      contest, or other promotion, we share information as set
                      out in the official rules that govern the promotion as
                      well as for administrative purposes and as required by
                      law (e.g., on a winners’ list). By entering a promotion,
                      you agree to the official rules that govern that
                      promotion, and may, except where prohibited by
                      applicable law, allow the sponsor and/or other entities
                      to use your name, voice, and/or likeness in advertising
                      or marketing materials. We may occasionally contact you,
                      if you want us to, with information about special
                      events, activities, promotions, contests, submission
                      opportunities, and programs. You always have the
                      ability, in your Account, to ask Good Deeds not to
                      contact you with this type of information. Please see
                      the Your Rights and Choices section for more
                      information.
                      <br></br>
                      <br></br>
                      Other Users. Good Deeds facilitates contact between
                      clients and users and reserves the right to share a
                      user’s contact information (e.g. name, phone number,
                      email, or postal address) with a Client and vice versa,
                      or with their legal or other representative, in order to
                      facilitate: (1) the resolution of a dispute related to
                      or arising from an interaction between two or more Users
                      of the Good Deeds Platform; or (2) the performance of a
                      Task. This exchange of information is a mandatory part
                      of the Good Deeds Platform. Legal Obligations. Good
                      Deeds and our Third Party Agents may disclose
                      information or user Generated Content, including
                      location data or communication data, to a third party if
                      required or permitted to do so by law or pursuant to a
                      court order, warrant or subpoena. Good Deeds reserves
                      the right to disclose Personal Information from both
                      private and public areas of the Site(s) and the Good
                      Deeds Platform in the absence of a court order, warrant
                      or subpoena, to the extent permitted by applicable law,
                      if we are given reason to believe, in our sole
                      discretion, that someone is causing injury to or
                      interfering with the rights of users, the general
                      public, or Good Deeds or its partners, parents or
                      affiliates.
                      <br></br>
                      <br></br>
                      It is our policy to provide notice to Users before
                      producing their information in response to law
                      enforcement requests unless (i) we are prohibited or
                      otherwise constrained by law or court order from doing
                      so, (ii) we have reason to believe the User’s account
                      has been compromised such that the notice would go to
                      the wrong person, or notice would otherwise be
                      counterproductive or would create a risk to safety, or
                      (iii) it is an emergency request and prior notice would
                      be impractical (in which case we may provide notice
                      after the fact). Merger or Acquisition. Good Deeds
                      reserves the right to share information in connect with,
                      or during negotiations of, any proposed or actual
                      merger, purchase, sale, or any other type of acquisition
                      or business combination of all or any portion of our
                      assets, or transfer of all or a portion of our business
                      to another business.
                      <br></br>
                      <br></br>
                      Public Areas. Your profile on the Good Deeds Platform
                      consists of information about you and your business, and
                      may include information such as photographs, your years
                      in business, skills and expertise, feedback/rating
                      information, and other information, including your
                      username (“Profile”). The information in your User
                      Profile may be visible to all users and the general
                      public. If you choose to post a service via the Good
                      Deeds Platform, the contents of such listing will be
                      viewable to users you select on the Good Deeds Platform.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      7. YOUR RIGHTS AND CHOICES
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      You may opt-out of receiving promotional communications
                      from us and our Partners, remove your information from
                      our database, choose to not receive future promotional
                      communications related to the Good Deeds Platform, or
                      cancel your account by logging on to the Site(s) and
                      clicking on the “Account” tab, or by contacting us at
                      retention@gooddeeds.ca. Account Settings. During
                      registration you choose whether to receive marketing
                      correspondence from Good Deeds and its affiliates and
                      Partners. This information remains on your Profile where
                      you can, at any point, easily edit it. After logging on,
                      click on the “Account” tab, then select “Notifications”
                      to make your preferred selections.
                      <br></br>
                      <br></br>
                      Push Notifications. You have the option to receive
                      updates and relevant offers via push notifications in
                      your app. These notifications can be configured in the
                      settings of your mobile device.
                      <br></br>
                      <br></br>
                      Corrections to Profile. You have the right to access,
                      update, and correct inaccuracies in your Good Deeds
                      Profile at any time by logging in and clicking on the
                      “Account” tab. There, you can view, update, and correct
                      your Account information. Our databases automatically
                      update any information you edit in your Profile under
                      the “Account” tab.
                      <br></br>
                      <br></br>
                      So that we may protect the integrity of the Good Deeds
                      Platform, there are certain pieces of information, such
                      as your age, that you cannot alter yourself. For
                      example, since children under the age of majority in
                      their jurisdiction of residence are not allowed to
                      register as Users, we need to take reasonable measures
                      to preserve the accuracy of our Users' ages. You may
                      contact us at privacy@gooddeeds.ca if there is a need to
                      make a correction to such data. Please see the
                      Children’s Privacy section for more details.
                      <br></br>
                      <br></br>
                      Promotional Communications. You can opt out of receiving
                      promotional communications from Good Deeds sent via
                      email by clicking on the unsubscribe link in any
                      message. You can opt out of receiving promotional
                      communications from Good Deeds sent via text message at
                      any time by following the instructions provided in those
                      messages to text the word "STOP". Please note that your
                      opt-out is limited to the phone number used and will not
                      affect subsequent subscriptions. If you opt-out of only
                      certain communications, other subscription
                      communications may continue. Even if you opt-out of
                      receiving promotional communications, Good Deeds may
                      continue to send you non-promotional communications,
                      such as those about your account, Services,
                      transactions, servicing, or Good Deeds’s ongoing
                      business relationship with you. If you receive
                      unsolicited email from a Good Deeds domain, please let
                      us know here, privacy@gooddeeds.ca.
                      <br></br>
                      <br></br>
                      Cookies and Pixels. Most browsers accept cookies by
                      default. You can instruct your browser, by changing its
                      settings, to decline or delete cookies. If you use
                      multiple browsers on your device, you will need to
                      instruct each browser separately. Your ability to limit
                      cookies is subject to your browser settings and
                      limitations.
                      <br></br>
                      <br></br>
                      Do Not Track. Your browser settings may allow you to
                      automatically transmit a “Do Not Track” signal to online
                      services you visit. Note, however, there is no industry
                      consensus as to what site and app operations should do
                      with regard to these signals. Accordingly, unless and
                      until the law is interpreted to require us to do so, we
                      do not monitor or take action with respect to “Do Not
                      Track” signals. For more information on “Do Not Track,”
                      visit https://www.allaboutdnt.com.
                      <br></br>
                      <br></br>
                      App and Location Technologies. You can stop all
                      collection of information via an app by uninstalling the
                      app. You can also reset your device Ad Id at any time
                      through your device settings, which is designed to allow
                      you to limit the use of information collected about you.
                      If you do not want us to use your location anymore for
                      the purposes set forth above, you should turn off the
                      location services for the mobile application located in
                      your device’s account settings, your mobile phone
                      settings, and/or within the mobile application.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      8. GOOD DEED'S INFORMATION RETENTION POLICY
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      We retain personal data for as long as you are a User in
                      order to meet our contractual obligations to you, and
                      for such longer period as may be in our legitimate
                      interests and to comply with our legal obligations (see
                      Exhibit B for exemplar document retention periods). We
                      may also retain data from which you cannot directly be
                      identified, for example where stored against a
                      randomly-generated identifier so we know the data
                      relates to a single user, but we cannot tell who that
                      user is. We use this kind of data for research purposes
                      and to help us develop and improve our services, and we
                      take appropriate measures to ensure you cannot be
                      re-identified from this data.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      9. GOOD DEED’S SECURITY OF COLLECTED INFORMATION
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      Your Good Deed’s account is password-protected so that
                      only you and authorized Good Dees staff have access to
                      your account information. In order to maintain this
                      protection, do not give your password to anyone. Also,
                      if you share a computer, you should sign out of your
                      Good Deeds account and close the browser window before
                      someone else logs on. This will help protect your
                      information entered on public terminals from disclosure
                      to third parties.
                      <br></br>
                      <br></br>
                      Good Deeds implements and maintains reasonable
                      administrative, physical, and technical security
                      safeguards to help protect information about you from
                      loss, theft, misuse and unauthorized access, disclosure,
                      alteration and destruction. Good Deeds has staff
                      dedicated to maintaining this Privacy Policy and other
                      privacy initiatives, periodically reviewing security,
                      and making sure that every Good Deeds employee is aware
                      of our security practices. Nevertheless, transmission
                      via the internet is not completely secure and we cannot
                      guarantee the security of information about you.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      10. NOTIFICATION OF CHANGES
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      Good Deeds's Privacy Policy is periodically reviewed and
                      enhanced as necessary. This Privacy Policy might change
                      as Good Deeds updates and expands the Good Deeds
                      Platform. Good Deeds will endeavor to notify you of any
                      material changes by email. Good Deeds also encourages
                      you to review this Privacy Policy periodically
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      11. CHILDREN’S PRIVACY
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      This service is intended for a general audience, and is
                      not directed at children under 13 years of age. In
                      certain jurisdictions, this minimum age may be higher.
                      Please check the Jurisdiction-specific Provisions below
                      for more information.
                      <br></br>
                      <br></br>
                      We do not knowingly gather personal information (as
                      defined by the U.S. Children’s Privacy Protection Act,
                      or “COPPA”) in a manner not permitted by COPPA. If you
                      are a parent or guardian and you believe that we have
                      collected information from your child in a manner not
                      permitted by law, please let us know by contacting us
                      privacy@gooddeeds.ca. We will remove the data.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      12. CONTACTING US
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text>
                      If you have any questions about this Privacy Policy or
                      the manner in which we or our Third Party Agents treat
                      your Personal Information, the practices of the Site,
                      your dealings with the Good Deeds Platform, or if you
                      have technical problems, you may contact us
                      privacy@gooddeeds.ca.
                      <br></br>
                      <br></br>
                      Good Deeds's staff will respond to all mail or email
                      from Users with questions about privacy, including the
                      types of Personal Information stored on the Good Deeds
                      database, and requests to delete or rectify such
                      Personal Information. ta.
                    </Text>
                    <br></br>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem py="5px">
                  <h2></h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="20px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      13. JURISDICTION-SPECIFIC PROVISIONS
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4} textAlign={'justify'}>
                    <br></br>
                    <Text
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="18px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      A. RESIDENTS OF THE UNITED STATES OF AMERICA
                    </Text>
                    <br></br>
                    <Text>
                      Information of U.S. Users. Our collection, use, and
                      retention of the Information of U.S. Users is in
                      accordance with applicable U.S. laws, as is our
                      determination of what is deemed to be “personal data
                      and/or information”. Such collection, use, and retention
                      laws are different from those afforded to EU Users under
                      the General Data Protection Regulation of 2018 (“GDPR”).
                      <br></br>
                      <br></br>
                      Good Deeds expressly disclaims any liability that may
                      arise should any other individuals obtain the
                      information you submit to the Good Deeds Platform.
                      <br></br>
                      <br></br>
                      Interest-Based Advertising in the United States. For
                      more information about interest-based ads, or to opt out
                      of having your web-browsing information used for
                      behavioral advertising purposes, please visit
                      www.aboutads.info/choices.
                      <br></br>
                      <br></br>
                      Good Deeds’s Security of Collected Information. While
                      Good Deeds will use commercially reasonable efforts to
                      ensure the security of all and Personal Information, we
                      expressly disclaim any liability for any unauthorized
                      access to or use of our secure servers and/or any and
                      all Personal Information and/or stored therein, and you
                      agree to hold Good Deeds harmless for any damages that
                      may result therefrom. If you have any further questions
                      on this issue, please refer to the Terms of Service.
                    </Text>
                    <br></br>
                    <Text
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="18px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      B. RESIDENTS OF CANADA.
                    </Text>
                    <br></br>
                    <Text>
                      Transfer Of Data. We and our affiliates and Third Party
                      Agents primarily store data about you, including
                      Personal Information, on servers located and operated
                      within the United States. If you reside or are located
                      outside of the U.S., we may send and store your Personal
                      Information (also commonly referred to as personal data)
                      to the U.S. in order to provide and operate the Good
                      Deeds Platform. By accepting the terms of this Privacy
                      Policy, you acknowledge the transfer to and processing
                      of your Personal Information on servers located in the
                      U.S. and other countries.
                      <br></br>
                      <br></br>
                      Custom Audience. We may use services provided by
                      third-party platforms (such as social networking or
                      other websites) to serve targeted advertisements on such
                      platforms to you, and we may provide a hashed version of
                      your email address or other information to the platform
                      provider for such purposes. To opt-out of the use of
                      your information for such purposes, please launch the
                      opt-out tool at https://youradchoices.ca/choices.
                      <br></br>
                      <br></br>
                      Interest-Based Advertising in Canada. For more
                      information about interest-based ads, or to opt out of
                      having your web-browsing information used for behavioral
                      advertising purposes, please visit
                      https://youradchoices.ca/choices.
                      <br></br>
                      <br></br>
                      To learn more about interest-based advertising in mobile
                      apps and to opt out of this type of advertising by
                      third-party advertising companies that participate in
                      the DAAC’s AppChoices tool, please download the version
                      of AppChoices for your device at
                      https://youradchoices.ca/appchoices/.
                    </Text>
                    <br></br>
                    <br></br>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Type of Cookie</Th>
                          <Th>Purpose</Th>
                          <Th>Who Serves (for example)</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Authentication Cookies</Td>
                          <Td>
                            These cookies (including local storage and similar
                            technologies) tell us when you’re logged in, so we
                            can customize your experience and connect your
                            account information and settings.
                          </Td>
                          <Td>Good Deeds</Td>
                        </Tr>
                        <Tr>
                          <Td>Localization</Td>
                          <Td>
                            These cookies help provide a localized experience
                            by showing you your local metro area.
                          </Td>
                          <Td>Good Deeds</Td>
                        </Tr>
                        <Tr>
                          <Td>Site features and services</Td>
                          <Td>
                            These provide functionality that helps us deliver
                            products and the Good Deeds Platform. For example,
                            cookies help you log in by pre-filling fields or
                            help ensure older versions of web browsers can
                            still view our Site(s). We may also use cookies
                            and similar technologies to help us provide you
                            with social plugins and other customized content
                            and experiences, including customized fonts.
                          </Td>
                          <Td>
                            Good Deeds <br></br>
                            Facebook<br></br>
                            Linkedin<br></br>
                            Amazon- Hosting<br></br>
                            Zopim<br></br>
                            Polyfill<br></br>
                            MyFonts Counter<br></br>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Analytics and research</Td>
                          <Td>
                            These are used to understand, improve, and
                            research products and services, including when you
                            access the Good Deeds Platform and related
                            websites and apps from a computer or mobile
                            device. For example, we may use cookies to
                            understand how you are using site features, to
                            report on any errors in how the Site is
                            functioning, to report to our vendors when content
                            licensed from them is assessed, and to segment
                            audiences for feature testing. We and our partners
                            may use these technologies and the information we
                            receive to improve and understand how you use
                            websites, apps, products, services and ads.
                          </Td>
                          <Td>
                            Good Deeds <br></br>
                            HeapAnalytics<br></br>
                            MixPanel<br></br>
                            BugSnag<br></br>
                            Google Tag Manager<br></br>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Interest-Based Advertising</Td>
                          <Td>
                            Things like cookies and pixels are used to deliver
                            relevant ads, track ad campaign performance and
                            efficiency, and to understand your interests from
                            your online activity on the Site, mobile
                            applications and other websites and apps. For
                            example, we and our ad partners may rely on
                            information gleaned through these cookies to serve
                            you ads that may be interesting to you on other
                            websites and in doing that your information (which
                            will not contain your name, email address or other
                            "real-world" identifiers) will be shared with
                            other platforms in the digital advertising
                            ecosystem all involved in assisting the delivery,
                            purchase, reporting and analysis of digital
                            advertising. Similarly, our advertisers may use a
                            cookie, attribution service or another similar
                            technology to determine whether we’ve served an ad
                            and how it performed, or provide us with
                            information about how you interact with them.
                            <br></br>
                            Please note that even if you opt-out of
                            interest-based advertising by a third party, these
                            tracking technologies may still collect data for
                            other purposes, including analytics, and you may
                            still see ads from us, but the ads will not be
                            targeted based on behavioral information about you
                            and may therefore be less relevant to you and your
                            interests.<br></br>
                            You can instruct your browser, by changing its
                            options, to stop accepting cookies or to prompt
                            you before accepting a cookie from the websites
                            you visit. To successfully opt-out, you must have
                            cookies enabled in your web browser. Please see
                            your browser’s instructions for information on
                            cookies and how to enable them. Your opt-out only
                            applies to the web browser you use so you must
                            opt-out of each web browser on each device that
                            you use. Once you opt out, if you delete your
                            browser’s saved cookies, you may need to opt-out
                            again.
                            <br></br>
                            For more information about targeting and
                            advertising cookies and how you can opt out, you
                            can visit the Network Advertising Initiative
                            opt-out page, or the Digital Advertising
                            Alliance’s opt-out pages in the United States,
                            https://youradchoices.ca/choices/ in Canada
                          </Td>
                          <Td>
                            Good Deeds <br></br>
                            Google<br></br>
                            Doubleclick<br></br>
                            Sailthru<br></br>
                            Horizon<br></br>
                            Bing Ads<br></br>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                    <br></br>
                    <br></br>
                    <Text
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="18px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      SOCIAL MEDIA AND DIGITAL ADVERTISING COOKIES AND WIDGETS
                    </Text>
                    <br></br>
                    <Text>
                      • DoubleClick: Google's Doubleclick re-targeting cookie
                      lets us serve personalized ads to you when you're
                      browsing other websites and social media platforms. You
                      can control ad personalization on Google and partner
                      websites In Google’s Privacy and Terms page.
                      <br></br>• Facebook Connect: We may allow you to sign up
                      and log in using your Facebook account. If you sign up
                      using Facebook Connect, Facebook will ask your
                      permission to share certain information from your
                      Facebook account with us. This may include your first
                      name, last name, email address, profile picture, and
                      general location in order to create an account. This
                      information is collected by Facebook and is provided to
                      us under the terms of Facebook’s privacy policy. You can
                      control the information that we receive from Facebook
                      using the privacy settings in your Facebook account.
                      <br></br>• Facebook Impressions: We use Facebook
                      Impressions to track the number of people that interact
                      with our content on Facebook. This information is
                      collected by Facebook and is provided to us under the
                      terms of Facebook’s privacy policy. You can control the
                      information that we receive from Facebook using the
                      privacy settings in your Facebook account.
                      <br></br>• Google Sign-in: We may allow you to sign up
                      and log in using your Google account. If you sign up
                      using Google, Google will ask your permission to share
                      certain information from your Google account with us.
                      This may include your first name, last name, email
                      address, profile picture, and general location in order
                      to create an account. This information is collected by
                      Google and is provided to us under the terms of Google’s
                      privacy policy.
                      <br></br>• LinkedIn Widgets: This tool enables visitors
                      to engage with us via LinkedIn and show visitors
                      relevant ads and personalized content on LinkedIn. To
                      learn more about LinkedIn’s practices and to opt out,
                      please visit LinkedIn’s Privacy Policy and Settings.
                      <br></br>• Sailthru: Email newsletters you elect to
                      receive from us are transmitted through Sailthru.
                      Sailthru uses pixel tag technology to determine whether
                      an email has been opened. In addition, when you click on
                      any link in an email newsletter or marketing message you
                      have elected to receive, Sailthru recognizes that fact.
                      This information is used in the aggregate to measure the
                      rate at which emails are opened and various links are
                      clicked, to measure user interests and traffic patterns,
                      and to improve the content of the email newsletters and
                      the services and features offered through the email
                      newsletter and marketing messages. Because some of this
                      information is linked to individual email addresses, it
                      is personally identifiable. You can view Sailthru’s
                      privacy policy here.
                      <br></br>• Bing Ads: We use Bing Ads to promote our
                      company online and use the cookies provided by Bing to
                      record completion of a transaction on our website. You
                      can find out more about Bing cookies by visiting Bing’s
                      Privacy Policy.
                      <br></br>
                    </Text>
                    <br></br>
                    <Text
                      flex="1"
                      textAlign="left"
                      fontWeight="500"
                      fontSize="18px"
                      letterSpacing="tight"
                      marginEnd={'6'}
                      color="primary.300"
                    >
                      OTHER COOKIES
                    </Text>
                    <br></br>
                    <Text>
                      • Google Analytics: We use Google Analytics, a web
                      analytics service. Google Analytics uses cookies to help
                      Good Deeds analyze how visitors use the Site(s). The
                      information generated by cookies about your use of the
                      Site(s) and the Good Deeds Platform (including your IP
                      address) will be transmitted to and stored by a Google
                      server in the United States. Google uses this
                      information for the purpose of evaluating your use of
                      the Site(s), compiling reports on Site activity for Site
                      operators, and providing Site operators with other
                      services relating to Site activity and Internet usage.
                      You can prevent the storage of data relating to your use
                      of the Site(s) and created via the cookie (including
                      your IP address) by Google, as well as the processing of
                      this data by Google, by downloading and installing the
                      browser plug-in available here. You can obtain
                      additional information on Google Analytics’ collection
                      and processing of data and data privacy and security at
                      the following links: How Google Uses Information From
                      Sites Or Apps That Use Our Services and Analytics Help.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem py="5px">
            <h2>
              <AccordionButton>
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="20px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  LISTING POLICIES
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} textAlign={'justify'}>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="24px"
                letterSpacing="tight"
                marginEnd={'6'}
              >
                Item Listing Policies
              </Text>
              <br></br>
              <Text>
                Find out everything you need to know about what's allowed in listings, as well as information on
                how to have an easier and more successful donating experience, in our detailed policy guidelines
                below.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Frequently Asked Questions
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                I'm not sure whether the item I'm donating is allowed on Good
                Deeds. Where can I learn more?
              </Text>
              <br></br>
              <Text>
                There are some items that, due to legal restrictions or Good
                Deeds rules, we don't allow or that can only be listed under
                certain conditions. If you're not sure whether your item is
                allowed, our Prohibited and restricted items policy has more
                details on what you can and can't donate.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Why was my listing removed?
              </Text>
              <br></br>
              <Text>
                To keep Good Deeds a safe place, sometimes we remove listings
                that violate our policies. If we remove your listing, we'll
                send you an email to your Messages and to your registered
                email address explaining why.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                I can't find my listings on the site. What's happened?
              </Text>
              <br></br>
              <Text>
                If you can't find your listings they may have been removed if
                they violated one of our policies. However, if you haven't
                received an email from us about removing your listings, it's
                possible they're just not ranking high up in search results.
                <br></br>
                <br></br>
                To help improve your search ranking, be as descriptive as
                possible when you create your listings. Write a clear title
                and description, list your item in the right category, and
                fill out all item specifics suggested for your item. Find out
                more in our article on how to optimize your listings for Best
                Match.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Images and text policy
              </Text>
              <br></br>
              <Text>
                To make sure you're giving potential users an accurate
                representation of your items, and that you're not infringing
                on anyone else's content rights, you should write your own
                descriptions and use your own images, or use any that Good
                Deeds offers to you from the Good Deeds catalog.
                <br></br>
                <br></br>
                You should take your own images and write your own
                descriptions for the items you list.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Frequently Asked Questions
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                WHAT SHOULD I DO IF MY IMAGE OR TEXT IS BEING USED BY ANOTHER
                MEMBER?
              </Text>
              <br></br>
              <Text>
                When you create listings you give Good Deeds and it's members
                permission, through our user agreement, to use your images and
                product details. Your content may be added to the Good Deeds
                product catalog, and may be used by other sellers in their
                Good Deeds listings. <br />You may contact the member and ask them
                to remove your image or text from their listing if it is not
                part of the Good Deeds product catalog.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                CAN I USE IMAGES THAT I COPIED FROM OTHER WEBSITES IN MY
                LISTING OR PRODUCT PAGE?
              </Text>
              <br></br>
              <Text>
                No, you can't use images copied from other websites or
                internet searches in your listing or product page, unless the
                owner of the image has given you permission. For example, it
                may be considered copyright infringement if you copy and paste
                an image from a manufacturer's website, unless you have
                permission.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                No item listings policy
              </Text>
              <br></br>
              <Text>
                All listings on Good Deeds have to offer a physical item or a
                tangible service. Listings that are blank, or don't offer a
                tangible item or service, aren't allowed because they can
                cause confusion for users and increase the risk of fraud.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Search and browse manipulation policy
              </Text>
              <br></br>
              <Text>
                Learn why it's not allowed to manipulate Good Deeds's search
                and browse experience by adding popular keywords in your
                listings that don't have any relation to your items.
                <br></br><br></br>
                Manipulating Good Deed's search and browse experience by
                adding popular keywords in your listings that don't have any
                relation to your items, or using other tactics that could
                mislead buyers, is not allowed.
                <br></br><br></br>
                To make sure our search results give buyers the best
                experience possible, it's also important to accurately
                describe your items, use a clear title, and list in the
                appropriate categories.
                <br></br>
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                What is the policy?
              </Text>
              <br></br>
              <Text>
                • Manipulating search results to gain unfair visibility of a
                listing is not allowed
                <br></br>• Using keywords that are not directly related to the
                item for sale is not allowed. All the words in the listing
                need to be accurate and refer only to the item for sale
                <br></br>• If the item is an accessory for or compatible with
                another item, "fits", "for" or "compatible with" should be
                stated before the name of the compatible item. However,
                "fits", "for" or "compatible with" is not allowed before the
                brand names of jewelry, clothing and accessories, or
                universally compatible items
                <br></br>• Listings that make comparisons with other products
                are not allowed
                <br></br>• Listings that promote other listings are not
                allowed
                <br></br>• Listings can't include keywords with question
                marks, as this can be misleading for buyers. If any item
                details are unclear or unknown, they should be left out of the
                listing
                <br></br>• Offering a choice of different products in a single
                listing is not allowed. This includes:
                <br></br>o Selling different brands or models in the same
                listing (for example, an iPhone 6 and an iPhone 7)
                <br></br>o Selling different items with different conditions
                in the same listing (for example, "new" and "used" items) The
                following rules help achieve the best possible position in
                Good Deed’s Best Match sort order:
                <br></br><br></br>The following rules help achieve the best possible position in Good Deed’s Best Match sort order:
                <br></br>• List identical items in one multi-quantity fixed
                price listing
                <br></br>• List items with variations such as size and color
                in one fixed price listing with variations
                <br></br>• List items that fit multiple vehicles using our
                parts compatibility guide. (Compatible vehicles should not be
                included in the listing title)
                <br></br>• Significant differences between items in a listing
                should be highlighted in the listing title, pictures, price,
                condition, and item specifics, so that buyers can easily tell
                them apart
                <br></br>
              </Text>

              <br></br>

              <Text>
                Activity that doesn't follow Good Deeds policy could result in
                a range of actions including for example: administratively
                ending or canceling listings, hiding or demoting all listings
                from search results, lowering users rating, exchanging
                restrictions, and account suspension. All deed dollars in relation
                to listings or accounts on which we take any action will not
                be refunded or otherwise credited to your account.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Item location misrepresentation policy
              </Text>

              <Text>
                To make sure users have a clear understanding of shipping
                charges and delivery times, all users must provide clear and
                accurate information in their listings about where their item
                is located.
                <br></br><br></br>
                Item location information must accurately state where the item
                will be shipped from.
                <br></br><br></br>
                To make sure buyers have a clear understanding of shipping
                charges and delivery times, sellers must provide accurate
                information in their listings about where their item will be
                shipped from.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                What is the policy?
              </Text>

              <Text>
                • Clear and accurate information about where the item is
                located, including the postal code, city and country where the
                item will ship from, must be included in listings
                <br></br>• Item location information must be consistent across
                all areas of the listing including title, description and item
                specifics
                <br></br>• A tracking number uploaded after an item has sold
                must match the shipping location provided in the listing
              </Text>
              <br></br>
              <Text>
                Activity that doesn't follow Good Deeds policy could result in
                a range of actions including for example: administratively
                ending or canceling listings, hiding or demoting all listings
                from search results, lowering seller rating, buying or selling
                restrictions, loss of buyer or seller protections, and account
                suspension. All fees paid or payable in relation to listings
                or accounts on which we take any action will not be refunded
                or otherwise credited to your account.
              </Text>

              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                JavaScript policy
              </Text>

              <Text>
                Active content in listings can create a poor experience by
                increasing page load times and introducing security risks.
                That's why it's not allowed in listings on Good Deeds
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Links policy
              </Text>

              <Text>
                To protect our members, listings or products can't contain
                links that direct customers to a site other than Good Deeds,
                even if the link is not clickable.
                <br></br>
                <br></br>
                While there are some exceptions, listings or item descriptions
                can't contain links that direct customers to any other site.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                What is the policy?
              </Text>
              <br></br>
              <br></br>
              <Text>
                • We don't allow store names to be a web address or include
                (for example) '.com', '.net', '.org' or '.edu'
                <br></br>• Videos can't violate any Good Deeds policy, such as
                adult content or offers to buy or sell outside of Good Deeds,
                and must be specific to the listing, such as a product review,
                demonstration or installation video
                <br></br>• Deed Dollars for third-party providers are not allowed
                to link off Good Deeds or contain external web addresses or
                contact information, and must follow these guidelines:
                <br></br>o They may contain up to 10 words of text (HTML font
                size 3) and a logo no larger than 88 x 33 pixels
                <br></br>o The credit or acknowledgement can't contain
                promotional material and should only identify the specific
                service provided for the listing
                <br></br>o They can't flash, move, or be animated
                <br></br>• Links in a description are only allowed for the
                following:
                <br></br>o Product videos
                <br></br>o Legally required information
              </Text>
              <br></br>

              <Text>
                Activity that doesn't follow Good Deeds policy could result in
                a range of actions including for example: administratively
                ending or canceling listings, hiding or demoting all listings
                from search results, lowering users rating, exchanging
                restrictions, and account suspension. All deed dollars in relation
                to listings or accounts on which we take any action will not
                be refunded or otherwise credited to your account.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Duplicate listings policy
              </Text>
              <br></br>
              <Text>
                Activity that doesn't follow Good Deeds policy could result in
                a range of actions including for example: administratively
                ending or canceling listings, hiding or demoting all listings
                from search results, lowering users rating, exchanging
                restrictions, and account suspension. All deed dollars in relation
                to listings or accounts on which we take any action will not
                be refunded or otherwise credited to your account.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                What is the policy?
              </Text>
              <br></br>
              <Text>
                • We don't allow more than one fixed credit listing of an
                identical item at the same time from the same seller. This
                includes:
                <br></br>o Listing an identical item in different categories
                or listing an identical item using different usernames
                <br></br>o Listings that aren't significantly different, such
                as adding an inconsequential bonus item with the same
                identical item in two listings
                <br></br>• Multiple credit listings for identical generic or
                universal items, such as AA batteries for example, are not
                allowed.
                <br></br>• Up to 5 separate fixed credit listings for
                identical items designed to fit multiple devices are allowed,
                when each listing is differentiated by spelling out the brand
                or model the item fits.
              </Text>
              <br></br>
              <Text>
                Activity that doesn't follow Good Deeds policy could result in
                a range of actions including for example: administratively
                ending or canceling listings, hiding or demoting all listings
                from search results, lowering users rating, exchanging
                restrictions, and account suspension. All deed dollars in relation
                to listings or accounts on which we take any action will not
                be refunded or otherwise credited to your account.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Optimize your listing for best match
              </Text>
              <br></br>
              <Text>
                When users search on Good Deeds, the default order of results
                is called Best Match. It’s designed to show the most relevant
                listings, taking into account the things our users find most
                important when they’re deciding what item(s) to receive.
              </Text>
              <br></br>
              <br></br>
              <Text>
                <Text
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="18px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  How Best Match works
                </Text>
                <br></br>
                <Text>
                  Our Best Match algorithm—the formula Good Deed uses to sort
                  listings—considers a number of different factors. These
                  include:
                </Text>
                <br></br>
                <Text>
                  • How closely the listing matches the user’s search terms
                  <br></br>• How popular the item is
                  <br></br>• The number of deed dollars for the item
                  <br></br>• The quality of your listing (description, photos,
                  and so on)
                  <br></br>• How complete the listing is
                  <br></br>• Your rating and review record as a donator
                  <br></br>
                </Text>
              </Text>
              <Text>
                Activity that doesn't follow Good Deeds policy could result in
                a range of actions including for example: administratively
                ending or canceling listings, hiding or demoting all listings
                from search results, lowering users rating, exchanging
                restrictions, and account suspension. All deed dollars in relation
                to listings or accounts on which we take any action will not
                be refunded or otherwise credited to your account.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                How to optimize for Best Match
              </Text>
              <br></br>
              <Text>
                There’s no secret to improving your position in the Best Match
                sort order. Users who follow best listing and selling
                practices will see their items appear higher in the search
                results. <br></br> <br></br>
                Start by offering competitive deed dollars expectations, pick up or
                shipping and great customer service. <br></br> <br></br>
                Here are some more recommendations for improving your Best
                Match ranking: <br></br>
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Create complete and accurate listings
              </Text>
              <Text>
                <br></br>
                <Text>
                  The more we know about your item, the better we can match it
                  to user searches.
                </Text>
                <br></br>
                <Text>
                  • Write a clear and concise title with correct spelling and
                  no more than 80 characters.
                  <br></br>• Add an accurate description, using product
                  details.
                  <br></br>• Use high-quality photos, taken from every angle,
                  and show any flaws or scratches. You can include up to 12
                  pictures.
                  <br></br>• Add item specifics, such as make, model, size,
                  color, and style.
                  <br></br>
                </Text>
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                List in the right category
              </Text>
              <Text>
                Pick the category that’s most relevant for your item. You can
                also choose to list in a second category.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Include high-quality pictures of your item
              </Text>
              <br></br>
              <Text>
                • Take high quality photos that will showcase your item
                <br></br>• Photograph your item at different angles
                <br></br>• Include photos of any scratches, flaws, or other
                parts of your item that a user would want to see
                <br></br>• Don’t add borders or text to your photos
                <br></br>• Don’t use the stock photo as your main picture
                <br></br>
              </Text>

              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Keep a positive user experience
              </Text>
              <br></br>
              <Text>
                • Ensure your item reaches your user on time and use tracking
                where possible
                <br></br>• Describe your item clearly and accurately
                <br></br>• Keep track of your inventory history in the user
                dashboard
                <br></br>
              </Text>
              <Text>
                For help maintaining a positive user experience, read our
                guides on providing users with the best service possible.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Report an Issue with a user
              </Text>
              <br></br>
              <Text>
                If you’re having a problem with a user because they’re not
                following our rules, let us know and we’ll look into it.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                When to report a user
              </Text>
              <br></br>
              <Text>
                You should only report a user if you think they’re violating
                our policies. Here are a few examples of when to report a
                user:
              </Text>
              <br></br>
              <Text>
                • The user is demanding something that wasn’t offered in the
                original listing
                <br></br>• You believe the user is making a false claim
                <br></br>• You believe the user is misusing the Credit back
                guarantee or the returns system
                <br></br>• They’ve asked you to send deed dollars without using the
                platform
                <br></br>• They’re messaging you more than what would be
                considered normal, with no intention of receiving the item
                <br></br>
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                How to report a user
              </Text>
              <br></br>
              <Text>
                You can report a user to us by sending us an email at
                support@gooddeeds.ca.
                <br></br>
                To try to resolve the issue, we recommend that you reply
                directly to the user’s feedback, or ask the user to revise
                their original rating and comment.
              </Text>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Replying to feedback you received for an item you sold
              </Text>
              <br></br>
              <Text>
                While it doesn’t affect your user performance, we understand
                that positive feedback is important to you and your reputation
                and may affect search rankings. If you believe feedback you
                received from a user isn’t accurate or fair, you can try to
                resolve the situation by replying to the feedback or by
                requesting a feedback revision.
                <br></br>
                <br></br>
                <Text
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="18px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Reply to your user
                </Text>
                <br></br>
                You can reply to your user through the feedback forum. Once
                you reply, your comment will appear directly below the users’
                feedback comment.
                <br></br>
                <br></br>
                <Text
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="18px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  Send a feedback revision request to your user
                </Text>
                <br></br>
                You can only request a revision for feedback that is less than
                30 days old. You can make 5 feedback revision requests per
                calendar year. Request a feedback revision at:
                issues@gooddeeds.ca
                <br></br>
                <br></br>
                <Text
                  flex="1"
                  textAlign="left"
                  fontWeight="500"
                  fontSize="18px"
                  letterSpacing="tight"
                  marginEnd={'6'}
                  color="primary.300"
                >
                  What happens when you ask for a feedback revision?
                </Text>
                <br></br>
                When you send a feedback revision request to a user, we’ll
                send them an email with all the details. The user then has 10
                days to either:
                <br></br>
                <br></br>• <b>Revise the feedback:</b> If the user accepts the
                request, we’ll guide them through the process of changing
                their rating and comment. When they revise feedback, their
                original comments will no longer be visible on Good Deeds.
                <br />•  <b>Decline the request:</b> If the user declines the request, they
                can choose whether to share their reasoning with you.
                <br></br>
                <br></br>
                If the user hasn’t taken any action after 7 days, we’ll send a
                reminder. If the user still hasn’t responded after 10 days,
                the revision request will expire. Remember, even disappointing
                feedback is just one person’s opinion and won’t affect your
                user performance.
                <br></br>
                <br></br>
                In some cases, we may remove or adjust feedback based on a
                case by case basis.
              </Text>

              <br></br>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Prohibited and restricted items policy overview
              </Text>
              <br></br>
              <Text>
                Before listing your item, make sure we allow it on Good Deeds,
                and find out if we have specific rules and conditions on how
                you should list it. Check the list of prohibited and
                restricted items below. You also need to make sure that the
                sale of your item complies with all laws and any additional
                restrictions applicable to payment services offered on Good
                Deeds such as credit card association or network rules.
                <br></br>
                <br></br>
                Make sure your listings and products follow these guidelines.
                If they don't, they may be removed, and you may be subject to
                a range of other actions, including restrictions of your
                buying and selling privileges and suspension of your account.
              </Text>
              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Understanding the rules
              </Text>
              <Text>
                Our policies are often based on country and state laws,
                although in some cases, we may also base our policies on input
                from our members and our own discretion, especially for
                dangerous or sensitive items.
                <br></br>
                <br></br>
                Read and understand our policies before listing items. Follow
                our guidelines and review our examples so you know beforehand
                what you can and cannot donate on Good Deeds.
              </Text>

              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Prohibited and restricted items
              </Text>
              <br></br>
              <Text>
                • Adult only category
                <br></br>• Alcohol
                <br></br>• Artifacts and grave-related items
                <br></br>• Catalytic converters and test pipes
                <br></br>• Cell phone (wireless) service contracts
                <br></br>• Contracts
                <br></br>• Counterfeit currency and stamps
                <br></br>• Coupons
                <br></br>• Credit cards
                <br></br>• Currency, selling
                <br></br>• Drugs and drug paraphernalia
                <br></br>• Electronics equipment - examples include cable TV
                de-scramblers, radar scanners, and traffic signal control
                devices
                <br></br>• Embargoed goods and prohibited countries - examples
                include items from Cuba
                <br></br>• Firearms, weapons, and knives - examples include
                pepper spray, replicas, and stun guns(see also military items)
                <br></br>• Government documents, IDs and licenses
                <br></br>• Government, transit, and shipping-related items -
                examples include airplane operations manuals, subway employee
                uniforms, and U.S. Postal Service (USPS) mailbags
                <br></br>• Hazardous, restricted or regulated materials -
                examples include batteries, fireworks and refrigerants
                <br></br>• Human remains and body parts
                <br></br>• Importation of goods into Canada - examples include
                CDs intended only for distribution in a certain country
                <br></br>• International trading
                <br></br>• Items encouraging illegal activity - examples
                include an eBook describing how to create methamphetamine
                <br></br>• Lock picking devices
                <br></br>• Lottery tickets
                <br></br>• Mailing lists and personal information
                <br></br>• Medical drugs, devices, and healthcare - examples
                include prescription drugs, contact lenses, pacemakers, and
                surgical instruments
                <br></br>• Military items (see also firearms, weapons, and
                knives)
                <br></br>• Multi-level marketing, pyramid and matrix programs
                <br></br>• Offensive material - examples include ethnically or
                racially offensive material and Nazi memorabilia
                <br></br>• Pesticides
                <br></br>• Police-related items
                <br></br>• Political memorabilia (reproduction)
                <br></br>• Postage meters
                <br></br>• Recalled items
                <br></br>• Slot machines
                <br></br>• Stamps
                <br></br>• Stocks and other securities
                <br></br>• Stolen property
                <br></br>• Surveillance equipment - examples include
                wiretapping devices and telephone bugging devices
                <br></br>• Tobacco
                <br></br>• Lodging - Rules for Users
                <br></br>
                Individual users who would like to host their own lodging,
                such as a timeshare, condo, apartment, or home, must become
                Good Deeds Lodging Verified. To become Good Deeds Lodging
                Verified, a user must upload documentation with proof of their
                ownership rights and send to: support@gooddeeds.ca
                <br></br>
              </Text>

              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Accepted documents to prove ownership rights are:
              </Text>
              <br></br>
              <Text>
                1. Deed
                <br></br>
                2. Maintenance fee statement
                <br></br>
                3. Utility bill
                <br></br>
                4. Contract
                <br></br>
                5. Reservation
                <br></br>
                6. Users must list in the correct category: <b>Travel {'>'} Lodging</b>
                <br></br>
                7. User must include the Good Deed’s Travel Disclaimer in the
                item description
              </Text>

              <br></br>
              <br></br>
              <Text
                flex="1"
                textAlign="left"
                fontWeight="500"
                fontSize="18px"
                letterSpacing="tight"
                marginEnd={'6'}
                color="primary.300"
              >
                Reporting policy violations
              </Text>
              <br></br>
              <Text>
                If you see a listing that violates one of our policies, report
                it by emailing support@gooddeeds.ca. If we determine that a
                listing or product has violated a policy, we email the user
                and the bidders or the user to let them know that we've
                removed the listing or product from Good Deeds.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
      </div>

      <div className="d-md-none">
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
      </div>

      <Footer />
    </Box>
  )
}

export default PrivacyPolicy
