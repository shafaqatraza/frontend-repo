import React, {useState} from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar.jsx";
import { Row, Col, Container } from "react-bootstrap";
import { Image, Input, Textarea } from "@chakra-ui/react";
import trash from "../assets/imgs/trash.png";
import plus from "../assets/imgs/plus.png";
import plustwo from "../assets/imgs/plustwo.png";
import CheckBox from "../components/CheckBox";
import ShortAnswer from "../components/ShortAnswer";
import Availability from "../components/Availability";
import AskExperience from "../components/AskExperience";

const CreateApplication = () => {
  const [showCard, setShowcard] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<JSX.Element[]>([]);

  const handleButtonClick = () =>{
    setShowcard(!showCard);
    setSelectedButton(null);
  }
  const handleCardButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const componentToAdd = components[event.currentTarget.value];
    setSelectedComponents([...selectedComponents, componentToAdd]);
  };
  const components: { [key: string]: JSX.Element } = {
    'Button 1': <ShortAnswer/>,
    'Button 2' : <CheckBox/>,
    'Button 4': <Availability/>,
    'Button 5': <AskExperience/>
  };

  return (
    <>
      <Navbar />
      <Sidebar>
        <div className="btn-list mt-5">
          <div className="d-flex">
            <button className="donatee-btn">Donation Listing</button>
            <button className="donate-btn2 shadow">Volunteer Listing</button>
          </div>
        </div>
        <div className="d-flex mt-5">
          <p className="listing-txt">Create a Listing</p>
          <div>
            <p className="listing-txt ms-5">Create an Application</p>
            <div className="h-r ms-5" />
          </div>
        </div>
        <div className="d-flex justify-content-between col-md-8">
          <p className="listing-txt mt-5 ms-3">Basic Info</p>
          <button className="update-v-btn mt-5">Reset</button>
        </div>
        <Row>
          <Col md={6}>
            <div className="card shadow mt-3 p-4">
              <form>
                <div className="mt-2">
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                    className="form-label"
                  >
                    Full Name*
                  </label>
                  <Input
                    style={{ backgroundColor: "#E8E8E8" }}
                    type="tel"
                    className="form-control mt-1"
                    id="phone-number"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="mb-3 mt-3">
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                    className="form-label"
                  >
                    Email*
                  </label>
                  <Input
                    style={{ backgroundColor: "#E8E8E8" }}
                    type="tel"
                    className="form-control mt-1"
                    id="phone-number"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="d-flex align-items-center">
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
                </div>
              </form>
            </div>
          </Col>
          <Col md={6}>
           <div className="d-flex">
             <div style={{width:"27px", height:"117px"}} className="card shadow mt-3">
              <div className="d-flex justify-content-center align-items-center mt-3">
                <Image src={plus.src} style={{width:"16px", height:"16px"}}
              />
              </div>
             <div className="d-flex justify-content-center align-items-center mt-3">
               <Image src={plustwo.src} style={{width:"16px", height:"16px"}}/>
             </div>
            </div>
            <div className="mt-3">
              <button onClick={handleButtonClick} className="add-question ms-3">Add Question</button>
              {showCard && (
        <div style={{width:"250px", height:"226px"}} className="card ques-card shadow mt-2">
<button onClick={handleCardButtonClick} className="ques-card-button" value="Button 1">Short Answer</button>
          <button onClick={handleCardButtonClick} className="ques-card-button" value="Button 2">Check Boxes</button>
          <button onClick={handleCardButtonClick} className="ques-card-button" value="Button 3">Conditional Short Answer</button>
          <button onClick={handleCardButtonClick} className="ques-card-button" value="Button 4">Ask Availability</button>
          <button onClick={handleCardButtonClick} className="ques-card-button" value="Button 5">Ask Previous Work Experience</button>

        </div>
      )}
            </div>
           </div>

          </Col>
        </Row>
       <Row>
       {selectedComponents.map((component, index) => (
            <div key={index} className="component-container">
              {component}
              {/* <button onClick={() => handleComponentClose(component)}>Close</button> */}
            </div>
          ))}
          <button type="submit" className="update-v-btn mt-5">Submit</button>
       </Row>
       hh
       {
        console.log(selectedComponents,"ll")

       }

      </Sidebar>
      <Footer />
    </>
  );
};

export default CreateApplication;
