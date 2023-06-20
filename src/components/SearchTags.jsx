import React, { useState, useEffect } from "react";
import { Tag, TagLabel, Box, Button, Text, Flex } from "@chakra-ui/react";
import { SmallCloseIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { GoSettings } from 'react-icons/go';
import { useMediaQuery } from '@chakra-ui/react';

const SearchTags = (props) => {
    const {
        removeFilter,
        keywordList, selectedKeywords,
        categoryList, selectedCategory,
        serviceCategoryList, selectedServiceCategory,
        conditionList, selectedCondition,
        levelList, selectedLevel,
        minPrice, maxPrice, sortBy,
        minAddress, maxAddress,
        showMobileFilter
    } = props;

    const [keywordTags, setKeywordTags] = useState([]);
    const [categoryTags, setCategoryTags] = useState([]);
    const [serviceCategoryTags, setServiceCategoryTags] = useState([]);
    const [levelTags, setLevelTags] = useState([]);
    const [conditionTags, setConditionTags] = useState([]);
    const [minTag, setMintag] = useState("");
    const [maxTag, setMaxTag] = useState(maxPrice);
    const [sortTag, setSortTag] = useState("");
    const [minAddressTag, setMinAddressTag] = useState("");
    const [maxAddressTag, setMaxAddressTag] = useState(maxAddress);

    const [isSmallerThan767] = useMediaQuery('(max-width: 767px)');

    const tagStyling = {
        size: "md",
        mr: "3",
        mb: 1,
        borderRadius: '20px',
        bg: "gray.100",
        padding: '6px 12px',
        color: "black",
    }

    useEffect(() => {
        setKeywordTags(selectedKeywords);
    }, [selectedKeywords])

    useEffect(() => {
        let result = categoryList.filter((item => selectedCategory.includes(item.id)))
        setCategoryTags(result);
    }, [selectedCategory]);

    useEffect(() => {
        let result = serviceCategoryList.filter((item => selectedServiceCategory.includes(item.id)))
        setServiceCategoryTags(result);
    }, [selectedServiceCategory]);

    useEffect(() => {
        let result = levelList.filter((item => selectedLevel.includes(item.id)))
        setLevelTags(result);
    }, [selectedLevel]);

    useEffect(() => {
        let result = conditionList.filter((item => selectedCondition.includes(item.id)))
        setConditionTags(result);
    }, [selectedCondition]);

    useEffect(() => {
        setSortTag(sortBy !== "most_recent" ? sortBy : "");
    }, [sortBy]);

    useEffect(() => {
        setMintag((minPrice && minPrice !== 0 && minPrice !== "") ? minPrice : "");
    }, [minPrice]);

    useEffect(() => {
        setMaxTag((maxPrice && maxPrice !== 0 && maxPrice !== "") ? maxPrice : "");
    }, [maxPrice]);

    useEffect(() => {
        setMinAddressTag((minAddress && minAddress !== 0 && minAddress !== "") ? minAddress : "");
    }, [minAddress]);

    useEffect(() => {
        setMaxAddressTag((maxAddress && maxAddress !== 0 && maxAddress !== "") ? maxAddress : "");
    }, [maxAddress]);

    return (
        <>
            <Flex justifyContent={isSmallerThan767 ? "space-between" : "end"} alignItems="center" pb={5}>
                {isSmallerThan767 ? (
                    <Box
                        cursor={"pointer"}
                        backgroundColor={'transparent'}
                        onClick={showMobileFilter}
                        paddingLeft="0"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon as={GoSettings} color="#E27832" transform="rotate(-90deg)" fontSize="23px" />
                        <Text color="#E27832" pl={'16px'} fontSize="md" fontWeight="500">
                            Filter
                        </Text>
                    </Box>
                ) : null}
                <Tag size={"md"} pr={"0"} key={"clear"} variant='none' color={"#E27832"} colorScheme='orange'>
                    <TagLabel
                        cursor={"pointer"}
                        fontSize="md"
                        fontWeight="500"
                        onClick={() => removeFilter('all')}
                    >
                        Clear All
                    </TagLabel>
                </Tag>
            </Flex>
            <Box>
                {keywordTags.length > 0 && keywordTags.map((item, index) =>
                (<Tag {...tagStyling} key={index}>
                    <TagLabel>{item}</TagLabel>
                    <SmallCloseIcon onClick={() => removeFilter('keyword', item)} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                </Tag>)
                )}

                {categoryTags.length > 0 && categoryTags.map((item) =>
                (<Tag {...tagStyling} key={item.id}>
                    <TagLabel>{item.name}</TagLabel>
                    <SmallCloseIcon onClick={() => removeFilter('category', item.id)} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                </Tag>)
                )}
                
                {serviceCategoryTags.length > 0 && serviceCategoryTags.map((item) =>
                (<Tag {...tagStyling} key={item.id}>
                    <TagLabel>{item.name}</TagLabel>
                    <SmallCloseIcon onClick={() => removeFilter('serviceCategory', item.id)} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                </Tag>)
                )}

                {levelTags.length > 0 && levelTags.map((item) =>
                (<Tag {...tagStyling} key={item.id}>
                    <TagLabel>{item.name}</TagLabel>
                    <SmallCloseIcon onClick={() => removeFilter('level', item.id)} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                </Tag>)
                )}

                {conditionTags.length > 0 && conditionTags.map((item) =>
                (<Tag {...tagStyling} key={item.id}>
                    <TagLabel>{item.name}</TagLabel>
                    <SmallCloseIcon onClick={() => removeFilter('condition', item.id)} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                </Tag>)
                )}

                {minTag !== "" &&
                    (<Tag {...tagStyling} key={"min"}>
                        <TagLabel>Min {minTag} Credit</TagLabel>
                        <SmallCloseIcon onClick={() => removeFilter('min')} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                    </Tag>)
                }

                {maxTag !== "" && maxTag !== 0 &&
                    (<Tag {...tagStyling} key={"max"}>
                        <TagLabel>Max {maxTag} Credit</TagLabel>
                        <SmallCloseIcon onClick={() => removeFilter('max')} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                    </Tag>)
                }

                {minAddressTag !== "" &&
                    (<Tag {...tagStyling} key={"min"}>
                        <TagLabel>Min {minAddressTag} Km</TagLabel>
                        <SmallCloseIcon onClick={() => removeFilter('minAdd')} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                    </Tag>)
                }

                {maxAddressTag !== "" &&
                    (<Tag {...tagStyling} key={"max"}>
                        <TagLabel>Max {maxAddressTag} Km</TagLabel>
                        <SmallCloseIcon onClick={() => removeFilter('maxAdd')} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                    </Tag>)
                }

                {sortTag !== "" && sortTag !== "most_recent" &&
                    (<Tag {...tagStyling} key={"sort"}>
                        <TagLabel>{sortTag === "low_to_hight" ? "Low To High" : "High To Low"}</TagLabel>
                        <SmallCloseIcon onClick={() => removeFilter('sort')} cursor={"pointer"} color="#ffffff" backgroundColor="#000000" borderRadius="10px" marginLeft="6px" />
                    </Tag>)
                }
            </Box>
        </>
    )
}

export default SearchTags;