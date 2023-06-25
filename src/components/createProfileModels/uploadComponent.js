import React, { useState } from "react";
import { Upload, message } from "antd";
import { Button, Image, Text, Spinner } from "@chakra-ui/react";
import HaniCam from "../../assets/imgs/add-a-photo.png";
import { useToast } from "@chakra-ui/toast";
import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";
// import heic2any from 'heic2any';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const Avatar = (props) => {
  // const { promisify } = require('util');
  let { setAvatar, isAvatarAvailable } = props;
  const toast = useToast();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

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
      setAvatar(info);
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

        setAvatar(convertedFile);
        getBase64(convertedFile, (imageUrl) => {
          setImageUrl(imageUrl);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error converting HEIC to JPEG:", error);
        setLoading(false);
        toast({ title: "Failed to convert HEIC to JPEG", status: "error" });
      }
    } else {
      setLoading(false);
      // setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const convertHeicToJpg = async (heicFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const heicBuffer = event.target.result;
        try {
          const jpgBuffer = await heic2any({
            blob: heicBuffer,
            toType: "image/jpeg",
          });
          resolve(jpgBuffer);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(heicFile);
    });
  };

  const renderUploadButton = () => {
    if (imageUrl) {
      return <Image src={imageUrl} alt="avatar" className="avatar-image" />;
    } else {
      return <Image src={HaniCam.src} alt="camera" />;
    }
  };

  const uploadButton = (
    <div style={{ position: "absolute", top: "20px" }}>
      {loading ? (
        <div
          className="flex justify-center w-full h-full items-center"
          style={{ width: "180px", height: "180px", margin: "20px 0" }}
        >
          <Spinner color="primary.300" emptyColor="gray.200" />
        </div>
      ) : (
        <div
          className="flex justify-center items-center create-profile-image"
          style={{
            border:
              isAvatarAvailable === false && !imageUrl
                ? "1px solid #E74C3C"
                : "none",
          }}
        >
          {imageUrl ? (
            <Image src={imageUrl} alt="avatar" className="avatar-image" />
          ) : (
            <Image src={HaniCam.src} alt="camera" />
          )}
        </div>
      )}
      {isAvatarAvailable === false && !imageUrl && (
        <Text textAlign="center" color="#E74C3C" fontWeight="500">
          Required Field
        </Text>
      )}
      <Button width="full" colorScheme="orange" size="lg" fontSize="md">
        {imageUrl ? "Replace" : "Upload"}
      </Button>
    </div>
  );

  return (
    // <ImgCrop rotate>
      <Upload
        name="avatar"
        id="output"
        listType="picture-card"
        className="avatar-uploader avatar-new-profile "
        showUploadList={false}
        beforeUpload={beforeUpload}
        accept=".heic,.jpg,.jpeg,.svg,.gif,.png,.tiff,.svg,.ief,.bmp"
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    //  </ImgCrop>
  );
};

export default Avatar;
