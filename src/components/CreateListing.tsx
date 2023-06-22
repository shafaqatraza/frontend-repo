import React, {useState, useEffect} from 'react'
import { Image, Input, Textarea } from "@chakra-ui/react";
import { Form, Modal } from "react-bootstrap";
import camera from "../assets/imgs/camera.png";
import { Select } from 'antd';
import axios from "axios";
import { accessToken, baseUrl } from '../components/Helper/index'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';

// @ts-ignore: Unreachable code error
const myData = [
  { value: "apple", label: "Volunteer" },
  { value: "banana", label: "Animals" },
  { value: "cherry", label: "Clothes" },
  // add more items as needed
];
const options = myData.map(item => ({
  value: item.value,
  label: item.label,
}));
const CreateListing = () => {
  const [size, setSize] = useState("middle");
  const [image, setImage] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);
  // @ts-ignore: Unreachable code error
  const { reset } = useForm();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description:"",
    credit_amount: "",
    category_id: "",
    keywords: [],
    thumbnail: [],
    level_id : 2

  });
  const handleSizeChange = (e:any) => {
    setSize(e.target.value);
  };
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState([]);

  useEffect(()=>{
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
  },[])
  const handleThumbnailClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (event:any) => {
      const file = event.target.files[0];
      setImage(file);
      // @ts-ignore: Unreachable code error
      setThumbnail(URL.createObjectURL(file));
      // @ts-ignore: Unreachable code error
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   thumbnail: [file],
      // }));

        setFormData({ ...formData, thumbnail: [file] })
    };
    // input.click();
  };
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    const form = new FormData();
    setIsSubmitting(true);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("credit_amount", formData.credit_amount);
    // @ts-ignore: Unreachable code error
    form.append("category_id", formData.category_id);
    // @ts-ignore: Unreachable code error
    form.append("organization_id", formData.organization_id);
    // @ts-ignore: Unreachable code error
    form.append("level_id", formData.level_id);
    formData.keywords.forEach((keyword) => form.append("keywords[]", keyword));
    formData.thumbnail.forEach((file) => form.append("thumbnail", file));
    axios.post(`${baseUrl}/volunteer-listings/store/${slug}`, form, {
      headers: {
        Authorization: 'Bearer ' + accessToken(),
      }
    })
      .then((response) => {
        router.push("/listings");
        setShowSuccess(true);
        // @ts-ignore: Unreachable code error
        setIsSubmitting(false);
        // Handle response data here
      })
      .catch((error) => {
        console.error(error);
        // @ts-ignore: Unreachable code error
        setFormData({
          title: "",
          description:"",
          credit_amount: "",
          keywords: [],
          thumbnail: [],
        });
        setShowSuccess(true);
        setIsSubmitting(false);
        // Handle error here
      });

  }
  return (
    <div>
      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Volunteer Listing Created Successfully
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseSuccess} className="modal-btn">Got it</button>
        </div>
      </Modal>
            <form>
              <div className="mb-3 mt-5 col-md-6">
                <div className='d-flex justify-content-between'>
                  <div>
                  <label
                  style={{
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "24px",
                  }}
                  className="form-label"
                >
                  Listing Title
                </label>
                  </div>
                </div>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="text"
                  value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
                name="charity_name"
                  className="form-control mt-2"
                  placeholder="Title"
                  required
                />
              </div>
              <div className="mb-3 mt-4 col-md-6">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "24px",
                  }}
                  className="form-label"
                >
                  Listing Description{" "}
                  <span className="ms-3">(List # of hours needed)</span>
                </label>
                <Textarea
                  style={{ backgroundColor: "#E8E8E8" }}
                  // type="tel"
                  className="form-control mt-2"
                  value={formData.description}
                onChange={(event) =>
                  setFormData({ ...formData, description: event.target.value })
                }
                name="description"
                  placeholder="Listing Description"
                  rows={4}
                  required
                />
              </div>
              <div className="mb-3 mt-3 col-md-3">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "24px",
                  }}
                  className="form-label"
                >
                  Credit Amount
                </label>
                <Input
                  style={{ backgroundColor: "#E8E8E8", height: "50px" }}
                  type="number"
                  className="form-control mt-2"
                  value={formData.credit_amount}
                onChange={(event) =>
                  setFormData({ ...formData, credit_amount: event.target.value })
                }
                name="credit_amount"
                  placeholder="Credit amount"
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
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                  Select a Level
                </label>
                <Form.Select
                  style={{ backgroundColor: "#E8E8E8", height: "50px" }}
                  // type="select"
                  className="form-control mt-2"
                  // id="phone-number"
                  placeholder="Name on card"
                  required
                >
                  <option value="volvo">Beginner</option>
                  <option value="saab">Intermediate</option>
                  <option value="mercedes">Expert</option>
                </Form.Select>
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
                // @ts-ignore: Unreachable code error
                size={size}
                placeholder="Please select"
                // defaultValue={["Volunteer", "Animals"]}
                onChange={(selectedOptions) => {
                  // @ts-ignore: Unreachable code error
                  const selectedValues = selectedOptions.map((option) => (option && option));
                  // @ts-ignore: Unreachable code error
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    keywords: selectedValues,
                  }));
                }}
                // @ts-ignore: Unreachable code error
                value={formData.selectedValues}
                style={{
                  width: "100%",
                }}
                // @ts-ignore: Unreachable code error
                options={options}
              />
            </div>
            <div className="mb-3 mt-5 col-md-6">
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
      <div
        className="upload-pic d-flex justify-content-center align-items-center"
      >
        {thumbnail ? (
          <Image src={thumbnail} width={200} height={200}  />
        ) : (
          <Image
            src={camera.src}
            onClick={handleThumbnailClick}
            alt="Thumbnail placeholder"
          />
        )}
      </div>
    </div>
              <div className="mb-5 mt-4">
              <div>
                  {isSubmitting ? <div style={{color:"#E27832"}} className="spinner-border"></div> : <button type='submit' onClick={handleSubmit} className='update-v-btn'>Save</button>}
                  </div>
              </div>
            </form>
          </div>
  )
}

export default CreateListing
