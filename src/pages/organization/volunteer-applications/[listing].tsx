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

const VolunteerApplicants = () => {
  const [applicationsData, setApplicationsData] = useState([]);
  const [applicationStatuses, setApplicationStatuses] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [updatingRowIndex, setUpdatingRowIndex] = useState<number | null>(null);
  const toast = useToast()

  const { listing } = router.query;
  const [formData, setFormData] = useState({
    number_of_hours: "",
    number_of_credits: "",
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

  const getApplicationsData = () => {
    axios
      .get(
        `${baseUrl}/volunteer-applications/applicants/${currOrgSlug}?listing=${listing}`,
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
    axios
      .get(
        `${baseUrl}/volunteer-applications/${currOrgSlug}/statuses/all`,
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

  }, [currOrgSlug, listing]);

  const handleClickdown = (index: number) => {
    if (selectedRowIndex === index) {
      setSelectedRowIndex(-1);
      setShowCard(false);
    } else {
      setSelectedRowIndex(index);
      setShowCard(true);
    }
  };


  const handleStatus = (statusId: number, applicationId: number, rowIndex: number) => { 
    setUpdatingRowIndex(rowIndex);
    axios
      .post(
        `${baseUrl}/volunteer-applications/${applicationId}/status/update`,
        {
          org: currOrgSlug,
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
        <span style={{ cursor: 'pointer' }}>{text}</span>
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
              >
                {isCurrentlyUpdating ? 
                  <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> 
                  : statusButtonMapping[record.status_id as keyof typeof statusButtonMapping].label
                }

              </button>
            )}

            <div className="ms-2">
              <Image
                onClick={() => handleClickdown(rowIndex)}
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setShow(false);
    setShowModal(true);
  };

  const handleSubmitapprove = (event: any) => {
    event.preventDefault();
    axios
      .post(
        `${baseUrl}/organization/subscriptions/approve-applicant?org=${currOrgSlug}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        handleShowModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <Link href="/completed-application">
                <button className="approve-btn">Send Message</button>
              </Link>
              <button className="canc-btn2 ms-2">Close</button>
            </div>
          </Modal>
        </div>
        <Modal show={show} onHide={handleClose} closeButton>
          <div className="">
            <p className="modal-txt text-center p-4">Approve Applicant</p>
          </div>
          {/* <form onSubmit={handleSubmitapprove}> */}
          <div className="mx-5 mt-3">
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              placeholder="Number of hours"
              // value={formData.number_of_hours}
              // onChange={(event) =>
              //   setFormData({ ...formData, number_of_hours: event.target.value })
              // }
              className="form-control"
              // name="number_of_hours"
              required
            />
          </div>
          <div className="mx-5 mt-3">
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="text"
              placeholder="Number of deed dollars"
              className="form-control"
              // value={formData.number_of_credits}
              // onChange={(event) =>
              //   setFormData({ ...formData, number_of_credits: event.target.value })
              // }
              // name="number_of_credits"
              required
            />
          </div>
          <div className="d-flex justify-content-center pb-5 mt-5">
            {/* type="submit" */}
            <button onClick={handleShowModal} className="approve-btn">
              Approve
            </button>
            <button className="canc-btn ms-2">Cancel</button>
          </div>
          {/* </form> */}
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
