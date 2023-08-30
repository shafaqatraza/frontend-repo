import React, { useState, useEffect, useCallback } from 'react'
import { Image, Input, Textarea } from "@chakra-ui/react";
import { Form, Modal } from "react-bootstrap";
import camera from "../assets/imgs/camera.png";
import { Select, Upload } from 'antd';
import axios from "axios";
import { accessToken, baseUrl } from '../components/Helper/index'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/toast'

// @ts-ignore: Unreachable code error
const myData = [
  { value: "apple", label: "Volunteer" },
  { value: "banana", label: "Animals" },
  { value: "cherry", label: "Clothes" },
  // add more items as needed
];

interface FormErrors {
  title:boolean,
  description:boolean, 
  credit_amount:boolean, 
  category_id:boolean,
  level_id:boolean
  keywords:boolean,
  thumbnail:boolean, 
}

const initialFormErrors: FormErrors = {
  title: false,
  description:false, 
  credit_amount:false, 
  category_id:false,
  level_id:false,
  keywords:false,
  thumbnail:false,
};
 
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
  const [showError, setShowError] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);
  const [volunteerCategoryList, setVolunteerCategoryList] = useState([]);
  const [donError, setDonError] = useState([]);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [hover, setHover] = useState(false);

  const toast = useToast()

  // @ts-ignore: Unreachable code error
  const { reset } = useForm();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credit_amount: "",
    category_id: "",
    keywords: [],
    thumbnail: "",
    old_thumbnail: "",
    level_id: 0
  });
  const handleSizeChange = (e: any) => {
    setSize(e.target.value);
  };
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slug, setSlug] = useState([]);

  const getVolunteerCategoryList = useCallback(async () => {
    const data = await axios.get(`${baseUrl}/volunteer-listings/categories`)
    if (data.status === 200) {
      setVolunteerCategoryList(data.data.data)
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
      .get(`${baseUrl}/volunteer-listings/categories`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        // console.log(res.data, "volunteer categories")
        setData(res.data.data);
      })
      .catch((err) => {
      });

    getVolunteerCategoryList()
  }, [])

  const handleInputChange = (event: any, type:string) => {
    if(type == 'title'){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['title']: false,
      }));
      setFormData({ ...formData, title: event.target.value })
    }else if(type == 'description'){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['description']: false,
      }));
      setFormData({ ...formData, description: event.target.value })
    }else if(type == 'credit_amount'){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['credit_amount']: false,
      }));
      setFormData({ ...formData, credit_amount: event.target.value })
    }else if(type == 'category_id'){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['category_id']: false,
      }));
      setFormData({ ...formData, category_id: event.target.value })
    }else if(type == 'level_id'){
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['level_id']: false,
      }));
      setFormData({ ...formData, level_id: event.target.value })
    }
  };

  const handleKeywords = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option:any) => (option && option));
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: selectedValues,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ['keywords']: false,
    }));
  }
  
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleFileChange = (info: any) => {
  
    const file = info.file.originFileObj;
    if (file) {
      // Update the formData with the new thumbnail file
      setFormData((prevFormData) => ({
        ...prevFormData,
        thumbnail: info.file.originFileObj,
      }));
      getBase64(file, (imageUrl: any) => {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    let hasErrors = false;

    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: [],
    }));

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

    if (!formData.credit_amount) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['credit_amount']: true, 
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

    
    if (!formData.level_id) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['level_id']: true, 
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
      setIsSubmitting(false);
      return;
    }

    const form = new FormData();
    
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
    axios.post(`${baseUrl}/volunteer-listings/store/${slug}`, form, {
      headers: {
        Authorization: 'Bearer ' + accessToken(),
      }
    })
      .then((response) => {
        router.push("/organization/listings");
        toast({ position: "top", title: response.data.message, status: "success" })
        // @ts-ignore:
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors;
          console.error('An error occurred:', errorMessages);
        } else {
          console.error('An unknown error occurred:', error);
        }
        setIsSubmitting(false);
        // Handle error here
      });

  }

  return (
    <div>
      
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
            onChange={(e: any)=> (handleInputChange(e, 'title'))}
            name="charity_name"
            className={`form-control mt-2 ${formErrors['title'] ? 'input-error' : ''}`}
            placeholder="Title"
            required
          />
          {formErrors['title'] && <p className="error-message">Please fill out the field.</p>}
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
            className={`form-control mt-2 ${formErrors['description'] ? 'input-error' : ''}`}
            value={formData.description}
            onChange={(e)=> (handleInputChange(e, 'description'))}
            name="description"
            placeholder="Listing Description"
            rows={4}
            required
          />
          {formErrors['description'] && <p className="error-message">Please fill out the field.</p>}
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
            className={`form-control mt-2 ${formErrors['credit_amount'] ? 'input-error' : ''}`}
            value={formData.credit_amount}
            onChange={(e: any)=> (handleInputChange(e, 'credit_amount'))}
            name="credit_amount"
            placeholder="Credit amount"
            required
          />
          {formErrors['credit_amount'] && <p className="error-message">Please fill out the field.</p>}
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
                onChange={(value) => handleInputChange({ target: { value } }, "category_id")}
                value={formData.category_id}
                className={`form-control mt-2 ${formErrors['category_id'] ? 'input-error' : ''}`}
                // @ts-ignore: Unreachable code error
                name="category_id"
                onSearch={(value) => setInputValue(value)}
                filterOption={(input, option) =>
                  // @ts-ignore: Unreachable code error
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                size="large"
              >
                {volunteerCategoryList.map((item) => (
                  // @ts-ignore: Unreachable code error
                  <Option key={item.id} value={item.id}>
                    {
                      // @ts-ignore: Unreachable code error
                      item.name
                    }
                  </Option>
                ))}
              </Select>
              {formErrors['category_id'] && <p className="error-message">Please select the category.</p>}
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
            className={`form-control mt-2 ${formErrors['level_id'] ? 'input-error' : ''}`}
            placeholder="Name on card"
            required
            onChange={(e) => handleInputChange(e, "level_id")}
          >
            <option value="">Select Level</option>
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Expert</option>
          </Form.Select>
          {formErrors['level_id'] && <p className="error-message">Please select the level.</p>}
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
            placeholder="Type keywords"
            onChange={(selectedOptions)=> (handleKeywords(selectedOptions))}
            // @ts-ignore: Unreachable code error
            value={formData.keywords}
            className={`form-control mt-2 ${formErrors['keywords'] ? 'input-error' : ''}`}
            style={{
              width: "100%",
            }}
          />
          {formErrors['keywords'] && <p className="error-message">Please add at least 3 keywords.</p>}
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
          <div className="upload-pic d-flex justify-content-center align-items-center" >
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
          {formErrors['thumbnail'] && <p className="error-message">Please upload the thumbnail.</p>}
        </div>
        <div className="mb-5 mt-4">
          <div>
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting} id="submit" className="update-v-btn mt-5 mb-5">
            <span id="button-text">
              {isSubmitting ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Create"}
            </span>
          </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateListing
