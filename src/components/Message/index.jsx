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
import MessageBoxOrgWeb from './MessageBoxOrgWeb'
import MessageBoxOrgMob from './MessageBoxOrgMob'
import TransferCreditModal from './TransferCreditModal'
import RequestCreditModal from './RequestCreditModal'
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
	const [isTransactionLoading, setIsTransactionLoading] = useState(false)
	const [tCreditModal, setTCreditModal] = useState(false)
	const [creditsRequest, setCreditsRequestModal] = useState(false)
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
	const [chatHeader, setChatHeader] = useState({ name: '', avatar_url: '', username: '', online_status: null, last_seen: '' })
	const [chatOrganizationData, setChatOrganizationData] = useState({ name: '', avatar: '', slug: ''})
	const [transactionDetail, setTransactionDetail] = useState({ transation_id: '', bool_trasaction_type: false })
	const [isModalShow, setIsModalShow] = useState(false)
	const [isInsufficientCredits, setInsufficientCredits] = useState(false)
	const [profileData, setProfileData] = useState([])
	const [chatNotify, setChatNotify] = useState(0)
	const [showChat, setShowChat] = useState(false)
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
				if(newData && newData[0].model_type != 'Organization'){
					setChatRoom(newData);
				}else if(newData && newData[0].model_type == 'Organization' && userId == newData[0].receiver.id){
					setChatRoom(newData);
				}
			});
		});

		var channel = pusher.subscribe('sender_chat_'+userId);
		channel.bind('pusher:subscription_succeeded', function() {
			channel.bind('sender_notify', function(data) {
					let senderData=data.chat
					if(senderData && senderData[0].model_type != 'Organization'){
						setChatRoom(senderData);
					}else if(senderData && senderData[0].model_type == 'Organization' && userId == senderData[0].receiver.id){
						setChatRoom(senderData);
					}
			});
			});
	}, [])


	//	Set insufficient credits handler
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

	//	Transfer credits handler
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

	const requestCreditHandler = async () => {
		const creditData = {
			chat_id: messageInfo.chat_id,
			requested_credits: creditAmount !== "" ? parseInt(creditAmount) : creditAmount
		}
		setIsTransactionLoading(true)
		await axios
			.post(baseUrl + '/credit-requests', creditData, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-type': 'Application/json',
					Authorization: `Bearer ${accessToken()}`
				}
			})
			.then((res) => {
				getChats();
				setIsTransactionLoading(false)
				setCreditsRequestModal(false)
				// setOnHoldCreditModal(true)
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

	//	Reject transaction handler
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
			let transactions = conversationData.filter((e) => e.transaction_id != null)
			setIsTransactionLoading(true)
			await axios
				.post(
					baseUrl + `/user/cancel-transaction/${transactions[transactions.length - 1].transaction_id
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

	//	Accept transaction handler
	const acceptCreditHandler = async () => {
		setTimeout(async () => {
			let transactions = conversationData.filter((e) => e.transaction_id != null)
			if (conversationData.length > 0) {
				setIsConfirmDisabled(true)
				setIsTransactionLoading(true)
				await axios
					.post(
						baseUrl + `/user/accept-transaction/${transactions[transactions.length - 1].transaction_id

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

	//	Complete deed handler
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
			let transactions = conversationData.filter((data) => data.transaction_id != null)

			if (conversationData.length > 0) {
				setIsConfirmDisabled(true)
				setIsTransactionLoading(true)

				await axios
					.post(
						baseUrl + `/user/transactions/${transactions[transactions.length - 1].transaction_id}`,
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

	//	Message box scroll handler
	const scrollToBottom = () => {
		var element = document.getElementById('message-box')
		if (element !== null) {
			element.scrollTop = element.scrollHeight + 200
		}
	}

	//	Get message handler
	const getMessage = async (
		id,
		receiver_id,
		listing_id,
		sender_id,
		receiver = {},
		sender = {},
		organization = {}
	) => {

		setMessageInfo({
			chat_id: '',
			receiver_id: '',
			listing_id: '',
			credits: ''
		})
		setTransactionStatus(null)
		userId != receiver_id
			? (receiver_id = receiver_id)
			: (receiver_id = sender_id)
		setChatId(id)

		if (userId === receiver.id) {
			setChatHeader({ name: sender.name, avatar_url: sender.avatar, username: sender.username, online_status: sender.online_status, last_seen: sender.last_seen })
		} else if (userId === sender.id) {
			setChatHeader({ name: receiver.name, avatar_url: receiver.avatar, username: receiver.username, online_status: receiver.online_status, last_seen: receiver.last_seen })
		}

		if(organization !== null){
			setChatOrganizationData({ name:organization.name, slug: organization.slug, avatar: organization.avatar })
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
				if(allMsg.model_type == null){
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
				}

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
	}

	//	Message box onload scroll handler
	useEffect(() => {
		scrollToBottom();
	}, [conversationData])

	//	Get chats handler
	const getChats = async () => {
		await axios
			.get(baseUrl + '/member/chats', {
				headers: {
					Authorization: `Bearer ${accessToken()}`
				}
			})
			.then((res) => {

				if (listingData != undefined) {
					removeListinData()
					let tmpExisting = res.data.data
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

	//	Review & Rating handler
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

	//	Transaction report handler
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
					toast({
						position: 'top',
						title: 'Something went wrong',
						status: 'error'
					})
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
				})
		}
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
			formData.append('sent_by_organization', 0)


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
								// If Mobile View
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
																data.sender,
																data.organization
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
															src={data.organization? data.organization.avatar : data.listing.user_id===userId ? data.sender.avatar : data.receiver.avatar}
															alt="Dan Abramov 1"
															borderRadius={10}

														/>

														<Box flexGrow={1}>
															<Flex justifyContent={'space-between'}
																alignItems={'center'}>
																<Text ml={'20px'} fontWeight={600} fontSize={'14px'}>
																	{data.organization? data.organization.name : loginUser &&
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
																whiteSpace='nowrap'
																overflow='hidden'
																textOverflow='ellipsis'
																maxWidth='200px'
																fontWeight={500}
																fontSize={'14px'}
																style={isMobile ? { width: '270px' } : {}}
															>

																{ data.last_msg }
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
								// If Web View
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
															data.sender_id,
															data.receiver,
															data.sender,
															data.organization
														)
													}
												>
													<Box width={'60px'}>
														<Image
															boxSize="60px"
															objectFit="cover"
															src={data.organization? data.organization.avatar : data.listing.user_id===userId ? data.sender.avatar : data.receiver.avatar}
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
																{data.organization? data.organization.name : loginUser &&
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
															maxWidth='200px'
															fontWeight={500}
															fontSize={'14px'}
															style={isMobile ? { width: '270px' } : { }}
														>
															{data.last_msg}
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
										))
									}
								</Box>
							)}

{/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
							{/* Right Side Chatbox */}
							{isMobile
								? showChat
									? Object.keys(userChatInformation).length != 0 && (
										<>
											{userChatInformation[0].model_type === 'Organization' ? (
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
															<Link href={chatOrganizationData? '/#' :  `/profile/${chatHeader.username}`} display='flex'>
																<Avatar
																	size={'sm'}
																	name={'fullName' || ''}
																	src={chatOrganizationData ? chatOrganizationData.avatar : `${chatHeader.avatar_url
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
																		{chatOrganizationData.name}
																	</Text>
																	<Text color={'white'} ml={3} fontSize={10}>
																		{chatHeader.online_status ? 'Online' : chatHeader.last_seen}
																	</Text>
																</Flex>
															</Link>
														</Box>
													</Flex>
													<MessageBoxOrgMob 
														messages = {userChatInformation}
														messageInfoData = {messageInfo} 
														chatInfoData = {chatHeader}
														organizationInfoData = {null}
														conversation={conversationData}
														message = {message}
													/>
												</Box>
											) : (
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
														!creditsRequest &&
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
																				src={userChatInformation[0].listing.image? `${userChatInformation[0].listing.image_path}/${userChatInformation[0].listing.image}` : NoImage.src}
																				alt="Dan Abramov 3"
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
																				Credits
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
																		user_chat_info={userChatInformation}
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
																							Transfer Credits
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
																								Accept Credits
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
																								Accept Credits
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
																								Transfer Credits
																							</Button>
																					}
																					{/* {
																					userChatInformation[0].transaction_status != null && !rejectStatus &&

																					
																				} */}
																				</>
																			)}

																		{/* --------------------------Request Credits Mobile-------------------------------- */}
																		{userChatInformation.length > 0 &&
																			userChatInformation[0].transaction_status == null && 
																			(
																				<>
																				{
																					((userChatInformation[0].listing.user_id != userId && userChatInformation[0].listing.listing_type == 'wanted') || 
																					(userChatInformation[0].listing.user_id === userId && userChatInformation[0].listing.listing_type != 'wanted')) &&
																						(
																						<>
																						{
																							userChatInformation[0].credits_request === false && 
																							(
																								<>
																								<Button
																									w={'70%'}
																									isLoading={isConfirmDisabled}
																									type="submit"
																									mt={'5'}
																									colorScheme="orange"
																									size="md"
																									fontSize="md"
																									onClick={() => setCreditsRequestModal(true)}
																								>
																									Request Credits
																								</Button>
																								
																								</>
																							) || 
																							userChatInformation[0].transaction_status == null && userChatInformation[0].credits_request !== false &&
																								<Button
																									w={'70%'}
																									isLoading={isConfirmDisabled}
																									type="submit"
																									mt={'5'}
																									colorScheme="orange"
																									size="md"
																									fontSize="md"
																									disabled
																								>
																									Request Credits
																								</Button>
																						}
																						</>
																						)
																				}
																				</>
																		)	
																		}
																		{/* --------------------------Request Credits Mobile End-------------------------------- */}

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
															onClose={() => closeModal('transfer_credits')}
															submit={transferCreditHandler}
															creditAmount={creditAmount}
															setCreditAmount={(e) => setCreditAmount(e)}
															userChatInformation={userChatInformation.length ? userChatInformation[0] : []}
														/>
													)}
													
													{/* ----------------Request Credits Modal Mobile-------------- */}
													{creditsRequest && (
														<RequestCreditModal
															messageInfo={messageInfo}
															getMessage={getMessage}
															isLoading={isTransactionLoading}
															show={creditsRequest}
															onClose={() => closeModal('credits_request')}
															submit={requestCreditHandler}
															creditAmount={creditAmount}
															setCreditAmount={(e) => setCreditAmount(e)}
															userChatInformation={userChatInformation.length ? userChatInformation[0] : []}
														/>
													)}
													{/* ----------------Request Credits Modal End-------------- */}

													{isModalShow && (
														<ModalPopup
															TitleModal="Your don't have enough credits"
															show={isModalShow}
															size={'xs'}
															setShow={(value) => {
																setIsModalShow(value)
															}}
															body={
																<InnerSection
																	goNext={() => { }}
																	lastStep={false}
																	para="Complete a deed or invite friends to earn more credits"
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
															onClose={() => closeModal('pending_credits')}
														/>
													)}
													{creditTransferred && (
														<CreditTransferredModal
															messageInfo={messageInfo}
															getMessage={getMessage}
															show={creditTransferred}
															onClose={() => closeModal('credits_transferred')}
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
															onClose={() => closeModal('rate_and_review')}
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
															onClose={() => closeModal('transaction')}
															setTransactionReportText={(e) =>
																setTransactionReportText(e)
															}
															transactionReportText={transactionReportText}
														/>
													)}
												</Box>
											)}
										</>
									)
									: null
								: Object.keys(userChatInformation).length !== 0 && (
									<>
									{userChatInformation[0].model_type === 'Organization' ? (
										<MessageBoxOrgWeb
											messages = {userChatInformation}
											messageInfoData = {messageInfo}
											chatInfoData = {chatHeader}
											organizationInfoData = {chatOrganizationData}
											conversation={conversationData}
											message = {message}
										/>
									) : (
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
																	position={'relative'}
																>
																	<div className="onlineStatus" style={{ background: chatHeader.online_status === true ? '#13d50c' : '#bfbfbf' }}></div>
																</Avatar>
																<Flex
																	flexDirection={'column'}
																>
																	<Text color={'white'} ml={5}>
																		{chatHeader.username}
																	</Text>
																	<Text color={'white'} ml={5} fontSize={'10px'}>
																		{chatHeader.online_status ? 'Online' : chatHeader.last_seen}
																	</Text>
																</Flex>
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
												!creditsRequest &&
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
																		src={userChatInformation[0].model_type === 'Organization'
																		? userChatInformation[0].listing.image_path
																		: `${userChatInformation[0].listing.image_path}/${userChatInformation[0].listing.image}`}
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
																user_chat_info={userChatInformation}
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

																{/* --------------------------Request Credits Web-------------------------------- */}
																{userChatInformation.length > 0 &&
																	userChatInformation[0].transaction_status == null &&
																	(
																		<>
																		{
																			((userChatInformation[0].listing.user_id != userId && userChatInformation[0].listing.listing_type == 'wanted') ||
																			(userChatInformation[0].listing.user_id === userId && userChatInformation[0].listing.listing_type != 'wanted')) &&
																				(
																				<>
																				{
																					userChatInformation[0].credits_request === false &&
																					(
																						<>
																						<Button
																							w={'70%'}
																							isLoading={isConfirmDisabled}
																							type="submit"
																							mt={'5'}
																							colorScheme="orange"
																							size="md"
																							fontSize="md"
																							onClick={() => setCreditsRequestModal(true)}
																						>
																							Request Deed Dollars
																						</Button>

																						</>
																					) ||
																					userChatInformation[0].transaction_status == null && userChatInformation[0].credits_request !== false &&
																						<Button
																							w={'70%'}
																							isLoading={isConfirmDisabled}
																							type="submit"
																							mt={'5'}
																							colorScheme="orange"
																							size="md"
																							fontSize="md"
																							disabled
																						>
																							Request Deed Dollars
																						</Button>
																				}
																				</>
																				)
																		}
																		</>
																)
																}
																{/* --------------------------Request Credits Web End-------------------------------- */}


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
													onClose={() => closeModal('transfer_credits')}
													submit={transferCreditHandler}
													creditAmount={creditAmount}
													setCreditAmount={(e) => setCreditAmount(e)}
													userChatInformation={userChatInformation.length ? userChatInformation[0] : []}
												/>
											)}
										{/* ----------------Request Credits Modal-------------- */}
											{creditsRequest && (
												<RequestCreditModal
													messageInfo={messageInfo}
													getMessage={getMessage}
													isLoading={isTransactionLoading}
													show={creditsRequest}
													onClose={() => closeModal('credits_request')}
													submit={requestCreditHandler}
													creditAmount={creditAmount}
													setCreditAmount={(e) => setCreditAmount(e)}
													userChatInformation={userChatInformation.length ? userChatInformation[0] : []}
												/>
											)}
										{/* ----------------Request Credits Modal End-------------- */}

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
													onClose={() => closeModal('pending_credits')}
												/>
											)}
											{onHoldCreditModal && (
												<OnHoldCreditModal
													messageInfo={messageInfo}
													getMessage={getMessage}
													show={onHoldCreditModal}
													onClose={() => closeModal('on_hold_credits')}
												/>
											)}
											{creditTransferred && (
												<CreditTransferredModal
													messageInfo={messageInfo}
													getMessage={getMessage}
													show={creditTransferred}
													onClose={() => closeModal('credits_transferred')}
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
													onClose={() => closeModal('rate_and_review')}
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
													onClose={() => closeModal('transaction')}
													setTransactionReportText={(e) =>
														setTransactionReportText(e)
													}
													transactionReportText={transactionReportText}
												/>
											)}
										</Box>
									)}
									</>
								)
							}



							{/* If Chatroom is empty */}
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
