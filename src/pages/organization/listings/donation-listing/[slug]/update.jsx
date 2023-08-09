import React, { useEffect } from "react";
import Navbar from "../../../../../components/Navbar";
import Sidebar from "../../../../../components/Sidebar.jsx";
import { Image, Input, Textarea } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { Radio, Select, Space, Upload } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { accessToken, baseUrl, currentOrganization } from "../../../../../components/Helper/index";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import camera from "../../../../../assets/imgs/camera.png";
import { Footer } from "../../../../../components/Footer";
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { useToast } from '@chakra-ui/toast'

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

const EditDonationListing = () => {
  const router = useRouter();
  const [size, setSize] = useState("middle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [image, setImage] = useState(null);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);
  const [donError, setDonError] = useState([]);
  const [pickerItems, setPickerItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [hover, setHover] = useState(false); // Track the hover state
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast()

  if (!router) {
    return null;
  }

  const { slug } = router.query;

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url_to_donate: "",
    keywords: [],
    category_id: null,
    thumbnail: [],
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [donationdata, setDonationData] = useState([]);
  const handleThumbnailClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (event) => {
      const file = event.target.files[0];
      setImage(file);
      // @ts-ignore: Unreachable code error
      setThumbnail(URL.createObjectURL(file));
      setFormData({ ...formData, thumbnail: [file] });
    };
  };

  useEffect(()=>{
    if(slug !== undefined){
      axios
        .get(
          `${baseUrl}/donation-listings/${slug}/show?org=${// @ts-ignore: Unreachable code error
            currentOrganization?.slug}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken(),
              // 'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        )
        .then((res) => {
          setFormData(res.data.data);
          let data = res.data.data;
          
          setFormData({
            title: data.title,
            description: data.description,
            url_to_donate:data.url_to_donate,
            category_id: data.category_id,
            keywords: res.data.data.keywords.map((keyword) => keyword.id),
            thumbnail: "",
            old_thumbnail: data.thumbnail
          });
          let tmpKeywords = []
          
          if (res.data.data.keywords !== null && res.data.data.keywords.length > 0) {
            res.data.data.keywords.map((i) =>
              tmpKeywords.push({ label: i.name, value: i.id })
            )
          }
          setSelectedItems(tmpKeywords)
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${baseUrl}/donation-listings/categories`, {
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
    }
  },[slug, currentOrganization])


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
    }
  };

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

    // If there are errors, prevent form submission
    if (hasErrors) {
      toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      return;
    }

    selectedItems.map((i) => // @ts-ignore: Unreachable code error
      formData.keywords.push(i.value)
    )

    
    setIsSubmitting(true);
    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("url_to_donate", formData.url_to_donate);
    form.append("category_id", formData.category_id);
    formData.keywords.forEach((keyword) => form.append("keywords[]", keyword));
    if (Array.isArray(formData.thumbnail)) {
      formData.thumbnail.forEach((file) => form.append("thumbnail", file));
    } else if (formData.thumbnail && typeof formData.thumbnail[Symbol.iterator] === 'function') {
      // @ts-ignore: Unreachable code error
      for (const file of formData.thumbnail) {
        form.append("thumbnail", file);
      }
    } else if (formData.thumbnail) {
      form.append("thumbnail", formData.thumbnail);
    }
    axios
      .post(`${baseUrl}/donation-listings/${slug}/update?org=${currentOrganization?.slug}`, form, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((response) => {
        setShowSuccess(true);
        router.push("/organization/listings");
        setIsSubmitting(false);
        setFormData({
          title: "",
          description: "",
          url_to_donate: "",
          keywords: [],
        });
        // Handle response data here
      })
      .catch((error) => {
        // setShowSuccess(true);
        setShowError(true);
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors;
          console.error('An error occurred:', errorMessages);

          // Set errors in state
          // @ts-ignore: Unreachable code error
          setDonError(Object.values(errorMessages).flat());
        } else {
          console.error('An unknown error occurred:', error);
        }
        console.error(error);
        setIsSubmitting(false);
        setFormData({
          title: "",
          description: "",
          url_to_donate: "",
          keywords: [],
        });
        // Handle error here
      });
  };

  const handleInputChange = (event, type) => {
    
    const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

    if(type == 'title'){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['title']: false, // Reset the error state for the specific question ID
      }));
    }else if(type == 'description'){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['description']: false, // Reset the error state for the specific question ID
      }));
    }else if(type == 'url_to_donate'){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['url_to_donate']: false, // Reset the error state for the specific question ID
      }));
    }
  };

  // @ts-ignore: Unreachable code error
  const handleCreateItem = (item) => { // @ts-ignore: Unreachable code error
    setPickerItems((curr) => [...curr, item]) // @ts-ignore: Unreachable code error
    setSelectedItems((curr) => [...curr, item])
  }
 // @ts-ignore: Unreachable code error
 const handleSelectedItemsChange = (changes) => {
  if (changes.selectedItems) {
    setSelectedItems(changes.selectedItems);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      keywords: false,
    }));
  }

  const newKeywords = changes.selectedItems
    .filter((item) => item.isNew) // Filter newly created keywords
    .map((item) => item.value);

  // Update the formData.keywords array with both the selected keywords and new keywords
  setFormData((prevFormData) => ({
    ...prevFormData,
    keywords: [
      ...changes.selectedItems.map((item) => item.value), // Selected keywords
      ...newKeywords, // Newly created keywords
    ],
  }));
};
console.log('éeeeeeee', formData)
  return (
    <>
      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Donation Listing Updated Successfully
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

    <Navbar/>
    <Sidebar>
    <div className="btn-list mt-5">
          <div className="d-flex">
            <button className="donate-btn2 shadow">Donation Listing</button>
            <button className="donatee-btn">Volunteer Listing</button>
          </div>
        </div>
    <div className="d-flex justify-content-between col-md-8">
        <p className="listing-txt mt-5">Edit Donation Listing</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-4 col-md-5">
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
              value={formData.title || ""}
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
              value={formData.description || ""}
              onChange={(e)=> (handleInputChange(e, 'description'))}
              name="description"
              placeholder="Description"
              rows={6}
              required
            />
            {formErrors['description'] && <p className="error-message">Please fill out the field.</p>}
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
              value={formData.url_to_donate || ""}
              onChange={(e)=> (handleInputChange(e, 'url_to_donate'))}
              name="url_to_donate"
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
                value={formData.category_id || undefined} // Use undefined to show the placeholder when no category is selected
                onChange={(value) =>
                  setFormData({ ...formData, category_id: value })
                }
                onSearch={(value) => setInputValue(value)} // Make sure you have setInputValue defined in your code
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                size="large"
              >
                {data.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
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
            <CUIAutoComplete
              hideToggleButton={true}
              className={`${formErrors['keywords'] ? 'input-error' : ''}`}
              label="Select a min of 3, max of 6"
              placeholder=""
              onCreateItem={handleCreateItem}
              items={pickerItems}
              selectedItems={selectedItems}
              onSelectedItemsChange={(changes) =>
                handleSelectedItemsChange(changes)
              }
            />
          {formErrors['keywords'] && <p className="error-message">Please add at least 3 keywords.</p>}
          </div>
          <div>
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
          </div>
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
              Update
            </button>
          )}
        </form>
      </div>
    </Sidebar>
    <Footer/>
    </>
  );
};

export default EditDonationListing;
