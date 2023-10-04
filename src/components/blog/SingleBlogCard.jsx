import {
  Text,
  Flex,
  Box,
  Skeleton,
  useBreakpointValue,
  Image,
  AspectRatio
} from '@chakra-ui/react'
import React from 'react'
import { baseImgUrl } from '../Helper/index'
import NoImage from '../../../src/assets/imgs/no-image.png'
import moment from 'moment'
import Router from 'next/router'

export const SingleBlogCard = ({ item }) => {

  // console.log("hihihi", item)

  return (
   <>
   <div className="card shadow">
   <Box>
      <Flex>
        <AspectRatio w={'100%'} h={'280px'} ratio={4 / 4}>
          <Image
            w={'100%'}
            h={'280px'}
            objectFit="cover"
            src={
              item.image !== null ? `${item.image}` : NoImage.src
            }
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
            alt={item.title}
            onClick={() => Router.push({ pathname: `/blog/${item.slug}` })}
            cursor={'pointer'}
          />
        </AspectRatio>
      </Flex>
      <Text
        py="3"
        p="3"
        pt="4"
        fontSize="22"
        fontWeight="500"
        textAlign="left"
        color={'orange.500'}
        onClick={() => Router.push({ pathname: `/blog/${item.slug}` })}
        cursor={'pointer'}
      >
        {item.title !== null ? item.title : ''}
      </Text>
      <Flex justifyContent={'space-between'}>
        <Text
          textAlign="center"
          fontSize="14px"
          color={'rgba(151, 151, 151, 1)'}
          p="3"
        >
          posted by {item.posted_by.full_name}
        </Text>
        <Text
          textAlign="center"
          px="3"
          p="3"
          fontSize="14px"
          color={'rgba(151, 151, 151, 1)'}
        >
          {moment(item.updated_at).fromNow()}
        </Text>
      </Flex>

      <Text pt={4} fontSize="16px" p="3" mb="5" pb="5" color={'black'} noOfLines={3}>
        {item.description !== null ? item.description : ''}
      </Text>
    </Box>
   </div>
   </>
  )
}
