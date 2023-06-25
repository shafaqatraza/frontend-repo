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
  isLogin,
  userId
} from '../../components/Helper/index'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Router from 'next/router'

import { CUIAutoComplete } from 'chakra-ui-autocomplete'

// import FileUpload from './uploadFile';
import UploadFile from './uploadFile'
import ListingBox from './box'
import useValidator from './useValidator'
import RadioCard from './RadioCard'
import { isMobile } from 'react-device-detect'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'


const EditListingForm = () => {
  //Hooks
  const toast = useToast()
  const [validator, showValidationMessage] = useValidator()
  const router = useRouter()
  // console.log(router);
  const { id } = router.query
  // console.log(id)
  const options = ['item', 'service']
  const [step1, setStep1] = useState(true)
  const [listingId, setListingId] = useState(typeof id !== undefined ? id : '')

  const [postType, setPostType] = useState('')
  const [listingtype, setListingtype] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [conditionId, setConditionId] = useState('')
  const [levelId, setLevelId] = useState('')
  const [avatar, setAvatar] = useState([])
  const [location, setLocation] = useState([])
  const [tmpAvtarNo, setTmpAvtarNo] = useState([])

  const [categoryHTML, setCategoryHTML] = useState('')
  const [serviceCategoryHTML, setServiceCategoryHTML] = useState('')
  const [conditionHTML, setConditionHTML] = useState('')
  const [levelHTML, setLevelHTML] = useState('')

  const [isCategoruLoading, setIsCategoryloading] = useState(false)
  const [isServiceCategoryLoading, setIsServiceCategoryLoading] = useState(false)
  const [isKeywordLoading, setIsKeywordLoading] = useState(false)
  const [isConditionLoading, setIsConditionLoading] = useState(false)
  const [isLevelLoading, setIsLevelLoading] = useState(false)

  const [pickerItems, setPickerItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [isVirtual, setIsVirtual] = useState(false)
  // const [isLoading, setIsLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  const [isDeletingorUploading, setisDeletingorUploading] = useState(false)
  const [latLng, setLatLng] = useState({})

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
      setIsCategoryloading(true)
      setIsServiceCategoryLoading(true);
      setIsConditionLoading(true)
      setIsLevelLoading(true)
      setIsKeywordLoading(true)

      if (data.status === 200) {
        let listingData = data.data.data

        setPostType(listingData.post_type)
        setListingtype(listingData.listing_type)
        setTitle(listingData.title)
        setDescription(listingData.description)
        setAmount(listingData.credit_amount)
        setAvatar(listingData.media)

        setCategoryId(
          listingData.category !== null ? listingData.category.id : ''
        )
        setConditionId(
          listingData.item_condition !== null
            ? listingData.item_condition.id
            : ''
        )
        setLevelId(
          listingData.experties_level !== null
            ? listingData.experties_level.id
            : ''
        )
        let tmpKeywords = []
        if (listingData.keywords !== null && listingData.keywords.length > 0) {
          listingData.keywords.map((i) =>
            tmpKeywords.push({ label: i.name, value: i.name })
          )
        }
        setSelectedItems(tmpKeywords)

        if (listingData.virtual !== 1) {
          if (listingData.location !== null && listingData.location !== "") {
            setLocation(listingData.location)
            handleSelect(listingData.location);
          }
        }
        setIsVirtual(listingData.virtual === 1 ? true : false)
        setIsLoading(false)
        setIsKeywordLoading(false)
        setIsCategoryloading(false)
        setIsServiceCategoryLoading(false)
        setIsConditionLoading(false)
        setIsLevelLoading(false)
        setisDeletingorUploading(false)
        if (redirect !== "" && redirect === "delete") {
          toast({
            position: 'top',
            title: 'Image deleted successfully.',
            status: 'success'
          })
        } else if (redirect !== "" && redirect === "upload") {
          toast({
            position: 'top',
            title: 'Image uploaded successfully.',
            status: 'success'
          })
        }
      } else {
        setIsLoading(false)
        setisDeletingorUploading(false)
        Router.push({ pathname: '/profile' })
      }
    } catch (e) {
      Router.push({ pathname: '/profile' })
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (!isLogin()) {
      Router.push({ pathname: '/' })
    } else {
      setIsLoading(false)
      getCategoryList()
      getServiceCategoryList()
      getConditionList()
      getLevelList()
      // getKeywordList()
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (!isLogin()) {
      setIsLoading(false)
      Router.push({ pathname: '/' })
    } else {
      if (listingId !== undefined) {
        getProfileDetails(listingId)
      }
    }
  }, [listingId])

  useEffect(() => {
    if (router.asPath !== router.route) {
      setListingId(router.query.id)
    }
  }, [router])

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item])
    setSelectedItems((curr) => [...curr, item])
  }

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  const getCategoryList = useCallback(async () => {
    setIsCategoryloading(true)
    const data = await axios.get(`${baseUrl}/listings/categories`)
    if (data.status === 200) {
      renderCategory(data.data.data, "item")
      setIsCategoryloading(false)
    } else {
      setIsCategoryloading(false)
    }
  }, [])

  const getServiceCategoryList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/listings/service-categories`)
    setIsServiceCategoryLoading(true)
    if (data.status === 200) {
      renderCategory(data.data.data, "service")
      setIsServiceCategoryLoading(false)
    } else {
      setIsServiceCategoryLoading(false)
    }
  }, [])

  const getConditionList = useCallback(async () => {
    setIsConditionLoading(true)
    const data = await axios.get(`${baseUrl}/listings/item-conditions`)
    if (data.status === 200) {
      renderCondition(data.data.data)
      setIsConditionLoading(false)
    } else {
      setIsConditionLoading(false)
    }
  }, [])

  const getLevelList = useCallback(async () => {
    setIsLevelLoading(true)
    const data = await axios.get(`${baseUrl}/listings/service-levels`)
    if (data.status === 200) {
      renderLevel(data.data.data)
      setIsLevelLoading(false)
    } else {
      setIsLevelLoading(false)
    }
  }, [])

  const deleteAvatar = async (e, id) => {
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

  const uploadAvatar = () => {
    let tmpNewImages = [...avatar];
    let formData = new FormData()
    let ttmpImages = tmpNewImages.filter(e => e.listing_id === undefined)
    for (let i = 0; i < ttmpImages.length; i++) {
      formData.append('media[' + i + ']', ttmpImages[i].originFileObj)
    }

    axios.post(baseUrl + `/user/member-listings/${listingId}/image`, formData, {
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

  const handleAvtar = (file, number) => {
    let tmpArray = avatar
    let tmpNumber = tmpAvtarNo
    if (!tmpAvtarNo.includes(number)) {
      tmpArray.push(file.file)
      tmpNumber.push(number)
      setTmpAvtarNo(tmpNumber)
    }
    setAvatar(tmpArray)
    uploadAvatar();
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validator.allValid()) {
      const formData = new URLSearchParams()
      formData.append('post_type', postType)
      formData.append('listing_type', listingtype)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('credit_amount', amount)
      formData.append('category_id', categoryId)
      formData.append('condition_id', conditionId)
      formData.append('level_id', levelId)
      formData.append('location', location)
      formData.append('virtual', isVirtual ? 1 : 0)

      let tmplatLong = ''

      if (latLng.lat !== undefined && latLng.lng !== undefined) {
        tmplatLong = latLng.lat + ',' + latLng.lng
      } else {
        if (!isVirtual) {
          setLocation('')
          toast({
            title: 'Please select the location by search',
            status: 'error'
          })
          return
        }
      }
      formData.append('coordinates', tmplatLong)

      for (let i = 0; i < selectedItems.length; i++) {
        formData.append('keywords[' + i + ']', selectedItems[i].value)
      }

      mutation.mutate(formData)
    } else {
      // validator.showMessages();
      // rerender to show messages for the first time
      showValidationMessage(true)
    }
  }

  const mutation = useMutation(
    (formData) => {
      // console.log('-------', `${baseUrl}/user/member-listings/${listingId}`)
      setIsLoading(true)
      return axios.put(
        `${baseUrl}/user/member-listings/${listingId}`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
    },
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          toast({
            title: 'Post Updated Successfully',
            status: 'success'
          })
          setIsLoading(false)
          if (router.query.from !== null && router.query.from !== undefined) {
            router.push('/listing/' + id)
          } else {
            router.push('/profile')
          }
        }
      },
      onError: (data) => {
        setIsLoading(false)
        data.response?.data?.message &&
          toast({
            title: data.response?.data?.message,
            status: 'error'
          })
      }
    }
  )

  const renderCategory = (data, type) => {
    let categoryList = ''
    if (data.length > 0) {
      categoryList = data.map((item) => (
        <Radio
          size="lg"
          value={`${item.id}`}
          _focus={{ boxShadow: 'none' }}
          colorScheme="orange"
        >
          <Flex>
            {' '}
            <Text>{item.name}</Text>
          </Flex>
        </Radio>
      ))
    }
    if (type === "item") {
      setCategoryHTML(categoryList)
    } else if (type === "service") {
      setServiceCategoryHTML(categoryList)
    }
    setCategoryHTML(categoryList)
  }

  const renderCondition = (data) => {
    let conditionList = ''
    if (data.length > 0) {
      conditionList = data.map((item) => (
        <Radio
          size="lg"
          value={`${item.id}`}
          _focus={{ boxShadow: 'none' }}
          colorScheme="orange"
        >
          <Flex>
            {' '}
            <Text>{item.name}</Text>
          </Flex>
        </Radio>
      ))
    }
    setConditionHTML(conditionList)
  }

  const renderLevel = (data) => {
    let levelList = ''
    if (data.length > 0) {
      levelList = data.map((item) => (
        <Radio
          size="lg"
          value={`${item.id}`}
          _focus={{ boxShadow: 'none' }}
          colorScheme="orange"
        >
          <Flex>
            {' '}
            <Text>{item.name}</Text>
          </Flex>
        </Radio>
      ))
    }
    setLevelHTML(levelList)
  }

  const handleSelect = (address2) => {
    setLocation(address2)
    geocodeByAddress(address2)
      .then((results) => getLatLng(results[0]))
      .then((ll) => setLatLng(ll))
      .catch((error) => console.error('Error', error))
  }

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
            {/* card 1 */}
            {isMobile ? null : (
              <Flex justifyContent="space-between">
                <ChevronLeftIcon
                  cursor="pointer"
                  w={8}
                  h={8}
                  mt={'4'}
                  color=""
                  onClick={() => router.push('/profile')}
                />
                <Text
                  size="lg"
                  as="h1"
                  textAlign="center"
                  fontSize="3xl"
                  mb="35"
                  fontWeight="400"
                  py={2}
                >
                  Edit Listing
                </Text>
                <div></div>
              </Flex>
            )}

            <ListingBox step="1" heading="Listing Type">
              <RadioGroup onChange={setListingtype} defaultValue={listingtype}>
                <Radio
                  size="lg"
                  value="offering"
                  pt="8"
                  _focus={{
                    boxShadow: 'none'
                  }}
                  colorScheme="orange"
                >
                  <Flex>
                    {' '}
                    <Text
                      color={'black'}
                      style={{ display: 'flex', fontSize: isMobile && 14 }}
                    >
                      I'm offering- <Text color={'gray.500'} pl="5px">You are offering a {postType !== 'service' ? 'item' : 'service'}</Text>
                    </Text>
                  </Flex>
                </Radio>
                <Radio
                  size="lg"
                  pt="4"
                  value="wanted"
                  _focus={{
                    boxShadow: 'none'
                  }}
                  colorScheme="orange"
                >
                  <Flex>
                    {' '}
                    <Text
                      color={'black'}
                      style={{ display: 'flex', fontSize: isMobile && 14 }}
                    >
                      I am looking- <Text color={'gray.500'} pl="5px">You want to find a {postType !== 'service' ? 'item' : 'service'}</Text>
                    </Text>
                  </Flex>
                </Radio>
              </RadioGroup>
            </ListingBox>

            {/* card2 */}
            <ListingBox step="2" heading="Listing Details">
              <FormControl mt="8" id="name" isRequired>
                <FormLabel color="gray.500">Listing Title</FormLabel>
                <Input
                  defaultValue={title}
                  variant="filled"
                  placeholder="Title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  maxLength={255}
                />
                {validator.message('title', title, 'required', {
                  messages: {
                    required: 'This is a required field'
                  }
                })}
              </FormControl>

              <FormControl mt="8" id="description" isRequired>
                <FormLabel color="gray.500">Listing Description</FormLabel>
                <Textarea
                  defaultValue={description}
                  variant="filled"
                  rows={5}
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  type="text"
                  maxLength={255}
                />
                {validator.message(
                  'description',
                  description,
                  'required|max:255',
                  {
                    messages: {
                      required: 'This is a required field',
                      max: 'Maximum 255 characters allowed'
                    }
                  }
                )}
                <Text textAlign="right" color="#979797" fontSize="14px" mt={2}>{description.length}/255</Text>
              </FormControl>
              {/* credits */}
              <FormControl mt="8" id="amount">
                <FormLabel color="gray.500">Credit Amount</FormLabel>
                <NumberInput variant="filled" defaultValue={amount}>
                  <Flex alignItems="center">
                    <NumberInputField
                      onChange={(e) => setAmount(e.target.value)}
                      variant="filled"
                      width="30%"
                    />
                    <Text ml="4"> Deed Dollars</Text>
                  </Flex>
                </NumberInput>
                {validator.message(
                  'amount',
                  amount,
                  'required|numeric|min:1,num',
                  {
                    messages: {
                      required: 'This is a required field',
                      numeric: 'Enter only numeric value',
                      min: 'Enter valid amount'
                    }
                  }
                )}
              </FormControl>


              {postType !== 'service' && (
                <FormControl mt="8" id="name" isRequired>
                  {isMobile ? (
                    <Text color="#979797" pb={'10px'} fontWeight={500}>
                      Select a Category
                    </Text>
                  ) : (
                    <FormLabel color="gray.500">Select a Category</FormLabel>
                  )}
                  <RadioGroup
                    onChange={setCategoryId}
                    defaultValue={`${categoryId}` || categoryId}
                  >
                    {!isCategoruLoading && <Stack>{categoryHTML}</Stack>}
                    {isCategoruLoading && <Spinner color="orange.500" />}
                  </RadioGroup>
                  {validator.message('categoryId', categoryId, 'required', {
                    messages: {
                      required: 'This is a required field'
                    }
                  })}
                </FormControl>
              )}

              {postType === 'service' && (
                <FormControl mt="8" id="name" isRequired>
                  {isMobile ? (
                    <Text color="#979797" pb={'10px'} fontWeight={500}>
                      Select a Category
                    </Text>
                  ) : (
                    <FormLabel color="gray.500">Select a Category</FormLabel>
                  )}
                  <RadioGroup
                    onChange={setCategoryId}
                    defaultValue={`${categoryId}` || categoryId}>
                    {!isServiceCategoryLoading && <Stack>{serviceCategoryHTML}</Stack>}
                    {isServiceCategoryLoading && <Spinner color="orange.500" />}
                  </RadioGroup>
                  {validator.message('categoryId', categoryId, 'required', {
                    messages: {
                      required: 'This is a required field'
                    }
                  })}
                </FormControl>

              )}

              {postType !== 'service' && (
                <FormControl mt="8" id="name" isRequired>
                  <FormLabel color="gray.500">Condition</FormLabel>
                  <RadioGroup
                    onChange={setConditionId}
                    defaultValue={`${conditionId}`}
                  >
                    {!isConditionLoading && <Stack>{conditionHTML}</Stack>}
                    {isConditionLoading && <Spinner color="orange.500" />}
                  </RadioGroup>
                  {validator.message('conditionId', conditionId, 'required', {
                    messages: {
                      required: 'This is a required field'
                    }
                  })}
                </FormControl>
              )}
              {postType === 'service' && (
                <FormControl mt="8" id="name" isRequired>
                  {isMobile ? (
                    <Text color="#979797" pb={'10px'} fontWeight={500}>
                      Select a Levell of Expertise
                    </Text>
                  ) : (
                    <FormLabel color="gray.500">
                      Select a Level of Expertise
                    </FormLabel>
                  )}
                  <RadioGroup
                    onChange={setLevelId}
                    defaultValue={`${levelId}` || levelId}>
                    {!isLevelLoading && <Stack>{levelHTML}</Stack>}
                    {isLevelLoading && <Spinner color="orange.500" />}
                  </RadioGroup>
                  {validator.message('levelId', levelId, 'required', {
                    messages: {
                      required: 'This is a required field'
                    }
                  })}
                </FormControl>
              )}
              {/* {postType !== 'service' && (
                <FormControl mt="8" id="name">
                  <FormLabel color="gray.500">Condition</FormLabel>
                  <RadioGroup
                    onChange={setConditionId}
                    defaultValue={`${conditionId}`}
                  >
                    {!isConditionLoading && <Stack>{conditionHTML}</Stack>}
                    {isConditionLoading && <Spinner color="orange.500" />}
                  </RadioGroup>
                  {validator.message('conditionId', conditionId, 'required', {
                    messages: {
                      required: 'This is a required field'
                    }
                  })}
                </FormControl>
              )} */}

              <FormControl mt="8" id="name" isRequired>
                <FormLabel color="gray.500">Keywords</FormLabel>
                <div className="keyword-search">
                  {isKeywordLoading && <Spinner color="orange.500" />}
                  {!isKeywordLoading && (
                    <>
                      <CUIAutoComplete
                        hideToggleButton={true}
                        label="Select a min of 3, max of 6"
                        placeholder=""
                        onCreateItem={handleCreateItem}
                        items={pickerItems}
                        selectedItems={selectedItems}
                        onSelectedItemsChange={(changes) =>
                          handleSelectedItemsChange(changes.selectedItems)
                        }
                      />
                      {validator.message(
                        'selectedItems',
                        selectedItems,
                        'required|limit',
                        {
                          messages: {
                            required: 'This is a required field',
                            limit: 'Select a min of 3, max of 6'
                          }
                        }
                      )}
                    </>
                  )}
                </div>
              </FormControl>
            </ListingBox>

            <ListingBox step="3" heading="Update Media">
              <FormControl mt="8" id="name" isRequired>

                <FormHelperText pt="2" mb="5">
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
                      onClick={(e) => deleteAvatar(e, media.id)}
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

            </ListingBox>

            <ListingBox step="4" heading="Location">
              <FormControl mt="8" id="name">
                <Flex alignItems="center" mt="4">
                  <Switch
                    isChecked={isVirtual}
                    colorScheme="orange"
                    onChange={(e) => setIsVirtual(e.target.checked)}
                    size="lg"
                    mr="2"
                  />
                  <FormLabel m="0" p="0">
                    This is a Virtual Deed
                  </FormLabel>
                </Flex>
              </FormControl>
              {!isVirtual && (
                <FormControl mt="8" id="name" isRequired>
                  <>
                    {isMobile ? (
                      <Text color="#979797" pb={'10px'} fontWeight={500}>
                        Street Address or Postal Code
                      </Text>
                    ) : (
                      <FormLabel color="gray.500" mt="8" isRequired>
                        Street Address or Postal Code
                      </FormLabel>
                    )}
                    <PlacesAutocomplete
                      value={location}
                      onChange={(e) => setLocation(e)}
                      onSelect={(e) => handleSelect(e)}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading
                      }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: isMobile ? '' : 'Search Places ...',
                              className: 'location-search-input'
                            })}
                          />
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                              const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item'
                              const style = suggestion.active
                                ? {
                                  backgroundColor: '#fafafa',
                                  cursor: 'pointer'
                                }
                                : {
                                  backgroundColor: '#ffffff',
                                  cursor: 'pointer'
                                }
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>

                  </>
                </FormControl>
              )}
            </ListingBox>

            <Button
              width={isMobile ? '100%' : '48%'}
              my="4"
              size="lg"
              mr={2}
              isDisabled={isLoading || isDeletingorUploading}
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
              Update Listing
            </Button>

            {/* {isMobile ? null : ( */}
            <Button
              width={isMobile ? '100%' : '48%'}
              my="4"
              size="lg"
              isDisabled={isLoading || isDeletingorUploading}
              onClick={() => Router.push({ pathname: '/profile' })}
              colorScheme="orange"
            >
              Cancel
            </Button>
            {/* )} */}
          </>
        )}
      </Box>
    </>
  )
}
export default EditListingForm
