import {
    Box,
    Flex,
    Stack,
    Text,
    Avatar,
    Image,
    Divider,
    InputGroup,
    InputRightElement,
    Input,
    Button,
    useColorModeValue,
    Center,
    Fade,
    Select
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import HaniCam from "../../assets/imgs/add-a-photo.png";
import { BsFillArrowUpCircleFill, BsChatLeftDotsFill } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import Messages from "./messages";
import TransferCreditModal from "./TransferCreditModal";
import PendingCreditModal from "./PendingCreditModal";
import Pusher from 'pusher-js';
import axios from 'axios';
import Echo from 'laravel-echo'
import { baseUrl, accessToken, userId, listingData } from "../../components/Helper/index";


const NewMessage = (props) => {

    let pusher = {}
    let [users, setUsers] = useState([])
    const [tCreditModal, setTCreditModal] = useState(false);
    const [pendingCreditModal, setPendingCreditModal] = useState(false);
    const [message, setMessage] = useState('');
    const [lastMessage, setLastMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [conversationData, setConversationData] = useState([]);
    const [chatRoom, setChatRoom] = useState({});
    const [chatId, setChatId] = useState('')
    const [userChatInformation, setUserChatInformation] = useState({})
    const [messageInfo, setMessageInfo] = useState({ chat_id: '', receiver_id: '', listing_id: '', credits: '' })
    const transferCreditHandler = async () => {
        const creditData = {
            listing_id: messageInfo.listing_id,
            credits: messageInfo.credits
        }

        pusher = {
            broadcaster: "pusher",
            key: "877cb5c78bbdba810bf0",
            cluster: "mt1",
            forceTLS: true,
            encrypted: false,
            authEndpoint: "https://good-deeds-api.thedemo.co/broadcasting/auth",
            auth: {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${accessToken()}`,
                    Accept: "application/json"
                }
            }
        };
        const echo = new Echo(pusher);
        echo.private("transaction_" + userId).listen("TransactionEvent", function (data) {
            userId == data.receiver_id

        })
        // console.log(creditData, messageInfo.credits)
        await axios.post('https://good-deeds-api.thedemo.co/api/user/transactions', creditData, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${accessToken()}`
            }
        }
        ).then((res) => {
            // console.log(res.data.id)
            setChatId(res.data.id)
        }).catch((error) => {
            console.log(error)

        })
        setTCreditModal(false)
        setPendingCreditModal(true)
    }
    const sendMessageHandler = async () => {
        if (message != '') {
            setLastMessage(message)
            const data = {
                message: message,
                sender_id: userId,
                listing_id: messageInfo.listing_id,
                receiver_id: messageInfo.receiver_id,
                chat_id: messageInfo.chat_id
            }
            await axios.post('https://good-deeds-api.thedemo.co/api/member/chats', data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${accessToken()}`
                }
            }
            ).then((res) => {
                setChatId(res.data.id)
                var element = document.getElementsByClassName("content-data")

            }).catch((error) => {
                console.log(error)

            })
        }
    }

    const getMessage = async (id, receiver_id, listing_id, sender_id) => {
        if (id != '') {
            setMessageInfo({ chat_id: '', receiver_id: '', listing_id: '', credits: '' })
            userId != receiver_id ? receiver_id = receiver_id : receiver_id = sender_id;


            await axios.get('https://good-deeds-api.thedemo.co/api/member/messages/' + id, {
                headers: {
                    "Authorization": `Bearer ${accessToken()}`
                }
            }).then((res) => {
                setUserChatInformation(res.data.data)
                setMessageInfo({ chat_id: id, receiver_id: receiver_id, listing_id: listing_id, credits: res.data.data[0].listing.credits })
                // setConversationData(res.data.data);

            }).catch((error) => {
                console.log(error)

            })
        }
    }

    const getListing = async () => {
        await axios.get('https://good-deeds-api.thedemo.co/api/member/chats/' + listingData.id, {
            headers: {
                "Authorization": `Bearer ${accessToken()}`
            }
        }).then((res) => {
            setNewMessage(res.data.data);
            setChatRoom(res.data.data)
            setMessageInfo({ chat_id: '', receiver_id: res.data.data.listing.user_id, listing_id: res.data.data.listing.id, credits: 100 })
            setUserChatInformation(res.data.data)
        })
    }

    useEffect(() => {
        if (listingData != undefined) {
            getListing();
            Pusher.logToConsole = true;
            pusher = {
                broadcaster: "pusher",
                key: "877cb5c78bbdba810bf0",
                cluster: "mt1",
                forceTLS: true,
                encrypted: false,
                authEndpoint: "https://good-deeds-api.thedemo.co/broadcasting/auth",
                auth: {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${accessToken()}`,
                        Accept: "application/json"
                    }
                }
            };
            const echo = new Echo(pusher);
            echo.private("chat_" + userId + "_" + listingData.id).listen("ChatEvent", function (data) {
                data.listing_id == listingData.id &&
                    setConversationData(conversationData => conversationData.concat(data));
                setMessage('')

            })
        }
    }, []);
    return (
        <Box
            maxW="9xl"
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}

        >
            {listingData != undefined &&
                <Box mb="20">
                    <Box mx={[5, 5, 0, 0]} >

                        <Flex h={"90vh"} direction={{ base: 'column', md: 'row' }} >

                            <Box
                                boxShadow='base'
                                bg='white'
                                ml={[0, 0, 20, 40]}
                                minW={"30%"}
                                borderWidth='1px'
                                py={10}
                                // px={10}
                                overflow={"auto"}
                                sx={{
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                        borderRadius: '8px',
                                        //   backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                    },
                                }}
                            >
                                <Text px={10} fontWeight={600} fontSize={22}>All Chats</Text>

                                <>
                                    {
                                        chatRoom.listing != undefined &&
                                        Object.keys(chatRoom.listing).length > 0 &&
                                        <>
                                            <Flex mt="20px"
                                                px={10}
                                                _hover={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => getMessage('', chatRoom.listing.user_id, chatRoom.listing.id)}
                                            >
                                                <Box width={"60px"}>
                                                    <Image
                                                        boxSize='60px'
                                                        objectFit='cover'
                                                        src={`https://good-deeds-api.thedemo.co/${chatRoom.listing.image_path}/${chatRoom.listing.image[0].image}`}
                                                        alt='Dan Abramov'
                                                        borderRadius={5}
                                                    />
                                                </Box>
                                                <Box flexGrow={1}>
                                                    <Text ml={"20px"} mb="5px" fontWeight={600} fontSize={"14px"}>{chatRoom.listing.title}</Text>
                                                    <Text ml={"20px"} mb="3px" fontWeight={500} fontSize={"14px"}>{chatRoom.listing.description}</Text>
                                                    <Flex color={"#979797"} justifyContent={"space-between"} alignItems={"center"}>
                                                        <Text ml={"20px"} fontSize={"14px"}>{chatRoom.listing.title}</Text>
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                            <Divider mt="10px"></Divider>
                                        </>
                                    }
                                </>

                            </Box>

                            {
                                Object.keys(userChatInformation).length != 0 &&
                                <Box
                                    position={"relative"}
                                    boxShadow='base'
                                    mr={[0, 0, 20, 40]}
                                    minW={"45%"}
                                    borderWidth='1px'
                                >

                                    <Box bg="#183553" py={"15px"}>
                                        <Flex
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                        >
                                            <Flex justifyContent={"center"} flex={1} alignItems={"center"}>
                                                <Avatar
                                                    size={"sm"}
                                                    name={"fullName" || ""}
                                                    src={`https://good-deeds-api.thedemo.co/${userChatInformation.listing.image_path}/${userChatInformation.listing.image[0].image}`}
                                                    backgroundSize={"cover"}
                                                />
                                                <Text color={"white"} ml={5}>{userChatInformation.listing.title}</Text>
                                            </Flex>
                                            <Text textAlign={"right"} mr={5} color={'white'}><BsChatLeftDotsFill /></Text>
                                        </Flex>
                                    </Box>
                                    {!tCreditModal && !pendingCreditModal &&
                                        <>
                                            <Box bg="#F6F6F6" py={"10px"}>

                                                <Flex alignItems={"center"}>
                                                    <Box pl="20">
                                                        <Image
                                                            boxSize='75px'
                                                            objectFit='cover'
                                                            src={`https://good-deeds-api.thedemo.co/${userChatInformation.listing.image_path}/${userChatInformation.listing.image[0].image}`}
                                                            alt='Dan Abramov'
                                                            borderRadius={5}
                                                        />
                                                    </Box>
                                                    <Box>

                                                        <Text ml={10} fontWeight={600} fontSize={14}>{userChatInformation.listing.title}</Text>
                                                        <Text ml={10} fontWeight={500} fontSize={14}>{userChatInformation.listing.title} Credit</Text>
                                                    </Box>

                                                </Flex>
                                            </Box>

                                            <Box overflow={"auto"}
                                                maxH={"55%"}
                                                sx={{
                                                    '&::-webkit-scrollbar': {
                                                        width: '8px',
                                                        borderRadius: '8px',
                                                        //   backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        backgroundColor: `rgba(0, 0, 0, 0.05)`,
                                                    },
                                                }}
                                            >
                                                <Messages conversation={conversationData} lastMessage={lastMessage} />
                                            </Box>

                                            <Box
                                                position={"absolute"}
                                                bottom={"55px"}
                                                minW={"100%"}
                                                px={10}
                                                mb={5}
                                            >
                                                <Center>
                                                    <Button w={"70%"} type="submit" mt={"5"} colorScheme="orange" size="md" fontSize="md"
                                                        onClick={() => setTCreditModal(true)} >
                                                        Transfer Credits
                                                    </Button>
                                                </Center>
                                            </Box>

                                            <Box
                                                position={"absolute"}
                                                bottom={0}
                                                minW={"100%"}
                                                px={10}
                                                mb={5}
                                            >
                                                <Flex justifyContent={"center"} alignItems={"center"}>
                                                    <Box mr={'20px'}>
                                                        <BiImageAdd
                                                            fontSize={30}
                                                            color={"#979797"}
                                                            fontWeight={600}
                                                        />
                                                    </Box>
                                                    <InputGroup size='xl' width={"100%"}>
                                                        <Input
                                                            pr='4.5rem'
                                                            pl={"5"}
                                                            minH={"45px"}
                                                            type={'text'}
                                                            placeholder='Message here'
                                                            borderRadius={20}
                                                            value={message}
                                                            onE
                                                            onChange={(e) => {
                                                                setMessage(e.target.value)

                                                            }}
                                                            onKeyPress={(e) => {
                                                                if (e.key === 'Enter' || e.code === "NumpadEnter") {
                                                                    sendMessageHandler()
                                                                }
                                                            }
                                                            }
                                                        />
                                                        <InputRightElement width='3.5rem' h={"100%"}>
                                                            <BsFillArrowUpCircleFill
                                                                fontSize={30}
                                                                color={"#E27832"}
                                                                fontWeight={600}

                                                                onClick={sendMessageHandler}
                                                            />
                                                        </InputRightElement>
                                                    </InputGroup>
                                                </Flex>
                                            </Box>
                                        </>
                                    }
                                    {tCreditModal &&
                                        <TransferCreditModal
                                            show={tCreditModal}
                                            onClose={() => setTCreditModal(false)}
                                            submit={transferCreditHandler}
                                        />
                                    }
                                    {pendingCreditModal &&
                                        <PendingCreditModal
                                            show={pendingCreditModal}
                                            onClose={() => setPendingCreditModal(false)}
                                        />
                                    }
                                </Box>
                            }
                        </Flex>

                    </Box >
                </Box >
            }
        </Box >

    );
};

export default NewMessage;