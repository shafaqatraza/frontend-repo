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
            keywords: [],
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
console.log('xxxxx', formData)

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

    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: [],
    }));
    
    selectedItems.map((i) => // @ts-ignore: Unreachable code error
      formData.keywords.push(i.value)
    )

    const form = new FormData();
    // setFormData({ ...formData, category_id: inputValue });
    setIsSubmitting(true);
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
        router.push("/listings");
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // @ts-ignore: Unreachable code error
  const handleCreateItem = (item) => { // @ts-ignore: Unreachable code error
    setPickerItems((curr) => [...curr, item]) // @ts-ignore: Unreachable code error
    setSelectedItems((curr) => [...curr, item])
  }
 // @ts-ignore: Unreachable code error
  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

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
              className="form-control mt-2"
              value={formData.title || ""}
             onChange={handleInputChange}
              name="title"
              placeholder="Charity Name"
              required
            />
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
              className="form-control mt-2"
              value={formData.description || ""}
              onChange={handleInputChange}
              name="description"
              placeholder="Description"
              rows={6}
              required
            />
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
              className="form-control mt-2"
              value={formData.url_to_donate || ""}
              onChange={handleInputChange}
              name="url_to_donate"
              placeholder="URL"
              required
            />
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
            label="Select a min of 3, max of 6"
            placeholder=""
            onCreateItem={handleCreateItem}
            items={pickerItems}
            selectedItems={selectedItems}
            onSelectedItemsChange={(changes) =>
              handleSelectedItemsChange(changes.selectedItems)
            }
          />
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
