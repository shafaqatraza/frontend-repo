import {
  Text,
  Flex,
  Box,
  Skeleton,
  useBreakpointValue,
  Image,
  Center,
  Spinner,
  Container,
  SimpleGrid
} from '@chakra-ui/react'
import React, { useState, useEffect, useCallback } from 'react'
import { baseImgUrl } from '../../components/Helper/index'
import NoImage from '../../../src/assets/imgs/no-image.png'
import moment from 'moment'
import { Router, useRouter } from 'next/router'
import axios from 'axios'
import { baseUrl } from '../../components/Helper/index'
import Head from 'next/head'
import ReactHtmlParser from 'react-html-parser'
import { isMobile } from 'react-device-detect'
import {ChevronLeftIcon} from '@chakra-ui/icons'

const BlogView = (props) => {
  const router = useRouter()

  const { slug } = router.query

  const [isLoading, setIsLoading] = useState(true)
  const [blogDetails, setBlogDetail] = useState({})

  const getBlogDetails = useCallback(async (slugname) => {
    setIsLoading(true)
    const data = await axios.get(`${baseUrl}/blogs/${slugname}`)

    if (data.status === 200) {
      setBlogDetail(data.data.data)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (router.query.slug !== undefined && router.query.slug !== '') {
      getBlogDetails(slug)
    }
  }, [router.query])

  return (
    <>
      <Box>
        {isLoading && (
          <Center h={'300px'}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="orange.200"
              color="orange.500"
              size="xl"
            />
          </Center>
        )}
        {!isLoading && (
          <>
            <Head>
              <title>
                Good Deeds |{' '}
                {blogDetails.title !== null
                  ? blogDetails.title
                  : 'Community Updates Good Deeds'}
              </title>
              <meta
                name="description"
                content={
                  blogDetails.description !== null
                    ? blogDetails.description
                    : 'Community Updates Good Deeds'
                }
              />
            </Head>
            <Container
              as={SimpleGrid}
              maxW="container.xl"
              columns={{ base: 1 }}
              spacing={{ base: 6, lg: 6 }}
              mb={{ lg: 4 }}
              //py="4"
            >
             {isMobile ? <ChevronLeftIcon
              onClick={() => router.back()}
              color={'#323232'} fontSize={"40px"} mt={"5"}/> : null}
              <Box justifyContent={'center'}>
                <Text
                  py="3"
                  fontSize="24"
                  fontWeight="500"
                  color={'orange.500'}
                  textAlign={'center'}
                  pt={isMobile ? '0' : '15'}
                >
                 {blogDetails.title !== null ? blogDetails.title : ''}
                </Text>

                <Text
                  py="3"
                  px={'0'}
                  mwid
                  fontSize="16"
                  fontWeight="500"
                  color={'black'}
                  textAlign={'center'}
                >
                  {blogDetails.description !== null
                    ? blogDetails.description
                    : ''}
                </Text>
                <Text
                  textAlign="center"
                  fontSize="16px"
                  pt={'1'}
                  color={'rgba(151, 151, 151, 1)'}
                >
                  posted by {blogDetails.posted_by.full_name || ''}
                </Text>
                <Text
                  textAlign="center"
                  px="3"
                  pb={'5'}
                  fontSize="16px"
                  color={'rgba(151, 151, 151, 1)'}
                >
                  {moment(blogDetails.updated_at).fromNow()}
                </Text>

                <div style={{width:'100%',backgroundColor:'red'}} textAlign={'center'}>
                <Image
                  w={'100%'}
                  maxH={'450px'}
                  objectFit="cover"
                  borderRadius={isMobile ? '10' : '7'}
                  src={
                    blogDetails.image !== null
                      ? `${baseImgUrl}/${blogDetails.image}`
                      : NoImage.src
                  }
                  draggable="false"
                  fallback={<Skeleton />}
                  alt={blogDetails.title}
                />
                </div>

                {blogDetails.content !== null &&
                  blogDetails.content !== '' &&
                  blogDetails.content !== '<p></p>' && (
                    <Text mt={'10'} mb={'80'}>
                      {ReactHtmlParser(blogDetails.content)}
                    </Text>
                  )}
              </Box>
            </Container>
          </>
        )}
      </Box>
    </>
  )
}

export default BlogView
