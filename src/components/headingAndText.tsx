import {
    Container,
    SimpleGrid,
    Spacer,
    UnorderedList,
    ListItem,
    Heading,
    Text,
} from "@chakra-ui/react";
import * as React from "react";

const HeadingAndText = (props: any) => {
    const [space, setSpace] = React.useState([])
    // React.useEffect(() => {
    //     space.length = props?.space || 2
    // }, [])
    // console.log("space", space.length)
    return (
        < Container
            as={SimpleGrid}
            maxW="container.lg"
            columns={{ base: 1 }}
            spacing={{ base: 8, lg: 6 }}
            mb={{ lg: 4 }}
        >
            {
                props?.children
            }
            <Heading
                size="md"
                fontWeight="500"
                fontSize="24px"
                letterSpacing="tight"
                marginEnd={"6"}
                color="primary.300"
            >
                {props?.heading || "How Good Deeds Works"}
            </Heading>
            {props?.para && (
                <Text
                    color="black"
                    fontSize="14px">
                    {props?.para}
                </Text>
            )}
            {props?.unOrderedList && (
                <UnorderedList marginInlineStart="2em">
                    {props?.unOrderedList.map((item: any) => (
                        <ListItem marginBottom={4}>
                            <Text mb={item?.sublist ? 4 : 0}>{item.title && (<span style={{ fontWeight: 600 }}>{item.title}</span>)}{item.description}</Text>
                            {item?.sublist && (
                                <UnorderedList marginInlineStart="2em">
                                    {item.sublist.map((item: any) => (
                                        <ListItem marginBottom={4}>
                                            <Text>{item.title && (<span style={{ fontWeight: 600 }}>{item.title}</span>)}{item.description}</Text>
                                        </ListItem>
                                    ))}
                                </UnorderedList>
                            )}
                        </ListItem>
                    ))}
                </UnorderedList>
            )}
            {props?.list && (
                <UnorderedList marginInlineStart="0" listStyleType="none">
                    {props?.list.map((item: any) => (
                        <ListItem marginBottom={4}>
                            <Text mb={item?.sublist ? 4 : 0}>{item.title && (<span style={{ fontWeight: 600 }}>{item.title}</span>)}{item.description}</Text>
                            {item?.sublist && (
                                <UnorderedList marginInlineStart="2em">
                                    {item.sublist.map((item: any) => (
                                        <ListItem marginBottom={4}>
                                            <Text>{item.title && (<span style={{ fontWeight: 600 }}>{item.title}</span>)}{item.description}</Text>
                                        </ListItem>
                                    ))}
                                </UnorderedList>
                            )}
                        </ListItem>
                    ))}
                </UnorderedList>
            )}
            {props?.children}
        </Container >
    )

};

export default HeadingAndText;