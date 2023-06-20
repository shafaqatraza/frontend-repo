import { Input, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import trash from "../assets/imgs/trash.png";
import { Form, Button } from "react-bootstrap";

interface AvailabilityState {
  [day: string]: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
  };
}

const Availability = () => {
  const [availability, setAvailability] = useState<AvailabilityState>({
    Monday: { morning: false, afternoon: false, evening: false },
    Tuesday: { morning: false, afternoon: false, evening: false },
    Wednesday: { morning: false, afternoon: false, evening: false },
    Thursday: { morning: false, afternoon: false, evening: false },
    Friday: { morning: false, afternoon: false, evening: false },
    Saturday: { morning: false, afternoon: false, evening: false },
    Sunday: { morning: false, afternoon: false, evening: false },
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    day: string,
    timeOfDay: string
  ) {
    setAvailability((prevState) => ({
      ...prevState,
      [day]: { ...prevState[day], [timeOfDay]: e.target.checked },
    }));
  }
  return (
    <>
      <Row>
        <Col md={6}>
          <p className="listing-txt mt-2">Availability</p>
          <div className="card shadow p-4 mt-3">
            <p className="fw-bold">* I am available and agree to commit to:</p>
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
            <div className="form-check form-switch d-flex justify-content-end mt-3">
              <input
                className="form-check-input me-3"
                type="checkbox"
                id="required-switch"
              />
              <label className="form-check-label me-3 mt-2">Required</label>
              <span className="mt-1">
                <Image src={trash.src} />
              </span>
            </div>
          </div>
          <div className="card shadow p-4 mt-3">
            <div>
              <p className="fw-bold fs-5">Date I am available to start</p>
            </div>
            <div className="col-md-10">
              <Input
                style={{ backgroundColor: "#E8E8E8", height: "50px" }}
                type="tel"
                className="form-control mt-2"
                id="phone-number"
                placeholder="Begin Typing Here"
                required
              />
            </div>
            <div>
              <p className="fw-bold fs-5 mt-2">*Availability to</p>
            </div>
            <form className="mt-4">
              <table className="col-md-12">
                <thead>
                  <tr>
                    <th></th>
                    <th style={{ marginLeft: "20px" }}>Morning</th>
                    <th>Afternoon</th>
                    <th>Evening</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(availability).map(([day, times]) => (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={times.morning}
                          onChange={(e) => handleChange(e, day, "morning")}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={times.afternoon}
                          onChange={(e) => handleChange(e, day, "afternoon")}
                        />
                      </td>
                      <td className="ms-5">
                        <input
                          type="checkbox"
                          checked={times.evening}
                          onChange={(e) => handleChange(e, day, "evening")}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Availability;
