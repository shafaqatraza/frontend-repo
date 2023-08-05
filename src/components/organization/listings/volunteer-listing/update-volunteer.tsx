import React, {useState, useEffect, useCallback} from 'react'
import { Image, Input, Textarea } from "@chakra-ui/react";
import { Form, Modal } from "react-bootstrap";
import camera from "../../../../assets/imgs/camera.png";
import { Select, Upload } from 'antd';
import axios from "axios";
import { accessToken, baseUrl, currentOrganization } from '../../../Helper/index'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import useValidator from '../../../ListingEdit/useValidator'
import { useToast } from '@chakra-ui/toast'
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

const EditVolunteerListing = () => {
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
  const [donError, setDonError] = useState([]);
  const [levels, setLevels] = useState([]);
  // @ts-ignore: Unreachable code error
  const { reset } = useForm();
  const router = useRouter();
  const Router = useRouter();
  const { slug } = Router.query;
  const [preFormData, setPreFormData] = useState({
    title: "",
    description:"",
    credit_amount: "",
    category_id: "",
    keywords: [],
    thumbnail: [],

  });
  const [formData, setFormData] = useState({
    title: "",
    description:"",
    credit_amount: "",
    category_id: "",
    keywords: [],
    thumbnail: "",
    level_id:0,
    old_thumbnail: ""
  });
 
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickerItems, setPickerItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [validator, showValidationMessage] = useValidator()
  const [hover, setHover] = useState(false); // Track the hover state
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const toast = useToast()


  useEffect(()=>{
    if(slug !== undefined){
      axios
        .get(
          `${baseUrl}/volunteer-listings/${slug}/show?org=${// @ts-ignore: Unreachable code error
            currentOrganization?.slug}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken(),
              // 'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        )
        .then((res) => {
          setPreFormData(res.data.data);
          let data = res.data.data;
          
          setFormData({
            title: data.title,
            description: data.description,
            credit_amount: data.credit_amount,
            category_id: data.category_id, // @ts-ignore: Unreachable code error
            keywords: res.data.data.keywords.map((keyword) => keyword.id),
            thumbnail: "",
            level_id: data.level_id, 
            old_thumbnail: data.thumbnail
          });

          let tmpKeywords: any = []
          
          if (res.data.data.keywords !== null && res.data.data.keywords.length > 0) {
            res.data.data.keywords.map((i: any) =>
              tmpKeywords.push({ label: i.name, value: i.id })
            )
          }
          setSelectedItems(tmpKeywords)
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${baseUrl}/volunteer-listings/categories`, {
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

        axios
        .get(`${baseUrl}/listings/service-levels`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          setLevels(res.data.data)
        })
    }
    
  },[slug, currentOrganization])

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
      getBase64(file, (imageUrl: string) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          old_thumbnail: imageUrl, // Show the new thumbnail preview
        }));
      });
    }
  };
  
  const handleSubmit = (e:any) =>{
    e.preventDefault();

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

    // If there are errors, prevent form submission
    if (hasErrors) {
      toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: [],
    }));

    selectedItems.map((i:string) => // @ts-ignore: Unreachable code error
      formData.keywords.push(i.value)
    )
    
    
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("credit_amount", formData.credit_amount);
    form.append("category_id", formData.category_id); // @ts-ignore: Unreachable code error
    form.append("level_id", formData.level_id);
    if(formData.thumbnail){
      form.append("thumbnail", formData.thumbnail);
    }
    formData.keywords.forEach((keyword) => form.append("keywords[]", keyword));
    
      // @ts-ignore: Unreachable code error
      axios.post(`${baseUrl}/volunteer-listings/${slug}/update?org=${currentOrganization?.slug}`, form, {
        headers: {
          Authorization: 'Bearer ' + accessToken(),
        }
      })
      .then((response) => {
        router.push("/organization/listings");
        toast({ position: "top", title: 'Volunteer listing has been updated successfully.', status: "success" })
        // @ts-ignore: Unreachable code error
        setIsSubmitting(false);
        // Handle response data here
      })
      .catch((error) => {
        console.error(error);
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
        setIsSubmitting(false);
        // Handle error here
      });

  }

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

  const newKeywords = changes.selectedItems // @ts-ignore: Unreachable code error
    .filter((item) => item.isNew) // @ts-ignore: Unreachable code error
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


  return (
    <div>
        <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
            <p className="modal-txt text-center p-5 mt-3">
            Volunteer Listing Updated Successfully
            </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
            <button onClick={handleCloseSuccess} className="modal-btn">Got it</button>
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
              onChange={(e)=> (handleInputChange(e, 'title'))}
              name="title"
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
              onChange={(e)=> (handleInputChange(e, 'credit_amount'))}
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
              // @ts-ignore: Unreachable code error
              value={formData.category_id}
              className={`form-control mt-2 ${formErrors['category_id'] ? 'input-error' : ''}`}
              onChange={(value) => handleInputChange({ target: { value } }, "category_id")}
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
              className="form-control mt-2"
              placeholder="Name on card"
              required
              onChange={(e) => handleInputChange(e, "level_id")}
            >
              {levels && levels.map((level) =>( // @ts-ignore: Unreachable code error
                <option value={level.id} selected={level.id == formData.level_id? 'selected': null}>{level.name}</option>
              ))}
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
          <div className="mb-5 mt-4">
          <div>
              {isSubmitting ? <div style={{color:"#E27832"}} className="spinner-border"></div> : <button type='submit' onClick={handleSubmit} className='update-v-btn'>Update</button>}
              </div>
          </div>
        </form>
    </div>
  )
}

export default EditVolunteerListing
