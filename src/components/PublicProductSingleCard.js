import {
  AspectRatio,
  Box,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import * as React from 'react'
import { FavouriteButton } from './FavouriteButton'
import NoImage from '../../src/assets/imgs/no-image.png'
import { baseImgUrl, isLogin } from './Helper/index'
import { useRouter } from 'next/router'
import { EditIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/toast'
import { BiCamera } from 'react-icons/bi'
import moment from "moment";

export const PublicProductSingleCard = (props) => {
  const {
    product,
    rootProps,
    isEdit,
    addToWhishList,
    isBookmark,
    removeFromWhiteList,
    inWhishList,
    isImageEdit
  } = props
  const { title, credit_amount, name, media, id, created_at, image, path, slug } = product
  const created_listing = moment(created_at).utc().format('YYYY-MM-DD, h:mm a')
  const router = useRouter()
  const toast = useToast()


  // console.log("public listing", product)

  return (
    <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} maxW="250px" {...rootProps}>
      <Box
        position="relative"
        cursor={'pointer'}
        onClick={() => router.push(`/listing/${slug}`)}
      >
        <AspectRatio
          ratio={4 / 3}
          borderRadius="5px"
          backgroundColor="#ffffff"
          overflow="hidden"
        >
          <Image
            src={`${path}/${image}`}
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            width="auto !important"
            marginLeft="auto"
            marginRight="auto"
            borderRadius="0"
          />
        </AspectRatio>

        {!isEdit && (
          <FavouriteButton
            position="absolute"
            top="2"
            right="2"
            _focus={{
              // boxShadow: "none",
              outline: 'none'
            }}
            isBookmark={inWhishList}
            onClick={(e) => {
              e.stopPropagation()
              // console.log('clicked', isLogin())
              if (!isLogin()) {
                toast({
                  position: 'top',
                  title: 'Please logged in for Add to favourites list',
                  status: 'error'
                })
              } else {
                if (inWhishList) {
                  removeFromWhiteList(id)
                } else {
                  addToWhishList(id)
                }
              }
            }}
            title={`${isBookmark ? 'Remove' : 'Add'} ${title} ${isBookmark ? 'from' : 'to'
              } your favourites`}
          />
        )}
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium" fontSize={{ base: '14px', sm: 'md' }}>
            {title}
          </Text>
          <Text fontWeight="bold" fontSize={{ base: '14px', sm: 'md' }}>
            {credit_amount} credits
          </Text>
          <Text color={'grey'} fontSize={{ base: '12px', sm: '12px' }}>
            {created_listing}
          </Text>

        </Stack>
      </Stack>
    </Stack>
  )
}
