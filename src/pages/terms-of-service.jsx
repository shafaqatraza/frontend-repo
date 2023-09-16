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
  ListItem
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
        {/* <title>Good Deeds | Terms Of Service</title> */}
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
      <h1 className="privacy-heading"><span style={{color:"#E27832"}}>Terms</span> and Conditions</h1>
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
          By accessing or using our website application (our "Website Application") or collecting Good Deeds credits (collectively our "Services"), you agree to be bound by our terms of service set forth herein (our "Terms of Service"). If you do not agree with our Terms of Service, your sole recourse is to discontinue use of our Services immediately.
          </Text>
          <Text className="mb-4">
          By using our Services, we’d like to remind you that you are also consenting to the terms of our our privacy policy located at https://www.gooddeeds.ca/privacy ("Privacy Policy"), which sets out our information gathering and dissemination practices.
          </Text>
          <Text>
          The Services are owned and operated by Good Deeds Canada Inc. and/or its affiliates (references to "GOOD DEEDS", "we", "us", "our" are references to Good Deeds Canada Inc. and/or its affiliates). You are responsible for honouring the terms of any transactions that you take part in through our Services. GOOD DEEDS is not directly involved in transactions between users and cannot provide any assurance that with respect to commitments, representations, or warranties made by users of our Services. We do not confirm a user’s purported identity or control the content posted by users to our Services and make no representations or warranties regarding the items or services offered by any user. It is your responsibility to evaluate the accuracy, completeness, truthfulness and other characteristics of items or services offered by users through our Services. We reserve the right to establish limits concerning the use of our Services, modify the nature of our Services, and to discontinue our Services entirely at any time, without any further notice to you.
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
                 
                  color="primary.300"
                  width={"fit-content"}
                  
                >
                OWNERSHIP/ <br className="d-block d-sm-none"/> RESTRICTIONS ON USE
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel px={0} pb={4}>
              <br></br>
              
              <Text>
              All text, data, graphics, photographs, images, audio, video, trademarks, service marks, trade names and other information, visual or other digital material, software (including source and object codes) and all other content of any description available through our Services, or available via a link from our Services to a page created by GOOD DEEDS on another website (collectively, the "Content"), are the sole property of GOOD DEEDS and/or its licensors. All Content is protected by Canadian and international copyright, trade-mark, service marks, patents, trade secrets and other proprietary rights and laws. Use of the Content for any purpose not expressly permitted in our Terms of Service or otherwise consented to by GOOD DEEDS is prohibited. You may download or print one copy of the Content to any single device for your personal, non-commercial, informational use only, provided that you keep intact all copyright and other proprietary notices. You may not otherwise copy, reproduce, perform, distribute, display or create derivative works of the Content. Reproduction of multiple copies of the Content, in whole or in part, for resale or distribution is strictly prohibited except with the prior written permission of GOOD DEEDS. To obtain written consent for such reproduction, please contact us at: info@Gooddeeds.ca
              </Text>
              <br/>
              <Text>
              Our Services are licensed, not sold. We grant you a non-exclusive, non-transferable, limited license to access our website application, on any single mobile device, tablet, or similar technology solely to be used in connection with our Services for your private, personal, use. Our Services are protected by copyright and other intellectual property laws and treaties and are owned by us or our service providers. You agree that you will not copy, attempt to reverse engineer, modify, translate or disassemble our Services in whole or in part. You may not use or export or re-export our Services except as permitted under the law of the United States and Canada and the laws of the jurisdiction in which our Services were obtained. We may automatically check and update the version of our Services which you are using in order to improve the performance and capabilities of our Services.
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
                ACCOUNT REGISTRATION
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0} >
              <br></br>
              <Text>
              In order to use our Services, you will be asked to create an account using your email address. The email address you provided will be how you access your GOOD DEEDS Account, if you registered using this method. You agree to provide true, current, complete and accurate information as requested, and to update that information as soon as possible after any information on such registration changes. You alone are responsible for keeping your Account login information and associated passwords confidential, and for any and all of your Account activity. Therefore, you should protect your password and make your password secure and difficult for others to guess. You agree to immediately notify us of any unauthorized use of your Account or any other breach of security via info@gooddeeds.ca
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
                CODE OF CONDUCT
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              You must adhere to our code of conduct, as described herein (the "Code of Conduct") as a condition of your continued access to and use of our Services. Any breach of this Code of Conduct, in our sole discretion, will result in you being banned from the Services. You agree to abide by all applicable federal, provincial, territorial and other laws and regulations. In addition, without limiting the foregoing, You agree not to:
              </Text>
              <br></br>
              <Text>
              upload, post, e-mail or otherwise transmit any material that: constitutes unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation; infringes any patent, trade-mark, trade secret, copyright, publicity, or other proprietary or privacy rights of any party; is misleading, contains sexually explicit content, unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another’s privacy, hateful, racially, ethnically or otherwise objectionable; or contains any form of destructive software such as a virus, worm, or any other harmful components or any other computer file, program or code, designed to interrupt, destroy or limit the functionality of any computer or mobile device software, hardware or telecommunications equipment;
              </Text>
              <br></br>
              <Text>
              register under a false identity, impersonate any person or entity, including, but not limited to, a GOOD DEEDS employee, or falsely state or otherwise misrepresent your affiliation with a person or entity;
              </Text>
              <br></br>
              <Text>
              send e-mails or messages using our Services without the consent of the recipient;
              </Text>
              <br></br>
              <Text>
              harvest or otherwise collect or store any information (including personal information) about other users of our Services, including e-mail addresses, without the express consent of such users;
              </Text>
              <br></br>
              <Text>
              use any robot, spider, scraper or other automated means to access our Services and collect content for any purpose without our express written permission;
              </Text>
              <br></br>
              <Text>
              for the purpose of misleading others, create a false identity of the sender or the origin of a message, forge headers or otherwise manipulate identifiers in order to disguise the origin of any material transmitted through our Services;
              </Text>
              <br></br>
              <Text>
              attempt to gain unauthorized access to our Services, other computer systems or networks connected to our Services, through password mining or any other means;
              </Text>
              <br></br>
              <Text>
              take any action that imposes or may impose (as determined by us in our sole discretion) an unreasonable or disproportionately large load on our (or our third party providers’) infrastructure;
              </Text>
              <br></br>
              <Text>
              interfere with or disrupt networks or servers connected to our Services;
              </Text>
              <br></br>
              <Text>
              use, download or otherwise copy, or provide to any person or entity our Services users’ directory or other user or usage information or any portion thereof, other than in the context of your use of our Services;
              </Text>
              <br></br>
              <Text>
              register for more than one account or use any other measures in an attempt to gain additional Good Deeds credits or otherwise take advantage of the Services;
              </Text>
              <br></br>
              <Text>
              facilitate or encourage any of the above conduct.
              </Text>
              <br></br>
              <Text>
              Further, use of the Services to offer or procure illegal, unsafe, or other restricted goods is strictly prohibited. GOOD DEEDS reserves the right, in its sole discretion, to refuse to provide the Services in respect of any product, including but not limited to: illicit drugs, firearms and weapons, live animals, fireworks and explosives, human body parts, and any other good that is restricted under applicable laws or that possession of which may reasonably pose a hazard to human health or safety.
              </Text>
              <br></br>
              <Text>
              We reserve the right to pre-screen, edit, limit or remove any such User Content in our sole discretion, without further notice to you. Notwithstanding, you shall remain solely responsible for any User Content you submit or post. You may be exposed to User Content that is inaccurate, incomplete or unsuitable. We will not be responsible for User Content or accuracy of any information and shall not be responsible for any acts taken or decisions made based on such information. Any information you disclose in public areas of our Services becomes public information and is immediately accessible to other users, so it is important for you to carefully consider what, if any, personal information you reveal in these areas.
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
                Abusing GOOD DEEDS Services
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0} >
              <br></br>
              <Text>
              Please use our online reporting tool to tell us about any offensive or otherwise concerning User Content that you may see on our Services so that we maintain a positive experience for all users. We may, in our sole discretion, limit or terminate our Services, remove hosted content and take any other technical and/or legal steps to ensure that all users of our Services are acting in the spirit of our Terms of Service. Notwithstanding anything in the foregoing, you understand and agree that we do not monitor User Content and that we assume no liability for any User Content whatsoever, including any User Content which may be reported to us using our online reporting tool.
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
                USER POSTS
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              Subject to our Privacy Policy, all User Content that you post will be treated as non-confidential and non-proprietary to you and may be viewed by you and/or other users of our Services. In addition to complying with our Code of Conduct, by submitting User Content, you hereby agree, represent and warrant that:
              </Text>
              <br></br>
              <Text>
                · such User Content does not violate any local laws;
              </Text>
              <br></br>
              <Text>
                · such User Content does not infringe on any 3rd party rights;
              </Text>
              <br></br>
              <Text>
                · such User Content is not posted under a false identity, impersonate any person or entity, including, but not limited to, a GOOD DEEDS employee, or falsely state or otherwise misrepresent your affiliation with a person or entity;
              </Text>
              <br></br>
              <Text>
              · such User Content does not consist of or constitute unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation;
            </Text>
            <br></br>
            <Text>
              · such User Content does not contain viruses, malicious code or other technology which harm GOOD DEEDS or the interest or property of GOOD DEEDS users
            </Text>
            <br></br>
            <Text>
              · such User Content is your original work, created solely by you, and over which you have all necessary rights, title and interest, including copyright or you have a licence from the owner of the User Content and permission to post the User Content, and you grant GOOD DEEDS a worldwide assignable and sub-licensable licence in perpetuity to publish, display, reproduce, modify, edit or otherwise use any User Content, in whole or in part, for advertising or publicity/promotional purposes (including advertising or publicity/promotional purposes by GOOD DEEDS) or for any other purpose whatsoever, without any compensation or further notice;
            </Text>
            <br></br>
            <Text>
              · all individuals appearing in such User Content have granted to you a worldwide assignable and sub-licensable licence in perpetuity to publish, display, reproduce, modify, edit or otherwise use any User Content, in whole or in part, for advertising or publicity/promotional purposes (including advertising or publicity/promotional purposes by GOOD DEEDS) or for any other purpose whatsoever, without any compensation;
            </Text>
            <br></br>
            <Text>
               · you agree to indemnify and hold harmless GOOD DEEDS from any claims arising from or related to a breach of these warranties and representations;
          </Text>
          <br></br>
          <Text>
            · you waive any and all moral rights that you may have in the User Content, to the fullest extent permitted by law; and
          </Text>
          <br></br>
          <Text>
            · you agree to release and hold harmless GOOD DEEDS from and against any and all claims based on publicity rights, defamation, invasion of privacy, copyright infringement, trade-mark infringement or any other intellectual property-related cause of action that relates in any way to our use of your User Content.
          </Text>
          <br></br>
          <Text>
            · Furthermore, you understand and agree that we are under no obligation to display any of your User Content on our Services, and that we may edit or remove your User Content at any time, without further notice, at our sole discretion.
          </Text>
          <br></br>
          <Text>
            · You hereby grant to us a limited license to collect and store User Content for the purpose of providing the Services. You further grant us a perpetual, irrevocable, and unlimited licence to use, store, and manipulate User Content to create aggregated and anonymized statistical analytics in respect to platform use and other Services and User parameters and characteristics (“Anonymous Service Data”) in accordance with our Privacy Policy. We shall own all right, title and interest in and to the Anonymous Service Data, including all intellectual property rights in the Anonymous Service Data, and You hereby assign, transfer and convey to GOOD DEEDS any ownership interest You may have in any Anonymous Service Data.
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
                Good Deeds Credits
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              GOOD DEEDS will make available virtual Good Deeds credits to its users, partners and/or other members of the GOOD DEEDS community. To earn and use Good Deeds credits, you must have a valid and active GOOD DEEDS Account. Any disputes regarding pending credits will be held until resolution has been resolved. GOOD DEEDS at its sole discretion, may withhold or withdrawal Good Deeds credits from users without notice. Good Deeds may cease or cancel the Good Deeds credits distribution at any time.
              </Text>
              <br></br>
              <Text>
              Good Deeds credits have no cash, monetary or other value and cannot be converted into any currency. Good Deeds credits may only be used to barter with other GOOD DEEDS users and GOOD DEEDS partners. Any transactions made with Good Deeds credits are non-refundable.
              </Text>
              <br></br>
              <Text>
              You may not sell, charge or otherwise dispose of any Good Deeds credits except in accordance with such conditions as we may prescribe from time to time. Users will be able to transfer, donate or gift any earned Good Deeds credits between Good Deeds users, partners or affiliates.
              </Text>
              <br></br>
              <Text>
              GOOD DEEDS may suspend or cancel your GOOD DEEDS account if you violate any terms in this Terms of Service, including the Code of Conduct set out above.
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
                INTELLECTUAL PROPERTY INFRINGEMENT
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              If you are an owner of intellectual property (or the owner' authorized agent) and believe that any of our Content or User Content infringes your intellectual property, please notify us using the following procedure: Please send a written notice of intellectual property infringement to: Info@my-good-deeds.com. In your written notice, please provide the following information:
              </Text>
              <br></br>
              <Text>
              · Identification of the intellectual property claimed to have been infringed;
              </Text>
              <br></br>
              <Text>
              · Information sufficient to permit us to contact you, such as an address, telephone number, and, if available, an email address at which you may be contacted;
              </Text>
              <br></br>
              <Text>
              · A statement that you believe that use of the Contents or User Content in the manner complained of is not authorized by the owner, its agent, or the law; and
              </Text>
              <br></br>
              <Text>
              · A statement that the information in the notification is accurate, and under penalty of perjury, that you are the owner or are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
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
                LINKS TO THIRD-PARTY WEBSITES
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              We may offer links on our Services to websites and mobile applications owned and operated by third parties. We provide these links as a convenience to our visitors. We do not review the content of such third party services, and neither endorse, nor are responsible for, any content, advertising, products, services or other materials on or available from such third party services. You assume full responsibility for your use of third party services. Such services may be governed by terms and conditions different from those applicable to our Services, and we encourage you to review the terms and privacy policies of those third parties before using their services. We may also offer links to Content created by us and available on other services. If you link to that Content you are responsible for ensuring that you comply with the terms of use applicable to those services while you are using them.</Text>
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
                NO WARRANTIES
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              Although we strive to update and keep accurate as much as possible the content contained within our Services, errors and/or omissions may occur. DEPENDING ON THE JURISDICTION IN WHICH YOU LIVE, SOME OR ALL OF THE BELOW EXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU AND YOU MAY HAVE ADDITIONAL RIGHTS YOUR USE OF THE SERVICES IS AT YOUR OWN RISK. OUR SERVICES ARE PROVIDED TO YOU ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE CONTENT OR USER CONTENT IS ACCURATE, RELIABLE OR CORRECT; THAT OUR SERVICES WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; THAT YOUR ACCESS TO THE SERVICES WILL BE UNINTERRUPTED; THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; THAT OUR SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR THAT THE CONTENT IS TIMELY, SECURE OR ERROR-FREE. TO THE MAXIMUM EXTENT PERMITTED BY LAW, GOOD DEEDS DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH RESPECT TO ITS SERVICES, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, MERCHANTABLE QUALITY, NON-INFRINGEMENT AND FITNESS FOR A PARTICULAR PURPOSE.
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
                DISCLAIMERS AND LIMITATION OF LIABILITY
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              The GOOD DEEDS Services are provided "as is" and "as available". You agree not to hold us responsible for things other users post or do. As most of the content on the GOOD DEEDS Services comes from other users, we do not guarantee the accuracy of postings or user communications or the quality, safety, or legality of what is offered. We also cannot guarantee continuous or secure access to our Services. Notification functionality in our Services may not occur in real time. Such functionality is subject to delays beyond our control, including without limitation, delays or latency due to your physical location or your wireless data service provider’s network. Accordingly, to the extent legally permitted we expressly disclaim all warranties, representations and conditions, express or implied, including those of quality, merchantability, merchantable quality, durability, fitness for a particular purpose and those arising by statute. We are not liable for any loss, whether of money (including profit), goodwill, or reputation, or any special, indirect, or consequential damages arising out of your use of the GOOD DEEDS Services, even if you advise us or we could reasonably foresee the possibility of any such damage occurring. Some jurisdictions do not allow the disclaimer of warranties or exclusion of damages, so such disclaimers and exclusions may not apply to you.</Text>
              <br></br>
              <Text>
              Notwithstanding anything contained in the previous paragraph, if we are found to be liable, our liability to you or any third party (whether in contract, tort, negligence, strict liability in tort, by statute or otherwise) is limited to the greater of (a) the total fees you pay to us in the 12 months prior to the action giving rise to liability, and (b) 100 Canadian Dollars.</Text>
              <br/>
              <Text>
              You will indemnify and hold harmless GOOD DEEDS and its affiliates and our and their respective officers, directors, agents and employees (each an "Indemnified Party"), from any claim made by any third party, together with any amounts payable to the third party whether in settlement or as may otherwise be awarded, and reasonable legal costs incurred by any of the Indemnified Parties, arising from or relating to your use of our Services, any alleged violation by you of the applicable terms, and any alleged violation by you of any applicable law or regulation. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter subject to indemnification by you, but doing so will not excuse your indemnity obligations.</Text>
              <br/>
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
                MINORS
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              You must be at least fourteen (14) years old to use our Services. If you are over 14 years of age but under the age of majority in your province or territory of residence, you must have your parent or legal guardian’s permission to do so. GOOD DEEDS reserve the right to confirm such consent at any time and to discontinue your use of our Services should such consent not be granted. </Text>
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
                CHOICE OF LAW AND FORUM
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              Where permitted by law, our Terms of Service are governed by and will be interpreted in accordance with the laws of the Province of Ontario and of the laws of Canada applicable therein, without regard to any principles of conflicts of law. Where permitted by law, you agree that any action to enforce these Terms of Service may be brought in the courts located in the Province of Ontario. You further agree to submit to the personal jurisdiction of these courts for the purpose of any proceeding arising out of these Terms of Service and waive any objections and defenses inconsistent with such venue. By using our Services, you represent and warrant that your use complies with applicable law in your jurisdiction of residence.</Text>
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
                GENERAL
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              These Terms of Service constitute the entire agreement between you and us with respect to your use of our Services. If any provision of these Terms of Service is held to be invalid or unenforceable, such provision will be stricken and the remaining provisions enforced. Notwithstanding any other provisions of these Terms of Service, any provision of these Terms of Service that imposes or contemplates continuing rights or obligations on you or us will survive the expiration or termination of these Terms of Service, including, without limitation, the indemnification and limitation of liability provisions. </Text>
              <br></br>
              <Text>
              It is the express wish of the parties that this Agreement and all related documents be drawn up in English. C’est la volonté expresse des parties que la présente convention ainsi que les documents qui s’y rattachent soient rédigés en anglais.</Text>
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
                CHANGES AND TERMINATION
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <br></br>
              <Text>
              We reserve the right at any time and from time to time to modify or discontinue, temporarily or permanently, our Services (or any part thereof) with or without notice. If you wish to terminate your account with GOOD DEEDS, you may discontinue using our Services and delete any applications or software that you may have downloaded from us. We may amend our Terms of Service by posting revisions through a link on our website, with no additional notice to you. Your continued access to and use of our Services will constitute acceptance of our amended Terms of Service. If you do not agree with our Terms of Service, or any future amendments, your sole recourse is to cease use of our Services. If you have any questions regarding our Terms of Service please contact info@gooddeeds.ca</Text>
              <br></br>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
              <Text className="fw-bold">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ OUR TERMS OF SERVICE, UNDERSTAND THEM AND AGREE TO ALL OF THE TERMS AND CONDITIONS IN OUR TERMS OF SERVICE.
              </Text>
      </Container>
      </div>

      <Footer />
    </Box>
  )
}

export default PrivacyPolicy
