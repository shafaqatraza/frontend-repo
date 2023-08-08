import {
  Container,
  SimpleGrid,
  Spacer,
  Center,
  Spinner,
  Stack,
  Text,
  Image
} from '@chakra-ui/react'
import React, { useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../components/Helper/index'
import { SingleBlogCard } from './SingleBlogCard'
import { Card, Col, Row } from "react-bootstrap";
import imagevolun from "../../assets/imgs/imagevolun.png";

export const BlogCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [blogs, setBlogs] = useState([]);
  const [goodDeeds, setGoodDeeds] = useState([
    {
      id: 1,
      goodDeed: "10 Good Deeds to do in your community this month",
      points: 100,
      description: "Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or providing a free service or experience, you earn",
    },
    {
      id: 2,
      goodDeed: "10 Good Deeds to do in your community this month",
      points: 50,
      description: "Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or providing a free service or experience, you earn",
    },
    {
      id: 3,
      goodDeed: "10 Good Deeds to do in your community this month",
      points: 100,
      description: "Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or providing a free service or experience, you earn",
    },
    {
      id: 4,
      goodDeed: "10 Good Deeds to do in your community this month",
      points: 25,
      description: "Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or providing a free service or experience, you earn",
    },
    {
      id: 5,
      goodDeed: "10 Good Deeds to do in your community this month",
      points: 50,
      description: "Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or providing a free service or experience, you earn",
    },
    {
      id: 6,
      goodDeed: "10 Good Deeds to do in your community this month",
      points: 10,
      description: "Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or providing a free service or experience, you earn"
    },
  ]);


  const getBlogLists = useCallback(async () => {
    setIsLoading(true)
    const data = await axios.get(`${baseUrl}/blogs`)
    if (data.status === 200) {
      console.info(data, 'data==')
      data.data.data.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.updated_at) - new Date(a.updated_at)
      })

      setIsLoading(false)
      setBlogs(data.data.data)
    }
  }, [])

  useEffect(() => {
    getBlogLists()
  }, [])

  return (
    <>
      {/* {isLoading && (
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
        <Container
          as={SimpleGrid}
          maxW="container.xl"
          columns={{ base: 1 }}
          spacing={{ base: 6, lg: 6 }}
          mb={{ lg: 6 }}
          py="4"
          mt={20}
        >
          <SimpleGrid columns={[1, 2, 3]} spacing="50px">
            {blogs.length > 0 &&
              blogs.map((item) => {
                if (item.slug !== null) {
                  return <SingleBlogCard item={item} />
                }
              })}
          </SimpleGrid>
          {blogs.length === 0 && (
            <Center h="300px">
              <Stack spacing={2} textAlign={'center'}>
                <Text fontWeight={400} fontSize={18}>
                  No blogs are available at this moment
                </Text>
              </Stack>
            </Center>
          )}
          <Spacer />
          <Spacer />
          <div className="d-flex justify-content-center">
          <button className="view-blog-btn">View More</button>
          </div>
        </Container>
      )} */}
       <div className="d-flex justify-content-center flex-wrap mt-5 container">
      {goodDeeds.map((deed) => (
        <div className="col-xl-4 col-md-6 mt-3 mb-5 pb-xxl-5 part-card">
        <div className="d-flex justify-content-center">
          <div
            className="card blog-card-shadow blog-cards border-0"
            style={{ height: "525px", width: "326px", borderRadius:"10px" }}
          >
            <div className="d-flex justify-content-center mb-3s">
              <Image
                style={{ borderRadius:'10px' }}
                src={imagevolun.src}
                alt={"Image"}
              />
            </div>
            <div className="card-body">
              <p
                style={{
                  fontSize: "clamp(20px, 4vw, 24px)",
                  lineHeight: "1.3",
                  color: "#E27832",
                  fontWeight:"500"
                }}
              >
                {deed?.goodDeed}
              </p>
              <div className='d-flex justify-content-between mt-3'>
                <p style={{color:"#979797"}}>Posted By Amber</p>
                <p style={{color:"#979797"}}>1 week ago</p>
              </div>
              <p style={{color:"#000000"}} className="mt-3 mb-3">
                {deed?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      ))}
      <div>
        <button className='view-blog-btn mb-md-5 mt-md-5'>View more</button>
      </div>
    </div>
    </>
  )
}
