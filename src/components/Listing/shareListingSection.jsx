import React, { useState, useEffect } from 'react'
import {
    Input,
    InputGroup,
    InputRightAddon,
    Spinner,
    useToast
} from '@chakra-ui/react'
// import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton, TelegramShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, WhatsappIcon } from "react-share";
import { FaRegCopy, FaCheck } from 'react-icons/fa'

// import { useRouter } from 'next/router'


export const ShareListingSection = ({ socialShareLinks, loading ,title}) => {
    const toast = useToast()
    const [copied, setCopied] = useState(false)
    const [url, setUrl] = useState()
    // const router = useRouter()
    // let { para } = props;


    const copyToClip = (e) => {
        navigator.clipboard.writeText(e.target.value)
        toast({
            title: 'Link Copied',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
        })
        setCopied(true)
    }

    useEffect(() => {
        const listUrl = window.location.href

        setUrl(listUrl)
    }, [])

    const shareWrap = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '30px'
    }

    return (
        <>
            <InputGroup cursor={'pointer'}>
                <Input value={url} readOnly onClick={copyToClip} cursor={'pointer'} />
                <InputRightAddon children={copied ? <FaCheck /> : <FaRegCopy />} />
            </InputGroup>

            <div style={shareWrap}>

                {loading ? (
                    <Spinner
                        thickness="4px"
                        speed="1s"
                        // emptyColor="orange.200"
                        color="orange.500"
                        size="xl"
                    />
                ) : (
                    <>
                        <a href={socialShareLinks.facebook} target="_blank" >
                            <FacebookIcon size={50} round />
                        </a>
                        <a href={socialShareLinks.twitter} target="_blank">
                            <TwitterIcon size={50} round />
                        </a>
                        <a href={socialShareLinks.linkedin} target="_blank">
                            <LinkedinIcon size={50} round />
                        </a>
                        <a href={socialShareLinks.pinterest} target="_blank">
                            <PinterestIcon size={50} round />
                        </a>
                        <a href={socialShareLinks.reddit} target="_blank">
                            <RedditIcon size={50} round />
                        </a>
                        <a href={socialShareLinks.telegram} target="_blank">
                            <TelegramIcon size={50} round />
                        </a>
                        <a href={socialShareLinks.whatsapp} target="_blank">
                            <WhatsappIcon size={50} round />
                        </a>

                    </>
                )}

            </div>
        </>

    )
}
