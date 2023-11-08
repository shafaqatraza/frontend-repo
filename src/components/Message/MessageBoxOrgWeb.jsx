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
	Select,
	Spinner,
	Badge,
	Link
} from '@chakra-ui/react'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import HaniCam from '../../assets/imgs/add-a-photo.png'
import { BsFillArrowUpCircleFill, BsChatLeftDotsFill } from 'react-icons/bs'
import { BiImageAdd } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'
import { useRouter } from 'next/router'
import Messages from './messagesOrg'
import TransferCreditModal from '../Message/TransferCreditModal'
import RequestCreditModal from '../Message/RequestCreditModal'
import OnHoldCreditModal from '../Message/OnHoldCreditModal'
import PendingCreditModal from '../Message/PendingCreditModal'
import CreditTransferredModal from '../Message/CreditTransferredModal'
import RateAndReviewModal from '../Message/RateAndReviewModal'
import TransactionModal from '../Message/TransactionModal'
import { ModalPopup } from '../ModalPopup'
import { InnerSection } from '../Listing/innerSection'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import axios from 'axios'
import {
	isLogin,
	baseUrl,
	baseImgUrl,
	accessToken,
	userId,
	listingData,
	removeListinData,
	getLoginData,
	totalMessageNotification,
	notificationHandler,
	currentOrganization

} from '../Helper/index'
import { useToast } from '@chakra-ui/toast'
import { isMobile } from 'react-device-detect'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { BiCamera } from 'react-icons/bi'
import { Upload } from 'antd';
import { useMutation } from 'react-query'
import NoImage from '../../assets/imgs/no-image.png'
import {Pusher_key} from '../../../config'

let pusher = {};
let echo = {};
let channelArray = [];
let chatArray = [];

const MessageBoxOrgWeb = (props) => {

    const userChatInformation = props.messages
	const chatHeader = props.chatInfoData
	const organizationInfoData = props.organizationInfoData
	const messageInfo = props.messageInfoData
    const router = useRouter()
	const messagesEndRef = useRef(null)
	const toast = useToast()
	const [isMsgLoading, setIsMsgLoading] = useState(false)
	const [isImgMsgLoading, setIsImgMsgLoading] = useState(false)
	const [chatRoom, setChatRoom] = useState([])
	const [message, setMessage] = useState('')
	const [lastMessage, setLastMessage] = useState('')
	const conversationData = props.conversation
	const [chatId, setChatId] = useState('')
	const [profileData, setProfileData] = useState([])

	if (typeof window !== 'undefined') {
		var loginUser = JSON.parse(localStorage?.getItem('loggedInUser'));
	}


	let [loaded, setLoaded] = useState(true)



	//	Get profile detail handler
	const getProfileDetails = useCallback(async () => {
		const data = await axios.get(`${baseUrl}/user/info`, {
			headers: {
				Authorization: "Bearer " + accessToken(),
			},
		});
		if (data.status === 200) {
			setProfileData(data.data.data)
		}
	}, []);

	//	Check if user is logedin handler
	useEffect(() => {
		scrollToBottom()
		if (!isLogin()) {
			router.push({ pathname: '/' })
		} else {
			getProfileDetails()
		}
	}, []);


	//	Send message handler	
	const sendMessageHandler = async () => {
		if (message != '') {
			setLastMessage(message)
			const data = {
				message: message,
				sender_id: userId,
				listing_id: messageInfo.listing_id,
				receiver_id: messageInfo.receiver_id,
				chat_id: messageInfo.chat_id,
				sent_by_organization: currentOrganization? true: false
			}
			setIsMsgLoading(true)
			await axios
				.post(baseUrl + '/member/chats', data, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-type': 'Application/json',
						Authorization: `Bearer ${accessToken()}`
					}
				})
				.then((res) => {
					setMessage(props.message)
					setTimeout(() => {
						setIsMsgLoading(false)
						scrollToBottom()
					}, 301);
				})
				.catch((error) => {
					setIsMsgLoading(false)
				})

		}
	}


	//	Message box scroll handler
	const scrollToBottom = () => {
		var element = document.getElementById('message-box')
		if (element !== null) {
			element.scrollTop = element.scrollHeight + 200
		}
	}

	// Image upload handler
	const onFileUpload = (e) => {
		var formData = new FormData();
		if (e.file.status === "done") {
			setIsImgMsgLoading(true)

			formData.append('sender_id', userId)
			formData.append('listing_id', messageInfo.listing_id)
			formData.append('receiver_id', messageInfo.receiver_id)
			formData.append('chat_id', messageInfo.chat_id)
			formData.append('media', e.file.originFileObj)
			formData.append('sent_by_organization', currentOrganization? 1: 0)

			axios.post(`${baseUrl}/member/chats/image-upload`, formData, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-type': 'multipart/form-data',
					Authorization: `Bearer ${accessToken()}`
				}
			}).then((res) => {
				if (document.getElementById('chat_id_' + chatId) !== null) {
					document.getElementById('chat_id_' + chatId).click()
				}
				setIsImgMsgLoading(false)
				setTimeout(() => {
					scrollToBottom()
				}, 1000);
			})
				.catch((error) => {
					setIsImgMsgLoading(false)
					toast({
						position: 'top',
						title: 'Something went wrong',
						status: 'error'
					})
				})
		}


	}

	// Note: Unused function, Image upload handler
	const mutation = useMutation(
		(formData) => {
			setIsLoading(true)
			return axios.post(`${baseUrl}/member/chats/image-upload`, formData, {
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
				data.response?.data?.message &&
					toast({
						title: data.response?.data?.message,
						status: 'error'
					})
			}
		}
	)
    
    //=========================================================RETURN==================================================================	
  return (
    <Box
        position={'relative'}
        boxShadow="base"
        mr={[0, 0, 20, 40]}
        minW={'45%'}
        borderWidth="1px"
    >
        <Box bg="#183553" py={'15px'}>
            <Flex justifyContent={'center'} alignItems={'center'}>
                <Flex
                    justifyContent={'center'}
                    flex={1}
                    alignItems={'center'}
                >
                    <Link href={ organizationInfoData? '/#' :  `/profile/${chatHeader.username}`} >
                        <Flex
                            alignItems={'center'}
                        >
                            <Avatar
                                size={'sm'}
                                name={'fullName' || ''}
                                src={organizationInfoData ? organizationInfoData.avatar : `${chatHeader.avatar_url
                                    ? chatHeader.avatar_url
                                    : userChatInformation[0].receiver.avtar
                                    }`}
                                backgroundSize={'cover'}
                                position={'relative'}
                            >
                                <div className="onlineStatus" style={{ background: chatHeader.online_status === true ? '#13d50c' : '#bfbfbf' }}></div>
                            </Avatar>
                            <Flex
                                flexDirection={'column'}
                            >
                                <Text color={'white'} ml={5}>
                                    { organizationInfoData ? organizationInfoData.name : chatHeader.username}
                                </Text>
                                <Text color={'white'} ml={5} fontSize={'10px'}>
                                    {chatHeader.online_status ? 'Online' : chatHeader.last_seen}
                                </Text>
                            </Flex>
                        </Flex>
                    </Link>
                </Flex>
                
            </Flex>
        </Box>

        <Box bg="#F6F6F6" py={'10px'}>
            <Flex alignItems={'center'}>
                <Box pl="20">
                    <Image
                        boxSize="75px"
                        objectFit="cover"
                        src={userChatInformation[0].listing.image_path}
                        alt="Dan Abramov 4"
                        borderRadius={5}
                    />
                </Box>
                <Box>
                    <Text ml={10} fontWeight={600} fontSize={14}>
                        {userChatInformation[0].listing.title}
                    </Text>
                    <Text ml={10} fontWeight={500} fontSize={14}>
                        {userChatInformation[0].listing.credits}{' '}
                        Credits
                    </Text>
                </Box>
            </Flex>
        </Box>

        <Box
            overflow={'auto'}
            style={{ paddingBottom: '52px' }}
            maxH={'55%'}
            sx={{
                '&::-webkit-scrollbar': {
                    width: '8px',
                    borderRadius: '8px'
                    //   backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `rgba(0, 0, 0, 0.05)`
                }
            }}
            id="message-box"
        >
            <Messages
                loaded={loaded}
                setLoaded={setLoaded}
                conversation={conversationData}
                lastMessage={lastMessage}
                user_chat_info={userChatInformation}
            />
            <div ref={messagesEndRef} />
        </Box>
        {/* Input Box */}
        <Box
            position={'absolute'}
            bottom={0}
            minW={'100%'}
            px={10}
            pb={5}
            background="#fff"
        >
            
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Box mr={'20px'}>
                    {
                        !isImgMsgLoading ?
                            <Upload
                                maxCount={1}
                                name="avatar"
                                id="output"
                                listType="picture-card"
                                className="chat-image-uploader"
                                showUploadList={false}
                                showRemoveIcon={true}
                                onChange={(e) => {
                                    onFileUpload(e)
                                }
                                }
                            >
                                <BiImageAdd
                                    fontSize={30}
                                    color={'#979797'}
                                    fontWeight={600}
                                />
                            </Upload>
                            :
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="orange.200"
                                color="orange.500"
                                size="md"
                            />
                    }
                </Box>
                <InputGroup size="xl" width={'100%'}>
                    <Input
                        pr="4.5rem"
                        pl={'5'}
                        minH={'45px'}
                        type={'text'}
                        placeholder="Message here"
                        backgroundColor={'#fff'}
                        borderRadius={20}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}

                        onKeyPress={(e) => {
                            if (
                                e.key === 'Enter' ||
                                e.code === 'NumpadEnter'
                            ) {
                                !isMsgLoading &&
                                    sendMessageHandler()
                            }
                        }}
                    />
                    <InputRightElement width="3.5rem" h={'100%'} >
                        {
                            !isMsgLoading ?

                                <BsFillArrowUpCircleFill
                                    fontSize={30}
                                    color={'#E27832'}
                                    fontWeight={600}
                                    onClick={sendMessageHandler}
                                />
                                :
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="orange.200"
                                    color="orange.500"
                                    size="md"
                                />
                        }
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    </Box>
  );
};

export default MessageBoxOrgWeb;
