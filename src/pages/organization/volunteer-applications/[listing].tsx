import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { Footer } from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import back from "../../../assets/imgs/back.png";
import down from "../../../assets/imgs/down.png";
import { Image, Input } from "@chakra-ui/react";
import { Table } from "antd";
import { Modal } from "react-bootstrap";
import "antd/dist/antd.css";
import Link from "next/link";
import axios from "axios";
import { accessToken, baseUrl, currOrgSlug } from "../../../components/Helper/index";
import { useRouter } from "next/router";
import { useToast } from '@chakra-ui/toast'

interface FormErrors {
  number_of_hours:boolean,
  number_of_credits:boolean
}
const initialFormErrors: FormErrors = {
  number_of_hours: false,
  number_of_credits:false,
};

const VolunteerApplicants = () => {
  const [applicationsData, setApplicationsData] = useState([]);
  const [applicationStatuses, setApplicationStatuses] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [updatingRowIndex, setUpdatingRowIndex] = useState<number | null>(null);
  const [approveBtnLoading, setApproveBtnLoading] = React.useState(false);
  const toast = useToast()
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
  const [applicationId, setApplicationId] = useState(0);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [slug, setSlug] = useState("");

  const { listing } = router.query;
  const [formData, setFormData] = useState({
    number_of_hours: "",
    number_of_credits: "",
    application_id: 0,
    status_id: 0,
  });
  const filteredButtonData = [...applicationStatuses]; // Create a copy of the original array
  filteredButtonData.splice(1, 1);
  interface Applicant {
    key: string;
    id: number;
    name: string;
    email: string;
    skillLevel: string;
    status: any;
    status_id: number;
  }

  useEffect( ()=> {
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
      console.log(err);
    });

  }, [])

  const getApplicationsData = () => {
    axios
      .get(
        `${baseUrl}/volunteer-applications/applicants/${slug}?listing=${listing}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      )
      .then((res) => {
        setApplicationsData(res.data);
        setUpdatingRowIndex(null);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    if(slug !== ""){
      axios
        .get(
          `${baseUrl}/volunteer-applications/${slug}/statuses/all`,
          {
            headers: {
              Authorization: "Bearer " + accessToken(),
              // 'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        )
        .then((res) => {
          setApplicationStatuses(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

        getApplicationsData();
    }

  }, [slug, listing]);

  const handleClickdown = (index: number) => {

    if (selectedRowIndex === index) {
      setSelectedRowIndex(-1);
      setShowCard(true); 
    } else {
      setSelectedRowIndex(index);
      setShowCard(true);
    }
  };

  
  const handleCloseModal = () => {
    setShowModal(false)
  };
  const handleClose = () => {
    setFormData({
      number_of_hours: '',
      number_of_credits: '',
      application_id: 0,
      status_id: 0,
    });
    setFormErrors({
      ['number_of_hours']: false,
      ['number_of_credits']: false
    });
    setUpdatingRowIndex(null);
    setShow(false); // Close the modal
  };
  const handleShowModal = () => {
    setShow(false);
    setShowModal(true);
  };

  const handleApproveApplicant = (event: any) => {
    event.preventDefault();
    setApproveBtnLoading(true);
    let hasErrors = false;
    

    if (!formData.number_of_hours) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['number_of_hours']: true, 
      }));
      hasErrors = true;
    }

    if (!formData.number_of_credits) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['number_of_credits']: true, 
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      setApproveBtnLoading(false);
      return;
    }

    axios
      .post(
        `${baseUrl}/volunteer-applications/applicants/approve?org=${slug}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => { 
        if(res.status === 200){
          setApplicationId(formData.application_id)
          toast({ position: "top", title: res.data.message, status: "success" })
          getApplicationsData();
          setApproveBtnLoading(false);
          handleClose();
          handleShowModal();
        }

      })
      .catch((error) => { 
        setApproveBtnLoading(false);
        if (error.response) { console.log(error.response.data.message)
          const status = error.response.status;
          if (status === 400) {
            toast({ position: "top", title: error.response.data.message, status: "error" });
          } else {
            console.log('Other error status:', status);
          }
        } else {
          console.log('Network error or other error occurred:', error);
        }
      });
  };

  const handleStatus = (statusId: number, applicationId: number, rowIndex: number) => { 
    setSelectedRowIndex(-1);
    if(statusId === 8){
      setUpdatingRowIndex(rowIndex);
      setFormData((formData) => ({
        ...formData,
        application_id: applicationId,
        status_id: statusId
      }));
      setShow(true);
    }else{
      setUpdatingRowIndex(rowIndex);
      axios
        .post(
          `${baseUrl}/volunteer-applications/${applicationId}/status/update`,
          {
            org: slug,
            status_id: statusId,
          },
          {
            headers: {
              Authorization: "Bearer " + accessToken(),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          toast({ position: "top", title: res.data.message, status: "success" })
          getApplicationsData();
        })
        .catch((err) => {
          setUpdatingRowIndex(null);
          console.log(err);
        });
    }

  };
  const handleRowClick = (record: any) => {
    router.push(`/organization/volunteer-applications/${listing}/${record}`);
  };
  const statusButtonMapping = {
    5: { className: "fi-btn", label: "Contacted" },
    6: { className: "sec-btn", label: "New" },
    7: { className: "f-btn", label: "Rejected" },
    8: { className: "tir-btn", label: "Approved" },
    9: { className: "pen-btn", label: "Pending" },
  }
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      onCell: (record:any, rowIndex:any) => ({
        onClick: () => {
          handleRowClick(record.id);
        },
      }),
      render: (text:any, record:any, index:any) => (
        <span className="highlighted-name" style={{ cursor: 'pointer' }}>{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "phone_number",
      key: "phone_number",
      // render: (text: string) => <b>{text}</b>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: Applicant, rowIndex: number) => {
        const isCurrentlyUpdating = updatingRowIndex === rowIndex;
        return (
          <div className="d-flex align-items-center">
            {/* Status buttons */}
            {statusButtonMapping[record.status_id as keyof typeof statusButtonMapping] && (
              <button
                onClick={() => handleClickdown(rowIndex)}
                className={statusButtonMapping[record.status_id as keyof typeof statusButtonMapping].className}
                disabled={isCurrentlyUpdating || record.status_id === 8} // Disable if updating or status is Approved
              >
                {isCurrentlyUpdating ? 
                  <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> 
                  : statusButtonMapping[record.status_id as keyof typeof statusButtonMapping].label
                }

              </button>
            )}

            <div className="ms-2">
            <Image
              onClick={() => {
                if (!isCurrentlyUpdating && record.status_id !== 8) {
                  handleClickdown(rowIndex);
                }
              }}
              src={down.src}
            />
            </div>

            {/* Render buttons based on the selected row index */}
            {showCard && selectedRowIndex === rowIndex && (
              <div className="card-wrapper">
                <div className="carded ques-card mt-2">
                  {applicationStatuses.slice(0, 5).map((status: any, buttonIndex) => {
                      let color;
                      // @ts-ignore: Unreachable code error
                      switch (status.name) {
                        case "Contacted":
                          color = "fi-btn";
                          break;
                        case "New":
                          color = "sec-btn";
                          break;
                        case "Rejected":
                          color = "f-btn";
                          break;
                        case "Approved":
                          color = "tir-btn";
                          break;
                        case "Pending":
                          color = "pen-btn";
                          break;
                        default:
                          color = "f-btn";
                      }

                    return (
                      <button
                        onClick={() => handleStatus(status.id, record.id, rowIndex) }
                        className={color}
                        key={status.id}
                      >
                        {status.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];


const dataSource =
  // @ts-ignore: Unreachable code error
  applicationsData?.applications?.map((application) => {
  return {
    // key: application.id,
    id:application.id,
    full_name: application.application_user.full_name,
    email: application.application_user.email,
    phone_number: application?.application_user?.phone_number,
    applying_user_id: application?.application_user.id,
    status_id: application?.status_id
  };
});

  

  return (
    <>
      <Navbar />
      <Sidebar>
        <div>
          <Modal show={showModal} onHide={handleCloseModal} closeButton>
            <div className="">
              <p className="modal-txt2 text-center p-4 mt-5">
                Congrats your volunteer is approved!
                <span className="d-block mt-4">
                  Send them a message to get started
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-center pb-5 mt-5">
              <button className="approve-btn" onClick={() => handleRowClick(applicationId) }>Send Message</button>
              <button className="canc-btn2 ms-2" onClick={handleCloseModal}>Close</button>
            </div>
          </Modal>
        </div>
        <Modal show={show} onHide={handleClose} closeButton>
          <div className="">
            <p className="modal-txt text-center p-4">Approve Applicant</p>
          </div>
          <form onSubmit={handleApproveApplicant}>
            <div className="mx-5 mt-3">
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="number"
                placeholder="Number of hours"
                className={`form-control ${formErrors['number_of_hours'] ? 'input-error' : ''}`}
                value={formData.number_of_hours}
                onChange={(event) => {
                  setFormData({ ...formData, number_of_hours: event.target.value });
                  setFormErrors((prevErrors) => ({ ...prevErrors, ['number_of_hours']: false }));
                }}
                name="number_of_hours"
                required
              />
              {formErrors['number_of_hours'] && <p className="error-message">Please fill out the field.</p>}
            </div>
            <div className="mx-5 mt-3">
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="number"
                placeholder="Number of deed dollars"
                className={`form-control ${formErrors['number_of_credits'] ? 'input-error' : ''}`}
                value={formData.number_of_credits}
                onChange={(event) =>{
                  setFormData({ ...formData, number_of_credits: event.target.value });
                  setFormErrors((prevErrors) => ({ ...prevErrors, ['number_of_credits']: false }));
                }}
                name="number_of_credits"
                required
              />
              {formErrors['number_of_credits'] && <p className="error-message">Please fill out the field.</p>}
            </div>
            <div className="d-flex justify-content-center pb-5 mt-5">
              {/* type="submit" */} 
              <button type="submit" onClick={handleApproveApplicant} disabled={approveBtnLoading} id="submit" className="approve-btn">
                <span id="button-text">
                  {approveBtnLoading ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Approve"}
                </span>
              </button>
              <button className="canc-btn ms-2" onClick={handleClose}>Cancel</button>
            </div>
          </form>
        </Modal>
        <div className="plan-main"></div>
        <div className="ms-2">
          <Image src={back.src} />
        </div>
        <div className="d-flex mt-4">
          <Image
            width={326}
            height={297}
            className="img-fluid"
            // @ts-ignore: Unreachable code error
            src={applicationsData?.thumbnail?.path}
          />
          <p className="ms-4 fw-bold fs-4">
            {
              // @ts-ignore: Unreachable code error
              applicationsData?.listing_title
            }
          </p>
        </div>
        <div className="mt-3">
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </Sidebar>
      <Footer />
    </>
  );
};

export default VolunteerApplicants;
