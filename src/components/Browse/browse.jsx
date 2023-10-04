import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  InputGroup,
  Stack,
  Switch,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Center,
  Spinner,
  CloseButton,
  TagRightIcon,
  Tag,
  TagLabel
} from '@chakra-ui/react'
import { Pagination, Select } from 'antd'
import 'antd/dist/antd.css'

import { useRouter } from 'next/router'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { CheckboxFilter } from '../../components/Browse/CheckboxFilter'
import { PriceRangePicker } from '../../components/Filters/PriceRangePicker'
import { KmRangePicker } from '../../components/Filters/KmRangePicker'
import { ProductSingleCard } from '../../components/ProductSingleCard'
import { PaginationSection } from '../../components/PaginationSection'
import ProductGrids from '../../components/ProductGrids'
import { SortbySelect } from '../../components/Browse/SortBySelect'
import { Loader } from '../../components/Browse/Loader'
import SearchTags from '../../components/SearchTags'
import axios from 'axios'
import { baseUrl, accessToken, isLogin } from '../../components/Helper/index'
import { useToast } from '@chakra-ui/toast'
import { isMobile } from 'react-device-detect'
import Navbar from '../Navbar'
import { useMediaQuery } from '@chakra-ui/react'

const { Option } = Select

const scrollToRef = (ref) => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: ref.current?.offsetTop, behavior: 'smooth' })
  }
}

let centerLatLng = {};

function Browse(props) {
  // console.log('@@@ isSearch', props.isSearch);
  const router = useRouter()
  // console.log('@@@ router', router);
  // console.log('@@@ router.query.search', router.query.search);
  const myRef = useRef(null)
  const toast = useToast()
  const [isSmallerThan767] = useMediaQuery('(max-width: 767px)')

  const [activeTab, setActiveTab] = useState(0)
  const [type, setType] = useState(
    router.query.type !== undefined ? router.query.type : 'offering'
  )

  const [filterData, setFilterData] = useState([])
  const [paginationMeta, setPaginationMeta] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [resetSlider, setresetSlider] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedServiceCategory, setSelectedServiceCategory] = useState([])
  const [selectedVolunteerCategory, setSelectedVolunteerCategory] = useState([])
  const [selectedDonationCategory, setSelectedDonationCategory] = useState([])
  const [selectedLevel, setSelectedLevel] = useState([])
  const [selectedCondition, setSelectedCondition] = useState([])
  const [isVirtual, setIsVirtual] = useState(0)
  const [sortBy, setSortBy] = useState('most_recent')
  const [selectedKeywords, setSelectedKeywords] = useState([])

  const [categoryList, setCategoryList] = useState([])
  const [serviceCategoryList, setServiceCategoryList] = useState([])
  const [volunteerCategoryList, setVolunteerCategoryList] = useState([])
  const [donationCategoryList, setDonationCategoryList] = useState([])
  const [conditionList, setConditionList] = useState([])
  const [levelList, setLevelList] = useState([])
  const [keywordList, setKeywordList] = useState([])
  const [keywordDataList, setKeywordDataList] = useState([])

  const [isInitialLoading, setInitialLoading] = useState(true)
  const [isFilterLoading, setIsFilterLoading] = useState(false)

  const [wihslistIds, setWishListIds] = useState([])
  const [minAddress, setMinAddress] = useState(0)
  const [maxAddress, setMaxAddress] = useState(0)

  const [volunteerData, setVolunteerData] = useState([])
  const [donationData, setDonationData] = useState([])

  // console.log("selectedVolunteerCategory", selectedVolunteerCategory)
  // console.log("selectedServiceCategory", selectedServiceCategory)

  // const [tmpLoading, setTmpLoading] = useState(false)
  let tmpLoading = true;
  
  useEffect(() => {
    if(router.query.activeTab !== undefined){
      refreshFilter(Number(router.query.activeTab));
    }
  }, [router.query.activeTab]);

  const getCategoryList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/listings/categories`)
    if (data.status === 200) {
      setCategoryList(data.data.data)
    }
  }, [])

  const getServiceCategoryList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/listings/service-categories`)
    if (data.status === 200) {
      setServiceCategoryList(data.data.data)
    }
  }, [])

  const getVolunteerCategoryList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/volunteer-listings/categories`)
    if (data.status === 200) {
      setVolunteerCategoryList(data.data.data)
    }
  }, [])

  const getDonationCategoryList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/donation-listings/categories`)
    if (data.status === 200) {
      setDonationCategoryList(data.data.data)
    }
  }, [])

  const getKeywordList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/listings/keywords`)
    if (data.status === 200) {
      generateKeywordList(data.data.data)
      setKeywordDataList(data.data.data)
    }
  }, [])

  const generateKeywordList = (data) => {
    const children = []
    for (let i = 0; i < data.length; i++) {
      children.push(<Option key={data[i].id}>{data[i].name}</Option>)
    }
    setKeywordList(children)
  }

  const getConditionList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/listings/item-conditions`)
    if (data.status === 200) {
      setConditionList(data.data.data)
    }
  }, [])

  const getLevelList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/listings/service-levels`)
    if (data.status === 200) {
      setLevelList(data.data.data)
    }
  }, [])

  const getWhishlistIds = useCallback(async () => {
    let url = `${baseUrl}/user/wishlist`
    const data = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken()
      }
    })
    if (data.status === 200) {
      setWishListIds(data.data.data)
    }
  }, [])

  const getFilterData = useCallback(async (initalLoad, obj = {}) => {
    if (initalLoad) {
      setInitialLoading(true)
    }
    setIsFilterLoading(true)



    let filterPostType =
      obj.tab !== undefined && obj.tab === 1 ? 'service' : 'item'
    let filterListingType =
      obj.type !== undefined && obj.type === 'wanted' ? 'wanted' : 'offering'
    let page = obj.page || 1
    let miPrice =
      obj.minPrice !== undefined && obj.minPrice !== '' ? obj.minPrice : ''



    let categoryArray = "";
    if (filterPostType === "service") {
      categoryArray = generateDataFromArray('category', obj.serviceCategory)
    } else {
      categoryArray = generateDataFromArray('category', obj.category)
    }
    let levelArray = generateDataFromArray('experties_level', obj.level)
    let conditionArray = generateDataFromArray('condition', obj.condition)
    let keywordArray = generateDataFromArray('keywords', obj.keyword)

    let tmpIsVirtual = obj.isVirtual === 1 ? `&virtual=1` : ''
    let tmpSortBy = obj.sortBy !== undefined ? `&sort_by=${obj.sortBy}` : ''



    let locationDataFilter = "";
    if (centerLatLng.lat !== undefined && centerLatLng.lng !== undefined) {
      let minAddress = obj.minAddress !== undefined && obj.minAddress !== '' ? obj.minAddress : '';
      let maxAddress = obj.maxAddress !== undefined && obj.maxAddress !== '' ? obj.maxAddress : '';
      if (minAddress !== "" && minAddress !== 0) {
        locationDataFilter += '&distance_from=' + minAddress;
      } else {
        locationDataFilter += '&distance_from=1';
      }
      if (maxAddress !== 0 && maxAddress !== "") {
        locationDataFilter += '&distance_to=' + maxAddress;
        locationDataFilter += '&coordinates=' + centerLatLng.lat + "," + centerLatLng.lng;
      }

    } else {

      if (obj.maxAddress !== "" && obj.maxAddress !== 0) {
        toast({ position: "top", title: "You try to apply the location filter, Please enabled the location for proper result.", status: "error" })
      }
    }

    let bURL = "";

    if (isLogin() && props.isBookmark) {
      bURL = `${baseUrl}/user/bookmarked/${filterListingType}?post_type=${filterPostType}&page=${page}&credit_range_from=${miPrice}&credit_range_to=${obj.maxPrice || ''}${locationData
        }`;
    } else if (props.isSearch) {
      bURL = `${baseUrl}/browse/${filterListingType}?post_type=${filterPostType}&page=${page}&credit_range_from=${miPrice}&credit_range_to=${obj.maxPrice || ''}${locationDataFilter}&title=${router.query.search}`;
    } else {
      bURL = `${baseUrl}/browse/${filterListingType}?post_type=${filterPostType}&page=${page}&credit_range_from=${miPrice}&credit_range_to=${obj.maxPrice || ''}${locationDataFilter}`;
    }


    let url = `${bURL}${categoryArray}${levelArray}${conditionArray}${tmpIsVirtual}${tmpSortBy}${keywordArray}`
    let data = []
    if (isLogin() && props.isBookmark) {
      data = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken()
        }
      })
    } else {
      data = await axios.get(url)
    }

    if (data.status === 200) {
      setFilterData(data.data.data)
      setIsFilterLoading(false)
      setPaginationMeta(data.data.meta)
      if (initalLoad) {
        setInitialLoading(false)
      }
    } else {
      setIsFilterLoading(false)
      if (initalLoad) {
        setInitialLoading(false)
      }
    }
  }, [router?.query?.search])

  const refreshFilter = (currentTab) => {
    setActiveTab(currentTab)
    setCurrentPage(1)
    setSelectedCategory([])
    setSelectedServiceCategory([])
    setSelectedDonationCategory([])
    setSelectedVolunteerCategory([])
    let obj = getCurerntFilter({ type: type, tab: currentTab, page: 1, category: [], serviceCategory: [], serviceCategory: [] })
    if (currentTab === 0 || currentTab === 1) {
      getFilterData(false, obj)
    } else if (currentTab === 2 || currentTab === 3) {
      getdonationVolunteerData(currentTab)
    }
  }

  const getdonationVolunteerData = useCallback(async (currentTab) => {
    if (!props.isBookmark && !props.isSearch) {
      setIsFilterLoading(true)
      if (currentTab === 2) {
        let url = `${baseUrl}/browse/volunteer-listings`
        const data = await axios.get(url)
        if (data.status === 200) {
          setIsFilterLoading(false)
          setVolunteerData(data.data.data)
        }
      } else if (currentTab === 3) {
        let url = `${baseUrl}/browse/donation-listings`
        const data = await axios.get(url)
        console.log('mobeeen', data.data.data)
        if (data.status === 200) {
          setIsFilterLoading(false)
          setDonationData(data.data.data)
        }
      }
    }
  }, [])


  useEffect(() => {
    getCategoryList()
    getServiceCategoryList()
    getVolunteerCategoryList()
    getDonationCategoryList()
    getConditionList()
    getLevelList()
    // getKeywordList()
    if (isLogin()) {
      getWhishlistIds()
    }
  }, [])

  useEffect(() => {
    setInitialLoading(true)
    setIsFilterLoading(true);

    if (router.query.type !== undefined) {
      // setActiveTab()
      setType(router.query.type);
      setActiveTab(
        router.query.activeTab !== undefined
          ? parseInt(router.query.activeTab)
          : 0
      )
      let obj = getCurerntFilter({
        tab:
          router.query.activeTab !== undefined
            ? parseInt(router.query.activeTab)
            : 0,
        type: router.query.type
      })
      getFilterData(true, obj);
      tmpLoading = false;
    } else {
      let obj = getCurerntFilter({ type: type, tab: activeTab })
      getFilterData(true, obj);
    }
  }, [router.query.type, router.query.search])

  const onPageChange = (e) => {
    setCurrentPage(e)
    let obj = getCurerntFilter({ type: type, tab: activeTab, page: e })
    getFilterData(false, obj)
    scrollToRef(myRef)
  }

  const getCurerntFilter = (e) => {
    let obj = {
      type: e.type,
      tab: e.tab,
      page: e.page || 1,
      minPrice: e.minPrice !== undefined ? e.minPrice : minPrice,
      maxPrice: e.maxPrice || maxPrice !== 0 ? maxPrice : '',
      category: e.category || selectedCategory,
      serviceCategory: e.serviceCategory || selectedServiceCategory,
      volunteerCategory: e.volunteerCategory || selectedVolunteerCategory,
      donationCategory: e.donationCategory || selectedDonationCategory,
      level: e.level || selectedLevel,
      condition: e.condition || selectedCondition,
      isVirtual: isVirtual,
      sortBy: e.sortBy !== undefined ? e.sortBy : sortBy,
      keyword: e.keyword || selectedKeywords,
      minAddress: e.minAddress !== undefined ? e.minAddress : minAddress,
      maxAddress: e.maxAddress !== undefined ? e.maxAddress : maxAddress
    }
    return obj
  }

  const generateDataFromArray = (type, data) => {
    let result = ''
    if (data !== undefined && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        result += `&${type}[${i}]=${data[i]}`
      }
    }
    return result
  }

  const [mobileFilter, setMobileFilter] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ("geolocation" in window.navigator) {
        window.navigator.geolocation.getCurrentPosition(async function (
          position
        ) {
          let obj = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          centerLatLng = obj;
        });
      } else {
        alert("Please allow location for the map");
      }
    }
  }, [])

  const showMobileFilter = () => {
    setMobileFilter(!mobileFilter)
  }
  const handleApplyFilter = () => {

    if (mobileFilter) {
      setMobileFilter(!mobileFilter)
    }
    setCurrentPage(1)
    let obj = getCurerntFilter({ type: type, tab: activeTab, page: 1 })
    getFilterData(false, obj)
    scrollToRef(myRef)
  }

  const onChangePrice = (e, type) => {
    Promise.resolve()
      .then(() => {
        setresetSlider(true)
        if (type === 'min') {
          setMinPrice(parseInt(e))
        } else if (type === 'slider') {
          setMinPrice(e[0])
          setMaxPrice(e[1])
          setresetSlider(false)
        } else {
          setMaxPrice(parseInt(e))
        }
      })
      .then(() => setresetSlider(false))
  }

  const onChangeKilomiter = (e, type) => {
    Promise.resolve()
      .then(() => {

        setresetSlider(true)
        if (type === 'min') {
          setMinAddress(parseInt(e))
        } else if (type === 'slider') {
          setMinAddress(e[0])
          setMaxAddress(e[1])
          setresetSlider(false)
        } else {
          setMaxAddress(parseInt(e))
        }
      })
      .then(() => setresetSlider(false))
  }

  const onChangeAddress = (e, type) => {
    Promise.resolve()
      .then(() => {
        if (type === 'min') {
          setMinPrice(parseInt(e))
        } else if (type === 'slider') {
          setMinAddress(e[0])
          setMaxAddress(e[1])
        }
      })
      .then(() => setresetSlider(false))
  }

  const removeFilter = (tmptype = '', id = '') => {
    let filterKeyword = [...selectedKeywords],
      filterCategory = [...selectedCategory],
      filterServiceCategory = [...selectedServiceCategory],
      filterVolunteerCategory = [...selectedVolunteerCategory],
      filterDonationCategory = [...selectedDonationCategory],
      filterLevel = [...selectedLevel],
      filterCondition = [...selectedCondition],
      min = minPrice,
      max = maxPrice,
      minAdd = minAddress,
      maxAdd = maxAddress,
      tmpSortBy = sortBy

    if (tmptype === 'keyword') {
      filterKeyword = selectedKeywords.filter((e) => e !== id.toString())
      setSelectedKeywords(filterKeyword)
    } else if (tmptype === 'category') {
      filterCategory = selectedCategory.filter((e) => e !== id)
      setSelectedCategory(filterCategory)
    } else if (tmptype === 'serviceCategory') {
      filterServiceCategory = selectedServiceCategory.filter((e) => e !== id)
      setSelectedServiceCategory(filterServiceCategory)
    } else if (tmptype === 'volunteerCategory') {
      filterVolunteerCategory = selectedVolunteerCategory.filter((e) => e !== id)
      setSelectedVolunteerCategory(filterVolunteerCategory)
    } else if (tmptype === 'donationCategory') {
      filterDonationCategory = selectedDonationCategory.filter((e) => e !== id)
      setSelectedDonationCategory(filterDonationCategory)
    } else if (tmptype === 'level') {
      filterLevel = selectedLevel.filter((e) => e !== id)
      setSelectedLevel(filterLevel)
    } else if (tmptype === 'condition') {
      filterCondition = selectedCondition.filter((e) => e !== id)
      setSelectedCondition(filterCondition)
    } else if (tmptype === 'min') {
      setresetSlider(true)
      min = 0
      setMinPrice(0)
      setTimeout(() => {
        setresetSlider(false)
      }, 10)
    } else if (tmptype === 'max') {
      setresetSlider(true)
      max = ''
      setMaxPrice(0)
      setTimeout(() => {
        setresetSlider(false)
      }, 10)
    } else if (tmptype === 'minAdd') {
      setresetSlider(true)
      minAdd = 0
      setMinAddress(0)
      setTimeout(() => {
        setresetSlider(false)
      }, 10)
    } else if (tmptype === 'maxAdd') {
      setresetSlider(true)
      maxAdd = ''
      setMaxAddress(0)
      setTimeout(() => {
        setresetSlider(false)
      }, 10)
    } else if (tmptype === 'sort') {
      tmpSortBy = 'most_recent'
      setSortBy(tmpSortBy)
    } else if (tmptype === 'all') {
      (filterKeyword = []),
        (filterCategory = []),
        (filterServiceCategory = []),
        (filterVolunteerCategory = []),
        (filterDonationCategory = []),
        (filterLevel = []),
        (filterCondition = [])
      setSelectedKeywords([])
      setSelectedCategory([])
      setSelectedServiceCategory([])
      setSelectedVolunteerCategory([])
      setSelectedDonationCategory([])
      setSelectedLevel([])
      setSelectedCondition([])

      setresetSlider(true)
      min = 0
      setMinPrice(0)
      setTimeout(() => {
        setresetSlider(false)
      }, 10)

      setresetSlider(true)
      max = ''
      setMaxPrice(0)
      setTimeout(() => {
        setresetSlider(false)
      }, 10)

      minAdd = ''
      setMinAddress(0)
      setTimeout(() => {
        setresetSlider(false)
      }, 10)

      maxAdd = ''
      setMaxAddress(0)
      setTimeout(() => {
        setresetSlider(false)
      }, 10)

      tmpSortBy = 'most_recent'
      setSortBy(tmpSortBy)
    }

    let obj = getCurerntFilter({
      type: type,
      tab: activeTab,
      page: 1,
      keyword: filterKeyword,
      category: filterCategory,
      level: filterLevel,
      condition: filterCondition,
      minPrice: min,
      maxPrice: max,
      minAddress: minAdd,
      maxAddress: maxAdd,
      sortBy: tmpSortBy,
      serviceCategory: filterServiceCategory,
      volunteerCategory: filterVolunteerCategory,
      donationCategory: filterDonationCategory
    })
    getFilterData(false, obj)
  }

  const addToWhishList = async (id) => {
    let fd = new FormData()
    fd.append('listing_id', id)
    const data = await axios.post(
      `${baseUrl}/user/wishlist/store?listing_id=${id}`,
      fd,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken()
        }
      }
    )
    // toast({ position: "top", title: "Post added to your wishlist.", status: "success" })
    getWhishlistIds()
    // let obj = getCurerntFilter({ tab: activeTab, type: router.query.type });
    // getFilterData(true, obj);
  }

  const removeFromWhiteList = async (id) => {
    let fd = new FormData()
    fd.append('listing_id', id)
    const data = await axios.delete(`${baseUrl}/user/wishlist/delete/${id}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken()
      }
    })
    // toast({ position: "top", title: "Post removed from your wishlist.", status: "success" })

    getWhishlistIds()
    // let obj = getCurerntFilter({ tab: activeTab, type: router.query.type });
    // getFilterData(true, obj);
  }

  return (
    <Box>
      {!mobileFilter && (
        <Navbar />
      )}
      <Box
        maxW="9xl"
        mx="auto"
        px={{ base: '4', md: '4', lg: '8' }}
        py={{ base: '6', md: '8', lg: '12' }}
        pb="0"
      >
        {isInitialLoading && (
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
        {!isInitialLoading && (
          <Box>
            <Grid templateColumns={{ base: '1fr', md: '340px 1fr' }} gap="4">
              <Stack
                spacing="0"
                width={mobileFilter ? "100%" : "420px"}
                pl="0"
                mt={!mobileFilter && { base: '8', md: '16', lg: '24' }}
                display={{ base: mobileFilter ? 'flex' : 'none', md: 'flex' }}
                height={mobileFilter ? isMobile && "97vh" : "auto"}
              >
                {mobileFilter && (
                  <CloseButton position="absolute" left="3" top="2" onClick={() => showMobileFilter()} />
                )}
                <Text fontSize="2xl" fontWeight="500" textAlign="center" mb="20px !important">Filters</Text>
                <Accordion
                  allowToggle
                  defaultIndex={[0]}
                >
                  <AccordionItem>
                    <h2>
                      <AccordionButton p="4" pl="2" _focus={{ boxShadow: 'none' }}>
                        <Box flex="1" textAlign="left">
                          <Text
                            fontSize="22"
                            fontWeight="semibold"
                            as="legend"
                            mb="0"
                          >
                            Filter By
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} pl="2">
                      {/* Deed dollars range filter */}
                      {activeTab === 0 || activeTab === 1 ?
                        <Stack spacing="5">
                          <FormLabel fontWeight="semibold" as="legend" mb="0">
                            Deed Dollars Range
                          </FormLabel>

                          {!resetSlider && (
                            <PriceRangePicker
                              defaultValue={[
                                parseInt(minPrice),
                                parseInt(maxPrice)
                              ]}
                              max={5000}
                              changeRange={(e) => {
                                onChangePrice(e, 'slider')
                              }}
                            />
                          )}
                          {resetSlider && (
                            <PriceRangePicker
                              defaultValue={[
                                parseInt(minPrice),
                                parseInt(maxPrice)
                              ]}
                              max={5000}
                              changeRange={(e) => {
                                onChangePrice(e, 'slider')
                              }}
                            />
                          )}

                          {!resetSlider && (
                            <Flex justifyContent="space-between">
                              <Input
                                type="text"
                                placeholder="100"
                                maxWidth={100}
                                width="auto"
                                h={34}
                                bgColor={'grey.200'}
                                fontSize="sm"
                                border={0}
                                px={2}
                                onBlur={(e) => {
                                  if (e?.target?.value) {
                                    onChangePrice(e.target.value, 'min')
                                  } else onChangePrice(0, 'min');
                                }}
                                // defaultValue={`${minPrice} deed dollars`}
                                defaultValue={minPrice !== 0 ? `${minPrice} deed dollars` : ''}
                              />
                              <Input
                                type="text"
                                placeholder="5000"
                                maxWidth={100}
                                width="auto"
                                h={34}
                                bgColor={'grey.200'}
                                fontSize="sm"
                                border={0}
                                px={2}
                                onBlur={(e) => {
                                  if (e?.target?.value) {
                                    onChangePrice(e.target.value, 'max')
                                  } else onChangePrice(0, 'max')
                                }}
                                defaultValue={maxPrice !== 0 ? `${maxPrice} deed dollars` : ''}
                              />
                            </Flex>
                          )}

                          {resetSlider && (
                            <HStack spacing="6">
                              <Input
                                type="number"
                                placeholder="100 deed dollars"
                                w={92}
                                h={34}
                                bgColor={'grey.200'}
                                fontSize="sm"
                                border={0}
                                px={3}
                                onBlur={(e) => {
                                  onChangePrice(e.target.value, 'min')
                                }}
                                defaultValue={minPrice !== 0 ? `${minPrice} deed dollars` : ''}
                              />
                              <Input
                                type="number"
                                placeholder="300 deed dollars"
                                w={92}
                                h={34}
                                bgColor={'grey.200'}
                                fontSize="sm"
                                border={0}
                                px={3}
                                onBlur={(e) => {
                                  onChangePrice(e.target.value, 'max')
                                }}
                                defaultValue={maxPrice !== 0 ? `${maxPrice} deed dollars` : ''}
                              />
                            </HStack>
                          )}
                        </Stack>
                        : null
                      }

                      {/* Categories filters */}
                      {activeTab === 0 && (
                        <CheckboxFilter
                          spacing="3"
                          options={categoryList}
                          label="Category"
                          onCheckboxChange={(e) => setSelectedCategory(e)}
                          defaultValue={selectedCategory}
                        />
                      )}
                      {activeTab === 1 && (
                        <CheckboxFilter
                          spacing="3"
                          options={serviceCategoryList}
                          label="Category"
                          onCheckboxChange={(e) => setSelectedServiceCategory(e)}
                          defaultValue={selectedServiceCategory}
                        />
                      )}
                      {activeTab === 2 && (
                        <CheckboxFilter
                          spacing="3"
                          options={volunteerCategoryList}
                          label="Category"
                          onCheckboxChange={(e) => setSelectedVolunteerCategory(e)}
                          defaultValue={selectedVolunteerCategory}
                        />
                      )}
                      {activeTab === 3 && (
                        <CheckboxFilter
                          spacing="3"
                          options={donationCategoryList}
                          label="Category"
                          onCheckboxChange={(e) => setSelectedDonationCategory(e)}
                          defaultValue={selectedDonationCategory}
                        />
                      )}

                      {/* Condition Filter */}
                      <div className='sidebarCategory'>
                        {activeTab === 0 && (
                          <CheckboxFilter
                            spacing="3"
                            options={conditionList}
                            label="Condition"
                            onCheckboxChange={(e) => {
                              setSelectedCondition(e)
                            }}
                            defaultValue={selectedCondition}
                          />
                        )}
                      </div>
                      {/* Level of Expertise Filter */}
                      <div className='sidebarCategory'>
                        {activeTab === 1 && (
                          <CheckboxFilter
                            spacing="3"
                            options={levelList}
                            label="Level of Expertise"
                            onCheckboxChange={(e) => setSelectedLevel(e)}
                            defaultValue={selectedLevel}
                          />
                        )}
                      </div>
                      <div className='sidebarCategory'>
                        {activeTab === 2 && (
                          <CheckboxFilter
                            spacing="3"
                            options={levelList}
                            label="Level of Expertise"
                            onCheckboxChange={(e) => setSelectedLevel(e)}
                            defaultValue={selectedLevel}
                          />
                        )}
                      </div>
                      {/* Location Filter */}
                      <Stack spacing="5" mt={5}>
                        <label style={{ fontSize: 16, fontWeight: 600 }}>Location</label>
                        {!resetSlider && (
                          <KmRangePicker
                            defaultValue={[
                              parseInt(minAddress),
                              parseInt(maxAddress)
                            ]}
                            max={5000}
                            changeRange={(e) => {
                              onChangeKilomiter(e, 'slider')
                            }}
                          />
                        )}
                        {resetSlider && (
                          <KmRangePicker
                            defaultValue={[
                              parseInt(minAddress),
                              parseInt(maxAddress)
                            ]}
                            max={5000}
                            changeRange={(e) => {
                              onChangeKilomiter(e, 'slider')
                            }}
                          />
                        )}

                        {!resetSlider && (
                          <Flex justifyContent="space-between">
                            <Input
                              type="text"
                              placeholder="5000 km"
                              w={92}
                              h={34}
                              bgColor={'grey.200'}
                              fontSize="sm"
                              border={0}
                              px={3}
                              onBlur={(e) => {
                                if (e?.target?.value) {
                                  onChangeKilomiter(e.target.value, 'min')
                                } else onChangeKilomiter(0, 'min')
                              }}
                              defaultValue={`${minAddress} km`}
                            />
                            <Input
                              type="text"
                              placeholder="5000 km"
                              w={92}
                              h={34}
                              bgColor={'grey.200'}
                              fontSize="sm"
                              border={0}
                              px={3}
                              onBlur={(e) => {
                                if (e?.target?.value) {
                                  onChangeKilomiter(e.target.value, 'max')
                                } else onChangeKilomiter(0, 'max')
                              }}
                              defaultValue={maxAddress !== 0 ? `${maxAddress} km` : ''}
                            />
                          </Flex>
                        )}

                        {resetSlider && (
                          <HStack spacing="6">
                            <Input
                              type="number"
                              placeholder="100 km"
                              w={92}
                              h={34}
                              bgColor={'grey.200'}
                              fontSize="sm"
                              border={0}
                              px={3}
                              onBlur={(e) => {
                                onChangeKilomiter(e.target.value, 'min')
                              }}
                              defaultValue={minAddress !== 0 ? `${minAddress} km` : ''}
                            />
                            <Input
                              type="number"
                              placeholder="300 km"
                              w={92}
                              h={34}
                              bgColor={'grey.200'}
                              fontSize="sm"
                              border={0}
                              px={3}
                              onBlur={(e) => {
                                onChangeKilomiter(e.target.value, 'max')
                              }}
                              defaultValue={maxAddress !== 0 ? `${maxAddress} km` : ''}
                            />
                          </HStack>
                        )}
                      </Stack>
                      {/* <PriceRangePicker
                        defaultValue={[minPrice, maxPrice]}
                        changeRange={(e) => {
                          onChangeAddress(e, 'slider')
                        }}
                      />
                      <HStack spacing="6">
                        <Input
                          type="number"
                          placeholder="0 km"
                          w={92}
                          h={34}
                          bgColor={'grey.200'}
                          fontSize={12}
                          border={0}
                          px={3}
                        />
                        <Input
                          type="number"
                          placeholder="100 km"
                          w={92}
                          h={34}
                          bgColor={'grey.200'}
                          fontSize={12}
                          border={0}
                          px={3}
                        /> */}
                      {/* </HStack>
                    </Stack> */}
                      <FormControl display="flex" alignItems="center" mt={5}>
                        <Switch
                          id="email-alerts"
                          mr="2"
                          _focus={{ boxShadow: 'none' }}
                          defaultValue={isVirtual}
                          colorScheme="orange"
                          onChange={(e) => setIsVirtual(e.target.checked ? 1 : 0)}
                          css={`
                          > span:first-of-type {
                            box-shadow: unset;
                          }
                        `}
                        />
                        <FormLabel
                          htmlFor="email-alerts"
                          mb="0"
                          m={1}
                          fontSize={14}
                          fontWeight={400}
                        >
                          Search for Virtual Deeds
                        </FormLabel>
                      </FormControl>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Accordion allowToggle borderTopColor={'transparent'}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton p="4" pl="2" _focus={{ boxShadow: 'none' }}>
                        <Box flex="1" textAlign="left">
                          <Text
                            fontSize="22"
                            fontWeight="semibold"
                            as="legend"
                            mb="0"
                          >
                            Sort By
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel mr={0} ml={0} pr={0} pl={0} mt={3} pb={4}>
                      <HStack display="flex">
                        <SortbySelect
                          defaultValue={sortBy}
                          changeSortBy={(e) => setSortBy(e)}
                        />
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Accordion allowToggle borderTopColor={'transparent'}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton p="4" pl="2" _focus={{ boxShadow: 'none' }}>
                        <Box flex="1" textAlign="left">
                          <Text
                            fontSize="22"
                            fontWeight="semibold"
                            as="legend"
                            mb="0"
                          >
                            Search By Tags
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel mr={0} ml={0} pr={0} pl={0} pb={4} mt={3}>
                      <HStack display="flex">
                        <Select
                          className='browse-list-tag-select'
                          mode="tags"
                          style={{ width: '100%' }}
                          placeholder="please type tags"
                          value={selectedKeywords}
                          notFoundContent={"please type tags"}
                          onChange={(e) => setSelectedKeywords(e)}
                          showSearch={true}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0 ||
                            option.props.value
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {keywordList}
                        </Select>
                        {/* <InputGroup size="lg">
                                                <Input
                                                    placeholder="Search"
                                                    bg="grey.200"
                                                    borderRadius={25}
                                                />
                                            </InputGroup> */}
                      </HStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                {activeTab === 0 || activeTab === 1 ?
                  <Text
                    color={'primary.300'}
                    textAlign="center"
                    fontWeight={500}
                    margin="20px 0 !important"
                  >
                    {paginationMeta.total || 0} Results
                  </Text>
                  : null}
                <Box mt={isSmallerThan767 ? 'auto !important' : 0} pb={5}>
                  <Button
                    onClick={() => handleApplyFilter()}
                    type="submit"
                    minHeight={"51px"}
                    w={'100%'}
                    colorScheme="custom"
                  >
                    Apply Filters
                  </Button>
                </Box>
              </Stack>
              {mobileFilter ? null : <Box ref={myRef}>
                <Text
                  fontSize="2xl"
                  fontWeight="semibold"
                  pb={3}
                  mb={4}
                  pr={'5%'}
                  pl={{ base: '8', md: '12', lg: '16' }}
                  textAlign={isMobile ? 'left' : "center"}
                >
                  {props.isSearch && `Search results “${router.query.search}”`} <br />
                  {props.isBookmark
                    ? 'Bookmarked Deeds'
                    : type == 'wanted'
                      ? 'Browse Wanted'
                      : 'Browse Offering'}
                </Text>
                <Box>
                  <Tabs index={+activeTab}>
                    <Flex justify="center">
                      <TabList
                        bg="grey.200"
                        color="grey.400"
                        borderRadius="30px"
                        borderColor="grey.300"
                        borderWidth="1px"
                        overflow="hidden"
                        position="relative"
                        fontWeight="bold"
                        fontSize={isSmallerThan767 ? 12 : 16}
                      // style={isSmallerThan767 ? { width: '100%', margin: "0 30px" } : {}}
                      >
                        <Tab
                          _focus={{ outline: 'none' }}
                          _selected={{ color: 'primary.300' }}
                          borderRadius="30px"
                          px={isSmallerThan767 ? 4 : 14}
                          fontWeight="600"
                          fontSize={isSmallerThan767 ? 12 : 16}
                          // style={isSmallerThan767 ? { width: '50%' } : {}}
                          onClick={() => refreshFilter(0)}
                        >
                          <Text zIndex="100">Items</Text>
                        </Tab>
                        <Tab
                          // style={isSmallerThan767 ? { width: '50%' } : {}}
                          fontSize={isSmallerThan767 ? 12 : 16}
                          _focus={{ outline: 'none' }}
                          _selected={{ color: 'orange.400' }}
                          borderRadius="30px"
                          px={isSmallerThan767 ? 4 : 10}
                          fontWeight="600"
                          onClick={() => refreshFilter(1)}
                        >
                          <Text zIndex="100">Services</Text>
                        </Tab>
                        <Tab
                          // style={isSmallerThan767 ? { width: '50%' } : {}}
                          fontSize={isSmallerThan767 ? 12 : 16}
                          _focus={{ outline: 'none' }}
                          _selected={{ color: 'orange.400' }}
                          borderRadius="30px"
                          px={isSmallerThan767 ? 4 : 10}
                          fontWeight="600"
                          onClick={() => refreshFilter(2)}
                        >
                          <Text zIndex="100">Volunteer</Text>
                        </Tab>
                        <Tab
                          // style={isSmallerThan767 ? { width: '50%' } : {}}
                          fontSize={isSmallerThan767 ? 12 : 16}
                          _focus={{ outline: 'none' }}
                          _selected={{ color: 'orange.400' }}
                          borderRadius="30px"
                          px={isSmallerThan767 ? 4 : 14}
                          fontWeight="600"
                          onClick={() => refreshFilter(3)}
                        >
                          <Text zIndex="100">Donate</Text>
                        </Tab>


                        <TabIndicator
                          bg="white"
                          h="100%"
                          borderRadius="30px"
                          position="absolute"
                          zIndex="10"
                        />
                      </TabList>
                    </Flex>
                    <Box mt={10} px={{ base: '8', md: '12', lg: '16' }}>
                      <SearchTags
                        selectedCategory={selectedCategory}
                        selectedServiceCategory={selectedServiceCategory}
                        selectedVolunteerCategory={selectedVolunteerCategory}
                        selectedDonationCategory={selectedDonationCategory}
                        categoryList={categoryList}
                        serviceCategoryList={serviceCategoryList}
                        volunteerCategoryList={volunteerCategoryList}
                        donationCategoryList={donationCategoryList}
                        selectedLevel={selectedLevel}
                        levelList={levelList}
                        selectedCondition={selectedCondition}
                        conditionList={conditionList}
                        keywordList={keywordDataList}
                        selectedKeywords={selectedKeywords}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        minAddress={minAddress}
                        maxAddress={maxAddress}
                        sortBy={sortBy}
                        removeFilter={removeFilter}
                        showMobileFilter={() => showMobileFilter()}
                      />
                    </Box>

                    <TabPanels>
                      <TabPanel>
                        <Box
                          maxW="7xl"
                          mx="auto"
                          px={{ base: '4', md: '8', lg: '0' }}
                          py={{ base: '6', md: '8', lg: '8' }}
                          className='ms-md-5 ps-lg-3'
                        >
                          {isFilterLoading && <Loader h="300px" />}
                          {!isFilterLoading && (
                            <>
                              <ProductGrids show4={true}>
                                {filterData.length !== 0 &&
                                  filterData.map((product, index) => {
                                    return (
                                      <ProductSingleCard
                                        key={product.id}
                                        product={product}
                                        addToWhishList={(e) => addToWhishList(e)}
                                        removeFromWhiteList={(e) =>
                                          removeFromWhiteList(e)
                                        }
                                        isBookmark={props.isBookmark}
                                        inWhishList={wihslistIds.some(
                                          (o) => o.id === product.id
                                        )}
                                      />
                                    )
                                  })}
                              </ProductGrids>
                              {filterData.length === 0 && (
                                <Center h="300px" textAlign={'center'}>
                                  <Stack spacing={2} textAlign={'center'}>
                                    <Text fontWeight={500} fontSize={18}>
                                      {'No Results Found'}
                                    </Text>
                                    <Text fontWeight={400} fontSize={18}>
                                      Please try another search term
                                    </Text>
                                  </Stack>
                                </Center>
                              )}

                              <PaginationSection
                                meta={paginationMeta}
                                currentPage={currentPage}
                                changeCurrentPage={(e) => onPageChange(e)}
                              />
                              {/* <Center mt={20}>
                                                            <Pagination className="pagination-style" defaultCurrent={1} total={20} />
                                                        </Center> */}
                            </>
                          )}
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <Box
                          maxW="7xl"
                          mx="auto"
                          px={{ base: '4', md: '8', lg: '0' }}
                          py={{ base: '6', md: '8', lg: '12' }}
                          className="ms-md-5 ps-lg-3"
                        >
                          {isFilterLoading && <Loader h="300px" />}
                          {!isFilterLoading && (
                            <>
                              <ProductGrids show4={true}>
                                {filterData.length !== 0 &&
                                  filterData.map((product, index) => {
                                    return (
                                      <ProductSingleCard
                                        key={product.id}
                                        product={product}
                                        addToWhishList={(e) => addToWhishList(e)}
                                        removeFromWhiteList={(e) =>
                                          removeFromWhiteList(e)
                                        }
                                        isBookmark={props.isBookmark}
                                        inWhishList={wihslistIds.some(
                                          (o) => o.id === product.id
                                        )}
                                      />
                                    )
                                  })}
                              </ProductGrids>
                              {filterData.length === 0 && (
                                <Center h="300px">
                                  <Stack spacing={2} textAlign={'center'}>
                                    <Text fontWeight={500} fontSize={18}>
                                      {'No Results Found'}
                                    </Text>
                                    <Text fontWeight={400} fontSize={18}>
                                      Please try another search term
                                    </Text>
                                  </Stack>
                                </Center>
                              )}
                              <PaginationSection
                                meta={paginationMeta}
                                currentPage={currentPage}
                                changeCurrentPage={(e) => onPageChange(e)}
                              />
                            </>
                          )}
                        </Box>
                      </TabPanel>

                      <TabPanel>
                        <Box
                          maxW="7xl"
                          mx="auto"
                          px={{ base: '4', md: '8', lg: '0' }}
                          py={{ base: '6', md: '8', lg: '8' }}
                          className="ms-md-5 ps-lg-3"
                        >
                          {isFilterLoading && <Loader h="300px" />}
                          {!isFilterLoading && (
                            <>
                              <ProductGrids show4={true}>
                                {volunteerData.length !== 0 &&
                                  volunteerData.map((product, index) => {
                                    return (
                                      <ProductSingleCard
                                        key={index}
                                        product={product}
                                        addToWhishList={(e) => addToWhishList(e)}
                                        removeFromWhiteList={(e) =>
                                          removeFromWhiteList(e)
                                        }
                                        isBookmark={props.isBookmark}
                                        inWhishList={wihslistIds.some(
                                          (o) => o.id === product.id
                                        )}
                                      />
                                    )
                                  })}
                              </ProductGrids>
                              {volunteerData.length === 0 && (
                                <Center h="300px" textAlign={'center'}>
                                  <Stack spacing={2} textAlign={'center'}>
                                    <Text fontWeight={500} fontSize={18}>
                                      {'No Results Found'}
                                    </Text>
                                    <Text fontWeight={400} fontSize={18}>
                                      Please try another search term
                                    </Text>
                                  </Stack>
                                </Center>
                              )}

                              <PaginationSection
                                meta={paginationMeta}
                                currentPage={currentPage}
                                changeCurrentPage={(e) => onPageChange(e)}
                              />
                              {/* <Center mt={20}>
                                                            <Pagination className="pagination-style" defaultCurrent={1} total={20} />
                                                        </Center> */}
                            </>
                          )}
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <Box
                          maxW="7xl"
                          mx="auto"
                          px={{ base: '4', md: '8', lg: '0' }}
                          py={{ base: '6', md: '8', lg: '8' }}
                          className="ms-md-5 ps-lg-3"
                        >
                          {isFilterLoading && <Loader h="300px" />}
                          {!isFilterLoading && (
                            <>
                  
                            <div className='row'>
                              {donationData.length !== 0 &&
                                donationData.map((product, index) => {
                                  return (
                                          <div className='col-xl-4 col-sm-6 mb-4 '>
                                            <div className='donation-card'>
                                              <ProductSingleCard
                                                key={index}
                                                product={product}
                                                addToWhishList={(e) => addToWhishList(e)}
                                                removeFromWhiteList={(e) =>
                                                  removeFromWhiteList(e)
                                                }
                                                isBookmark={props.isBookmark}
                                                inWhishList={wihslistIds.some(
                                                  (o) => o.id === product.id
                                                )}
                                              />
                                            </div>
                                          </div>
                                          )
                                        })
                                      }
                              </div>
                             
                              {donationData.length === 0 && (
                                <Center h="300px" textAlign={'center'}>
                                  <Stack spacing={2} textAlign={'center'}>
                                    <Text fontWeight={500} fontSize={18}>
                                      {'No Results Found'}
                                    </Text>
                                    <Text fontWeight={400} fontSize={18}>
                                      Please try another search term
                                    </Text>
                                  </Stack>
                                </Center>
                              )}

                              <PaginationSection
                                meta={paginationMeta}
                                currentPage={currentPage}
                                changeCurrentPage={(e) => onPageChange(e)}
                              />
                              {/* <Center mt={20}>
                                                            <Pagination className="pagination-style" defaultCurrent={1} total={20} />
                                                        </Center> */}
                            </>
                          )}
                        </Box>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </Box>}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Browse
