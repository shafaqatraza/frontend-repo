import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { isLogin, Logout } from './../Helper/index';
import { InputBlock } from "../inputblock/InputBlock";
import { useRouter } from "next/router";
import Link from 'next/link';
import { useMediaQuery } from '@chakra-ui/react';

export const NavbarDrawer = (props) => {
	let {
		setShowModel,
		show
	} = props
	const router = useRouter();
	const [type, setType] = useState('offering');
	const [isSmallerThan450] = useMediaQuery('(max-width: 450px)');

	const drawerBodyStyles = isSmallerThan450 && {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'end',
		marginBottom: 0,
	}

	// const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<HamburgerIcon
				onClick={() => {
					let dubShow = { ...show }
					dubShow.drawer = true
					setShowModel(dubShow)
				}}
				style={{
					marginRight: "70px",
					marginLeft: 5,
					color: "main.100",
					fontSize: 37,
					padingRight: 5,
					zIndex: 10
				}}
			/>
			{
				show.drawer &&
				<Drawer isOpen={show.drawer}
					onClose={() => {
						let dubShow = { ...show }
						dubShow.drawer = false
						setShowModel(dubShow)
					}} placement="left" size={isSmallerThan450 ? "full" : "xs"}>
					<DrawerOverlay />
					<DrawerContent>

						<DrawerHeader borderBottomWidth='1px' pb={8}>
							<DrawerCloseButton left={3} />
						</DrawerHeader>
						<DrawerBody>
							<InputBlock
								type={type}
								setType={(e) => setType(e)}
								show={show}
								setShowModel={setShowModel}
							/>

							{/* <Box
								py={4}
								px={1}
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									display: "inline",
								}}
							>
								<Text
									fontSize="2xl"
									fontWeight="500"
									display="flex"
									flexDirection="row"
									alignItems="center"
									justifyContent="space-between"
									cursor={"pointer"}
									_hover={{
										textDecoration: "underline"
									}}
									onClick={() => {
										let dubShow = { ...show }
										dubShow.drawer = false;
										setShowModel(dubShow);
										router.push("/browse?type=wanted")
									}}>
									Wanted
									<ChevronRightIcon
										style={{ float: "right" }}
									/>
								</Text>
							</Box>

							<Box
								py={4}
								px={1}
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									display: "inline",
								}}
							>
								<Text
									fontSize="2xl"
									fontWeight="500"
									display="flex"
									flexDirection="row"
									alignItems="center"
									justifyContent="space-between"
									cursor={"pointer"}
									_hover={{
										textDecoration: "underline"
									}}
									onClick={() => {
										let dubShow = { ...show }
										dubShow.drawer = false;
										setShowModel(dubShow);
										router.push("/browse?type=offering")
									}}>
									Offering <ChevronRightIcon style={{ textAlign: "right" }} />
								</Text>
							</Box> */}

							<Box
								py={4}
								px={1}
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									display: "inline",
								}}
							>
								<Text
									fontSize="2xl"
									fontWeight="500"
									display="flex"
									flexDirection="row"
									alignItems="center"
									justifyContent="space-between"
									cursor={"pointer"}
									_hover={{
										textDecoration: "underline"
									}}
									onClick={() => {
										let dubShow = { ...show }
										dubShow.drawer = false;
										setShowModel(dubShow);
										router.push("/browse?type=offering&activeTab=0")
									}}>
									Items
								</Text>
							</Box>
							<Box
								py={4}
								px={1}
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									display: "inline",
								}}
							>
								<Text
									fontSize="2xl"
									fontWeight="500"
									display="flex"
									flexDirection="row"
									alignItems="center"
									justifyContent="space-between"
									cursor={"pointer"}
									_hover={{
										textDecoration: "underline"
									}}
									onClick={() => {
										let dubShow = { ...show }
										dubShow.drawer = false;
										setShowModel(dubShow);
										router.push("/browse?type=offering&activeTab=1")
									}}>
									Services
								</Text>
							</Box>
							<Box
								py={4}
								px={1}
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									display: "inline",
								}}
							>
								<Text
									fontSize="2xl"
									fontWeight="500"
									display="flex"
									flexDirection="row"
									alignItems="center"
									justifyContent="space-between"
									cursor={"pointer"}
									_hover={{
										textDecoration: "underline"
									}}
									onClick={() => {
										let dubShow = { ...show }
										dubShow.drawer = false;
										setShowModel(dubShow);
										router.push("/browse?type=offering&activeTab=3")
									}}>
									Donate
								</Text>
							</Box>
							<Box
								py={4}
								px={1}
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									display: "inline",
								}}
							>
								<Text
									fontSize="2xl"
									fontWeight="500"
									display="flex"
									flexDirection="row"
									alignItems="center"
									justifyContent="space-between"
									cursor={"pointer"}
									_hover={{
										textDecoration: "underline"
									}}
									onClick={() => {
										let dubShow = { ...show }
										dubShow.drawer = false;
										setShowModel(dubShow);
										router.push("/browse?type=offering&activeTab=2")
									}}>
									Volunteer
								</Text>
							</Box>

							<Box mb={isSmallerThan450 ? 50 : 0}>
								<Box
									as="a"
									cursor={"pointer"}
									_hover={{ textDecor: "underline" }}
									py={3} px={1}>
									<Link href={'/about'}><Text fontSize="md" fontWeight="500">About</Text></Link>
								</Box>
								<Box as="a"
									cursor={"pointer"}
									_hover={{ textDecor: "underline" }} py={3} px={1}>
									<Link href={'/how-to-use'}><Text fontSize="md" fontWeight="500">How to Use</Text></Link>
								</Box>
								<Box as="a"
									cursor={"pointer"}
									_hover={{ textDecor: "underline" }} py={3} px={1}>
									<Link href={'#'}><Text fontSize="md" fontWeight="500">40 Hours Program</Text></Link>
								</Box>
								<Box as="a"
									cursor={"pointer"}
									_hover={{ textDecor: "underline" }} py={3} px={1}>
									<Link href={'#'}><Text fontSize="md" fontWeight="500">Charity/ Non-Profit</Text></Link>
								</Box>
								<Box as="a"
									cursor={"pointer"}
									_hover={{ textDecor: "underline" }} py={3} px={1}>
									<Link href={'/community'}><Text fontSize="md" fontWeight="500">Community Guidelines</Text></Link>
								</Box>
								<Box as="a"
									cursor={"pointer"}
									_hover={{ textDecor: "underline" }} py={3} px={1}>
									<Link href={'/blog'}>
										<Text fontSize="md" fontWeight="500">Blog</Text>
									</Link>
								</Box>
								<Box as="a"
									cursor={"pointer"}
									_hover={{ textDecor: "underline" }} py={3} px={1}>
									<Link href={'/contact-us'}>
										<Text fontSize="md" fontWeight="500">Contact Us</Text>
									</Link>
								</Box>
							</Box>

							<Flex mt={15} px={1}>
								{isLogin() &&
									<>
										<FaSignOutAlt size={23} fontSize={"24px"} />
										<Text onClick={() => {
											let dubShow = { ...show }
											Logout();
											dubShow.drawer = false;
											setShowModel(dubShow);
											router.push("/");
										}} ml={3} style={{ cursor: "pointer", fontWeight: 500 }}>
											Logout
										</Text>
									</>
								}
								{!isLogin() &&
									<>
										<FaUserCircle size={23} fontSize={"24px"} />
										<Text onClick={() => {
											let dubShow = { ...show }
											dubShow.login = true;
											dubShow.drawer = false;
											setShowModel(dubShow)
										}} ml={3} style={{ cursor: "pointer", fontWeight: 500 }}>
											Sign Up or Login
										</Text>
									</>
								}
							</Flex>
							<Button mt={10} mb={10} type="submit" w={"100%"} bg="orange.500" color="white" height="51px" borderRadius="25px"
								onClick={() => {
									if (isLogin()) {
										router.push("/listing/create");
									} else {
										let dubShow = { ...show };
										dubShow.login = true;
										setShowModel(dubShow);
									}
								}}
							>
								Create a Listing
							</Button>
						</DrawerBody>

						{/* <DrawerFooter className="drawer-footer">
							<Button mt={10} type="submit" w={"100%"} bg="orange.500" color="white" height="51px" borderRadius="25px"
								onClick={() => {
									if (isLogin()) {
										router.push("/listing/create");
									} else {
										let dubShow = { ...show };
										dubShow.login = true;
										setShowModel(dubShow);
									}
								}}
							>
								Create a Listing
							</Button>
						</DrawerFooter> */}
					</DrawerContent>
				</Drawer>}
		</>
	);
};
