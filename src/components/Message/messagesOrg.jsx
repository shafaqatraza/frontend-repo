import {
    Box,
    Flex,
    Text,
    Image,
    Spinner,

} from "@chakra-ui/react";
import React, { useRef, useEffect, useMemo, useState } from "react";
import { userId } from "../Helper/index";
import { currentOrganization } from "../Helper/index";
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
            if (msg.message !== null && msg.message !== '' && user_chat_info[0].chat_id == msg.chat_id) {
                if (currentOrganization && msg.sent_by_organization == 1 || userId == msg.sender_id) {
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
                                            {msg.type === "image" ? 
                                            <Image
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
                                        <Text  wordBreak={'break-all'} >{msg.message}</Text>
                                        <Text fontSize={"10px"}>{datePrint}</Text>
                                        </Flex>
                                    </Box>
                                </Box>
                            }
                        </>

                    )
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