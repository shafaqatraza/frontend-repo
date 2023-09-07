import {
  AspectRatio,
  Box,
  Image,
  Skeleton,
  Tag,
  TagLabel,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Icon,
  Button
} from '@chakra-ui/react'
import * as React from 'react'
import { FavouriteButton } from './FavouriteButton'
import NoImage from '../../src/assets/imgs/no-image.png'
import { baseImgUrl, isLogin, currentUserData } from '../../src/components/Helper/index'
import { useRouter } from 'next/router'
import { EditIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/toast'
import { BiCamera } from 'react-icons/bi'
import moment from "moment";

export const ProductSingleCard = (props) => {
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

  const { title, credit_amount, name, media, id, created_at, transaction_status, slug, post_type, thumbnail, created_at_human_diff, url_to_donate, category } = product

  // const created_listing = moment(created_at).utc().format('YYYY-MM-DD, h:mm a')
  const router = useRouter()
  const toast = useToast()

  const handleDonateButtonClick = (url) => {
    if (!isLogin()) {
      toast({ title: "Please login for the donation", status: "error", position: "top" });
    }else{
      window.open(`${url}?username=${currentUserData?.user_profile?.username}&listing=${slug}`, '_blank');
    }   
  };

  function TruncateText({ text, limit }) {
    const truncatedText = text.length > limit ? text.slice(0, limit) + '..' : text;
    const dotsStyle = {
      color: '#8F8C8C', 
    };
  
    return (
      <p style={{fontSize:"11px",fontWeight:"500"}}>
        {truncatedText}
        {text.length > limit && <span style={dotsStyle}>see more</span>}
      </p>
    );
  }
  

  
  return (
    <Stack position="relative" spacing={useBreakpointValue({ base: '4', md: '5' })} maxW="230px" {...rootProps}>
      <Box
      cursor={'pointer'} 
      onClick={() => router.push(`/listing/${slug}?type=${post_type}`)} 
      >
        <AspectRatio
          ratio={4 / 3}

          borderRadius="5px"
          backgroundColor="#ffffff"
          overflow="hidden"
        >
          <Image
            src={
              (post_type === 'item' || post_type === 'service') &&
              media.length > 0
                ? media[0].path.startsWith('https://')
                  ? `${media[0].path}/${media[0].image}`
                  : `${baseImgUrl}${media[0].path}/${media[0].image}`
                : thumbnail != null
                ? thumbnail
                : NoImage.src
            }
            alt={name}
            draggable="false"
            fallback={<img src={NoImage.src} alt="No Image" />}
            width="100% !important"
            margin={0}
            borderRadius="0"
          />
        </AspectRatio>
        {post_type == 'donation' &&
          <Tag size='lg' bg={'#E27832'} color="#FFF" fontSize={"12px"} fontWeight={'600'} borderRadius='full' position={'absolute'} top="-40px" right={'-8px'}>
            <TagLabel>{category}</TagLabel>
          </Tag>
        }

        {isEdit && (

          <EditIcon
            color="orange.500"
            position="absolute"
            top="2"
            right="2"
            aria-label={`Edit ${title} post`}
            cursor={'pointer'}
            onClick={(e) => {
              e.stopPropagation();
              router.push('/edit-listing/' + slug)
            }}
          />
        )}
        {isImageEdit && (
          <BiCamera
            style={{
              position: "absolute",
              top: "6px",
              right: "36px",
              cursor: 'pointer',
              fontSize: "22px",
              color: "#DD6B20"
            }}
            onClick={(e) => {
              e.stopPropagation();
              router.push('/edit-listing-image/' + slug)
            }}
          />
        )}

        {!isEdit && (
          <FavouriteButton
            position="absolute"
            top="2"
            right="2"
            className="whishlist"
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
        {transaction_status != null && transaction_status != 'Completed' &&
          <Text color={'grey'}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#f3f3f3',
              borderRadius: '10px',
              width: '70%',
              padding: '5px',
              textAlign: 'center',
            }}
            fontSize={{ base: '12px', sm: '12px' }}>
            Transaction Pending
          </Text>
        }
      
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="bold" fontSize={{ base: '14px', sm: '14px' }} className="mt-3">
            {title}
          </Text>
          <TruncateText
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
            limit={120}
          />
          {!(post_type == 'donation') &&
            <Text fontWeight="bold" fontSize={{ base: '14px', sm: 'md' }}>
              {credit_amount} Deed Dollars
            </Text>
          }
          <Text color={'grey'} fontSize={{ base: '12px', sm: '12px' }}>
            {post_type == 'items' || post_type == 'service' ? created_at : post_type == 'volunteer' ? created_at_human_diff : null}
          </Text>
        
        </Stack>
      </Stack>
      </Box>
      {post_type == 'donation' ?
      <div className="text-center">
        <Button
          type="submit"
          
          colorScheme="orange"
          w={"145px"}
          maxW={'100%'}
          h={'36px'}
          borderRadius='100px'
          fontSize="12px"
          fontWeight={'600'}
          onClick={() => handleDonateButtonClick(url_to_donate)}
          className="mt-auto"
        >
          Donate
        </Button>
      </div>:
      null
    }
    </Stack >
  )
}
