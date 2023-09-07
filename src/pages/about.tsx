import {
  Box,
  Center,
  Text,
  Container,
  SimpleGrid,
  Spacer,
  Button,
  Flex,
  Skeleton,
  Spinner,
  Image,
  Grid, GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  usePopoverContext,
  background
} from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import Navbar from '../components/Navbar'
import { LastSection } from '../components/about/lastSection'
import { AboutSection1 } from '../components/howToUse/AboutSection1'
import team1 from '../assets/imgs/about/amber-yakutchik.jpeg'
import team2 from '../assets/imgs/about/paula-festas.jpeg'
import team3 from '../assets/imgs/about/alex-christopoulos.png'
import team4 from '../assets/imgs/about/jordan-fiksenbaum.png'
import team1m from '../assets/imgs/about/amber-yakutchik-mb.jpg'
import team2m from '../assets/imgs/about/paula-festas-mb.jpg'
import team3m from '../assets/imgs/about/alex-christopoulos-mb.jpg'
import team4m from '../assets/imgs/about/jordan-fiksenbaum-mb.jpg'
import amber from '../assets/imgs/amber-yakutchik.png'
import paula from '../assets/imgs/paula-festas.png'
import alex from '../assets/imgs/alex-christopoulos.png'
import jordan from '../assets/imgs/jordan-fiksenbaum.png'
import team from '../assets/imgs/about/team.png'
import social from '../assets/imgs/about/social.png'
import comunity from '../assets/imgs/about/comunity.png'
import icon1 from '../assets/imgs/about/equality.png'
import icon2 from '../assets/imgs/about/trust.png'
import icon3 from '../assets/imgs/about/respect.png'
import bannerImage from '../assets/imgs/do-good-feel-better-get-rewarded.jpg'
import bannerImageMb from '../assets/imgs/do-good-feel-better-get-rewarded-mb.jpg'
import CommunityImage from '../assets/imgs/community-focused.jpg'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
import { baseUrl } from '../components/Helper/index'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import part1 from "../assets/imgs/part1.png";
import part2 from "../assets/imgs/part2.png";
import part3 from "../assets/imgs/part3.png";
import part4 from "../assets/imgs/part4.png";
import banner from "../assets/imgs/about/banner.png"
import whatsdo from "../assets/imgs/about/what-we-do.png"
import whowe from "../assets/imgs/about/who-we-are.png"
import fav from "../assets/imgs/favicon.ico"

const About = () => {

  const [partnerData, setPartnerData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // console.log("dZAedede", partnerData)

  interface PopoverTriggerProps {
    /**
     * The React child to use as the
     * trigger for the popover
     */
    children: React.ReactChild
  }

  const PopoverTrigger: React.FC<React.PropsWithChildren<PopoverTriggerProps>> = (props) => {
    // enforce a single child
    const child: any = React.Children.only(props.children)
    const { getTriggerProps } = usePopoverContext()
    return React.cloneElement(child, getTriggerProps(child.props, child.ref))
  }

  const communitData = [
    {
      title: 'Community-Focused',
      desc: 'We are passionate about empowering communities to look within and share resources without any monetary requirements. Our goal is that our donation movement extends from an occasional occurrence to a continuous lifestyle, by working on minimizing poverty and supporting our communities.',
      image: comunity
    },
    {
      title: 'Act of Giving',
      desc: 'It is a universal truth, when we engage in good deeds, we help others and we also reduce our own stress. We encourage our community to do good (and feel better themselves) by creating a cycle that benefits them beyond monetary reward and into a more adaptable, kind and sustainable way of life. ',
      image: social
    },
    {
      title: 'Sustainable Society',
      desc: 'Our mission is to work on encouraging a sustainable future as part of the good deeds journey by reducing waste and nurturing communities. We believe in buying less and sharing more, and that moving away from a consumerist culture by lessening our environmental impact ensures the path to earth’s longevity',
      image: team
    }
  ]
  const ourTeamData = [
    {
      title: 'Amber Yakutchik',
      desc: 'Founder and CEO',
      image: team1m
    },
    {
      title: 'Paula Festas',
      desc: 'Board Director, Operations',
      image: team2m
    },
    {
      title: 'Alex Christopoulos',
      desc: 'Board Treasurer, CFO',
      image: team3m
    },
    {
      title: 'Jordan Fiksenbaum',
      desc: 'Chief Visionary Officer',
      image: team4m
    }
  ]


  const getPartnerData = async () => {
    await axios.get(`${baseUrl}/partnership-programs`)
      .then(res => {
        setIsLoading(false);
        setPartnerData(res.data.data)
      }).catch(err => {
        setIsLoading(true);
        console.log("partner data error", err);
      })

  };

  useEffect(() => {
    getPartnerData();
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          autoplay: true, 
          autoplaySpeed: 3000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true, 
          autoplaySpeed: 3000,
        },
      },
    ],
  };


  return (
    <Box style={isMobile ? { width: '100%' } : {}}>
      <Head>
        {/* <title>Good Deeds | About Good Deeds</title> */}
        <title>Good Deeds | An Online Marketplace of Opportunities</title>
        <link rel="icon" href={fav.src} />
        <meta name="title" content="A marketplace of opportunity" />
        <meta name="description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
        <meta name="keywords" content="Marketplace, Goodddeds, Canada, Toronto, Ontario, Community" />
        <meta name="robots" content="index, follow" />
        {/* <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> */}
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
      <div className='container my-5 py-4 px-0'>
        <div className='d-flex align-items-center justify-content-center flex-column flex-md-row about-good-deed'>
          <h1 className='good-deeds' style={{color:"#183553"}}>This is <span style={{color:"#E27832"}}>Good Deeds.</span></h1>
          <img src={banner.src} className='mt-5 mt-md-0' width="250px" alt="banner" />
        </div>
      </div>
      <div style={{background:"rgb(222,227,230,50%)"}}>
          <div className='container py-md-5 pb-5 pt-1 what-and-who px-0 px-xl-5'>
            <div className='row mt-md-4 mx-0 px-4 px-md-0'>
              <div className='col-lg-9 col-md-8 order-2 order-md-1  pe-md-5 pe-2'>
                <h1 className='d-none d-md-block' style={{color:"#183553"}}><span style={{color:"#E27832"}} >What</span> we do?</h1>
                <p>Good Deeds is the first online platform that rewards kindness by inspiring a cycle of giving. You earn exclusive Deed Dollars in exchange for donations and volunteer services, which you can exchange for goods and services within the Good Deeds marketplace. </p>
                <p>We believe that a non-monetized society can help shape a friendlier and better world. Additionally, our collective efforts encourage a reduction in waste and pollution, promoting a sustainable Earth for physical and mental well-being. </p>
                <p>We welcome everyone to join our vibrant community as we do good and feel better together!</p>
              </div>
              <div className='col-lg-3 col-md-4 order-1 order-md-2 flex-column justify-content-center justify-content-md-end  py-5 d-flex'>
              <h1 className='d-block d-md-none text-center' style={{color:"#183553"}}><span style={{color:"#E27832"}} >What</span> we do?</h1>
                <img src={whatsdo.src} className='px-2 px-md-0' alt="what we do" />
              </div>
            </div>
            <div className='row mt-md-5 mt-4 pt-md-5 mb-md-5 mx-0 px-4 px-md-0'>
              <div className='col-lg-3 col-md-4 d-flex pb-5 pb-md-0 justify-content-center flex-column pt-4'>
              <h1 className='text-center d-block d-md-none' style={{color:"#183553"}}><span style={{color:"#E27832"}}>Who</span> we are?</h1>
                <img src={whowe.src} className='px-2 px-md-0' alt="who we are" />
              </div>
              <div className='col-lg-9 col-md-8 ps-md-5'>
                <h1 className='text-end me-5 d-none d-md-block' style={{color:"#183553"}}><span style={{color:"#E27832"}}>Who</span> we are?</h1>
                <p>We empower communities to help others without ulterior motives or seeking monetary gains in return.</p>
                <p>Our community aims to progress occasional acts of giving into everyday practice. In doing so, we can work together to minimize poverty and provide support to those who need it most.</p>
                <p> Let's build a healthy cycle that goes beyond monetary limitations for a kinder and more sustainable lifestyle.</p>
              </div>
            </div>
          </div>
      </div>

      <div className='container pt-3 pb-md-3 px-0'>
        <div className="d-flex flex-column flex-md-row mission-vision mt-5">
          <div className='mission-card me-md-4 mb-2 mb-md-0 text-center text-md-start'>
            <h1 className='value-heading fw-bold mb-4'>Mission</h1>
            <p className='value-para mb-5'>We’re on a mission to build stronger more sustainable communities, one good deed at a time</p>
          </div>
          <div className='mission-card mb-2 mb-md-0 mt-4 mt-md-0 text-center text-md-start'>
            <h1 className='value-heading fw-bold mb-4'>Vision</h1>
            <p className='value-para mb-5 '>Our vision is to make the world and better, happier place for all mankind.</p>
          </div>
        </div>

        <Box className='values-wrap my-md-5 mb-5 mt-4' background={'white'}>
          <Text
            fontWeight="700"
            fontSize="36px"
            color="#E27832"
            width={'100%'}
            margin={'0 auto'}
            className='text-center text-md-start value-heading'
          >
            Values
          </Text>
          <Text
            fontSize={"22px"}
            width={'100%'}
            margin={'0 auto'}
            color='#183553'
            fontWeight={400}
            pb={20}
            py={7}
            className='for-desk text-center text-md-start d-block value-para text-dark'
          >
            Our values are what guides us. We cultivate a diverse and inclusive environment through equality, kindness, respect, trust
            and compassion for all.
          </Text>

          <Flex className='values-icons'>
            <Box w='33%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Image src={icon1.src} alt='Equality' />
              <Text fontSize={20} fontWeight={'bold'} color={'#183553'}>Equality</Text>
            </Box>
            <Spacer />
            <Box w='33%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Image src={icon2.src} alt='Kindness' />
              <Text fontSize={20} fontWeight={'bold'} color={'#183553'}>Kindness</Text>
            </Box>
            <Spacer />
            <Box w='33%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Image src={icon3.src} alt='Respect' />
              <Text fontSize={20} fontWeight={'bold'} color={'#183553'} className='mt-3'>Respect</Text>
            </Box>
            <Spacer />
            <Box w='33%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Image src={icon2.src} alt='Respect' />
              <Text fontSize={20} fontWeight={'bold'} color={'#183553'}>Trust</Text>
            </Box>
            <Spacer />
            <Box w='33%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Image src={icon3.src} alt='Respect' />
              <Text fontSize={20} fontWeight={'bold'} color={'#183553'} className='mt-3'>Empathy</Text>
            </Box>

          </Flex>

        </Box>

      </div>
      <div style={{background:"rgb(222,227,230,50%)"}}>
      <Container className='about-container'>
        <Box className='for-desk' flexBasis="100%" pt={10} pb={20} px={30}>
          <Text
            fontWeight="700"
            fontSize="36px"
            // textAlign={'center'}
            color="#183553"
            pb={10}
          >
            Our <span style={{color:"#E27832",}}>Team</span>
          </Text>
          <Flex width={'70%'} margin={'0 auto'}>
            <Box w='25%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >

              <Popover trigger={"hover"} placement='right-start' >
                <PopoverTrigger >
                  <Image borderRadius='full' boxSize='219px' src={amber.src} alt='Amber Yakutchik' />
                </PopoverTrigger>
                <PopoverContent width={'580px'}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} px={16} pb={10}>
                    <Image boxSize='176px' src={team1.src} alt='Amber Yakutchik' />
                    <Text fontSize={35} color={'primary.300'} fontWeight={'600'}>Amber Yakutchik</Text>
                    <Text fontSize={20} color={'black'} fontWeight={'500'} mb={'20px'}>Founder and CEO</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Amber is no stranger to the profound impact of care and kindness, having over 18 years of experience in the Canadian healthcare industry. Her unbridled passion for the act of giving led to the founding of Good Deeds, the world’s first free non-monetized digital marketplace where individuals can gather to build thoughtful and sustainable communities one good deed at a time.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Through Good Deeds, Amber aims to improve relationships by nurturing the natural connection between each person regardless of their differences. Amber dedicated years toward researching the lasting emotional and physical benefits of generous giving and plans to inspire greater awareness and widespread practice through a meaningful rewards system.</Text>
                    <Text fontSize={12} color={'black'} fontWeight={'500'} fontStyle={'italic'} textAlign={'center'}>“The Good Deeds platform blurs the socioeconomic status of its citizens and promotes equality, trust, dignity, respect, and compassion for all humanity. We’re essentially creating a haven to invest in our human capital”.</Text>

                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Text fontSize={20} color={'#183553'} fontWeight="700" textAlign={'center'} mt={2}>Amber Yakutchik</Text>
              <Text fontSize={16} color={'#183553'} fontWeight="600" textAlign={'center'}>Founder and CEO</Text>
            </Box>
            <Spacer />
            <Box w='25%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >

              <Popover trigger={"hover"} placement='left-start' >
                <PopoverTrigger >
                  <Image borderRadius='full' boxSize='219px' src={paula.src} alt='Paula Festas' />
                </PopoverTrigger>
                <PopoverContent width={'580px'}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} px={16} pb={10}>
                    <Image boxSize='176px' src={team2.src} alt='Paula Festas' />
                    <Text fontSize={35} color={'primary.300'} fontWeight={'600'}>Paula Festas</Text>
                    <Text fontSize={20} color={'black'} fontWeight={'500'} mb={'20px'}>Board Director, Operations</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Paula has a strong passion for giving back to communities - a practice that she intends to lead by example through Good Deeds. She has been an active member of many industry communities and not-for-profit boards, from which she drives successful initiatives and meaningful partnerships.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Paula currently holds a seat as a board director at Responsible Gambling Council Check and OOLoop with previously held board positions that include the IAB Canada Board of Directors, the Broadcast Executive Society board, and the National Advertising Benevolent Society board.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} >With over 25 years as a successful business leader, Paula has driven global high-performing brands and organizations and will extend the same diligence in achieving the Good Deeds vision. She works closely with the Good Deeds team as Board Director, Operations. developing the platform as a revolutionary end-to-end solution. Paula aims to make a significant societal impact that fuels the natural human connection with technology through the combination of people, processes, and integrated solutions.</Text>

                  </PopoverBody>
                </PopoverContent>
              </Popover>


              <Text fontSize={20} color={'#183553'} fontWeight="700" textAlign={'center'} mt={2}>Paula Festas</Text>
              <Text fontSize={16} color={'#183553'} fontWeight="600" textAlign={'center'}>Board Director, Operations</Text>
            </Box>
            <Spacer />
            <Box w='25%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Popover trigger={"hover"} placement='left-start' >
                <PopoverTrigger >
                  <Image borderRadius='full' boxSize='219px' padding={'15px'} src={alex.src} alt='Alex Christopoulos' />
                </PopoverTrigger>
                <PopoverContent width={'580px'}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} px={16} pb={10}>
                    <Image boxSize='176px' src={team3.src} alt='Alex Christopoulos' />
                    <Text fontSize={35} color={'primary.300'} fontWeight={'600'}>Alex Christopoulos</Text>
                    <Text fontSize={20} color={'black'} fontWeight={'500'} mb={'20px'}>Board Treasurer, CFO</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Alex is a firm believer in shaping reality through strategic development, uniting distinct pieces into a coherent whole. He dedicates himself to empowering others in thoughts and actions, a skill honed through decades of scaling and developing organizations with a clear vision.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>His commitment and contributions across multiple non-profit organizations serve as a testament to his passion and experience in transforming social concepts into community improvements. Alex continues to positively impact society through meticulous decision-making and seeking viable financing opportunities that expand the Good Deeds cause.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Alex's prolific financial background offers Good Deeds expert guidance on optimizing outreach campaigns and running an intuitive infrastructure where kindness and generosity are the most valuable resources.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} >His tireless drive for philanthropy and IT innovation steers the Good Deeds mission, making it inspirational and accessible to modern society - realizing a better world where individuals can genuinely do good and feel better.</Text>

                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Text fontSize={20} color={'#183553'} fontWeight="700" textAlign={'center'} mt={2}>Alex Christopoulos</Text>
              <Text fontSize={16} color={'#183553'} fontWeight="600" textAlign={'center'}>Board Treasurer, CFO</Text>
            </Box>
            {/* <Box w='25%' display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Popover trigger={"hover"} placement='right-start'>
                <PopoverTrigger >
                  <Image borderRadius='full' boxSize='219px' src={jordan.src} alt='Jordan Fiksenbaum' />
                </PopoverTrigger>
                <PopoverContent width={'580px'}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} px={16} pb={10}>
                    <Image boxSize='176px' src={team4.src} alt='Jordan Fiksenbaum' />
                    <Text fontSize={35} color={'primary.300'} fontWeight={'600'}>Jordan Fiksenbaum</Text>
                    <Text fontSize={20} color={'black'} fontWeight={'500'} mb={'20px'}>Chief Visionary Officer</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Jordan Fiksenbaum is a big supporter of giving back to the community and encouraging others in the philosophy of paying it forward. Jordan is a veteran sales and marketing leader within the live entertainment industry with over 30 years of experience, generating billions in ticket sales. Jordan plans to pair his expertise in mass market growth with recycling kindness.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Jordan was the President of FuboTV, a leading sports-first live TV streaming platform, and served as the VP of Marketing & Public Relations for the North American Resident Shows Division of Cirque du Soleil, overseeing the day-to-day Marketing, Sales, and PR activities.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} >Jordan aims to make doing good and feeling better a part of everyone’s daily life. Jordan is looking forward to making Good Deeds a household name associated with improving lives and creating a more sustainable world.</Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Text fontSize={14} color={'white'} fontWeight="500" mt={2}>Jordan Fiksenbaum</Text>
              <Text fontSize={14} color={'white'} fontWeight="light">Chief Visionary Officer</Text>
            </Box> */}

          </Flex>

        </Box>

        <Box className='for-mb' flexBasis="100%" pt={10} pb={20} px={30}>
          <Text
            fontWeight="600"
            fontSize="30px"
            textAlign={'center'}
            color="#183553"
            pb={4}
          >
            Our <span style={{color:"#E27832"}}>Team</span>
          </Text>
          <Flex margin={'0 auto'} flexDirection='column'>
            <Box w='100%' mb={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >

              <Popover trigger={"hover"} placement='bottom' >
                <PopoverTrigger >
                  <Image borderRadius='full' boxSize='219px' src={amber.src} alt='Amber Yakutchik' />
                </PopoverTrigger>
                <PopoverContent width={'320px'}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} px={4} pb={6}>
                    <Image boxSize='176px' src={team1.src} alt='Amber Yakutchik' />
                    <Text fontSize={34} color={'primary.300'} fontWeight={'600'} textAlign={'center'}>Amber Yakutchik</Text>
                    <Text fontSize={20} color={'black'} fontWeight={'500'} mb={'20px'}>Founder and CEO</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Amber is no stranger to the profound impact of care and kindness, having over 18 years of experience in the Canadian healthcare industry. Her unbridled passion for the act of giving led to the founding of Good Deeds, the world’s first free non-monetized digital marketplace where individuals can gather to build thoughtful and sustainable communities one good deed at a time.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Through Good Deeds, Amber aims to improve relationships by nurturing the natural connection between each person regardless of their differences. Amber dedicated years toward researching the lasting emotional and physical benefits of generous giving and plans to inspire greater awareness and widespread practice through a meaningful rewards system.</Text>
                    <Text fontSize={12} color={'black'} fontWeight={'500'} fontStyle={'italic'} textAlign={'center'}>“The Good Deeds platform blurs the socioeconomic status of its citizens and promotes equality, trust, dignity, respect, and compassion for all humanity. We’re essentially creating a haven to invest in our human capital”.</Text>

                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Text fontSize={20} color={'#183553'} fontWeight="700">Amber Yakutchik</Text>
              <Text fontSize={16} color={'#183553'} fontWeight="600">Founder and CEO</Text>
            </Box>
            <Spacer />
            <Box w='100%' mb={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >

              <Popover trigger={"hover"} placement='bottom' >
                <PopoverTrigger >
                  <Image borderRadius='full' boxSize='219px' src={paula.src} alt='Paula Festas' />
                </PopoverTrigger>
                <PopoverContent width={'320px'}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} px={4} pb={6}>
                    <Image boxSize='176px' src={team2.src} alt='Paula Festas' />
                    <Text fontSize={34} color={'primary.300'} fontWeight={'600'} textAlign={'center'}>Paula Festas</Text>
                    <Text fontSize={20} color={'black'} fontWeight={'500'} mb={'20px'}>Board Director, Operations</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Paula has a strong passion for giving back to communities - a practice that she intends to lead by example through Good Deeds. She has been an active member of many industry communities and not-for-profit boards, from which she drives successful initiatives and meaningful partnerships.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Paula currently holds a seat as a board director at Responsible Gambling Council Check and OOLoop with previously held board positions that include the IAB Canada Board of Directors, the Broadcast Executive Society board, and the National Advertising Benevolent Society board.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} >With over 25 years as a successful business leader, Paula has driven global high-performing brands and organizations and will extend the same diligence in achieving the Good Deeds vision. She works closely with the Good Deeds team as Board Director, Operations. developing the platform as a revolutionary end-to-end solution. Paula aims to make a significant societal impact that fuels the natural human connection with technology through the combination of people, processes, and integrated solutions.</Text>

                  </PopoverBody>
                </PopoverContent>
              </Popover>


              <Text fontSize={20} color={'#183553'} fontWeight="700">Paula Festas</Text>
              <Text fontSize={16} color={'#183553'} fontWeight="600">Board Director, Operations</Text>
            </Box>
            <Spacer />
            <Box w='100%' mb={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Popover trigger={"hover"} placement='bottom' >
                <PopoverTrigger >
                  <Image borderRadius='full' boxSize='219px' padding={'15px'} alt='Alex Christopoulos' src={alex.src} />
                </PopoverTrigger>
                <PopoverContent width={'320px'}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} px={4} pb={6}>
                    <Image boxSize='176px' src={team3.src} alt='Alex Christopoulos' />
                    <Text fontSize={34} color={'primary.300'} fontWeight={'600'} textAlign={'center'}>Alex Christopoulos</Text>
                    <Text fontSize={20} color={'black'} fontWeight={'500'} mb={'20px'}>Board Treasurer, CFO</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Alex is a firm believer in shaping reality through strategic development, uniting distinct pieces into a coherent whole. He dedicates himself to empowering others in thoughts and actions, a skill honed through decades of scaling and developing organizations with a clear vision.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>His commitment and contributions across multiple non-profit organizations serve as a testament to his passion and experience in transforming social concepts into community improvements. Alex continues to positively impact society through meticulous decision-making and seeking viable financing opportunities that expand the Good Deeds cause.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Alex's prolific financial background offers Good Deeds expert guidance on optimizing outreach campaigns and running an intuitive infrastructure where kindness and generosity are the most valuable resources.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} >His tireless drive for philanthropy and IT innovation steers the Good Deeds mission, making it inspirational and accessible to modern society - realizing a better world where individuals can genuinely do good and feel better.</Text>

                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Text fontSize={20} color={'#183553'} fontWeight="700">Alex Christopoulos</Text>
              <Text fontSize={16} color={'#183553'} fontWeight="600">Board Treasurer, CFO</Text>
            </Box>
            {/* <Box w='100%' mb={6} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >
              <Popover trigger={"hover"} placement='bottom'>
                <PopoverTrigger >
                  <Image borderRadius='full' boxSize='219px' src={jordan.src} alt='Jordan Fiksenbaum' />
                </PopoverTrigger>
                <PopoverContent width={'320px'}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} px={4} pb={6}>
                    <Image boxSize='176px' src={team4.src} alt='Jordan Fiksenbaum' />
                    <Text fontSize={34} color={'primary.300'} fontWeight={'600'} textAlign={'center'}>Jordan Fiksenbaum</Text>
                    <Text fontSize={20} color={'black'} fontWeight={'500'} mb={'20px'}>Chief Visionary Officer</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Jordan Fiksenbaum is a big supporter of giving back to the community and encouraging others in the philosophy of paying it forward. Jordan is a veteran sales and marketing leader within the live entertainment industry with over 30 years of experience, generating billions in ticket sales. Jordan plans to pair his expertise in mass market growth with recycling kindness.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} mb={'10px'}>Jordan was the President of FuboTV, a leading sports-first live TV streaming platform, and served as the VP of Marketing & Public Relations for the North American Resident Shows Division of Cirque du Soleil, overseeing the day-to-day Marketing, Sales, and PR activities.</Text>
                    <Text fontSize={12} color={'black'} textAlign={'center'} >Jordan aims to make doing good and feeling better a part of everyone’s daily life. Jordan is looking forward to making Good Deeds a household name associated with improving lives and creating a more sustainable world.</Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Text fontSize={14} color={'white'} fontWeight="500">Jordan Fiksenbaum</Text>
              <Text fontSize={14} color={'white'} fontWeight="light">Chief Visionary Officer</Text>
            </Box> */}

          </Flex>

        </Box>

      </Container>
      </div>
        <div className='container pb-5 mb-md-5 px-0 px-xl-4'>
          <div className='pt-md-5 pt-3 pb-3 pb-md-0'>
            <p className="text-center part-txt">Our Partners</p>
          </div>
          <div className="partners-img mt-4 p-3 pe-0 mb-md-5 mb-4">
              <Slider {...settings}>
                
                  <div  className="pe-3">
                    <a href="https://www.autism.net"><img src={part1.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                  </div>
                  <div  className="pe-3">
                    <a href="https://www.blood.ca"><img src={part2.src} className="" style={{height:"150px",}} alt="" /></a>
                  </div>
                  <div className="pe-3">
                    <a href="https://www.bgccan.com"><img src={part3.src} className="" style={{height:"150px",}} alt="" /></a>
                  </div>
                  <div className="pe-3 w-100 ms-auto d-flex align-items-end">
                    <a href="https://www.habitat.org/" className='w-100'><img src={part4.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                  </div>
                  <div  className="pe-3">
                    <a href="https://www.autism.net"><img src={part1.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                  </div>
                  <div  className="pe-3">
                    <a href="https://www.blood.ca"><img src={part2.src} className="" style={{height:"150px",}} alt="" /></a>
                  </div>
                  <div className="pe-3">
                    <a href="https://www.bgccan.com"><img src={part3.src} className="" style={{height:"150px",}} alt="" /></a>
                  </div>
                  <div className="pe-3 w-100 ms-auto d-flex align-items-end">
                    <a href="https://www.habitat.org/" className='w-100'><img src={part4.src} className="w-100" style={{height:"150px",}} alt="" /></a>
                  </div>

              </Slider>
          </div>
      </div>
      <Footer />
    </Box >
  )
}

export default About
