import React, { useEffect, useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar.jsx";
import { Image, Input, Textarea } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { Radio, Select, Space, Upload } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { accessToken, baseUrl } from "../components/Helper/index";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import camera from "../assets/imgs/camera.png";
import { useToast } from '@chakra-ui/toast'
// import { Select } from "antd";

// const options = [];
// for (let i = 10; i < 36; i++) {
//   options.push({
//     value: i.toString(36) + i,
//     label: i.toString(36) + i,
//   });
// }
const myData = [
  { value: "apple", label: "Volunteer" },
  { value: "banana", label: "Animals" },
  { value: "cherry", label: "Clothes" },
  // add more items as needed
];
const options = myData.map((item) => ({
  value: item.value,
  label: item.label,
}));
const handleChange = (value) => {
};

const CreateDonationListing = () => {
  const [size, setSize] = useState("middle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = typeof window !== "undefined" ? useRouter() : null;
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [image, setImage] = useState(null);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);
  const [formErrors, setFormErrors] = useState({});
  const [hover, setHover] = useState(false);
  const toast = useToast()

  if (!router) {
    return null;
  }
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url_to_donate: "",
    keywords: [],
    category_id: null,
    thumbnail: "",
  });
  const [slug, setSlug] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [donationCategoryList, setDonationCategoryList] = useState([]);
  const [donError, setDonError] = useState([]);


  const handleInputChange = (event, type) => {
 

    if(type == 'title'){
      setFormData({ ...formData, title: event.target.value })
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['title']: false, // Reset the error state for the specific question ID
      }));
    }else if(type == 'description'){
      setFormData({ ...formData, description: event.target.value })
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['description']: false, // Reset the error state for the specific question ID
      }));
    }else if(type == 'url_to_donate'){
      setFormData({ ...formData, url_to_donate: event.target.value })
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['url_to_donate']: false, // Reset the error state for the specific question ID
      }));
    }else if(type == 'category_id'){
      setFormData({ ...formData, category_id: event.target.value })
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['category_id']: false,
      }));
    }
  };
  
  const handleKeywords = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => (option && option));
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: selectedValues,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ['keywords']: false,
    }));
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleFileChange = (info) => {
  
    const file = info.file.originFileObj;
    if (file) {
      // Update the formData with the new thumbnail file
      setFormData((prevFormData) => ({
        ...prevFormData,
        thumbnail: info.file.originFileObj,
      }));
      getBase64(file, (imageUrl) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          old_thumbnail: imageUrl, // Show the new thumbnail preview
        }));
      });
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['thumbnail']: false,
      }));
    }
  };


  const getDonationCategoryList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/donation-listings/categories`)
    if (data.status === 200) {
      setDonationCategoryList(data.data.data)
    }
  }, [])

  useEffect(() => {
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setSlug(res.data[0].slug);
      })
      .catch((err) => {
      });
    axios
      .get(`${baseUrl}/listings/categories`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
      });

    getDonationCategoryList()
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasErrors = false;
    
    if (!formData.title) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['title']: true, 
      }));
      hasErrors = true;
    }

    if (!formData.description) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['description']: true, 
      }));
      hasErrors = true;
    }

    if (!formData.url_to_donate) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['url_to_donate']: true, 
      }));
      hasErrors = true;
    }

    if (!formData.category_id) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['category_id']: true, 
      }));
      hasErrors = true;
    }

    if (!formData.keywords.length) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['keywords']: true, 
      }));
      hasErrors = true;
    }

    if (!formData.thumbnail) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['thumbnail']: true, 
      }));
      hasErrors = true;
    }

    // If there are errors, prevent form submission
    if (hasErrors) {
      toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      return;
    }


    const form = new FormData();
    setIsSubmitting(true);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("url_to_donate", formData.url_to_donate);
    form.append("category_id", formData.category_id);
    formData.keywords.forEach((keyword) => form.append("keywords[]", keyword));
    if (Array.isArray(formData.thumbnail)) {
      formData.thumbnail.forEach((file) => form.append("thumbnail", file));
    } else if (formData.thumbnail && typeof formData.thumbnail[Symbol.iterator] === 'function') {
      for (const file of formData.thumbnail) {
        form.append("thumbnail", file);
      }
    } else if (formData.thumbnail) {
      form.append("thumbnail", formData.thumbnail);
    }
    axios
      .post(`${baseUrl}/donation-listings/store/${slug}`, form, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((response) => {
        // setShowSuccess(true);
        router.push("/organization/listings");
        toast({ position: "top", title: 'Donation listing has been created successfully.', status: "success" })
        setIsSubmitting(false);
      })
      .catch((error) => {
        setShowError(true);
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors;
          console.error('An error occurred:', errorMessages);

          // Set errors in state
          setDonError(Object.values(errorMessages).flat());
        } else {
          console.error('An unknown error occurred:', error);
        }
        setIsSubmitting(false);
      });
  };
  console.log('eeeee', formErrors)
  console.log('eeeee2', formData)
  return (
    <>
      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Donation Listing Created Successfully
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseSuccess} className="modal-btn">
            Got it
          </button>
        </div>
      </Modal>

      <Modal show={showError} onHide={handleCloseError} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
          <ul>
          {donError.map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseError} className="modal-btn">
            Got it
          </button>
        </div>
      </Modal>

      <div className="d-flex justify-content-between col-md-8">
        <p className="listing-txt mt-5 ms-3">Donation Listings</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-5 col-md-5">
            <label
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
              }}
              className="form-label"
            >
              Charity Name
            </label>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              className={`form-control mt-2 ${formErrors['title'] ? 'input-error' : ''}`}
              value={formData.title}
              onChange={(e)=> (handleInputChange(e, 'title'))}
              name="title"
              placeholder="Charity Name"
              required
            />
            {formErrors['title'] && <p className="error-message">Please fill out the field.</p>}
          </div>
          <div className="mb-3 mt-4 col-md-5">
            <label
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
              }}
              className="form-label"
            >
              Description{" "}
            </label>
            <Textarea
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              className={`form-control mt-2 ${formErrors['description'] ? 'input-error' : ''}`}
              value={formData.description}
              onChange={(e)=> (handleInputChange(e, 'description'))}
              name="description"
              placeholder="Description"
              rows={6}
              required
            />
            {formErrors['title'] && <p className="error-message">Please fill out the field.</p>}
          </div>
          <div className="mb-3 mt-4 col-md-5">
            <label
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
              }}
              className="form-label"
            >
              URL to Donate Page
            </label>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              className={`form-control mt-2 ${formErrors['url_to_donate'] ? 'input-error' : ''}`}
              value={formData.url_to_donate}
              name="url_to_donate"
              onChange={(e)=> (handleInputChange(e, 'url_to_donate'))}
              placeholder="URL"
              required
            />
            {formErrors['url_to_donate'] && <p className="error-message">Please fill out the field.</p>}
          </div>
          <div className="mb-3 mt-3 col-md-4">
            <div className="mt-2">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Select Category
              </label>

              <div className="col-md-12">
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select category"
                  optionFilterProp="children"
                  className={`${formErrors['category_id'] ? 'input-error' : ''}`}
                  value={formData.category_id}
                  onChange={(value) => handleInputChange({ target: { value } }, "category_id")}
                  name="category_id"
                  onSearch={(value) => setInputValue(value)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  size="large"
                >
                  {donationCategoryList.map((item) => (
                    // @ts-ignore: Unreachable code error
                    <Option key={item.id} value={item.id}>
                      {
                        // @ts-ignore: Unreachable code error
                        item.name
                      }
                    </Option>
                  ))}
                </Select>
                {formErrors['category_id'] && <p className="error-message">Please select category.</p>}
              </div>
            </div>
          </div>
          <div className="mb-3 mt-3 col-md-4">
            <label
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
              }}
              className="form-label"
            >
              Keywords
            </label>
            <Select
              mode="tags"
              size={size}
              placeholder="Please select"
              // defaultValue={["Volunteer", "Animals"]}
              onChange={(selectedOptions)=> (handleKeywords(selectedOptions))}
              value={formData.selectedValues}
              className={`form-control mt-2 ${formErrors['keywords'] ? 'input-error' : ''}`}
              style={{
                width: "100%",
              }}
            />
            {formErrors['keywords'] && <p className="error-message">Please add at least 3 keywords.</p>}
          </div>
          <label
            style={{
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "24px",
            }}
            className="form-label"
          >
            Upload a thumbnail picture
          </label>
          <div className="upload-pic d-flex justify-content-center align-items-center">
          <div>
          <Upload
            accept="image/*"
            customRequest={() => {}}
            onChange={(e) =>{handleFileChange(e)}}
            showUploadList={false}
          >
            <div
              className="upload-pic d-flex justify-content-center align-items-center"
              style={{ // @ts-ignore: Unreachable code error
                border: formData.new_thumbnail
                  ? '2px solid #007BFF'
                  : '2px solid transparent',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                position: 'relative',
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {formData.old_thumbnail ? (
                <img
                  src={formData.old_thumbnail}
                  width={200}
                  height={200}
                  alt="Previous Thumbnail"
                />
              ) : (
                <img src={camera.src} alt="Thumbnail placeholder" />
              )}

              {hover && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '16px',
                  }}
                >
                  Upload
                </div>
              )}
            </div>
          </Upload>
          </div>
          </div>
          {formErrors['thumbnail'] && <p className="error-message">Please upload the thumbnail.</p>}
          {isSubmitting ? (
            <div
              style={{ color: "#E27832" }}
              className="spinner-border mt-5"
            ></div>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="update-v-btn mt-5 mb-5"
            >
              Create
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateDonationListing;
