import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { Button, Image, Spinner } from '@chakra-ui/react'
import HaniCam from '../../assets/imgs/upload.png'
import { isMobile } from 'react-device-detect'
import { useToast } from "@chakra-ui/toast";
import ImgCrop from 'antd-img-crop';
import 'antd/dist/antd.css';

const Avatar = (props) => {
  let { setAvatar, imgNo } = props
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === "image/gif" || file.type === "image/tiff" || file.type === " image/svg" || file.type === "image/ief" || file.type === "image/bmp" || file.type === "image/heic")
    if (!isJpgOrPng) {
      toast({ title: "You can only upload Image file!", status: "error" })
    }
    const isLt2M = file.size / 1024 / 1024 < 600
    if (!isLt2M) {
      toast({ title: "Image must smaller than 5MB!", status: "error" })
    }
    return isJpgOrPng && isLt2M
  }
  const handleChange = (info) => {
    setLoading(true)
    if (info.file.status === 'done') {
      setAvatar(info, imgNo)
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? (
        <div className='flex items-center h-full'><Spinner color='primary.300' emptyColor='gray.200' /></div>
      ) : (
        <div
          className="flex justify-center items-center"
          style={{
            backgroundColor: 'transparent',
            borderRadius: '50%',
            height: isMobile ? '140px' : '200px',
            width: isMobile ? '95%' : '200px'
          }}
        >
          {' '}
          <img
            src={HaniCam.src}
            alt="avatar"
            className="create-list-img"
            style={{
              width: isMobile ? '100%' : '200px',
              height: isMobile ? '120px' : '183px'
            }}
          />
        </div>
      )}
      {/* <Button width="full" mt="6" colorScheme="orange" size="lg" fontSize="md">
        Upload
      </Button> */}
    </div>
  )
  return (
    <ImgCrop rotate>
      <Upload
        name="avatar"
        id="output"
        listType="picture-card"
        className="avatar-uploader avatar-uploader-listing"
        showUploadList={false}
        beforeUpload={beforeUpload}
        showRemoveIcon={true}
        onChange={(e) => {
          handleChange(e)
        }}
      >
        {imageUrl ? (
          <div
            className="flex justify-center items-center"
            style={{
              backgroundColor: 'transparent',
              borderRadius: '50%',
              height: isMobile ? '140px' : '200px',
              width: isMobile ? '100%' : '200px',
              marginRight: isMobile ? '2%' : 0,
              position: "relative"
            }}
          >
            <img
              src={imageUrl}
              alt="avatar"
              className="create-list-img"
              style={{
                width: isMobile ? '100%' : '200px',
                height: isMobile ? '120px' : '183px'
              }}
            />
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
  )
}

export default Avatar
