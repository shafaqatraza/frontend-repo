import React, { useState } from "react";
import { Upload, message } from "antd";
import { Button, Image, Avatar, Spinner } from "@chakra-ui/react";
import HaniCam from "../../assets/imgs/add-a-photo.png";
import { useToast } from "@chakra-ui/toast";
import ImgCrop from 'antd-img-crop';
import 'antd/dist/antd.css';

const UploadComponent = (props) => {
  let { setAvatar, fullName, avtarUrl } = props;
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast()

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
      setAvatar(info.file.originFileObj);
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
    <div>
      {loading ? (
        <div className='flex justify-center w-full'><Spinner color='primary.300' emptyColor='gray.200' /></div>
      ) : (


        <div
          className="flex justify-center items-center"
          style={{
            backgroundColor: "var(--chakra-colors-gray-50)",
            borderRadius: "50%",
            height: "150px",
            width: "150px",
          }}
        >
          {" "}
          <Avatar
            my="4"
            size={"2xl"}
            name={fullName || ""}
            src={avtarUrl}
            backgroundSize={"cover"}
          />
          {/* <Image src={HaniCam.src} alt="camera" /> */}
        </div>
      )}
      <Button
        variant={'solid'}
        colorScheme={'orange'}
        height="40px"
        style={{
          borderRadius: 100
        }}
        size={'md'}
        px={10}
        mt={5}
        mx={4}
      >
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
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={(e) => {
          handleChange(e);
        }}
      >
        {imageUrl ? (
          <div
            className="flex justify-center items-center"
            style={{
              backgroundColor: "var(--chakra-colors-gray-50)",
              borderRadius: "50%",
              height: "150px",
              width: "150px",
            }}
          >
            <Avatar
              backgroundSize={"cover"}
              my="4"
              size={"2xl"}
              name={fullName || ""}
              src={imageUrl}
            />
            
          </div>
          
        ): (uploadButton)}
      
      </Upload>
    // </ImgCrop>
  );
};

export default UploadComponent;
