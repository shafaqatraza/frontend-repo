import React, { useState } from 'react'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop';
import { Button, Image, Spinner } from '@chakra-ui/react'
import HaniCam from '../../assets/imgs/upload.png'
import { isMobile } from 'react-device-detect'
import { useToast } from "@chakra-ui/toast";
import 'antd/dist/antd.css';

const Avatar = (props) => {
  let { setAvatar, imgNo, type } = props;
  const toast = useToast()

  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "image/tiff" ||
      file.type === " image/svg" ||
      file.type === "image/ief" ||
      file.type === "image/bmp" ||
      file.type === "image/heic" ||
      file.name.split(".").pop() === "heic";
    if (!isJpgOrPng) {
      toast({ title: "You can only upload Image file!", status: "error" });
    }
    const isLt2M = file.size / 1024 / 1024 < 600;
    if (!isLt2M) {
      toast({ title: "Image must smaller than 5MB!", status: "error" });
    }

    if (file.name.split(".").pop() === "heic") {
    }
    return isJpgOrPng && isLt2M;
  };
   
  const handleChange = async (info) => {
    setLoading(true);
    const fileExtension = info.file.name.split(".").pop().toLowerCase();

    if (info.file.status === "done") {
      setAvatar(info.file.originFileObj, imgNo, fileExtension);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    } else if (fileExtension === "heic") {
      try {
        const heic2any = (await import("heic2any")).default;
        const jpegImage = await heic2any({
          blob: info.file.originFileObj,
          toType: "image/jpeg",
        });

        const convertedFile = new File([jpegImage], info.file.name, {
          type: "image/jpeg",
        });

        setAvatar(convertedFile, imgNo, fileExtension);
        getBase64(convertedFile, (imageUrl) => {
          setImageUrl(imageUrl);
          setLoading(false);
        });
      } catch (error) {
        // console.error("Error converting HEIC to JPEG:", error);
        setLoading(false);
        toast({ title: "Failed to convert HEIC to JPEG", status: "error" });
      }
    } else {
      setLoading(false);
      // setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const uploadButton = (
    <div style={{ height: '100%' }}>
      {loading ? (
        <div className='flex items-center h-full'><Spinner color='primary.300' emptyColor='gray.200' /></div>
      ) : (
        <div
          // className="flex justify-center items-center"
          style={{
            backgroundColor: 'transparent',
            borderRadius: '50%',
            height: '100%',
            // width: isMobile ? '95%' : '200px'
          }}
        >
          {' '}
          <Image src={HaniCam.src} alt="camera" height="100%" />
        </div>
      )}
      {/* <Button width="full" mt="6" colorScheme="orange" size="lg" fontSize="md">
        Upload
      </Button> */}
    </div>
  )
  return (
    // <ImgCrop rotate>
      <Upload
        name="avatar"
        id="output"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        showRemoveIcon={true}
        onChange={(e) => {
          handleChange(e)
        }}
      >
        {imageUrl ? (
          <div
            // className="flex justify-center items-center"
            style={{
              backgroundColor: 'transparent',
              borderRadius: '50%',
              height: '100%',
              // width: isMobile ? '95%' : '200px'
            }}
          >
            <img
              src={imageUrl}
              alt="avatar"
              // className="create-list-img"
              style={{
                borderRadius: '7px',
                // width: isMobile ? '220px' : '200px',
                // height: isMobile ? '110px' : '183px'
              }}
            />
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    // </ImgCrop>
  )
}

export default Avatar
