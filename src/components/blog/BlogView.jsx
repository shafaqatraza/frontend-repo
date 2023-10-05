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
import otherPost from '../../../src/assets/imgs/other-blog-post.png'
 
const BlogView = (props) => {
  const router = useRouter()

  const { slug } = router.query

  const [isLoading, setIsLoading] = useState(true)
  const [blogDetails, setBlogDetail] = useState({})

  const getBlogDetails = useCallback(async (slug) => {
    setIsLoading(true)
    const data = await axios.get(`${baseUrl}/blogs/${slug}`)

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
            <div className="mt-4 pt-2">
              <ChevronLeftIcon
              onClick={() => router.back()}
              color={'#323232'} fontSize={"40px"} mt={"10"} style={{cursor:"pointer"}}/>
            </div>
            <div className="row m-0">
              <div className="col-lg-8 ps-md-5">
              <Text
              py="2"
              fontWeight="500"
              color={'orange.500'}
              pt={isMobile ? '0' : '15'}
              
              className="lh-sm blog-title"
            >
            {blogDetails.title !== null ? blogDetails.title : ''}
            </Text>

            <Text
              py="3"
              px={'0'}
              mwid
              fontSize="20"
              fontWeight="500"
              color={'black'}
              maxW={"78%"}
              className="ps-1 ms-3"
            >
              {blogDetails.description !== null
                ? blogDetails.description
                : ''}
            </Text>
            <div className="row m-0 mt-3">
                <div className="col-md-5 col-8 ps-3">
                  <Text
                    fontSize="14px"
                    color={'rgba(151, 151, 151, 1)'}
                    className="ps-1"
                  >
                    posted by {blogDetails.posted_by.full_name || ''}
                  </Text>
                </div>
                <div className="col">
                  <Text
                    fontSize="14px"
                    color={'rgba(151, 151, 151, 1)'}
                  >
                    {blogDetails.created_at_human_diff}
                    {moment(blogDetails.updated_at).fromNow()}
                  </Text>
                </div>
            </div>
              </div>
            </div>
            <div className="row m-0">
              <div className="col-lg-8 ps-md-5">
                <Box>
                
    
                  <div style={{width:'100%',backgroundColor:'red'}}>
                  <Image
                    w={'100%'}
                    maxH={'450px'}
                    objectFit="cover"
                    borderRadius={isMobile ? '10' : '7'}
                    src={
                      blogDetails.image !== null
                        ? `${blogDetails.image}`
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
                      <Text mt={'10'}  fontSize={'14px'} className="blog-details">
                        {ReactHtmlParser(blogDetails.content)}
                      </Text>
                    )}
                </Box>
              </div>
              <div className="col-lg-4 d-flex d-lg-block justify-content-center justify-content-lg-start  ps-lg-5">
                  <div className="other-post-card pb-5 mb-5">
                      <h1 className="pt-4">Other Posts</h1>
                      <div className="row my-4 pt-3 align-items-center">
                        <div className="col-5">
                        <img src={otherPost.src}  alt='otherPost'/>
                        </div>
                        <div className="col-7 ps-0">
                          <Text
                            fontSize="12px"
                            // className="ps-1"
                          >
                            Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or
                          </Text>
                        </div>
                      </div>
                      <div className="row pt-2 align-items-center">
                        <div className="col-5">
                        <img src={otherPost.src}  alt='otherPost'/>
                        </div>
                        <div className="col-7  ps-0">
                          <Text
                            fontSize="12px"
                            // className="ps-1"
                          >
                            Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or
                          </Text>
                        </div>
                      </div>
                      <div className="row mt-4 pt-2 pb-5 align-items-center">
                        <div className="col-5">
                        <img src={otherPost.src}  alt='otherPost'/>
                        </div>
                        <div className="col-7 ps-0">
                          <Text
                            fontSize="12px"
                            // className="ps-1"
                          >
                            Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or
                          </Text>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
            </Container>
          </>
        )}
      </Box>
    </>
  )
}

export default BlogView
