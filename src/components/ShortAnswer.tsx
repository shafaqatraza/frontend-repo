import { Image, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import trash from "../assets/imgs/trash.png";

const ShortAnswer = (props: any) => {
  const [answer, setAnswer] = useState({
    "question_type_id": 1,
    question: "",
    is_required: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setAnswer({ ...answer, [id]: value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { checked } = event.target;
    setAnswer({ ...answer, is_required: 1 });
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
  };

  const sendDataToParent = () => {
    props.onChildData(JSON.stringify(answer));
    console.log(JSON.stringify(answer), "ansss");
  };

  return (
    <Row>
      <Col md={6}>
        <div className="card shadow p-4 mt-3">
          <p className="listing-txt">Question</p>
          <div>
            <Input
              style={{ backgroundColor: "#E8E8E8" }}
              type="tel"
              className="form-control mt-2"
              id="question"
              placeholder="Question"
              required
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="d-flex align-items-center mt-3">
        <input
          type="text"
          style={{ width: "80%" }}
          className="border-bottom-input mt-1"
          placeholder="Short Answer"
          onChange={handleInputChange}
        />
      </div> */}

          <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-1"
              type="checkbox"
              id="is_required"
              onChange={handleCheckboxChange}
              onBlur={sendDataToParent}
            />
            <label className="form-label me-3 mt-1">Required</label>
            <span className="mt-1" onClick={handleDelete}>
              <Image src={trash.src} />
            </span>
          </div>

          {/* <div onClick={sendDataToParent}>Send</div> */}
        </div>
      </Col>
    </Row>
  );
};

export default ShortAnswer;
