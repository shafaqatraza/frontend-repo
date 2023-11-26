import { Image, Input } from "@chakra-ui/react";
import React, { useState, useEffect, forwardRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import trash from "../assets/imgs/trash.png";
interface ShortAnswerProps {
  onChildData: (childData: any) => void;
}

const ShortAnswer = forwardRef((props: ShortAnswerProps, ref: React.Ref<any>) => {
  const [answer, setAnswer] = useState({
    "question_type_id": 1,
    question: "",
    is_required: 0,
  });

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value } = event.target;
  //   setAnswer({ ...answer, [id]: value });
  //   props.onChildData(JSON.stringify(answer));
  // };
  

  const triggerFunction = () => {
    console.log('Function triggered in the child component');
  
    props.onChildData(JSON.stringify(answer));
  };

  React.useImperativeHandle(ref, () => ({
    triggerFunction: triggerFunction
  }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setAnswer((prevAnswer) => ({ ...prevAnswer, [id]: value }));
  };

  // useEffect(() => {
  //   // Invoke the callback function and pass the data when the component unmounts
  //   return () => {
  //     props.onChildData(answer);
  //   };
  // }, [answer, props.onChildData]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { checked } = event.target;
    const { id, value } = event.target;
    setAnswer({ ...answer, [id]: 1 });
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
  };

  const sendDataToParent = () => {
    props.onChildData(JSON.stringify(answer));
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
          <div className="form-check form-switch d-flex justify-content-end mt-3">
            <input
              className="form-check-input me-3 mt-1"
              type="checkbox"
              id="is_required"
              onChange={handleCheckboxChange}
            />
            <label className="form-label me-3 mt-1">Required</label>
            <span className="mt-1" onClick={handleDelete}>
              <Image src={trash.src} />
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
});

export default ShortAnswer;
