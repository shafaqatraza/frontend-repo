import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import back from "../../assets/imgs/back.png";
import down from "../../assets/imgs/down.png";
import { Image, Input } from "@chakra-ui/react";
import { Table } from "antd";
import { Modal } from "react-bootstrap";
import "antd/dist/antd.css";
import Link from "next/link";
import axios from "axios";
import { accessToken, baseUrl } from "../../components/Helper/index";
import { useRouter } from "next/router";

const VolunteerApplicants = () => {
  const [volunteerData, setVolunteerData] = useState([]);
  const [applicantName, setApplicantName] = useState([]);
  const [organizationSlug, setOrganizationSlug] = useState([]);
  const [buttonData, setButtonData] = useState([]);
  const [showCard, setShowcard] = useState(false);
  const [applicationID, setApplicationID] = useState(null);
  const [applicantID, setApplicantID] = useState(null);
  const [statusId, setStatusId] = useState(null);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const { slug } = router.query;
  const [formData, setFormData] = useState({
    number_of_hours: "",
    number_of_credits: "",
  });
  const filteredButtonData = [...buttonData]; // Create a copy of the original array
  filteredButtonData.splice(1, 1);
  interface Applicant {
    key: string;
    name: string;
    email: string;
    skillLevel: string;
    status: any;
  }
  useEffect(() => {
    axios
      .get(`${baseUrl}/organizations`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data[0]?.slug, "datatatata");
        setOrganizationSlug(res.data[0]?.slug);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `${baseUrl}/volunteer-applications/applicants/${organizationSlug}?listing=${slug}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      )
      .then((res) => {
        console.log(res);
        setVolunteerData(res.data);
        setApplicantName(res.data);
      })
      .catch((err) => {});
  }, [organizationSlug]);

  const handleClickdown = (index: number) => {
    setSelectedRowIndex(selectedRowIndex === index ? -1 : index);
    setShowcard(!showCard);
    axios
      .get(
        `${baseUrl}/volunteer-applications/${organizationSlug}/statuses/all`,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setButtonData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    applicantName?.applications?.map((appl) => (setApplicantID(appl.id), setApplicationID(appl.applying_user_id) , setStatusId(appl?.status_id) )
    );
    console.log(applicationID,"appppppp");
  }, [applicantName, applicationID]);

  const handleStatus = (statusId: number) => {
    setIsUpdating(true);
    axios
      .post(
        `${baseUrl}/volunteer-applications/${applicantID}/status/update`,
        {
          org: organizationSlug,
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
        console.log(res.data);
        setIsUpdating(false);
        // @ts-ignore: Unreachable code error
        setStatusId(statusId);
        // do something after successful POST request
      })
      .catch((err) => {
        setIsUpdating(false);
        console.log(err);
        // handle error
      });
  };
  const handleRowClick = (record: any) => {
    setSelectedUserId(record);
    router.push(`/completed-application/${slug}/${record}`);
    console.log(slug, record);
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      onCell: (record:any, rowIndex:any) => ({
        onClick: () => {
          handleRowClick(record.applying_user_id);
          handleClickdown(rowIndex);
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
        return (
          <div className="d-flex align-items-center">
            {/* Status buttons */}
            {isUpdating ? (
              <div className="spinner-border"></div>
            ) : statusId === 5 ? (
              <button className="fi-btn">Contacted</button>
            ) : statusId === 6 ? (
              <button className="sec-btn">New</button>
            ) : statusId === 7 ? (
              <button className="f-btn">Rejected</button>
            ) : statusId === 8 ? (
              <button onClick={handleShow} className="tir-btn">
                Approved
              </button>
            ) : statusId === 9 ? (
              <button className="pen-btn">Pending</button>
            ) : (
              <></>
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
                  {buttonData.slice(0, 5).map((item, buttonIndex) => {
                      let color;
                      // @ts-ignore: Unreachable code error
                      switch (item.name) {
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
                        onClick={() => handleStatus(
                          // @ts-ignore: Unreachable code error
                          item.id
                          )
                        }
                        className={color}
                        key={
                          // @ts-ignore: Unreachable code error
                          item.id
                        }
                      >
                        {
                        // @ts-ignore: Unreachable code error
                        item.name
                        }
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
applicantName?.applications?.map((application) => {
  return {
    // key: application.id,
    full_name: application.application_user.full_name,
    email: application.application_user.email,
    phone_number: application?.application_user?.phone_number,
    applying_user_id: application?.applying_user_id,
  };
});


  const data: Applicant[] = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      skillLevel: "Intermediate",
      status: "Active",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      skillLevel: "Expert",
      status: "Inactive",
    },
    {
      key: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      skillLevel: "Pending",
      status: "Inactive",
    },
    {
      key: "4",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      skillLevel: "Advanced",
      status: "Inactive",
    },
    {
      key: "5",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      skillLevel: "Beginner",
      status: "Inactive",
    },
  ];
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
        `${baseUrl}/organization/subscriptions/approve-applicant?org=${organizationSlug}`,
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
            src={applicantName?.thumbnail?.path}
          />
          <p className="ms-4 fw-bold fs-4">
            {
              // @ts-ignore: Unreachable code error
              applicantName?.listing_title
            }
          </p>
        </div>
        <div className="mt-3">

          <Table
          // @ts-ignore: Unreachable code error
          columns={columns} dataSource={dataSource} />
        </div>
      </Sidebar>
      <Footer />
    </>
  );
};

export default VolunteerApplicants;
