import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar.jsx";
import { Image, Input, Textarea } from "@chakra-ui/react";
import { Form } from "react-bootstrap";
import { Radio, Select, Space } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { accessToken, baseUrl } from "../components/Helper/index";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import camera from "../assets/imgs/camera.png";
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
  const [image, setImage] = useState(null);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

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
    thumbnail: [],
  });
  const [slug, setSlug] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
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
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData();
    // setFormData({ ...formData, category_id: inputValue });
    setIsSubmitting(true);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("url_to_donate", formData.url_to_donate);
    form.append("category_id", formData.category_id);
    formData.keywords.forEach((keyword) => form.append("keywords[]", keyword));
    formData.thumbnail.forEach((file) => form.append("thumbnail", file));
    axios
      .post(`${baseUrl}/donation-listings/store/${slug}`, form, {
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
        setShowSuccess(true);
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
              className="form-control mt-2"
              value={formData.title}
              onChange={(event) =>
                setFormData({ ...formData, title: event.target.value })
              }
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
              value={formData.description}
              onChange={(event) =>
                setFormData({ ...formData, description: event.target.value })
              }
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
              value={formData.url_to_donate}
              onChange={(event) =>
                setFormData({ ...formData, url_to_donate: event.target.value })
              }
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
                  value={formData.category_id}
                  onChange={(value) =>
                    setFormData({ ...formData, category_id: value })
                  }
                  // @ts-ignore: Unreachable code error
                  name="category_id"
                  onSearch={(value) => setInputValue(value)}
                  filterOption={(input, option) =>
                    // @ts-ignore: Unreachable code error
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  size="large"
                >
                  {data.map((item) => (
                    // @ts-ignore: Unreachable code error
                    <Option key={item.id} value={item.id}>
                      {
                        // @ts-ignore: Unreachable code error
                        item.name
                      }
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
            <Select
              mode="tags"
              size={size}
              placeholder="Please select"
              // defaultValue={["Volunteer", "Animals"]}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option && option
                );
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  keywords: selectedValues, // update keywords field with selected values
                }));
              }}
              value={formData.selectedValues}
              style={{
                width: "100%",
              }}
              options={options}
            />
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
            {thumbnail ? (
              <Image src={thumbnail} width={200} height={200} />
            ) : (
              <Image
                src={camera.src}
                onClick={handleThumbnailClick}
                alt="Thumbnail placeholder"
              />
            )}
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
              Create
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateDonationListing;
