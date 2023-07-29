import { Input, Image } from "@chakra-ui/react";
import React from "react";
import { Row, Col } from "react-bootstrap";
import plus from "../assets/imgs/plus.png";

const AskExperience = () => {
  return (
    <>
    <Row>
      <Col md={6}>
        <p className="listing-txt mt-4">Previous Work or Volunteer Experience</p>
        <div className="card shadow p-4 mt-4 mb-4">
       <div className="row">
        <div className="col-md-7">
        <p className="fw-bold">* Do you have experience working with</p>
        </div>
        <div className="col-md-5">
          <Input type="text" style={{ backgroundColor: "#E8E8E8" }} placeholder="Begin Typing here"/>
        </div>
       </div>
        <div className="checkbox-container d-flex flex-column mt-3 ms-3">
              <label>
                <input type="checkbox" name="commitment" value="yes" />
                <span className="checkmark"></span>
                <span>Yes</span>
              </label>
              <label>
                <input type="checkbox" name="commitment" value="no" />
                <span className="checkmark"></span>
                <span>No</span>
              </label>
            </div>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <div className="card shadow pt-4">
          <p className="listing-txt ms-4">Prior Work Experience</p>
          <div className="d-flex">
            <div className="col-md-7 ps-4 pt-2">
              <textarea
                style={{ backgroundColor: "#E8E8E8" }}
                // type="tel"
                rows={4}
                className="form-control mt-2"
                id="phone-number"
                placeholder="Begin Typing Here"
                required
              />
            </div>
            <div className="mt-4 ms-2">
              <span style={{ color: "#979797" }}>
                Please indicate workplace and duties
              </span>
            </div>
          </div>
          <div className="p-4">
            <Image src={plus.src}/>
          </div>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <div className="card shadow pt-4 p-4 mt-4">
        <p className="fw-bold">* Are you fully vacination against COVID-19 (2 doses)</p>
          <div className="checkbox-container d-flex flex-column mt-3 ms-3">
            <label>
              <input type="checkbox" name="commitment" value="yes" />
              <span className="checkmark"></span>
              <span>Yes</span>
            </label>
            <label>
              <input type="checkbox" name="commitment" value="no" />
              <span className="checkmark"></span>
              <span>No</span>
            </label>
          </div>
        </div>
      </Col>
    </Row>
    </>
  );
};

export default AskExperience;
