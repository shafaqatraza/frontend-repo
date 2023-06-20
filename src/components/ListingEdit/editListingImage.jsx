import {
    Button,
    Box,
    Flex,
    Text,
    Switch,
    NumberInput,
    NumberInputField,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
    Radio,
    RadioGroup,
    Spinner,
    Stack,
    Spacer,
    Center,
    Icon
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import { IoClose } from 'react-icons/io5'

import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import {
    baseImgUrl,
    baseUrl,
    accessToken,
    isLogin
} from '../../components/Helper/index'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

// import FileUpload from './uploadFile';
import UploadFile from './uploadFile'
import ListingBox from './box'
import { isMobile } from 'react-device-detect'

const EditListingForm = () => {
    //Hooks
    const toast = useToast()


    const [tmpAvtarNo, setTmpAvtarNo] = useState([])
    const [avatar, setAvatar] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [isDeletingorUploading, setisDeletingorUploading] = useState(false)
    const router = useRouter()

    const { id } = router.query

    const [listingId, setListingId] = useState(typeof id !== undefined ? id : '')

    const handleAvtar = (file, number) => {
        let tmpArray = avatar
        let tmpNumber = tmpAvtarNo
        if (!tmpAvtarNo.includes(number)) {
            tmpArray.push(file.file)
            tmpNumber.push(number)
            setTmpAvtarNo(tmpNumber)
        }
        setAvatar(tmpArray)
    }

    const getProfileDetails = useCallback(async (listingId, noLoader = false, redirect = '') => {
        try {
            if (!noLoader) {
                setIsLoading(true)
            } else {
                setisDeletingorUploading(true);
            }
            const data = await axios.get(
                `${baseUrl}/user/member-listings/${listingId}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken()
                    }
                }
            )
            if (data.status === 200) {
                let listingData = data.data.data;
                setAvatar(listingData.media)
                setisDeletingorUploading(false)
                setIsLoading(false)
                if (redirect !== "" && redirect === "upload") {
                    router.back()
                } else if (redirect !== "" && redirect === "delete") {
                    toast({
                        position: 'top',
                        title: 'Image deleted successfully.',
                        status: 'success'
                    })
                }
            } else {
                setIsLoading(false)
                setisDeletingorUploading(false)
            }
        } catch (e) {
        }
    }, [])

    useEffect(() => {
        setIsLoading(true)
        if (!isLogin()) {
            setIsLoading(false)
        } else {
            if (listingId !== undefined) {
                getProfileDetails(listingId)
            }
        }
    }, [listingId])

    const handleDelete = async (e, id) => {
        e.preventDefault()

        await axios.delete(baseUrl + '/user/member-listings/delete-media/' + id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${accessToken()}`
            }
        })
            .then((res) => {
                getProfileDetails(listingId, true, 'delete');

            })
            .catch((error) => {
                getProfileDetails(listingId, true, 'delete');
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let tmpNewImages = [...avatar];
        let formData = new FormData()
        let ttmpImages = tmpNewImages.filter(e => e.listing_id === undefined)
        if (ttmpImages.length > 0) {
            setisDeletingorUploading(true);
            for (let i = 0; i < ttmpImages.length; i++) {
                formData.append('media[' + i + ']', ttmpImages[i].originFileObj)
            }

            await axios.post(baseUrl + `/user/member-listings/${listingId}/image`, formData, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${accessToken()}`,
                    'Content-Type': 'multipart/form-data;'
                }
            }).then((res) => {
                getProfileDetails(listingId, true, 'upload');
            }).catch((error) => {
                getProfileDetails(listingId, true, 'upload');
            })
        }

    }

    useEffect(() => {
        if (router.asPath !== router.route) {
            setListingId(router.query.id)
        }
    }, [router])



    return (
        <>
            <Box
                px={{ base: '4', md: '10' }}
                py={isMobile ? '2' : '16'}
                maxWidth="xl"
                mx="auto"
            >
                {isLoading && (
                    <Center h="500px">
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

                        {
                            <ListingBox heading="Update Media">
                                <FormControl mt="8" id="name" isRequired>

                                    <FormHelperText pt="2">
                                        Include pictures with different angles and details. You can
                                        upload a maximum of 6 photos.
                                    </FormHelperText>
                                </FormControl>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    {avatar.map((media) => (
                                        <div
                                            className="flex justify-center items-center"
                                            style={{
                                                backgroundColor: 'transparent',
                                                borderRadius: '50%',
                                                height: isMobile ? '140px' : '200px',
                                                width: isMobile ? '45%' : '200px',
                                                marginRight: isMobile ? '2%' : 0,
                                                position: "relative"
                                            }}
                                        >
                                            <img
                                                src={`${media.path}/${media.image}`}
                                                alt="avatar"
                                                className="create-list-img"
                                                style={{
                                                    width: isMobile ? '100%' : '200px',
                                                    height: isMobile ? '120px' : '183px'
                                                }}
                                            />
                                            <Icon
                                                as={IoClose}
                                                cursor="pointer"
                                                color="orange.500"
                                                backgroundColor="white"
                                                borderRadius="50%"
                                                fontSize={25}
                                                position="absolute"
                                                right={2}
                                                top={4}
                                                onClick={(e) => handleDelete(e, media.id)}
                                            />
                                        </div>
                                    ))}
                                    {avatar.length < 1 && <UploadFile setAvatar={handleAvtar} imgNo={1} />}
                                    {avatar.length < 2 && <UploadFile setAvatar={handleAvtar} imgNo={2} />}
                                    {avatar.length < 3 && <UploadFile setAvatar={handleAvtar} imgNo={3} />}
                                    {avatar.length < 4 && <UploadFile setAvatar={handleAvtar} imgNo={4} />}
                                    {avatar.length < 5 && <UploadFile setAvatar={handleAvtar} imgNo={5} />}
                                    {avatar.length < 6 && <UploadFile setAvatar={handleAvtar} imgNo={6} />}
                                </div>
                                <Button
                                    width={'48%'}
                                    my="4"
                                    size="lg"
                                    mr={2}
                                    isDisabled={isDeletingorUploading}
                                    onClick={handleSubmit}
                                    colorScheme="orange"
                                    style={
                                        isMobile
                                            ? {
                                                borderRadius: '70px'
                                            }
                                            : {}
                                    }
                                >
                                    Upload Images
                                </Button>

                                <Button
                                    width="48%"
                                    my="4"
                                    size="lg"
                                    onClick={() => router.push('/profile')}
                                    colorScheme="orange"
                                >
                                    Cancel
                                </Button>

                            </ListingBox>


                        }

                    </>
                )}
            </Box>
        </>
    )
}
export default EditListingForm
