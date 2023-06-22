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
  Spacer
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import { Select } from 'antd';
import React, { useEffect, useState, useCallback, useRef } from 'react'
import axios from 'axios'
import { baseUrl, accessToken } from '../../components/Helper/index'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { ChevronLeftIcon } from '@chakra-ui/icons'

import { CUIAutoComplete } from 'chakra-ui-autocomplete'

import UploadFile from './uploadFile'
import ListingBox from './box'
import useValidator from './useValidator'
import RadioCard from './RadioCard'
import { isMobile } from 'react-device-detect'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

const CreateListingForm = () => {
  //Hooks
  const toast = useToast()
  const [validator, showValidationMessage] = useValidator()
  const router = useRouter()

  const titleRef = useRef();
  const descRef = useRef();
  const creditRef = useRef();
  // const categoryRef = useRef();
  // const conditionRef = useRef();
  // const selectedItemsRef = useRef();
  // const avatarRef = useRef();
  // const locationRef = useRef();


  const options = ['item', 'service']
  const [step1, setStep1] = useState(true)

  const [postType, setPostType] = useState('')
  const [listingtype, setListingtype] = useState('offering')
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
  const [isLoading, setIsLoading] = useState(false)
  // const [address, setAddress] = useState("")
  const [latLng, setLatLng] = useState({})
  // console.log("latlngZZ", latLng)

  // const handleCreateItem = (item) => {
  //   setPickerItems((curr) => [...curr, item])
  //   setSelectedItems((curr) => [...curr, item])
  // }

  // const handleSelectedItemsChange = (selectedItems) => {
  //   console.log("dffdff", selectedItems);
  //   if (selectedItems) {
  //     setSelectedItems(selectedItems)
  //   }
  // }

  const handleChangeTags = (value) => {
    // console.log(`selected`, value);
    setSelectedItems(value)
  };

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

  useEffect(() => {
    getCategoryList()
    getServiceCategoryList()
    getConditionList()
    getLevelList()
    // getKeywordList()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(avatar)
    if (validator.allValid()) {
      var formData = new FormData()
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
        formData.append('keywords[' + i + ']', selectedItems[i])
      }
      for (let i = 0; i < avatar.length; i++) {
        formData.append('media[' + i + ']', avatar[i].originFileObj)
      }

      mutation.mutate(formData)
    } else {
      // validator.showMessages();
      // rerender to show messages for the first time
      showValidationMessage(true)
      if (title == '') {
        titleRef.current.focus();
      } else if (description == '') {
        descRef.current.focus();
      } else if (amount == '') {
        creditRef.current.focus();
      }
      // else if (categoryId == '') {
      //   categoryRef.current.focus();
      // } else if (conditionId == '') {
      //   conditionRef.current.focus();
      // } else if (selectedItems == '') {
      //   selectedItemsRef.current.focus();
      // }
    }
  }



  const mutation = useMutation(
    (formData) => {
      setIsLoading(true)
      return axios.post(`${baseUrl}/user/member-listings`, formData, {
        headers: {
          Authorization: 'Bearer ' + accessToken()
        }
      })
    },
    {
      onSuccess: (data) => {
        if (data.status === 201) {
          toast({
            title: 'Post Created Successfully',
            status: 'success'
          })
          setIsLoading(false)
          router.push('/profile')
        }
      },
      onError: (data) => {
        setIsLoading(false)
        showValidationMessage(true)
        data.response?.data?.errors != undefined && data.response?.data?.errors != ""
          ?
          Object.keys(data.response?.data?.errors).map((keyName, i) => (
            typeof data.response?.data?.errors[keyName] == "object" ?
              toast({
                title: data.response?.data?.errors[keyName],
                status: 'error'
              })
              :
              toast({
                title: data.response?.data?.errors[keyName][0],
                status: 'error'
              })
          ))
          :
          data.response?.data?.message &&
          toast({
            title: data.response?.data?.message,
            status: 'error'
          })
      }
    }
  )

  const renderCategory = (data, type) => {
    let categoryList = '';
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

  const handleChange = (address) => {

    setLocation(address)
    // this.setState({ address });
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
        py={isMobile ? '5' : '16'}
        maxWidth="xl"
        mx="auto"
      >
        {step1 && (
          <>
            <Text
              fontSize="3xl"
              mb="35"
              fontWeight={isMobile ? '600' : '400'}
              textAlign={isMobile ? 'start' : 'center'}
              py={2}
            >
              Create a New Listing
            </Text>

            <Text
              fontSize="15"
              fontWeight="400"
              color="rgba(151, 151, 151, 1)"
              py={2}
            >
              I am posting an:
            </Text>
            <Stack spacing="6">
              {options.map((value) => {
                // const radio = getRadioProps({ value })
                return (
                  <RadioCard
                    onClick={(e) => {
                      setPostType(value)
                    }}
                    key={value}
                    postType={postType}
                  >
                    {value}
                  </RadioCard>
                )
              })}
              <Spacer />
              <Button
                colorScheme="orange"
                size="lg"
                fontSize="md"
                isDisabled={postType === '' ? true : false}
                onClick={() => {
                  setStep1(false)
                }}
              >
                Next
              </Button>
            </Stack>
          </>
        )}
        {!step1 && (
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
                  onClick={() => setStep1(true)}
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
                  Create a New Listing
                </Text>
                <div></div>
              </Flex>
            )}

            {/* <ListingBox step="1" heading="Listing Type">
              <RadioGroup onChange={setListingtype} value={listingtype} display='flex' flexDirection={'column'}>
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
                      color={isMobile ? 'black' : 'gray.500'}
                      style={
                        isMobile ? { flexDirection: 'row', fontSize: 15 } : {}
                      }
                    >
                      I'm offering  {postType !== 'service' ? 'an item' : 'a service'}
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
                      color={isMobile ? 'black' : 'gray.500'}
                      style={
                        isMobile ? { flexDirection: 'row', fontSize: 15 } : {}
                      }
                    >
                      I want to find  {postType !== 'service' ? 'an item' : 'a service'}
                    </Text>

                  </Flex>
                </Radio>
              </RadioGroup>
            </ListingBox> */}

            {/* card2 */}
            <ListingBox step="1" heading="Listing Details">
              <FormControl mt="8" id="name" isRequired>
                {isMobile ? (
                  <Text color="#979797" pb={'10px'} fontWeight={500}>
                    Listing Title
                  </Text>
                ) : (
                  <FormLabel color="gray.500">Listing Title</FormLabel>
                )}
                <Input
                  variant="filled"
                  bg={'#F6F6F6'}
                  placeholder={
                    isMobile ? 'Gardening tips for front lawn' : 'Title'
                  }
                  name="title"
                  ref={titleRef}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  maxLength={255}
                  style={
                    validator.message('title', title, 'required', {
                      messages: {
                        required: 'This is a required field'
                      }
                    })
                      ? { borderColor: 'red' }
                      : {}
                  }
                />
                {validator.message('title', title, 'required', {
                  messages: {
                    required: 'This is a required field'
                  }
                })}
              </FormControl>

              <FormControl mt="8" id="description" isRequired>
                {isMobile ? (
                  <Text color="#979797" pb={'10px'} fontWeight={500}>
                    Listing Description
                  </Text>
                ) : (
                  <FormLabel color="gray.500">Listing Description</FormLabel>
                )}
                <Textarea
                  variant="filled"
                  rows={5}
                  bg={'#F6F6F6'}
                  name="description"
                  ref={descRef}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    isMobile
                      ? 'Will come to your home for 1 hour and help you plan a garden in your front lawn'
                      : 'Description'
                  }
                  type="text"
                  maxLength={255}
                  style={
                    validator.message(
                      'description',
                      description,
                      'required|max:255',
                      {
                        messages: {
                          required: 'This is a required field',
                          max: 'Maximum 255 characters allowed'
                        }
                      }
                    )
                      ? { borderColor: 'red' }
                      : {}
                  }
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
              </FormControl>
              {/* credits */}
              <FormControl mt="8" id="amount" isRequired>
                {isMobile ? (
                  <Text color="#979797" pb={'10px'} fontWeight={500}>
                    Credit Amount
                  </Text>
                ) : (
                  <FormLabel color="gray.500">Credit Amount</FormLabel>
                )}
                <NumberInput variant="filled">
                  <Flex alignItems="center">
                    <NumberInputField
                      maxLength={6}
                      bg={'#F6F6F6'}
                      onChange={(e) => setAmount(e.target.value)}
                      variant="filled"
                      ref={creditRef}
                      width="30%"
                      placeholder={isMobile ? '0' : ''}
                      style={
                        validator.message(
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
                        )
                          ? { borderColor: 'red' }
                          : {}
                      }
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
                  <RadioGroup onChange={setCategoryId} value={categoryId}>
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
                  <RadioGroup onChange={setCategoryId} value={categoryId}>
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
                  <RadioGroup onChange={setConditionId} value={conditionId} >
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
                      Select a Level of Expertise
                    </Text>
                  ) : (
                    <FormLabel color="gray.500">
                      Select a Level of Expertise
                    </FormLabel>
                  )}
                  <RadioGroup onChange={setLevelId} value={levelId}>
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

              <FormControl mt="8" id="name" isRequired>
                {isMobile ? (
                  <Text color="#979797" pb={'10px'} fontWeight={500}>
                    Keywords
                  </Text>
                ) : (
                  <FormLabel color="gray.500">Keywords</FormLabel>
                )}
                <div className="keyword-search">
                  {isKeywordLoading && <Spinner color="orange.500" />}
                  {!isKeywordLoading && (
                    <>
                      {/* <CUIAutoComplete
                        label="Select a min of 3, max of 6"
                        bg={'#F6F6F6'}
                        placeholder={
                          isMobile
                            ? 'eg. Black (press return), cotton (press return)'
                            : 'eg. Black (press return), cotton (press return)'
                        }
                        onCreateItem={handleCreateItem}
                        items={pickerItems}
                        selectedItems={selectedItems}
                        onSelectedItemsChange={(changes) =>
                          handleSelectedItemsChange(changes.selectedItems)
                        }
                      /> */}
                      <Select
                        mode="tags"
                        style={{
                          width: '100%',
                        }}
                        placeholder="Black (press return), cotton (press return)"
                        onChange={handleChangeTags}
                      >
                      </Select>
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
            {/* card3*/}
            <ListingBox step="2" heading="Media (Optional)">
              <FormControl mt="8" id="name" isRequired>
                <FormLabel color="gray.500">Upload an Image</FormLabel>
                <FormHelperText pt="2" pb={'3'} mb="4">
                  Include pictures with different angles and details. You can
                  upload a maximum of 6 photos.
                </FormHelperText>
              </FormControl>
              <Flex justifyContent="space-between">
                <UploadFile setAvatar={handleAvtar} imgNo={1} />
                <UploadFile setAvatar={handleAvtar} imgNo={2} />
              </Flex>
              <Flex justifyContent="space-between">
                <UploadFile setAvatar={handleAvtar} imgNo={3} />
                <UploadFile setAvatar={handleAvtar} imgNo={4} />
              </Flex>
              <Flex justifyContent="space-between">
                <UploadFile setAvatar={handleAvtar} imgNo={5} />
                <UploadFile setAvatar={handleAvtar} imgNo={6} />
              </Flex>
              {/* {isMobile ? (
                <Button
                  width="100%"
                  my="4"
                  size="lg"
                  onClick={handleAvtar}
                  colorScheme="orange"
                >
                  Select Images
                </Button>
              ) : null} */}
            </ListingBox>
            {/* card4*/}
            <ListingBox step="3" heading="Location">
              <FormControl mt="8" id="name">
                <Flex alignItems="center" mt="4">
                  <Switch
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
                      onChange={(e) => handleChange(e)}
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
                    <Text color={'grey'}>Don’t worry! Your address will not be visible to other users</Text>

                  </>
                </FormControl>
              )}
            </ListingBox>

            <Button
              width="100%"
              my="4"
              size="lg"
              isDisabled={isLoading}
              onClick={handleSubmit}
              colorScheme="orange"
            >
              Post Listing
            </Button>
          </>
        )}
      </Box>
    </>
  )
}
export default CreateListingForm
