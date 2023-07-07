import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import user from "../assets/imgs/user.png";
import home from "../assets/imgs/home.png";
import setting from "../assets/imgs/setting.png";
import volunteer from "../assets/imgs/volunteer.png";
import listing from "../assets/imgs/listing.png";
import donation from "../assets/imgs/donation.png";
import autism from "../../assets/imgs/autism.png";
import good from "../../assets/imgs/good.png";
import edit from "../../assets/imgs/edit.png";
import Candadogo from "../assets/imgs/Canadogo.png";
import { color, Image, Input } from "@chakra-ui/react";
import Link from "next/link";
import { Table } from "antd";
import { Modal, Button } from "react-bootstrap";
import "antd/dist/antd.css";
import { FaCheck } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { accessToken, baseUrl } from "../../components/Helper/index";
import placeholder from "../../assets/imgs/placeholder.png";
import camera from "../../assets/imgs/camera.png";

const OrganizationInfo = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    organization_type_id: 7,
    business_number: "",
    business_email: "",
    about: "",
    website_url: "",
    location: "",
    profile_picture:[]
    // profile_picture:"https://logos-world.net/wp-content/uploads/2022/01/Canada-Goose-Logo.png",
    // cover_picture:"https://logos-world.net/wp-content/uploads/2022/01/Canada-Goose-Logo.png"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const dataSource = [
    {
      key: "1",
      name: "Penny Penguin",
      email: "penny@gooddeeds.ca",
      status: "Admin",
    },
    {
      key: "2",
      name: "Penny Penguin",
      email: "penny@gooddeeds.ca",
      status: "User",
    },
    {
      key: "3",
      name: "Penny Penguin",
      email: "penny@gooddeeds.ca",
      status: "User",
    },
    {
      key: "4",
      name: "Penny Penguin",
      email: "penny@gooddeeds.ca",
      status: "User",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "role",
      key: "role",
    },
    {
      title: () => (
        <div>
          <Link href="/invite-user">
            <button className="up-btn">+ New</button>
          </Link>
        </div>
      ),
      dataIndex: "New",
      key: "New",
      render: () => <button style={{ color: '#E27832' }}>+ Action</button>
    }
  ];

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModalup, setShowModalup] = useState(false);

  const handleCloseModalup = () => setShowModalup(false);
  const handleShowModalup = () => setShowModalup(true);
  const [slug, setSlug] = useState([]);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inviteData, setInviteData] = useState([]);
  const [packageData, setPackageData] = useState([]);

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
        // console.log(err);
      });
  }, []);

  useEffect(()=>{
    axios
    .get(`${baseUrl}/organizations/${slug}/invitations`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      console.log(res.data.data, "new dataz");
      setInviteData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[slug])

  useEffect(() => {
    axios
      .get(`${baseUrl}/organizations/${slug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setFormData(res.data.data);
        setData(res.data.data);
        console.log(data, "dataone");
      })
      .catch((err) => {
        console.log(err);
      });
      axios.get(`${baseUrl}/organization/subscriptions/subscribed-package?org=${slug}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res)=>{
        console.log(res.data.data, "npackage");
        setPackageData(res.data.data);

      }).catch((err)=>{
        console.log(err);

      })
    // if (data) {
    //   setFormData(
    //     // @ts-ignore: Unreachable code error
    //     data
    //   );
    // }
  }, [slug, refresh]);


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
      setFormData({ ...formData, profile_picture: [file] });
    };
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData();
    form.append("full_name", formData.full_name);
    form.append("business_number", formData.business_number);
    form.append("about", formData.about);
    form.append("location", formData.location);
    form.append("website_url", formData.website_url);
    form.append("business_email", formData.business_email);
    form.append(
      // @ts-ignore: Unreachable code error
      "organization_type_id", formData.organization_type_id);
      // @ts-ignore: Unreachable code error
      if (formData.profile_picture.length === 0) {
        form.append("profile_picture", formData.profile_picture[0]);
      } else {
           formData.profile_picture.forEach((file) =>
      form.append("profile_picture", file)
    );
      }
    //   formData.profile_picture.forEach((file) =>
    //   form.append("profile_picture", file)
    // );
    setIsSubmitting(true);
    axios
      .post(`${baseUrl}/organizations/${slug}`, form, {
        headers: {
          Authorization: "Bearer " + accessToken(),
        },
      })
      .then((response) => {
        console.log(response.data);
        setShowSuccess(true);
        setIsSubmitting(false);
        setRefresh(!refresh);
        // Handle response data here
      })
      .catch((error) => {
        console.error(error);
        setShowSuccess(true);
        setIsSubmitting(false);
        // Handle error here
      });
  };
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <>
      <Navbar />
      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Organization Updated Successfully
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseSuccess} className="modal-btn">
            Got it
          </button>
        </div>
      </Modal>
      <Modal show={show} onHide={handleClose} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            You don’t have access to this information
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button className="modal-btn">Got it</button>
        </div>
      </Modal>
      <Modal show={showModalup} onHide={handleCloseModalup} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            You purchase has been approved
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button className="modal-btn">Got it</button>
        </div>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center py-3">Edit Profile</p>
        </div>
        <div>
          <div className="input-group p-5">
            <input
              type="text"
              className="form-control"
              style={{
                backgroundColor: "#E8E8E8",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "20px",
              }}
              value="Geneva Centre For Autism"
            />
            <button
              style={{ backgroundColor: "#E8E8E8", border: "0px solid grey" }}
              className="btn btn-outline-secondary"
              type="button"
            >
              <FaCheck />
            </button>
          </div>
        </div>
        <div className="text-center">
          <p>Upload a logo/photo</p>
          <div className="d-flex justify-content-center mt-2">
            <Image src={autism.src} />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="replace-btn">Replace</button>
          </div>
        </div>
        <div className="d-flex justify-content-center pb-5 mt-5">
          <button className="modal2-btn">Save</button>
        </div>
      </Modal>
      <div className="row container-fluid main-side">
        <Sidebar>
          <div className="col-md-12 mt-5">
            <div className="main-org-img">
              <div className="org-img text-center position-relative">
                <div className="org-prof-img">
                  {!isLoaded && <img src={placeholder.src} alt="Loading..." />}
                  <Image
                    // style={{ height: "165px", width: "340px" }}
                    className="img-fluid"
                    src={
                      // @ts-ignore: Unreachable code error
                      data?.profile_picture
                    }
                    alt={"image"}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setIsLoaded(true)}
                    style={{ display: isLoaded ? "block" : "none" }}
                  />
                </div>
                <Image
                  src={edit.src}
                  onClick={handleShowModal}
                  className="position-absolute top-0 float-end"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="info-txt mt-2">
                {
                  // @ts-ignore: Unreachable code error
                  data?.full_name
                }
              </p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mt-5">
                  <p className="info-txt">Organization Info</p>
                </div>
                <div className="mt-4">
                  <form>
                    {/* <div className="mb-3">
                      <label className="form-label fw-bold">Email</label>
                      <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData.full_name || ""}
                        onChange={handleInputChange}
                        name="full_name"
                        required
                      />
                    </div> */ }
                     <div className="mb-3">
                      <label className="form-label fw-bold">Email</label>
                      <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData?.business_email || ""}
                        onChange={handleInputChange}
                        name="business_email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Organization Name</label>
                      <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData?.full_name || ""}
                        onChange={handleInputChange}
                        name="full_name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Address</label>
                      <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData?.location || ""}
                        onChange={handleInputChange}
                        name="location"
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
                        value={formData?.business_number || ""}
                        onChange={handleInputChange}
                        name="business_number"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Website Url</label>
                      <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData?.website_url || ""}
                        onChange={handleInputChange}
                        name="website_url"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Company Description
                      </label>
                      <textarea
                        style={{ backgroundColor: "#E8E8E8" }}
                        rows={3}
                        className="form-control"
                        value={formData?.about || ""}
                        onChange={handleInputChange}
                        name="about"
                        required
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
      > {thumbnail ? (
        <Image src={thumbnail} width={200} height={200} />
      ) : (
        <Image
          // @ts-ignore: Unreachable code error
          src={camera?.src}
          onClick={handleThumbnailClick}
          alt="Thumbnail placeholder"
        />
      )}

      </div>
      </div>
                    {/* <div className="mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <Input
                      style={{ backgroundColor: "#E8E8E8" }}
                      type="password"
                      className="form-control"
                      id="password"
                      required
                    />
                  </div> */}
                    <div className="d-flex justify-content-end">
                      {isSubmitting ? (
                        <div
                          style={{ color: "#E27832" }}
                          className="spinner-border"
                        ></div>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn-reset mb-5"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </form>
                  <div>
                    <button onClick={handleShow} className="del-btn">
                      Delete Account
                    </button>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="col-md-6">
                <p className="fw-bold text-center mt-5">
                  <div className="mt-5">Plan</div>
                </p>
                {Object.keys(packageData).length > 0 ? (
  <div className="d-flex justify-content-center">
  <div
    className="card bg-light border-0"
    style={{
      backgroundColor: "#F6F6F6",
      width: "332px",
      marginTop: "2rem",
    }}
  >
    <div className="card-body text-center">
      <p className="card-title mt-3 plan-txt">{
       // @ts-ignore: Unreachable code error
      packageData?.package_name}</p>
      <p className=" mt-4 plan-txt2">
        {
         // @ts-ignore: Unreachable code error
         packageData?.package_description}
      </p>
      <p className="mt-3">
        <span className="plan-txt3">${
         // @ts-ignore: Unreachable code error
        parseInt(packageData?.package_amount)}</span>/month, billed
        annually
      </p>
    </div>
    <div className="ms-4 mt-3">
      {
            // @ts-ignore: Unreachable code error
            packageData?.package_features?.map((item,index)=>(
              <>
              <div className="d-flex">
              <span className="ms-2 pt-2">
          <Image src={good.src} alt={"Plan"} />
        </span>
        <div className='free-txt4 pt-2 ms-2'>
        {item}
        </div>
              </div>
              </>
            ))
          }


    </div>
    <div className="btns d-flex justify-content-center">
      <Link href="/select-plan">
        <button className="up-btn mt-5 mb-5">Upgrade</button>
      </Link>
      <Link href="/edit-payment">
        <button className="ed-btn ms-3 mt-5 mb-5">
          Edit Payment
        </button>
      </Link>
    </div>
  </div>
</div>
) : (
  <div className="d-flex justify-content-center mt-5">
    <p className="fw-bold">No plan subscribed.</p>
  </div>
)}
              </div>
              <div className="mt-5">
                <Table dataSource={inviteData} columns={columns} />;
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
      <Footer />
    </>
  );
};

export default OrganizationInfo;
