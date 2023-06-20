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
import Messages from './messages'
import MessageBoxOrgWeb from '../Message/MessageBoxOrgWeb'
import RateAndReviewModal from './RateAndReviewModal'
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
} from '../../components/Helper/index'
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


const Message = (props) => {
	const router = useRouter()
	const messagesEndRef = useRef(null)
	const toast = useToast()
	let [users, setUsers] = useState([])
	const [rateAndReviewModal, setRateAndReviewModal] = useState(false)
	const [isMsgLoading, setIsMsgLoading] = useState(false)
	const [isImgMsgLoading, setIsImgMsgLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [lastMessage, setLastMessage] = useState('')
	const [conversationData, setConversationData] = useState([])
	const [chatRoom, setChatRoom] = useState([])
	const [chatId, setChatId] = useState('')
	const [userChatInformation, setUserChatInformation] = useState([])
	const [tempChatData, setTempChatData] = useState({ org_slug: '', chat_id: null })

	if (typeof window !== 'undefined') {
		var loginUser = JSON.parse(localStorage?.getItem('loggedInUser'));
    var currentOrg = JSON.parse(localStorage?.getItem('currentOrganization'));
	}

	const [messageInfo, setMessageInfo] = useState({
		chat_id: '',
		receiver_id: '',
		listing_id: '',
		credits: ''
	})
	const [isChatLoading, setIsChatLoading] = useState(false)
	const [ratingValue, setRatingValue] = useState(0)
	const [reviewText, setReviewText] = useState('')
	const [chatHeader, setChatHeader] = useState({ name: '', avatar_url: '', username: '', online_status: null, last_seen: '' })
	const [isModalShow, setIsModalShow] = useState(false)
	const [profileData, setProfileData] = useState([])
	const [chatNotify, setChatNotify] = useState(0)
	const [showChat, setShowChat] = useState(false)
	let [loaded, setLoaded] = useState(true);
  const [curOrganization, setCurOrganization] = useState([]);

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

		if (!isLogin()) {
			router.push({ pathname: '/' })
		} else {
			getProfileDetails()
		}
	}, []);

	//	New chat notification handler
    useEffect(() => {
		Pusher.logToConsole = false;
		var pusher = new Pusher(`${Pusher_key}`, {
		cluster: 'mt1'
		});
		var channel2 = pusher.subscribe('new_chat_notification_'+userId);
		channel2.bind('pusher:subscription_succeeded', function() {
			channel2.bind('newChat', function(data) {
				const newData=data.newchat
				setChatRoom(newData);
			});
		});

		var channel = pusher.subscribe('sender_chat_'+userId);
		channel.bind('pusher:subscription_succeeded', function() {
			channel.bind('sender_notify', function(data) {
					let senderData=data.chat
					setChatRoom(senderData);
			});
			});
	}, [])

	//	Send message handler
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
console.log('aaaaaa2', lastMessage)
	//	Message box scroll handler
	const scrollToBottom = () => {
		var element = document.getElementById('message-box')
		if (element !== null) {
			element.scrollTop = element.scrollHeight + 200
		}
	}

  useEffect(()=>{
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        // setLoading(true);
        setCurOrganization(res.data[0].slug);
      })
      .catch((err) => {
      });
  },[])

	//	Get message handler
	const getMessage = async (
		id,
		receiver_id,
		listing_id,
		sender_id,
		receiver = {},
		sender = {}
	) => {
		setMessageInfo({
			chat_id: '',
			receiver_id: '',
			listing_id: '',
			credits: ''
		})

		userId != receiver_id
			? (receiver_id = receiver_id)
			: (receiver_id = sender_id)
		setChatId(id)

		if (userId === receiver.id) {
			setChatHeader({ name: sender.name, avatar_url: sender.avatar, username: sender.username, online_status: sender.online_status, last_seen: sender.last_seen })
		} else if (userId === sender.id) {
			setChatHeader({ name: receiver.name, avatar_url: receiver.avatar, username: receiver.username, online_status: receiver.online_status, last_seen: receiver.last_seen })
		}

		setConversationData([])
		await axios
			.get(baseUrl + '/chatrooms/'+curOrganization+'/messages/' + id, {
				headers: {
					Authorization: `Bearer ${accessToken()}`
				}
			})
			.then((res) => {
				setUserChatInformation(res.data.data)
				let allMsg = res.data.data
				let isChatCompleted = allMsg.filter(
					(e) => e.type === 'transaction_accepted'
				)

				setMessageInfo({
					chat_id: id,
					receiver_id: receiver_id,
					listing_id: listing_id,
					credits: res.data.data[0].listing.credits
				})
				setConversationData(res.data.data)
				setTimeout(() => {
					scrollToBottom()
				}, 200)
			})
			.catch((error) => {
			})

		if (!channelArray.includes('chat_' + userId + '_' + listing_id)) {

			channelArray.push('chat_' + userId + '_' + listing_id);
			echo = new Echo(pusher)
			echo.private('chat_' + userId + '_' + listing_id)
				.listen('ChatEvent', function (data) {

					notificationHandler(1)

					if (data.message !== null && data.message !== "") {
						if (data.message.includes('ransferred')) {
							setIsCreditAccepted(true);
						} else if (data.message.includes('rating') && userId === data.sender_id) {
							setIsDeedCompleted(true)
						} else if (data.message.includes('ending')) {
							getMessage(data.chat_id, data.receiver_id, data.listing_id, data.sender_id, {}, {});
						}
					}
					// setIsCreditAccepted(isChatCompleted.length > 0 ? true : false)
					if (listing_id == data.listing_id) {
						setConversationData((conversationData) => conversationData.concat(data))
						if (data.transaction_status == "Rejected") {
							setRejectStatus(true)
						}
						else if (data.transaction_status != null) {
							setRejectStatus(false)

						}
					}
					setMessage('')
					setTimeout(() => {
						scrollToBottom()
					}, 200);
				})

		}
	}

	// We will use this function later, for transfer of getMessage function to MessageBoxOrgWeb file.
	// const getMessages = async (
	// 	id,
	// 	receiver_id,
	// 	listing_id,
	// 	sender_id,
	// 	receiver = {},
	// 	sender = {}
	// ) => {

	// 	userId != receiver_id
	// 		? (receiver_id = receiver_id)
	// 		: (receiver_id = sender_id)
	// 	setChatId(id)

	// 	if (userId === receiver.id) {
	// 		setChatHeader({ name: sender.name, avatar_url: sender.avatar, username: sender.username, online_status: sender.online_status, last_seen: sender.last_seen })
	// 	} else if (userId === sender.id) {
	// 		setChatHeader({ name: receiver.name, avatar_url: receiver.avatar, username: receiver.username, online_status: receiver.online_status, last_seen: receiver.last_seen })
	// 	}

	// 	setTempChatData({ org_slug: currentOrganization.slug, chat_id: chatId })

	// }

	//	Message box onload scroll handler
	useEffect(() => {
		scrollToBottom();
    // getChats();
	}, [conversationData])

	//	Get chats handler
	const getChats = async () => {

		if (!curOrganization) {
			router.push('/'); // Redirect to the home page
		}else{
			await axios
				.get(baseUrl + '/chatrooms/'+curOrganization, {
					headers: {
						Authorization: `Bearer ${accessToken()}`
					}
				})
				.then((res) => {

					if (listingData != undefined) {
						removeListinData()
						let tmpExisting = res.data.data
						if(tmpExisting)
						setChatRoom(tmpExisting)
					} else {
						let tmpExisting = res.data.data
						setChatRoom(tmpExisting)
						setTimeout(() => {
							if (tmpExisting.length > 0 &&
								document.getElementById('chat_id_' + tmpExisting[0].id) !== null
							) {
								document.getElementById('chat_id_' + tmpExisting[0].id).click()
							}
						}, 200)
					}
					setIsChatLoading(false)
				})
				.catch((error) => {
					setIsChatLoading(true)
				})
		}
	}

	// Get messages handler
	useEffect(() => {
		setIsChatLoading(true)
		setShowChat(false)
		if (Object.keys(pusher).length === 0) {

			pusher = {
				broadcaster: 'pusher',
				key: `${Pusher_key}`,
				cluster: 'mt1',
				forceTLS: true,
				encrypted: false,
				authEndpoint: baseImgUrl + 'broadcasting/auth',
				auth: {
					headers: {
						'Access-Control-Allow-Origin': '*',
						Authorization: `Bearer ${accessToken()}`,
						Accept: 'application/json'
					}
				}
			}
		}
		getChats();
		let listingId = localStorage.getItem('listingId');
		if (listingId != undefined && listingId != '') {
			axios
				.get(baseUrl + `/member/messages/listing/${listingId}`, {
					headers: {
						Authorization: `Bearer ${accessToken()}`
					}
				})
				.then((res) => {

					getChats()
					setMessageInfo({
						chat_id: res.data.data[0].chat_id,
						receiver_id: res.data.data[0].receiver_id,
						listing_id: res.data.data[0].listing.id,
						credits: res.data.data[0].listing.credits
					})
					let rejectData = res.data.data
						.filter((e) => e.transaction_status === 'Rejected')
						.filter((x) => x.sender_id === userId)
					setRejectStatus(rejectData.length > 0 ? true : false)

					let isChatCompleted = res.data.data.filter(
						(e) => e.type === 'transaction_accepted'
					)
					let reviewData = [];

					reviewData = res.data.data
						.filter((e) => e.type === 'review_rating')
						.filter((x) => x.sender_id === userId)
					setIsDeedCompleted(reviewData.length > 0 ? true : false)


					if (userId === res.data.data[0].receiver_id) {
						setChatHeader({ name: res.data.data[0].sender.name, avatar_url: res.data.data[0].sender.avatar, username: res.data.data[0].sender.username, online_status: res.data.data[0].sender.online_status, last_seen: res.data.data[0].sender.last_seen })
					} else if (userId === res.data.data[0].sender_id) {
						setChatHeader({ name: res.data.data[0].receiver.name, avatar_url: res.data.data[0].receiver.avatar, username: res.data.data[0].receiver.username, online_status: res.data.data[0].receiver.online_status, last_seen: res.data.data[0].receiver.last_seen })
					}
					setCreditAmount(res.data.data[0].listing.credits)
					setUserChatInformation(res.data.data)
					setConversationData(res.data.data)
					if (Object.keys(pusher).length === 0) {

						pusher = {
							broadcaster: 'pusher',
							key: `${Pusher_key}`,
							cluster: 'mt1',
							forceTLS: true,
							encrypted: false,
							authEndpoint: baseImgUrl + 'broadcasting/auth',
							auth: {
								headers: {
									'Access-Control-Allow-Origin': '*',
									Authorization: `Bearer ${accessToken()}`,
									Accept: 'application/json'
								}
							}
						}
					}

					channelArray.push('chat_' + userId + '_' + res.data.data[0].listing.id);

					echo = new Echo(pusher)
					echo.private('chat_' + userId + '_' + res.data.data[0].listing.id)
						.listen('ChatEvent', function (data) {
							notificationHandler(1)
							setTransactionStatus(data.transaction_status)
							if (data.message !== null && data.message !== "") {
								if (data.message.includes('ransferred')) {
									setIsCreditAccepted(true);
								} else if (data.message.includes('rating') && userId === data.sender_id) {
									setTransactionDetail({ transation_id: data.transation_id, bool_trasaction_type: data.transaction_type })
									setIsDeedCompleted(true)
								} else if (data.message.includes('ending')) {
									getMessage(data.chat_id, data.receiver.id, data.listing_id, data.sender.id, {}, {});
								}
							}
							// setIsCreditAccepted(isChatCompleted.length > 0 ? true : false)
							if (res.data.data[0].listing.id == data.listing_id) {
								setConversationData((conversationData) => conversationData.concat(data))
								if (data.transaction_status == "Rejected") {
									setRejectStatus(true)
								}
								else if (data.transaction_status != null) {
									setRejectStatus(false)

								}
							}
							setMessage('')
							setTimeout(() => {
								scrollToBottom()
							}, 200);
						})
				})
				.catch((error) => {
				})
		}
		Pusher.logToConsole = false
	}, [curOrganization])

	// New message notification handler
	useEffect(() => {
		let pusherNotification = {
			broadcaster: 'pusher',
			key: '877cb5c78bbdba810bf0',
			cluster: 'mt1',
			forceTLS: true,
			encrypted: false,
			authEndpoint: baseImgUrl + 'broadcasting/auth',
			auth: {
				headers: {
					'Access-Control-Allow-Origin': '*',
					Authorization: `Bearer ${accessToken()}`,
					Accept: 'application/json'
				}
			}
		}

		const echoNotification = new Echo(pusherNotification)
		echoNotification.private('new_message_notification_' + userId)
			.listen('NewMessageNotification', function (e) {
				// console.log("fffttt", e)
			})
		Pusher.logToConsole = false
	}, [])

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

	const closeModal = async(modal) =>{

		if(modal){

			if(modal === 'credits_request'){
				setCreditsRequestModal(false);
			}else if(modal === 'transfer_credits'){
				setTCreditModal(false)
			}else if(modal === 'pending_credits'){
				setPendingCreditModal(false)
			}else if(modal === 'credits_transferred'){
				setCreditTransferred(false)
			}else if(modal === 'rate_and_review'){
				setRateAndReviewModal(false)
			}else if(modal === 'transaction'){
				setTransactionModal(false)
			}else if(modal === 'on_hold_credits'){
				setOnHoldCreditModal(false)
			}
			setTimeout(() => {
				scrollToBottom()
			}, 200)
		}
	}

	//=========================================================RETURN==================================================================

	return (
		<Box
			maxW="9xl"
			mx={isMobile ? null : "auto"}
			px={{ base: isMobile ? 0 : '4', md: '8', lg: '12' }}
			py={{ base: isMobile ? 0 : '6', md: '8', lg: '12' }}
		>
			{isChatLoading && (
				<Center h={'300px'}>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="orange.200"
						color="orange.500"
						size="xl"
					/>
				</Center>
			)}

			{!isChatLoading && (
				<Box mb={isMobile ? 0 : "20"}>
					<Box mx={[0, 0, 0, 0]}>
						<Flex h={'88vh'} direction={{ base: 'column', md: 'row' }}>
							{isMobile ? (
								!showChat && (
									<div style={  chatRoom.length === 0 ? {} : { flex: 1 }}>
										<Text pt={"15px"} px={'15px'} fontWeight={600} fontSize={25}>
											All Chats
										</Text>
										{chatRoom.length > 0 &&
											chatRoom.map((data, index) => (

												<>
													<Flex
														mt="20px"
														px={0}
														_hover={{
															cursor: 'pointer'
														}}
														id={'chat_id_' + data.id}
														onClick={() => (
															getMessage(
																data.id,
																data.receiver.id,
																data.listing.id,
																data.sender_id,
																data.receiver,
																data.sender
															),
															setShowChat(!showChat)
														)}
													>

														<Image
															boxSize="60px"
															width={'18%'}
															mt={'5px'}
															ml={'7px'}
															objectFit="cover"
															src={data.sender.avatar_url  ? data.sender.avatar_url : NoImage.src}
															alt="Dan Abramov 1"
															borderRadius={10}

														/>

														<Box flexGrow={1}>
															<Flex justifyContent={'space-between'}
																alignItems={'center'}>
																<Text ml={'20px'} fontWeight={600} fontSize={'14px'}>
																	{loginUser &&
																		loginUser.user.id == data?.receiver?.id ?
																		data?.sender?.username
																		:
																		data?.receiver?.username
																	}
																</Text>
																{data.new_messages == 0 ?
																	null
																	:
																	<Badge colorScheme='red'>
																		{

																			data.new_messages
																		}
																	</Badge>
																}
															</Flex>
															<Text
																ml={'20px'}
																//mb="5px"

																fontSize={'14px'}
																color={'#979797'}
															>
																{data.listing.title}
															</Text>
															<Text
																ml={'20px'}
																// mb="-10px"
																fontWeight={500}
																fontSize={'14px'}
																style={isMobile ? { width: '270px' } : {}}
															>

																{
																	data.last_msg &&
																		data.last_msg.includes('https')
																		?
																		'Sent an image'
																		:
																		data.last_msg
																}
															</Text>
															<Flex
																color={'#979797'}
																justifyContent={'space-between'}
																alignItems={'center'}
															>
																{/* <Text ml={'20px'} fontSize={'14px'}>
																	{data?.receiver?.username}
																</Text> */}
																<Text ml={'20px'} fontSize={'14px'} p={'10px'}>
																	{data.last_msg_at}
																</Text>
															</Flex>
														</Box>
													</Flex>
													<Divider mt="10px"></Divider>
												</>
											))}
									</div>
								)
							) : (
								<Box
									boxShadow="base"
									bg="white"
									ml={[0, 0, 20, 40]}
									minW={'30%'}
									borderWidth="1px"
									py={10}
									// style={{width:100}}
									// px={10}
									overflow={'auto'}
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
								>
									<Text px={10} fontWeight={600} fontSize={22}>
										All Chats
									</Text>
									{  chatRoom.length > 0 &&
										chatRoom.map((data, index) => (
											<>
												<Flex
													mt="20px"
													px={10}
													py={2}
													backgroundColor={data.new_messages > 0 ? '#dd6b2012' : '#fff'}
													_hover={{
														cursor: 'pointer'
													}}
													id={'chat_id_' + data.id}
													onClick={() =>
														getMessage(
															data.id,
															data.receiver.id,
															data.listing.id,
															data.sender.id,
															data.receiver,
															data.sender
														)
													}
												>
													<Box width={'60px'}>
														<Image
															boxSize="60px"
															objectFit="cover"
															src={ data.sender.avatar}
															alt="Dan Abramov 2"
															borderRadius={5}
														/>
													</Box>
													<Box flexGrow={1}>
														<Flex
															justifyContent={'space-between'}
															alignItems={'center'}
														>
															<Text
																ml={'20px'}
																// mb="5px"
																fontWeight={600}
																fontSize={'16px'}
															>
																{loginUser &&
																	loginUser.user.id == data?.receiver?.id ?
																	data?.sender?.username
																	:
																	data?.receiver?.username
																}
															</Text>

															{data.new_messages == 0 ?
																null
																:
																<Badge colorScheme='red'>
																	{
																		data.new_messages
																	}
																</Badge>
															}
														</Flex>
														<Text ml={'20px'} fontSize={'14px'}>
															{data.listing.title}
														</Text>
														<Text
															ml={'20px'}
															// mb="-10px"
															whiteSpace='nowrap'
															overflow='hidden'
															textOverflow='ellipsis'
															maxWidth='100px'
															fontWeight={500}
															fontSize={'14px'}
															style={isMobile ? { width: '270px' } : { }}
														>
															{
																data.last_msg &&
																	data.last_msg.includes('https')
																	?
																	data.last_msg
																	:
																	data.last_msg
															}
														</Text>
														<Flex
															color={'#979797'}
															justifyContent={'space-between'}
															alignItems={'center'}
														>
															<Text ml={'20px'} fontSize={'14px'}>
																{/* {data?.receiver?.username} */}
															</Text>
															<Text   ml={'20px'} fontSize={'12px'}>
																{data.last_msg_at}
															</Text>
														</Flex>
													</Box>
												</Flex>
												<Divider mt="10px"></Divider>
											</>
										))}
								</Box>
							)}
							{isMobile
								? showChat
									? Object.keys(userChatInformation).length != 0 && (
										<Box
											position={'relative'}
											minW={'45%'}
											borderWidth="1px"
											style={{ height: '85%' }}
										>
											<Flex bg="#183553" py={'15px'} alignItems="center">
												<Box minWidth="35px" display="flex" justifyContent="center" px="10px">
													<ChevronLeftIcon
														fontSize={25}
														color="white"
														cursor="pointer"
														onClick={() => setShowChat(!showChat)}
													/>
												</Box>
												<Box display="flex" alignItems="center" width="100%">
													<Link href={`/profile/${chatHeader.username}`} display='flex'>
														<Avatar
															size={'sm'}
															name={'fullName' || ''}
															src={`${chatHeader.avatar_url
																? chatHeader.avatar_url
																: userChatInformation[0].receiver.avtar
																}`}
															backgroundSize={'contain'}
															width={'40px'}
															height={'40px'}
															style={{
																borderWidth: 3,
																borderColor: '#E27832'
															}}
														>
															<div className='onlineStatus' style={{ background: chatHeader.online_status === true ? '#13d50c' : '#bfbfbf' }}></div>
														</Avatar>
														<Flex
															flexDirection={'column'}
														>
															<Text color={'white'} ml={3} fontSize={18}>
																{chatHeader.name}
															</Text>
															<Text color={'white'} ml={3} fontSize={10}>
																{chatHeader.online_status ? 'Online' : chatHeader.last_seen}
															</Text>
														</Flex>
													</Link>
												</Box>
											</Flex>
											<Box
												style={{ paddingBottom: '52px' }}
												overflow={'auto'}
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
											<Box
												position={'absolute'}
												bottom={0}
												minW={'100%'}
												px={'8px'}
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
																	<BiCamera fontSize={35} color="grey" />
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

														<InputRightElement width="3.5rem" h={'100%'}>
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
									)
									: null
								: Object.keys(userChatInformation).length !== 0 && (
									<MessageBoxOrgWeb
										messages = {userChatInformation}
										messageInfoData = {messageInfo}
										chatInfoData = {chatHeader}
										organizationInfoData = {null}
										conversation={conversationData}
										message = {message}
									/>
								)
							}
							{  chatRoom.length ===0 && (
								<Box
									position={'relative'}
										//	boxShadow="base"
									mr={[0, 0, 20, 40]}
									minW={'45%'}
									borderWidth={isMobile ? "" : "1px"}
									style={isMobile ? { flex: 1 } : {}}
								>
									<Flex
										minH={'85%'}

										justifyContent={'center'}
										alignItems={'center'}
									>
										<Box w={isMobile ? '95%' : '60%'} textAlign="center">
											<Text fontSize={'22px'} pb="10px" fontWeight={600}>
												No chats yet
											</Text>
											<Text>
												Chats will appear here one you have begun interacting
												with other users.
											</Text>
											{/* <Button
												w={'70%'}
												type="submit"
												mt={'5'}
												colorScheme="orange"
												size="md"
												fontSize="md"
												onClick={() => {
													router.push('/browse/?type=offering&activeTab=0')
												}}
											>
												Browse Offering
											</Button> */}
											{/* <Button
												w={'70%'}
												type="submit"
												mt={'2'}
												colorScheme="transparent"
												size="md"
												fontSize="md"
												onClick={() => {
													router.push("/browse?type=wanted")
												}}
											>
												<Text color={'#E27832'}>Browse Wanted</Text>
											</Button> */}
										</Box>
									</Flex>
								</Box>
							)}
						</Flex>
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default Message
