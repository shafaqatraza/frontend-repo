import {
    Box,
    Flex,
    Stack,
    Text,
    Avatar,
    Image,
    Spinner,
    Divider,
    InputGroup,
    InputRightElement,
    Input,
    Button,
    InputLeftElement
} from "@chakra-ui/react";
import React, { useRef, useEffect, useMemo, useState } from "react";
import HaniCam from "../../assets/imgs/add-a-photo.png";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { userId } from "../../components/Helper/index";
import moment from 'moment';

const Messages = (props) => {
    let { conversation, lastMessage , setLoaded, loaded, user_chat_info} = props
    
    const messagesEndRef = useRef(null)
    const imageReF = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    const [isLoading, setIsLoading] = React.useState(false);
    const [chats, setChats] = React.useState(false);

    const testFunction = () => {
        setLoaded(true)
    }
    useMemo(() => {
        setChats("");
        let datePrint = "";
        let chats = conversation.map((msg, key) => {
            
            datePrint = moment(msg.created_at).format('h:mm: a');
            if (msg.message !== null && user_chat_info[0].chat_id == msg.chat_id) {
                if (msg.type !== null && (msg.type === 'credit_request' || msg.type === 'transaction_rejected' || msg.type === "transaction_pending" || msg.type === "transaction_accepted" || msg.message.includes('ransferred') || msg.message.includes('ending'))) {
                    return (
                        
                        <Box
                            textAlign="center"
                            margin="7px 10px 7px auto"
                            borderRadius="25px 0px 30px 25px"
                            position='relative'
                            marginTop="15px"
                            color="#979797"
                            padding="7px 15px"
                            fontWeight={400}
                            fontSize={"14px"}
                        >
                            {  
                                msg.type === 'credit_request' && userId !== msg.sender_id &&
                                <>{msg.credits_request.sender_name} Requested {msg.credits_request.requested_credits} Credits, {msg.credits_request.created_at}</> ||
                                msg.type === 'credit_request' && userId === msg.sender_id &&
                                <>You Requested {msg.credits_request.requested_credits} Credits, {msg.credits_request.created_at}</> ||
                                msg.type !== 'credit_request' &&
                                <>{msg.message}</>
                            } 
                            

                        </Box>
                    )
                } else if (msg.type !== null && (msg.type === "review_rating" || msg.message.includes('rating')) && userId === msg.sender_id) {
                    return (
                        <Box
                            textAlign="center"
                            margin="7px 10px 7px auto"
                            borderRadius="25px 0px 30px 25px"
                            position='relative'
                            marginTop="15px"
                            color="#979797"
                            padding="7px 15px"
                            fontWeight={400}
                            fontSize={"14px"}
                        >
                            {msg.message}

                        </Box>
                    )
                } else {  
                    if (userId === msg.sender_id) {
                        return (
                            <>
                                {(msg.type === "image"  ?
                                    <> 
                                    <Image
                                        onLoad={testFunction}
                                        ref={imageReF}
                                        src={msg.message}
                                        alt={"name"}
                                        draggable="false"
                                        maxWidth="44%"
                                        margin="7px 10px 7px auto"
                                        borderRadius="25px 0px 30px 25px"
                                        position='relative'
                                        marginTop="15px"
                                        color="#FFFFFF"
                                        padding="7px 15px"
                                        fontWeight={400}
                                        fontSize={"14px"}
                                        loaded
                                        style={{display: loaded? 'block': 'none'}}
                                    /> 
                                    {!loaded && <Spinner /> }
                                    </>
                                    : 
                                    <Box width={"100%"} className="content-data" >
                                        <Box

                                            background="#183553"
                                            maxWidth="44%"
                                            margin="7px 10px 7px auto"
                                            borderRadius="25px 0px 30px 25px"
                                            position='relative'
                                            marginTop="15px"
                                            color="#FFFFFF"
                                            padding="7px 15px"
                                            fontWeight={400}
                                            fontSize={"14px"}
                                        >
                                            <Flex justifyContent={"space-between"} alignItems={"end"}>
                                                {msg.type === "image" ? <Image
                                                    src={msg.message}
                                                    alt={"name"}
                                                    draggable="false"
                                                    w="100%"
                                                    h="100%"
                                                />
                                                    : <Text  wordBreak={'break-all'} >{msg.message}</Text>}
                                                <Text fontSize={"10px"}>{datePrint}</Text>
                                            </Flex>

                                        </Box>

                                    </Box>
                                )}
                            </>

                        )
                    } else {
                        if (msg.type === null || msg.type !== "review_rating") {
                            return (
                                <>
                                    {(msg.type === "image" || msg.message.includes('http')) ?
                                        <Image
                                            src={msg.message}
                                            alt={"name"}
                                            draggable="false"
                                            maxWidth="44%"
                                            display="block"
                                            margin="7px 0px 7px 10px"
                                            color="#212121"
                                            borderRadius="0px 25px 25px 30px"
                                            padding="7px 15px"
                                            fontWeight={400}
                                            fontSize={"14px"}

                                        /> :
                                        <Box width={"100%"} className="content-data" >
                                            <Box
                                                background="#E8E8E8"
                                                display="block"
                                                maxWidth="44%"
                                                margin="7px 0px 7px 10px"
                                                color="#212121"
                                                borderRadius="0px 25px 25px 30px"
                                                padding="7px 15px"
                                                fontWeight={400}
                                                fontSize={"14px"}
                                            >
                                                <Flex justifyContent={"space-between"} alignItems={"end"}>
                                                    <Text>{msg.message}</Text>
                                                    <Text fontSize={"10px"}>{datePrint}</Text>
                                                </Flex>
                                            </Box>
                                        </Box>
                                    }
                                </>

                            )
                        }
                    }
                }

            }
        })
        setChats(chats);
    }, [conversation])

  
    useEffect(() => { })
    return (
        <Box mt="10px" >
            {chats}
        </Box >

    )
}


export default Messages;