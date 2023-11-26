import {
  Button,
  Container,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import * as React from 'react'
import { GoGlobe, GoPencil } from 'react-icons/go'
import { Rating } from '../Rating'
import { CardContent } from './CardContent'
import { CardHeader } from './CardHeader'
import { UserAvatar } from './UserAvatar'
import { UserCard } from './UserCard'
import Router from 'next/router'
import { isMobile } from 'react-device-detect'
import { LinkIcon } from '@chakra-ui/icons'

export const PublicProfileBanner = (props: any) => {
  const { profileData } = props

  return (
    <Container
      as={SimpleGrid}
      maxW={'10xl'}
      bg={'secondary.100'}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 6 }}
      py={{ base: 10, sm: 10, lg: 12 }}
      overflow="hidden"
      style={
        isMobile
          ? {
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }
          : { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }
      }
    >
      <UserCard position="relative">
        <Stack
          direction={{ base: 'column', xs: 'row' }}
          spacing={{ base: '4', md: '10' }}
          color="grey.100"
          style={
            isMobile ? { position: 'relative', left: '-8%', top: '-5px' } : {}
          }
        >
          <UserAvatar
            style={{ marginRight: '20px' }}
            name={profileData?.full_name || ''}
            // src="https://images.unsplash.com/photo-1506935077180-46af676a2f6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            src={
              profileData?.avatar !== null && profileData?.avatar !== ''
                ? profileData?.avatar
                : 'https://images.unsplash.com/photo-1506935077180-46af676a2f6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          //   isVerified
          />
          <CardContent>
            <CardHeader
              style={
                isMobile
                  ? {
                    position: 'relative',
                    right: '-10%'
                  }
                  : {}
              }
              title={profileData?.user_profile?.username || ''}
            />
            {/* <Text mt="1" fontWeight="medium">
            Creative Writer
          </Text> */}
            <Stack
              spacing="1"
              mt="2"
              color="grey.100"
              style={
                isMobile
                  ? {
                    position: 'relative',
                    right: '-10%'
                  }
                  : {}
              }
            >
              {/* <HStack fontSize="sm">
                <Icon as={GoGlobe} color="grey.100" />
                <Text>{profileData?.user_profile?.location || ''}</Text>
              </HStack> */}
              <HStack>
                <Rating defaultValue={profileData?.rating} size="sm" />

                <Link href={`/reviews/${profileData?.user_profile?.username}`}>
                  <Text fontSize={14}>{profileData?.review_count} Reviews</Text>
                </Link>

              </HStack>
              <Text fontSize={14}>
                {props.listingDataLength} Listings

              </Text>
            </Stack>
            {isMobile ? (
              <div
                style={{
                  display: 'flex',
                  width: '100%'
                }}
              >
                <Text
                  fontSize={12}
                  fontWeight={500}
                  maxW={'80%'}
                  mt={5}
                  style={{
                    position: 'relative',
                    left: '-35%',
                    color: '#979797',
                    paddingTop: 0
                  }}
                >
                  Bio
                </Text>
                <Text
                  fontSize={14}
                  fontWeight={500}
                  maxW={'80%'}
                  mt={5}
                  style={{ left: '-15%', position: 'relative' }}
                >
                  {profileData?.user_profile?.bio}
                </Text>
              </div>
            ) : (
              <Text fontSize={14} fontWeight={500} maxW={'80%'} mt={5}>
                {profileData?.user_profile?.bio}
              </Text>
            )}
            {profileData?.user_profile?.website_url !== null &&
              profileData?.user_profile?.website_url !== '' &&
              (isMobile ? (
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    paddingTop: 15
                  }}
                >
                  <Text
                    fontSize={12}
                    fontWeight={500}
                    maxW={'80%'}
                    style={{
                      position: 'relative',
                      left: '-35%',

                      color: '#979797',
                      paddingTop: 10
                    }}
                  >
                    URL
                  </Text>
                  <Text
                    style={{ left: '-18%', position: 'relative' }}
                    cursor={'pointer'}
                    _hover={{
                      textDecoration: 'underline'
                    }}
                    fontSize={14}
                    fontWeight={400}
                    mt={2}
                    maxW={'80%'}
                    overflow="hidden"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        if (
                          !profileData?.user_profile?.website_url.includes('http')
                        ) {
                          window.open(
                            'http://' + profileData?.user_profile?.website_url,
                            '_blank'
                          )
                        } else {
                          window.open(
                            profileData?.user_profile?.website_url,
                            '_blank'
                          )
                        }
                      }
                    }}
                  >
                    {profileData?.user_profile?.website_url}
                  </Text>
                </div>
              ) : (
                <Text
                  cursor={'pointer'}
                  _hover={{
                    textDecoration: 'underline'
                  }}
                  fontSize={14}
                  fontWeight={400}
                  mt={2}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      if (
                        !profileData?.user_profile?.website_url.includes('http')
                      ) {
                        window.open(
                          'http://' + profileData?.user_profile?.website_url,
                          '_blank'
                        )
                      } else {
                        window.open(
                          profileData?.user_profile?.website_url,
                          '_blank'
                        )
                      }
                    }
                  }}
                >
                  {profileData?.user_profile?.website_url}
                </Text>
              ))}
          </CardContent>
        </Stack>
      </UserCard>

    </Container>
  )
}
