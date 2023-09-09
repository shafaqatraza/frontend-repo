import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import axios from 'axios';
import camera from "../../assets/imgs/camera.png";
import Image from 'next/image'
import {baseUrl, accessToken} from '../Helper/index'
import { useToast } from '@chakra-ui/toast'
import { useRouter } from 'next/router'
import {
    Box,
    Button,
    Center,
    Flex,
    HStack,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    useDisclosure,
    Badge,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Stack,
    Input,
    Text,
    Avatar,
    Spacer,
    Spinner,
    ModalHeader
  } from '@chakra-ui/react'

function OrganizationCreationModal({ show, onClose }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [image, setImage] = useState(null);
    const toast = useToast()
    const router = useRouter()
  const [formData, setFormData] = useState({
    full_name: "",
    organization_type_id: 7,
    business_number: "",
    business_email: "",
    about: "",
    website_url: "",
    location: "",
    profile_picture: []
  });

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
      // @ts-ignore: Unreachable code error
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   thumbnail: [file],
      // }));

      setFormData({ ...formData, profile_picture: [file] })
    };
    // input.click();
  };

  const submitCreateOrganization = (e) => {
    e.preventDefault();
    console.log(formData, "form");
    const form = new FormData();
    form.append("full_name", formData.full_name);
    form.append("business_email", formData.business_email);
    form.append("business_number", formData.business_number);
    form.append("about", formData.about);
    form.append("website_url", formData.website_url);
    form.append("organization_type_id",
      // @ts-ignore: Unreachable code error
      formData.organization_type_id);
    form.append("location", formData.location);
    formData.profile_picture.forEach((file) => form.append("profile_picture", file));
    axios.post(`${baseUrl}/organizations`, form, {
      headers: {
        Authorization: 'Bearer ' + accessToken(),
      }
    })
      .then((response) => {
        // setShowSuccess(true);
        // setShowCreateOrg(false);
        toast({position: "top", title: 'Organization has been created successfully.', status: "success" })
        router.push("/organization")
      })
      .catch((error) => {
        toast({position: "top", title: error?.response?.data.message, status: "error" })
      });

  }

  return (
    <div>
        {/* Create organization modal */}
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Organization</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-3">     
                    <form>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="email"
                        className="form-control"
                        value={formData.business_email}
                        onChange={(event) =>
                            setFormData({ ...formData, business_email: event.target.value })
                        }
                        name="business_email"
                        id="email"
                        placeholder="Enter an email address"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Organization Name</label>
                        <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        id="admin-name"
                        value={formData.full_name}
                        onChange={(event) =>
                            setFormData({ ...formData, full_name: event.target.value })
                        }
                        name="full_name"
                        placeholder="Enter an organization name"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Address</label>
                        <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        id="address"
                        value={formData.location}
                        onChange={(event) =>
                            setFormData({ ...formData, location: event.target.value })
                        }
                        name="location"
                        placeholder="Enter an organization address"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                        Business Number
                        </label>
                        <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        id="business-number"
                        value={formData.business_number}
                        onChange={(event) =>
                            setFormData({ ...formData, business_number: event.target.value })
                        }
                        name="business_number"
                        placeholder="Enter mobile number"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Website Url</label>
                        <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="tel"
                        className="form-control"
                        id="phone-number"
                        value={formData.website_url}
                        onChange={(event) =>
                            setFormData({ ...formData, website_url: event.target.value })
                        }
                        name="website_url"
                        placeholder="Enter website url"
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">
                        Company Description
                        </label>
                        <textarea
                        style={{ backgroundColor: "#E8E8E8" }}
                        className="form-control"
                        id="company-description"
                        rows={3}
                        value={formData.about}
                        onChange={(event) =>
                            setFormData({ ...formData, about: event.target.value })
                        }
                        name="about"
                        placeholder="Enter comapny description"
                        required
                        ></textarea>
                    </div>
                    <label
                        style={{
                        fontWeight: "500",
                        fontSize: "20px",
                        lineHeight: "24px",
                        }}
                        className="form-label"
                    >
                        Upload a Profile Picture
                    </label>
                    <div className="upload-pic d-flex justify-content-center align-items-center">
                        {thumbnail ? (
                        <Image src={thumbnail} width={200} height={200} />
                        ) : (
                        <Image
                            src={camera.src}
                            onClick={handleThumbnailClick}
                            alt="Thumbnail placeholder"
                            width={39}
                            height={36}
                        />
                        )}
                    </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={submitCreateOrganization} type="submit" className="btn-reset mt-1 justify-content-end">Submit</button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default OrganizationCreationModal;
