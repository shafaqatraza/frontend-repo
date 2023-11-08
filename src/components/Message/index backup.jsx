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
import TransferCreditModal from './TransferCreditModal'
import OnHoldCreditModal from './OnHoldCreditModal'
import PendingCreditModal from './PendingCreditModal'
import CreditTransferredModal from './CreditTransferredModal'
import RateAndReviewModal from './RateAndReviewModal'
import TransactionModal from './TransactionModal'
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
	notificationHandler

} from '../Helper/index'
import { useToast } from '@chakra-ui/toast'
import { isMobile } from 'react-device-detect'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { BiCamera } from 'react-icons/bi'
import { Upload } from 'antd';
import { useMutation } from 'react-query'
import NoImage from '../../assets/imgs/no-image.png'


let pusher = {};
let echo = {};
let channelArray = [];
const Message = (props) => {
	const router = useRouter()
	const messagesEndRef = useRef(null)
	const toast = useToast()
	let [users, setUsers] = useState([])
	// let [channelArray, setchannelArray] = useState([])
	const [isTransactionLoading, setIsTransactionLoading] = useState(false)
	const [tCreditModal, setTCreditModal] = useState(false)
	const [pendingCreditModal, setPendingCreditModal] = useState(false)
	const [onHoldCreditModal, setOnHoldCreditModal] = useState(false)

	const [creditTransferred, setCreditTransferred] = useState(false)
	const [rateAndReviewModal, setRateAndReviewModal] = useState(false)
	const [transactionModal, setTransactionModal] = useState(false)
	const [isMsgLoading, setIsMsgLoading] = useState(false)
	const [isImgMsgLoading, setIsImgMsgLoading] = useState(false)

	const [message, setMessage] = useState('')
	const [lastMessage, setLastMessage] = useState('')
	const [conversationData, setConversationData] = useState([])
	const [chatRoom, setChatRoom] = useState([])
	const [chatId, setChatId] = useState('')
	const [transactionStatus, setTransactionStatus] = useState(null)
	const [userChatInformation, setUserChatInformation] = useState([])
	const [rejectStatus, setRejectStatus] = useState(false)

	if (typeof window !== 'undefined') {
		var loginUser = JSON.parse(localStorage?.getItem('loggedInUser'));
	}

	const [messageInfo, setMessageInfo] = useState({
		chat_id: '',
		receiver_id: '',
		listing_id: '',
		credits: ''
	})
	const [creditAmount, setCreditAmount] = useState(0)
	const [isChatLoading, setIsChatLoading] = useState(false)
	const [isCreditAccepted, setIsCreditAccepted] = useState(false)
	const [isDeeddCompleted, setIsDeedCompleted] = useState(false)

	const [ratingValue, setRatingValue] = useState(0)
	const [reviewText, setReviewText] = useState('')
	const [transactionReportText, setTransactionReportText] = useState('')
	const [isConfirmDisabled, setIsConfirmDisabled] = useState(false)
	const [chatHeader, setChatHeader] = useState({ name: '', avatar_url: '', username: '' })
	const [transactionDetail, setTransactionDetail] = useState({ transation_id: '', bool_trasaction_type: false })
	const [isModalShow, setIsModalShow] = useState(false)
	const [isInsufficientCredits, setInsufficientCredits] = useState(false)
	const [profileData, setProfileData] = useState([])
	let [loaded, setLoaded] = useState(true)

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

	useEffect(() => {

		if (!isLogin()) {
			router.push({ pathname: '/' })
		} else {
			getProfileDetails()
		}
	}, []);


	useEffect(() => {
		if (profileData) {
			if (creditAmount !== "") {
				if (isInsufficientCredits == false && parseInt(creditAmount) > profileData?.user_profile?.credits) {
					setInsufficientCredits(true)
				} else if (isInsufficientCredits == true && parseInt(creditAmount) <= profileData?.user_profile?.credits) {
					setInsufficientCredits(false)
				}
			}

		}
	}, [creditAmount])

	const transferCreditHandler = async () => {

		if (isInsufficientCredits) {
			setIsModalShow(true);
		} else {
			const creditData = {
				listing_id: messageInfo.listing_id,
				receiver: conversationData[0].sender_id,
				credits: creditAmount !== "" ? parseInt(creditAmount) : creditAmount
			}
			setIsTransactionLoading(true)
			await axios
				.post(baseUrl + '/user/transactions', creditData, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-type': 'Application/json',
						Authorization: `Bearer ${accessToken()}`
					}
				})
				.then((res) => {
					getChats();
					setIsTransactionLoading(false)
					setTCreditModal(false)
					setOnHoldCreditModal(true)
					if (document.getElementById('chat_id_' + chatId) !== null) {
						document.getElementById('chat_id_' + chatId).click()
					}
					setTimeout(() => {
						scrollToBottom()
					}, 200)
					getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})

				})
				.catch((error) => {
					setIsTransactionLoading(false)
					toast({
						position: 'top',
						title: 'Something went wrong',
						status: 'error'
					})
				})
		}
	}
	const rejectCreditHandler = async () => {
		let filterPending = conversationData.filter((e) => e.type === 'transaction_pending' || (e.message !== null && e.message !== "" && e.message.includes('Pending')))
		if (filterPending.length === 0) {
			toast({
				position: 'top',
				title: 'No pending credit to reject.',
				status: 'error'
			})
			return
		}

		if (conversationData.length > 0) {
			setIsConfirmDisabled(true)
			let transaction = conversationData.filter((e) => e.transaction_id != null)
			setIsTransactionLoading(true)
			await axios
				.post(
					baseUrl + `/user/cancel-transaction/${transaction[0].transaction_id
					}`,
					{ status: 'reject' },
					{
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-type': 'Application/json',
							Authorization: `Bearer ${accessToken()}`
						}
					}
				)
				.then((res) => {
					getChats()
					setIsCreditAccepted(false)
					setIsTransactionLoading(false)
					toast({
						position: 'top',
						title: 'Transaction has been rejected.',
						status: 'success'
					})
					setIsConfirmDisabled(false)
					if (document.getElementById('chat_id_' + chatId) !== null) {
						document.getElementById('chat_id_' + chatId).click()
					}
					setTimeout(() => {
						scrollToBottom()
					}, 200)
					getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})

				})
				.catch((error) => {
					setIsConfirmDisabled(false)
					setIsTransactionLoading(false)
				})
		}

	}

	const acceptCreditHandler = async () => {


		setTimeout(async () => {

			let transaction = conversationData.filter((e) => e.transaction_id != null)
			if (conversationData.length > 0) {
				setIsConfirmDisabled(true)
				setIsTransactionLoading(true)
				await axios
					.post(
						baseUrl + `/user/accept-transaction/${transaction[0].transaction_id

						}`,
						{ status: 'accept' },
						{
							headers: {
								'Access-Control-Allow-Origin': '*',
								'Content-type': 'Application/json',
								Authorization: `Bearer ${accessToken()}`
							}
						}
					)
					.then((res) => {
						getChats()
						setIsCreditAccepted(false)
						setIsTransactionLoading(false)
						setPendingCreditModal(true)
						setIsConfirmDisabled(false)
						if (document.getElementById('chat_id_' + chatId) !== null) {
							document.getElementById('chat_id_' + chatId).click()
						}
						setTimeout(() => {
							scrollToBottom()
						}, 200)
						getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})

					})
					.catch((error) => {
						setIsConfirmDisabled(false)
						setIsTransactionLoading(false)
					})
			}
		}, 500);

	}
	const confirmCreditHandler = async () => {

		setTimeout(async () => {
			let filterPending = conversationData.filter((e) => e.type === 'transaction_pending' || (e.message !== null && e.message !== "" && e.message.includes('Pending')))
			if (filterPending.length === 0) {
				toast({
					position: 'top',
					title: 'No pending credit, Ask buyer to transfer the credit.',
					status: 'error'
				})
				return
			}
			let transactionId = conversationData.filter((data) => data.transaction_id != null)
			// console.log(conversationData, 'kkkkkkkk', transactionId)
			if (conversationData.length > 0) {
				setIsConfirmDisabled(true)
				setIsTransactionLoading(true)

				await axios
					.post(
						baseUrl + `/user/transactions/${transactionId[0].transaction_id}`,
						{ status: 'accept' },
						{
							headers: {
								'Access-Control-Allow-Origin': '*',
								'Content-type': 'Application/json',
								Authorization: `Bearer ${accessToken()}`
							}
						}
					)
					.then((res) => {
						getChats()
						setIsTransactionLoading(false)
						setIsCreditAccepted(false)
						setCreditTransferred(true)
						setIsConfirmDisabled(false)
						if (document.getElementById('chat_id_' + chatId) !== null) {
							document.getElementById('chat_id_' + chatId).click()
						}
						setTimeout(() => {
							scrollToBottom()
						}, 200)
						getMessage(messageInfo.chat_id, messageInfo.receiver_id, messageInfo.listing_id, userId, {}, {})

					})
					.catch((error) => {
						setIsConfirmDisabled(false)
						setIsTransactionLoading(false)
					})
			}
		}, 500);
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

					console.log(error)
				})
		}
	}

	const scrollToBottom = () => {
		var element = document.getElementById('message-box')
		if (element !== null) {
			element.scrollTop = element.scrollHeight + 200
		}
	}

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
		// console.log('hghghghgh i am calll')
		setTransactionStatus(null)
		userId != receiver_id
			? (receiver_id = receiver_id)
			: (receiver_id = sender_id)
		setChatId(id)

		if (userId === receiver.id) {
			setChatHeader({ name: sender.name, avatar_url: sender.avatar, username: sender.username })
		} else if (userId === sender.id) {
			setChatHeader({ name: receiver.name, avatar_url: receiver.avatar, username: receiver.username })
		}

		setConversationData([])
		await axios
			.get(baseUrl + '/member/messages/' + id, {
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
				let reviewData = [];
				if (allMsg[0].listing.listing_type == "wanted") {

					reviewData = allMsg
						.filter((e) => e.type === 'review_rating')
						.filter((x) => x.sender_id === userId)
					setIsDeedCompleted(reviewData.length > 0 ? true : false)
				}
				else {
					reviewData = allMsg
						.filter((e) => e.type === 'review_rating')
						.filter((x) => x.sender_id == userId)
					setIsDeedCompleted(reviewData.length > 0 ? true : false)
				}
				let rejectData = allMsg
					.filter((e) => e.transaction_status === 'Rejected')
					.filter((x) => x.sender_id === userId)
				setRejectStatus(rejectData.length > 0 ? true : false)

				setIsCreditAccepted(isChatCompleted.length > 0 ? true : false)
				setCreditAmount(res.data.data[0].listing.credits)
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
				console.log(error)
			})



		if (!channelArray.includes('chat_' + userId + '_' + listing_id)) {
			channelArray.push('chat_' + userId + '_' + listing_id);

			echo = new Echo(pusher)
			echo.private('chat_' + userId + '_' + listing_id)
				.listen('ChatEvent', function (data) {
					notificationHandler(1)
					setTransactionStatus(data.transaction_status)
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

		// const echo = new Echo(pusher)
		// echo
		//   .private('chat_' + userId + '_' + listing_id)
		//   .listen('ChatEvent', function (data) {
		//     listing_id == data.listing_id &&
		//       setConversationData((conversationData) =>
		//         conversationData.concat(data)
		//       )
		//     setMessage('')
		//     scrollToBottom()
		//   })
	}


	useEffect(() => {
		scrollToBottom();
	}, [conversationData])

	const getChats = async () => {
		await axios
			.get(baseUrl + '/member/chats', {
				headers: {
					Authorization: `Bearer ${accessToken()}`
				}
			})
			.then((res) => {
				if (listingData != undefined) {
					let existingChat = res.data.data.filter(
						(data) => data.listing.id == listingData.id
					)
					// if (existingChat.length == 0) {
					// 	const data = {
					// 		message: '',
					// 		sender_id: userId,
					// 		listing_id: listingData.id,
					// 		receiver_id: listingData.added_by
					// 	}
					// 	axios
					// 		.post(baseUrl + '/member/chats', data, {
					// 			headers: {
					// 				'Access-Control-Allow-Origin': '*',
					// 				'Content-type': 'Application/json',
					// 				Authorization: `Bearer ${accessToken()}`
					// 			}
					// 		})
					// 		.then((res) => {
					// 			getChats()
					// 			removeListinData()
					// 		})
					// 		.catch((error) => {
					// 			console.log(error)
					// 		})

					// 	// router.push('/new-message');
					// } else {
					removeListinData()
					let tmpExisting = res.data.data
					// tmpExisting.sort((a, b) => (a.id < b.id ? 1 : -1))
					setChatRoom(tmpExisting)
					// }
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
					// setChatRoom(res.data.data)
				}
				setIsChatLoading(false)
			})
			.catch((error) => {
				console.log(error)
				setIsChatLoading(true)
			})
	}

	const submitReviewAndRating = async () => {
		let formData = {}
		if (userChatInformation[0].listing.user_id === userId && userChatInformation[0].listing.listing_type != 'wanted') {
			formData.offerer_rating = ratingValue
			formData.offerer_review = reviewText
		}
		else if (userChatInformation[0].listing.user_id != userId && userChatInformation[0].listing.listing_type == 'wanted') {
			formData.offerer_rating = ratingValue
			formData.offerer_review = reviewText
		}
		else {
			formData.buyer_rating = ratingValue
			formData.buyer_review = reviewText
		}

		if (conversationData.length > 0) {
			setIsTransactionLoading(true)

			await axios
				.post(
					baseUrl +
					`/user/transaction-detail/${conversationData[0].transaction_id}`,
					formData,
					{
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-type': 'Application/json',
							Authorization: `Bearer ${accessToken()}`
						}
					}
				)
				.then((res) => {
					setIsTransactionLoading(false)
					if (document.getElementById('chat_id_' + chatId) !== null) {
						document.getElementById('chat_id_' + chatId).click()
					}
					setTimeout(() => {
						setRateAndReviewModal(false)
					}, 200)
					setTimeout(() => {
						scrollToBottom()
					}, 300)
					setIsDeedCompleted(true)

				})
				.catch((error) => {
					setIsTransactionLoading(false)
					toast({
						position: 'top',
						title: 'Something went wrong',
						status: 'error'
					})
				})
		}
	}

	const submitTransactionReport = async () => {
		if (conversationData[0].transaction_id === '') {
			toast({
				position: 'top',
				title: 'Please first transfer of confirm the credit',
				status: 'error'
			})
			return
		}
		if (conversationData.length === 0) {
			toast({ position: 'top', title: 'Something went wrong', status: 'error' })
			return
		}
		if (transactionReportText.length <= 50) {
			toast({
				position: 'top',
				title: 'Please enter at least 50 characters',
				status: 'error'
			})
			return
		}

		let formData = {
			transaction_id: conversationData[0].transaction_id,
			issue_description: transactionReportText
		}

		if (conversationData.length > 0) {
			await axios
				.post(baseUrl + `/member/transaction-tickets/store`, formData, {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-type': 'Application/json',
						Authorization: `Bearer ${accessToken()}`
					}
				})
				.then((res) => {
					setTransactionModal(false)
					scrollToBottom()
					if (transactionReportText.length <= 50) {
						toast({
							position: 'top',
							title: 'Transaction Report Submitted Successfully.',
							status: 'success'
						})
						return
					}
				})
				.catch((error) => {
					console.log(error)
					toast({
						position: 'top',
						title: 'Something went wrong',
						status: 'error'
					})
				})
		}
	}
	const [showChat, setShowChat] = useState(false)

	useEffect(() => {
		setIsChatLoading(true)
		setShowChat(false)
		if (Object.keys(pusher).length === 0) {

			pusher = {
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
		}
		getChats()
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
						setChatHeader({ name: res.data.data[0].sender.name, avatar_url: res.data.data[0].sender.avatar, username: res.data.data[0].sender.username })
					} else if (userId === res.data.data[0].sender_id) {
						setChatHeader({ name: res.data.data[0].receiver.name, avatar_url: res.data.data[0].receiver.avatar, username: res.data.data[0].receiver.username })
					}
					setCreditAmount(res.data.data[0].listing.credits)
					setUserChatInformation(res.data.data)
					setConversationData(res.data.data)
					if (Object.keys(pusher).length === 0) {

						pusher = {
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
									getMessage(data.chat_id, data.receiver_id, data.listing_id, data.sender_id, {}, {});
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
					console.log(error)
				})
		}
		Pusher.logToConsole = true
		// pusher = {
		// 	broadcaster: 'pusher',
		// 	key: '877cb5c78bbdba810bf0',
		// 	cluster: 'mt1',
		// 	forceTLS: true,
		// 	encrypted: false,
		// 	authEndpoint: baseImgUrl + 'broadcasting/auth',
		// 	auth: {
		// 		headers: {
		// 			'Access-Control-Allow-Origin': '*',
		// 			Authorization: `Bearer ${accessToken()}`,
		// 			Accept: 'application/json'
		// 		}
		// 	}
		// }
	}, [])

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
									<div style={chatRoom.length === 0 ? {} : { flex: 1 }}>
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
															src={data.listing.image.length > 0 ? `${data.listing.image[0].path}/${data.listing.image[0].image}` : NoImage.src}
															alt="Dan Abramov"
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
									{chatRoom.length > 0 &&
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
															data.sender_id,
															data.receiver,
															data.sender
														)
													}
												>
													<Box width={'60px'}>
														<Image
															boxSize="60px"
															objectFit="cover"
															src={data.listing.image.length > 0 ? `${data.listing.image[0].path}/${data.listing.image[0].image}` : NoImage.src}
															alt="Dan Abramov"
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
															<Text ml={'20px'} fontSize={'14px'}>
																{/* {data?.receiver?.username} */}
															</Text>
															<Text ml={'20px'} fontSize={'12px'}>
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
														/>
														<Text color={'white'} ml={3} fontSize={19} display="flex" alignItems="center">
															{chatHeader.name}
														</Text>
													</Link>
												</Box>
												<Box minWidth="35px" display="flex" justifyContent="center" px="10px">
													<BsChatLeftDotsFill
														fontSize={25}
														color="white"
														cursor="pointer"
														onClick={() => setTransactionModal(true)}
													/>
												</Box>
											</Flex>
											{!tCreditModal &&
												!pendingCreditModal &&
												!creditTransferred &&
												!rateAndReviewModal &&
												!transactionModal && (
													<>
														<Box bg="#F6F6F6" py={'10px'}>
															<Flex
																alignItems={'start'}
															>
																<Box pl="5" >
																	<Image
																		boxSize="75px"
																		objectFit="cover"
																		src={`${userChatInformation[0].listing.image_path}/${userChatInformation[0].listing.image}`}
																		alt="Dan Abramov"
																		borderRadius={5}
																	/>
																</Box>
																<Box >
																	<Text
																		ml={10}
																		fontWeight={600}
																		fontSize={14}
																	>
																		{userChatInformation[0].listing.title}
																	</Text>
																	<Text
																		ml={10}
																		fontWeight={500}
																		fontSize={14}
																	>
																		{userChatInformation[0].listing.credits}{' '}
																		Deed Dollars
																	</Text>
																</Box>
															</Flex>
														</Box>

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
															/>
															<div ref={messagesEndRef} />
														</Box>

														<Box
															position={'absolute'}
															bottom={'55px'}
															minW={'100%'}
															px={'8px'}
															pb={5}
															background="#fff"
														>
															<Center>
																{isDeeddCompleted && !rejectStatus && (
																	<Text textAlign="center" color={'#E27832'}>
																		Congratulations on a completed Good Deed
																	</Text>
																)}
																{/* listing saler */}

																{userChatInformation.length > 0 &&
																	userChatInformation[0].listing.listing_type == 'offering' &&
																	userChatInformation[0].listing.user_id ===
																	userId &&
																	!rejectStatus &&
																	(userChatInformation[0].seller_deed_status == 1) &&
																	!isDeeddCompleted && (
																		<Button
																			w={'70%'}
																			type="submit"
																			mt={'5'}
																			colorScheme="orange"
																			size="md"
																			fontSize="md"
																			onClick={() =>
																				setRateAndReviewModal(true)
																			}
																		>
																			Rate & Review
																		</Button>
																	)}
																{userChatInformation.length > 0 &&
																	userChatInformation[0].listing.listing_type == 'offering' &&
																	userChatInformation[0].listing.user_id !=
																	userId &&
																	(userChatInformation[0].buyer_deed_status == 1) &&
																	!isDeeddCompleted && (
																		!rejectStatus &&
																		<Button
																			w={'70%'}
																			type="submit"
																			mt={'5'}
																			colorScheme="orange"
																			size="md"
																			fontSize="md"
																			onClick={() =>
																				setRateAndReviewModal(true)
																			}
																		>
																			Rate & Review
																		</Button>
																	)}
																{/* ....................... */}

																{/* listing saler */}
																{userChatInformation.length > 0 &&
																	userChatInformation[0].listing.listing_type == 'wanted' &&
																	userChatInformation[0].listing.user_id ===
																	userId &&
																	!rejectStatus &&
																	(userChatInformation[0].buyer_deed_status == 1) &&
																	!isDeeddCompleted && (
																		<Button
																			w={'70%'}
																			type="submit"
																			mt={'5'}
																			colorScheme="orange"
																			size="md"
																			fontSize="md"
																			onClick={() =>
																				setRateAndReviewModal(true)
																			}
																		>
																			Rate & Review
																		</Button>
																	)}
																{userChatInformation.length > 0 &&
																	userChatInformation[0].listing.listing_type == 'wanted' &&
																	userChatInformation[0].listing.user_id !=
																	userId &&
																	!rejectStatus &&
																	(userChatInformation[0].seller_deed_status == 1) &&
																	!isDeeddCompleted && (
																		<Button
																			w={'70%'}
																			type="submit"
																			mt={'5'}
																			colorScheme="orange"
																			size="md"
																			fontSize="md"
																			onClick={() =>
																				setRateAndReviewModal(true)
																			}
																		>
																			Rate & Review
																		</Button>
																	)}

																{/* ///........................... ...........................*/}

																{userChatInformation.length > 0 &&
																	userChatInformation[0].listing.user_id ===
																	userId &&
																	userChatInformation[0].listing.listing_type == 'wanted' &&
																	userChatInformation[0].buyer_deed_status != 1 &&
																	(userChatInformation[0].transaction_status != "Completed" || transactionStatus != "Completed") && (
																		<>
																			{
																				((userChatInformation[0].transaction_status == null && transactionStatus == null) || rejectStatus) &&
																				<Button
																					w={'70%'}
																					type="submit"
																					mt={'5'}
																					colorScheme="orange"
																					size="md"
																					fontSize="md"
																					onClick={() => setTCreditModal(true)}
																				>
																					Transfer Deed Dollars
																				</Button>
																			}

																			{
																				((userChatInformation[0].transaction_status == "On Hold" || transactionStatus == "On Hold") ||
																					(userChatInformation[0].transaction_status == "Pending" || transactionStatus == "Pending")) && !rejectStatus &&
																				<>
																					<Button
																						w={'70%'}
																						isLoading={isConfirmDisabled}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => confirmCreditHandler()}
																					>
																						Mark Complete
																					</Button>
																					{
																						!rejectStatus &&
																						<Button
																							w={'70%'}
																							isLoading={isConfirmDisabled}
																							type="submit"
																							mt={'5'}
																							colorScheme="orange"
																							size="md"
																							fontSize="md"
																							onClick={() => rejectCreditHandler()}
																						>
																							Cancel Order
																						</Button>
																					}
																				</>
																			}



																		</>
																	)}
																{userChatInformation.length > 0 &&
																	userChatInformation[0].listing.user_id !=
																	userId &&
																	(userChatInformation[0].transaction_status != null || transactionStatus != null) &&

																	userChatInformation[0].listing.listing_type == 'wanted' &&
																	userChatInformation[0].seller_deed_status != 1 &&
																	!rejectStatus &&
																	(userChatInformation[0].transaction_status != "Completed" || transactionStatus != "Completed")
																	&& (
																		<>

																			{
																				(userChatInformation[0].transaction_status == "On Hold" || transactionStatus == "On Hold") ?

																					<Button
																						w={'70%'}
																						isLoading={isConfirmDisabled}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => acceptCreditHandler()}
																					>
																						Accept Deed Dollars
																					</Button>
																					:
																					(userChatInformation[0].transaction_status == "Pending" || transactionStatus == "Pending") &&
																					<Button
																						w={'70%'}
																						isLoading={isConfirmDisabled}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => confirmCreditHandler()}
																					>
																						Mark Complete
																					</Button>
																			}

																			<Button
																				w={'70%'}
																				isLoading={isConfirmDisabled}
																				type="submit"
																				mt={'5'}
																				colorScheme="orange"
																				size="md"
																				fontSize="md"
																				onClick={() => rejectCreditHandler()}
																			>
																				Cancel Order
																			</Button>
																		</>

																	)}
																{userChatInformation.length > 0 &&
																	userChatInformation[0].listing.user_id ===
																	userId &&
																	(userChatInformation[0].transaction_status != null || transactionStatus != null) &&
																	userChatInformation[0].listing.listing_type != 'wanted' &&
																	!rejectStatus &&
																	((userChatInformation[0].transaction_status != "Completed" || transactionStatus != "Completed") && userChatInformation[0].seller_deed_status != 1) && (
																		<>
																			{
																				(userChatInformation[0].transaction_status == "On Hold" || transactionStatus == "On Hold") ?
																					<Button
																						w={'70%'}
																						isLoading={isConfirmDisabled}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => acceptCreditHandler()}
																					>
																						Accept Deed Dollars
																					</Button>
																					:
																					(userChatInformation[0].transaction_status == "Pending" || transactionStatus == "Pending") &&
																					<Button
																						w={'70%'}
																						isLoading={isConfirmDisabled}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => confirmCreditHandler()}
																					>
																						Mark Complete
																					</Button>
																			}

																			<Button
																				w={'70%'}
																				isLoading={isConfirmDisabled}
																				type="submit"
																				mt={'5'}
																				colorScheme="orange"
																				size="md"
																				fontSize="md"
																				onClick={() => rejectCreditHandler()}
																			>
																				Cancel Order
																			</Button>
																		</>

																	)}


																{userChatInformation.length > 0 &&
																	userChatInformation[0].listing.user_id !==
																	userId &&
																	userChatInformation[0].listing.listing_type != 'wanted' &&

																	((userChatInformation[0].transaction_status != "Completed" || transactionStatus != "Completed") && userChatInformation[0].buyer_deed_status != 1) && (
																		<>
																			{
																				((userChatInformation[0].transaction_status == "On Hold" || transactionStatus == "On Hold") ||
																					(userChatInformation[0].transaction_status == "Pending" || transactionStatus == "Pending"))
																					&& !rejectStatus ?
																					<>
																						<Button
																							w={'70%'}
																							isLoading={isConfirmDisabled}
																							type="submit"
																							mt={'5'}
																							colorScheme="orange"
																							size="md"
																							fontSize="md"
																							onClick={() => confirmCreditHandler()}
																						>
																							Mark Complete
																						</Button>
																						<Button
																							w={'70%'}
																							isLoading={isConfirmDisabled}
																							type="submit"
																							mt={'5'}
																							colorScheme="orange"
																							size="md"
																							fontSize="md"
																							onClick={() => rejectCreditHandler()}
																						>
																							Cancel Order
																						</Button>
																					</>
																					:
																					<Button
																						w={'70%'}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => setTCreditModal(true)}
																					>
																						Transfer Deed Dollars
																					</Button>
																			}
																			{/* {
																			userChatInformation[0].transaction_status != null && !rejectStatus &&


																		} */}
																		</>
																	)}

															</Center>
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
																		onE
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
													</>
												)}
											{tCreditModal && (
												<TransferCreditModal
													messageInfo={messageInfo}
													getMessage={getMessage}
													isLoading={isTransactionLoading}
													show={tCreditModal}
													onClose={() => setTCreditModal(false)}
													submit={transferCreditHandler}
													creditAmount={creditAmount}
													setCreditAmount={(e) => setCreditAmount(e)}
													userChatInformation={userChatInformation.length ? userChatInformation[0] : []}
												/>
											)}
											{isModalShow && (
												<ModalPopup
													TitleModal="Your don't have enough deed dollars"
													show={isModalShow}
													size={'xs'}
													setShow={(value) => {
														setIsModalShow(value)
													}}
													body={
														<InnerSection
															goNext={() => { }}
															lastStep={false}
															para="Complete a deed or invite friends to earn more deed dollars"
															show={isModalShow}
															setIsModalShow={setIsModalShow}
														/>
													}
												/>
											)}
											{pendingCreditModal && (
												<PendingCreditModal
													messageInfo={messageInfo}
													getMessage={getMessage}
													show={pendingCreditModal}
													onClose={() => setPendingCreditModal(false)}
												/>
											)}
											{creditTransferred && (
												<CreditTransferredModal
													messageInfo={messageInfo}
													getMessage={getMessage}
													show={creditTransferred}
													onClose={() => setCreditTransferred(false)}
												/>
											)}
											{rateAndReviewModal && (
												<RateAndReviewModal
													isLoading={isTransactionLoading}
													submitReviewAndRating={() =>
														submitReviewAndRating()
													}
													setRatingValue={(e) => setRatingValue(e)}
													ratingValue={ratingValue}
													reviewText={reviewText}
													setReviewText={(e) => setReviewText(e)}
													show={rateAndReviewModal}
													onClose={() => setRateAndReviewModal(false)}
												/>
											)}
											{transactionModal && (
												<TransactionModal
													messageInfo={messageInfo}
													getMessage={getMessage}
													submitTransactionReport={() =>
														submitTransactionReport()
													}
													show={transactionModal}
													onClose={() => setTransactionModal(false)}
													setTransactionReportText={(e) =>
														setTransactionReportText(e)
													}
													transactionReportText={transactionReportText}
												/>
											)}
										</Box>
									)
									: null
								: Object.keys(userChatInformation).length !== 0 && (
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
													<Link href={`/profile/${chatHeader.username}`} >
														<Flex
															alignItems={'center'}
														>
															<Avatar
																size={'sm'}
																name={'fullName' || ''}
																src={`${chatHeader.avatar_url
																	? chatHeader.avatar_url
																	: userChatInformation[0].receiver.avtar
																	}`}
																backgroundSize={'cover'}
															/>
															<Text color={'white'} ml={5}>
																{chatHeader.username}
															</Text>
														</Flex>
													</Link>
												</Flex>
												<Text textAlign={'right'} mr={5} color={'white'}>
													<BsChatLeftDotsFill
														cursor={'pointer'}
														onClick={() => setTransactionModal(true)}
													/>
												</Text>
											</Flex>
										</Box>
										{!tCreditModal &&
											!pendingCreditModal &&
											!creditTransferred &&
											!rateAndReviewModal &&
											!transactionModal && (
												<>
													<Box bg="#F6F6F6" py={'10px'}>
														<Flex alignItems={'center'}>
															<Box pl="20">
																<Image
																	boxSize="75px"
																	objectFit="cover"
																	src={`${userChatInformation[0].listing.image_path}/${userChatInformation[0].listing.image}`}
																	alt="Dan Abramov"
																	borderRadius={5}
																/>
															</Box>
															<Box>
																<Text ml={10} fontWeight={600} fontSize={14}>
																	{userChatInformation[0].listing.title}
																</Text>
																<Text ml={10} fontWeight={500} fontSize={14}>
																	{userChatInformation[0].listing.credits}{' '}
																	Deed Dollars
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
														/>
														<div ref={messagesEndRef} />
													</Box>

													<Box
														position={'absolute'}
														bottom={'55px'}
														minW={'100%'}
														px={10}
														pb={5}
														background="#fff"
													>
														<Center>
															{isDeeddCompleted && !rejectStatus && (
																<Text textAlign="center" color={'#E27832'}>
																	Congratulations on a completed Good Deed
																</Text>
															)}
															{/* listing saler */}

															{userChatInformation.length > 0 &&
																userChatInformation[0].listing.listing_type == 'offering' &&
																userChatInformation[0].listing.user_id ===
																userId &&
																!rejectStatus &&
																(userChatInformation[0].seller_deed_status == 1) &&
																!isDeeddCompleted && (
																	<Button
																		w={'70%'}
																		type="submit"
																		mt={'5'}
																		colorScheme="orange"
																		size="md"
																		fontSize="md"
																		onClick={() =>
																			setRateAndReviewModal(true)
																		}
																	>
																		Rate & Review
																	</Button>
																)}
															{userChatInformation.length > 0 &&
																userChatInformation[0].listing.listing_type == 'offering' &&
																userChatInformation[0].listing.user_id !=
																userId &&
																(userChatInformation[0].buyer_deed_status == 1) &&
																!isDeeddCompleted && (
																	!rejectStatus &&
																	<Button
																		w={'70%'}
																		type="submit"
																		mt={'5'}
																		colorScheme="orange"
																		size="md"
																		fontSize="md"
																		onClick={() =>
																			setRateAndReviewModal(true)
																		}
																	>
																		Rate & Review
																	</Button>
																)}
															{/* ....................... */}

															{/* listing saler */}
															{userChatInformation.length > 0 &&
																userChatInformation[0].listing.listing_type == 'wanted' &&
																userChatInformation[0].listing.user_id ===
																userId &&
																!rejectStatus &&
																(userChatInformation[0].buyer_deed_status == 1) &&
																!isDeeddCompleted && (
																	<Button
																		w={'70%'}
																		type="submit"
																		mt={'5'}
																		colorScheme="orange"
																		size="md"
																		fontSize="md"
																		onClick={() =>
																			setRateAndReviewModal(true)
																		}
																	>
																		Rate & Review
																	</Button>
																)}
															{userChatInformation.length > 0 &&
																userChatInformation[0].listing.listing_type == 'wanted' &&
																userChatInformation[0].listing.user_id !=
																userId &&
																!rejectStatus &&
																(userChatInformation[0].seller_deed_status == 1) &&
																!isDeeddCompleted && (
																	<Button
																		w={'70%'}
																		type="submit"
																		mt={'5'}
																		colorScheme="orange"
																		size="md"
																		fontSize="md"
																		onClick={() =>
																			setRateAndReviewModal(true)
																		}
																	>
																		Rate & Review
																	</Button>
																)}

															{/* ///........................... ...........................*/}

															{userChatInformation.length > 0 &&
																userChatInformation[0].listing.user_id ===
																userId &&
																userChatInformation[0].listing.listing_type == 'wanted' &&
																userChatInformation[0].buyer_deed_status != 1 &&
																(userChatInformation[0].transaction_status != "Completed" || transactionStatus != "Completed") && (
																	<>
																		{
																			((userChatInformation[0].transaction_status == null && transactionStatus == null) || rejectStatus) &&
																			<Button
																				w={'70%'}
																				type="submit"
																				mt={'5'}
																				colorScheme="orange"
																				size="md"
																				fontSize="md"
																				onClick={() => setTCreditModal(true)}
																			>
																				Transfer Deed Dollars
																			</Button>
																		}

																		{
																			((userChatInformation[0].transaction_status == "On Hold" || transactionStatus == "On Hold") ||
																				(userChatInformation[0].transaction_status == "Pending" || transactionStatus == "Pending")) && !rejectStatus &&
																			<>
																				<Button
																					w={'70%'}
																					isLoading={isConfirmDisabled}
																					type="submit"
																					mt={'5'}
																					colorScheme="orange"
																					size="md"
																					fontSize="md"
																					onClick={() => confirmCreditHandler()}
																				>
																					Mark Complete
																				</Button>
																				{
																					!rejectStatus &&
																					<Button
																						w={'70%'}
																						isLoading={isConfirmDisabled}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => rejectCreditHandler()}
																					>
																						Cancel Order
																					</Button>
																				}
																			</>
																		}



																	</>
																)}
															{userChatInformation.length > 0 &&
																userChatInformation[0].listing.user_id !=
																userId &&
																(userChatInformation[0].transaction_status != null || transactionStatus != null) &&

																userChatInformation[0].listing.listing_type == 'wanted' &&
																userChatInformation[0].seller_deed_status != 1 &&
																!rejectStatus &&
																(userChatInformation[0].transaction_status != "Completed" || transactionStatus != "Completed")
																&& (
																	<>

																		{
																			(userChatInformation[0].transaction_status == "On Hold" || transactionStatus == "On Hold") ?

																				<Button
																					w={'70%'}
																					isLoading={isConfirmDisabled}
																					type="submit"
																					mt={'5'}
																					colorScheme="orange"
																					size="md"
																					fontSize="md"
																					onClick={() => acceptCreditHandler()}
																				>
																					Accept Deed Dollars
																				</Button>
																				:
																				(userChatInformation[0].transaction_status == "Pending" || transactionStatus == "Pending") &&
																				<Button
																					w={'70%'}
																					isLoading={isConfirmDisabled}
																					type="submit"
																					mt={'5'}
																					colorScheme="orange"
																					size="md"
																					fontSize="md"
																					onClick={() => confirmCreditHandler()}
																				>
																					Mark Complete
																				</Button>
																		}

																		<Button
																			w={'70%'}
																			isLoading={isConfirmDisabled}
																			type="submit"
																			mt={'5'}
																			colorScheme="orange"
																			size="md"
																			fontSize="md"
																			onClick={() => rejectCreditHandler()}
																		>
																			Cancel Order
																		</Button>
																	</>

																)}
															{userChatInformation.length > 0 &&
																userChatInformation[0].listing.user_id ===
																userId &&
																(userChatInformation[0].transaction_status != null || transactionStatus != null) &&
																userChatInformation[0].listing.listing_type != 'wanted' &&
																!rejectStatus &&
																((userChatInformation[0].transaction_status != "Completed" || transactionStatus != "Completed") && userChatInformation[0].seller_deed_status != 1) && (
																	<>
																		{
																			(userChatInformation[0].transaction_status == "On Hold" || transactionStatus == "On Hold") ?
																				<Button
																					w={'70%'}
																					isLoading={isConfirmDisabled}
																					type="submit"
																					mt={'5'}
																					colorScheme="orange"
																					size="md"
																					fontSize="md"
																					onClick={() => acceptCreditHandler()}
																				>
																					Accept Deed Dollars
																				</Button>
																				:
																				(userChatInformation[0].transaction_status == "Pending" || transactionStatus == "Pending") &&
																				<Button
																					w={'70%'}
																					isLoading={isConfirmDisabled}
																					type="submit"
																					mt={'5'}
																					colorScheme="orange"
																					size="md"
																					fontSize="md"
																					onClick={() => confirmCreditHandler()}
																				>
																					Mark Complete
																				</Button>
																		}

																		<Button
																			w={'70%'}
																			isLoading={isConfirmDisabled}
																			type="submit"
																			mt={'5'}
																			colorScheme="orange"
																			size="md"
																			fontSize="md"
																			onClick={() => rejectCreditHandler()}
																		>
																			Cancel Order
																		</Button>
																	</>

																)}


															{userChatInformation.length > 0 &&
																userChatInformation[0].listing.user_id !==
																userId &&
																userChatInformation[0].listing.listing_type != 'wanted' &&

																((userChatInformation[0].transaction_status != "Completed" || transactionStatus != "Completed") && userChatInformation[0].buyer_deed_status != 1) && (
																	<>
																		{
																			((userChatInformation[0].transaction_status == "On Hold" || transactionStatus == "On Hold") ||
																				(userChatInformation[0].transaction_status == "Pending" || transactionStatus == "Pending"))
																				&& !rejectStatus ?
																				<>
																					<Button
																						w={'70%'}
																						isLoading={isConfirmDisabled}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => confirmCreditHandler()}
																					>
																						Mark Complete
																					</Button>
																					<Button
																						w={'70%'}
																						isLoading={isConfirmDisabled}
																						type="submit"
																						mt={'5'}
																						colorScheme="orange"
																						size="md"
																						fontSize="md"
																						onClick={() => rejectCreditHandler()}
																					>
																						Cancel Order
																					</Button>
																				</>
																				:
																				<Button
																					w={'70%'}
																					type="submit"
																					mt={'5'}
																					colorScheme="orange"
																					size="md"
																					fontSize="md"
																					onClick={() => setTCreditModal(true)}
																				>
																					Transfer Deed Dollars
																				</Button>
																		}
																		{/* {
																			userChatInformation[0].transaction_status != null && !rejectStatus &&


																		} */}
																	</>
																)}

														</Center>
													</Box>

													<Box
														position={'absolute'}
														bottom={0}
														minW={'100%'}
														px={10}
														pb={5}
														background="#fff"
													>
														{!isDeeddCompleted &&
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
																		onE
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
														}
													</Box>
												</>
											)}
										{tCreditModal && (
											<TransferCreditModal
												messageInfo={messageInfo}
												getMessage={getMessage}
												isLoading={isTransactionLoading}
												show={tCreditModal}
												onClose={() => setTCreditModal(false)}
												submit={transferCreditHandler}
												creditAmount={creditAmount}
												setCreditAmount={(e) => setCreditAmount(e)}
												userChatInformation={userChatInformation.length ? userChatInformation[0] : []}
											/>
										)}
										{isModalShow && (
											<ModalPopup
												TitleModal="Your don't have enough deed dollars"
												show={isModalShow}
												size={'xs'}
												setShow={(value) => {
													setIsModalShow(value)
												}}
												body={
													<InnerSection
														goNext={() => { }}
														lastStep={false}
														para="Complete a deed or invite friends to earn more deed dollars"
														show={isModalShow}
														setIsModalShow={setIsModalShow}
													/>
												}
											/>
										)}
										{pendingCreditModal && (
											<PendingCreditModal
												messageInfo={messageInfo}
												getMessage={getMessage}
												show={pendingCreditModal}
												onClose={() => setPendingCreditModal(false)}
											/>
										)}
										{onHoldCreditModal && (
											<OnHoldCreditModal
												messageInfo={messageInfo}
												getMessage={getMessage}
												show={onHoldCreditModal}
												onClose={() => setOnHoldCreditModal(false)}
											/>
										)}
										{creditTransferred && (
											<CreditTransferredModal
												messageInfo={messageInfo}
												getMessage={getMessage}
												show={creditTransferred}
												onClose={() => setCreditTransferred(false)}
											/>
										)}
										{rateAndReviewModal && (
											<RateAndReviewModal
												isLoading={isTransactionLoading}
												submitReviewAndRating={() => submitReviewAndRating()}
												setRatingValue={(e) => setRatingValue(e)}
												ratingValue={ratingValue}
												reviewText={reviewText}
												setReviewText={(e) => setReviewText(e)}
												show={rateAndReviewModal}
												onClose={() => setRateAndReviewModal(false)}
											/>
										)}
										{transactionModal && (
											<TransactionModal
												messageInfo={messageInfo}
												getMessage={getMessage}
												submitTransactionReport={() =>
													submitTransactionReport()
												}
												show={transactionModal}
												onClose={() => setTransactionModal(false)}
												setTransactionReportText={(e) =>
													setTransactionReportText(e)
												}
												transactionReportText={transactionReportText}
											/>
										)}
									</Box>
								)}
							{chatRoom.length === 0 && (
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
												with other users. Browse to look for items or services.
											</Text>
											<Button
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
											</Button>
											<Button
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
											</Button>
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
