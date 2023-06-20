import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import Sidebar from "../components/Sidebar";
import back from "../assets/imgs/back.png";
import { Image, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from 'next/router';

const CompletedVolunteer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dates: '',
    hours: '',
    description: '',
    supervisorFullName: '',
    supervisorEmail: '',
    organizationName: '',
  });
  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(formData,"data");
    router.push({
      pathname: '/certification',
      query: { ...formData },
    });

    // Do any validation or data processing here
    // For example, you can send the form data to an API endpoint or store it in local storage

    // Redirect to the next page
    // router.push('/certification');
  };
  return (
    <>
      <Navbar />
      <Sidebar>
        <div className="plan-main"></div>
        <div className="row">
          <div className="col-md-1 mt-2">
            <img alt="image" src={back.src} />
          </div>
          <div className="col-md-2">
            <span className="app-txt">Application</span>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-5">
          <span className="modal-txt ms-5">Certification</span>
          {/* <Link href="/certification">
            <button className="canc-btn">Mark as complete</button>
          </Link> */}
        </div>
        {/* <form> */}
          <div className="card shadow col-md-6 p-4 mt-3 ms-5">
            <label
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
              }}
              className="form-label"
            >
              Did your volunteer complete hours needed?
            </label>
            <div className="mt-2">
              <input
                className="form-check-input me-3"
                id="is_required"
                type="checkbox"
                // checked={isRequired}
                // onChange={(event) => setIsRequired(event.target.checked)}
                //  // @ts-ignore: Unreachable code error
                // onBlur={handleFormSubmit}
              />
              <span>Yes</span>
            </div>
            <div className="mt-2">
              <input
                className="form-check-input me-3"
                id="is_required"
                type="checkbox"
                // checked={isRequired}
                // onChange={(event) => setIsRequired(event.target.checked)}
                //  // @ts-ignore: Unreachable code error
                // onBlur={handleFormSubmit}
              />
              <span>No</span>
            </div>
          </div>
          <div className="col-md-8">
            <p
              style={{
                fontWeight: "500",
                fontSize: "20px",
                lineHeight: "24px",
              }}
              className="ms-5 mt-4"
            >
              Please fill in the information for their Volunteer Certificate
            </p>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="card shadow col-md-6 p-4 mt-3 ms-5">
            <div className="mt-2">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Volunteer Full Name*
              </label>
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="tel"
                className="form-control mt-1"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mt-4">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Volunteer Email*
              </label>
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="tel"
                className="form-control mt-1"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="mt-4">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Date(s) of volunteer*
              </label>
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="tel"
                className="form-control mt-1"
                name="dates"
                value={formData.dates}
                onChange={handleInputChange}
                placeholder="Date"
                required
              />
            </div>
            <div className="mt-4">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Total Hours Completed*
              </label>
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="tel"
                className="form-control mt-1"
                name="hours"
                value={formData.hours}
                onChange={handleInputChange}
                placeholder="Hours"
                required
              />
            </div>
            <div className="mt-4">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Description of act
              </label>
              <textarea
                style={{ backgroundColor: "#E8E8E8" }}
                className="form-control mt-1"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
                rows={6}
              />
            </div>
            <div className="mt-4">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Supervisor Full Name*
              </label>
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="tel"
                className="form-control mt-1"
                name="supervisorFullName"
                value={formData.supervisorFullName}
                onChange={handleInputChange}
                placeholder="Supervisor Name"
                required
              />
            </div>
            <div className="mt-4">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Supervisor Email*
              </label>
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="tel"
                className="form-control mt-1"
                name="supervisorEmail"
                value={formData.supervisorEmail}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="mt-4">
              <label
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                  lineHeight: "24px",
                }}
                className="form-label"
              >
                Organization Name*
              </label>
              <Input
                style={{ backgroundColor: "#E8E8E8" }}
                type="tel"
                className="form-control mt-1"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Organization Name"
                required
              />
            </div>
          </div>
          <div className="mb-5 mt-5 ms-5">
          {/* <Link href="/certification"> */}

            <button type="submit" className="update-v-btn">Submit</button>
          {/* </Link> */}
          </div>
          </form>
        {/* </form> */}
      </Sidebar>
      <Footer />
    </>
  );
};

export default CompletedVolunteer;
