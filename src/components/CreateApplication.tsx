import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar.jsx";
import { Row, Col, Container, Modal } from "react-bootstrap";
import { Image, Input, Textarea } from "@chakra-ui/react";
import trash from "../assets/imgs/trash.png";
import plus from "../assets/imgs/plus.png";
import plustwo from "../assets/imgs/plustwo.png";
import CheckBox from "../components/CheckBox";
import ShortAnswer from "../components/ShortAnswer";
import Availability from "../components/Availability";
import AskExperience from "../components/AskExperience";
import axios from "axios";
import { accessToken, baseUrl } from "../components/Helper/index";
import { Select } from "antd";

interface Props {
  name: string;
  age: number;
}
const CreateApplication = (props: Props) => {
  const [dataArray, setDataArray] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [volundata, setVolunData] = useState([]);
  const [formData, setFormData] = useState({
    listing_id: null,
    tenant_module_id: 1,
    data: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

  const handleChildData = (childData: any) => {
    // @ts-ignore: Unreachable code error
    setDataArray((prevDataArray) => [
      ...prevDataArray,
      { type: "data", value: childData },
    ]);
    // @ts-ignore: Unreachable code error
    setFormData((prevFormData) => {
      const updatedData = [...prevFormData.data, JSON.parse(childData)];
      return { ...prevFormData, data: updatedData };
    });
  };

  const handleChildCheckbox = (childCheckbox: any) => {
    // @ts-ignore: Unreachable code error
    setDataArray((prevDataArray) => [
      ...prevDataArray,
      { type: "checkbox", value: childCheckbox },
    ]);
    // @ts-ignore: Unreachable code error
    setFormData((prevFormData) => {
      const updatedData = [...prevFormData.data, JSON.parse(childCheckbox)];
      return { ...prevFormData, data: updatedData };
    });
  };
  const [showCard, setShowcard] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<JSX.Element[]>(
    []
  );

  const handleButtonClick = () => {
    setShowcard(!showCard);
    setSelectedButton(null);
  };
  const handleCardButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const componentToAdd = components[event.currentTarget.value];
    setSelectedComponents([...selectedComponents, componentToAdd]);
  };
  const components: { [key: string]: JSX.Element } = {
    "Button 1": <ShortAnswer onChildData={handleChildData} />,
    "Button 2": <CheckBox onChildCheckbox={handleChildCheckbox} />,
    "Button 4": <Availability />,
    "Button 5": <AskExperience />,
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
        setOrganization(res.data[0]?.slug);
        // @ts-ignore: Unreachable code error
        // setFormData({ ...formData, org_slug: organization });
      })
      .catch((err) => {
      });
  }, [organization]);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log("helo",  dataArray.map((item) => JSON.parse(item)));
    // @ts-ignore: Unreachable code error
    setFormData({ ...formData, listing_id: inputValue });
    axios
      .post(`${baseUrl}/application-form/store?org=${organization}`, formData, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((response) => {
        setShowSuccess(true);
        // Handle response data here
      })
      .catch((error) => {
        setShowSuccess(true);
        // Handle error here
      });
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}/volunteer-listings/all/${organization}`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setVolunData(res.data.data);
      })
      .catch((err) => {
      });
  }, [organization]);

  return (
    <>

      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            Application form Created Successfully
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseSuccess} className="modal-btn">
            Got it
          </button>
        </div>
      </Modal>
      <div className="d-flex justify-content-between col-md-8">
        <p className="listing-txt mt-5 ms-3">Basic Info</p>
        <button className="update-v-btn mt-5">Reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <div className="card shadow mt-3 p-4">
              {/* {console.log(
                  dataArray2.map((item) => JSON.parse(item)),
                  "data22"
                )} */}

              <div className="mt-2">
                <label
                  style={{
                    fontWeight: "500",
                    fontSize: "20px",
                    lineHeight: "24px",
                  }}
                  className="form-label"
                >
                  Select Volunteer
                </label>

                <div className="col-md-12">
                  {/* {data} */}
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Search volunteer listings"
                    optionFilterProp="children"
                    value={formData.listing_id}
                    onChange={(value) =>
                      setFormData({ ...formData, listing_id: value })
                    }
                    // @ts-ignore: Unreachable code error
                    name="listing_id"
                    onSearch={(value) => setInputValue(value)}
                    filterOption={(input, option) =>
                      // @ts-ignore: Unreachable code error
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {volundata.map((item) => (
                      // @ts-ignore: Unreachable code error
                      <Option key={item.id} value={item.id}>
                        {
                          // @ts-ignore: Unreachable code error
                          item.title
                        }
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* <div className="d-flex align-items-center">
                <input
                  className="mt-2"
                  style={{ height: "18px", width: "18px" }}
                  type="checkbox"
                />
                <span
                  className="ms-2 mt-2"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#979797",
                  }}
                >
                  Please confirm we have permission to email you
                </span>
              </div> */}
            </div>
          </Col>
          <Col md={6}>
            <div className="d-flex">
              <div
                style={{ width: "27px", height: "117px" }}
                className="card shadow mt-3"
              >
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Image
                    src={plus.src}
                    style={{ width: "16px", height: "16px" }}
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Image
                    src={plustwo.src}
                    style={{ width: "16px", height: "16px" }}
                  />
                </div>
              </div>
              <div className="mt-3 col-md-8">
                <button
                  onClick={handleButtonClick}
                  className="add-question ms-3"
                  type="button"
                >
                  Add Question
                </button>
                {showCard && (
                  <div
                    style={{ width: "250px", height: "226px" }}
                    className="card ques-card shadow mt-2"
                  >
                    <button
                      onClick={handleCardButtonClick}
                      className="ques-card-button"
                      value="Button 1"
                    >
                      Short Answer
                    </button>
                    <button
                      onClick={handleCardButtonClick}
                      className="ques-card-button"
                      value="Button 2"
                    >
                      Check Boxes
                    </button>
                    <button
                      onClick={handleCardButtonClick}
                      className="ques-card-button"
                      value="Button 3"
                    >
                      Conditional Short Answer
                    </button>
                    <button
                      onClick={handleCardButtonClick}
                      className="ques-card-button"
                      value="Button 4"
                    >
                      Ask Availability
                    </button>
                    <button
                      onClick={handleCardButtonClick}
                      className="ques-card-button"
                      value="Button 5"
                    >
                      Ask Previous Work Experience
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
          {selectedComponents.map((component, index) => (
            <div key={index} className="component-container">
              {component}
              {/* <button onClick={() => handleComponentClose(component)}>Close</button> */}
            </div>
          ))}
          <button
            type="submit"
            className="update-v-btn mb-5 mt-5 col-md-2 ms-3"
          >
            Submit
          </button>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default CreateApplication;
