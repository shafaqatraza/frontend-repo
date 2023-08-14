import React, {useState, useEffect} from "react";
import Navbar from "../../../../../components/Navbar";
import { Footer } from "../../../../../components/Footer";
import Sidebar from "../../../../../components/Sidebar";
import back from "../../../../../assets/imgs/back.png";
import { Image, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { accessToken, baseUrl, currentOrganization } from "../../../../../components/Helper/index";
import axios from 'axios'
import { useToast } from '@chakra-ui/toast'

interface FormErrors {
  full_name:boolean,
  email:boolean, 
  volunteer_date:boolean, 
  hours_completed:boolean,
  description:boolean,
  supervisor_name:boolean, 
  supervisor_email:boolean,
  organization_name:boolean
}

const initialFormErrors: FormErrors = {
  full_name: false,
  email: false,
  volunteer_date: false,
  hours_completed:false, 
  description:false, 
  supervisor_name:false, 
  supervisor_email:false,
  organization_name:false
};

const CompletedVolunteer = () => {
  const router = useRouter();
  const { listing, application } = router.query;
  const toast = useToast()
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [formData, setFormData] = useState({
    volunteer_id: '',
    full_name: '',
    email: '',
    volunteer_date: '',
    hours_completed: '',
    description: '',
    supervisor_name: '',
    supervisor_email: '',
    organization_name: '',
    organization_id: '',
    listing_slug: '',
    application_id: 0
  });

  useEffect(()=>{
    if(application){
      axios.get(`${baseUrl}/volunteer-applications/${application}/applicant-personal-detail?org=${// @ts-ignore:
        currentOrganization?.slug}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken(),
        }
      }).then((res) => { 
        const applicationId = parseInt(application as string);
        setFormData((prevFormData) => ({
          ...prevFormData,
          volunteer_id: res.data.data.id,
          full_name: res.data.data.full_name,
          email: res.data.data.email, // @ts-ignore:
          organization_name: currentOrganization.full_name, // @ts-ignore:
          organization_id: currentOrganization.id,
          listing_slug: listing as string,
          application_id: applicationId as number,
        }));
      })
    }
  }, [listing, application, currentOrganization])


  const handleInputChange = (event: any, type:string) => {

    setFormData({ ...formData, [ event.target.name]: event.target.value});

    if(type == 'full_name'){
      setFormErrors((prevErrors) => ({ ...prevErrors, ['full_name']: false,}));
    }else if(type == 'email'){
      setFormErrors((prevErrors) => ({ ...prevErrors, ['email']: false,}));
    }else if(type == 'volunteer_date'){
      setFormErrors((prevErrors) => ({ ...prevErrors, ['volunteer_date']: false,}));
    }else if(type == 'hours_completed'){
      setFormErrors((prevErrors) => ({ ...prevErrors, ['hours_completed']: false,}));
    }else if(type == 'description'){
      setFormErrors((prevErrors) => ({ ...prevErrors, ['description']: false,}));
    }else if(type == 'supervisor_name'){
      setFormErrors((prevErrors) => ({ ...prevErrors, ['supervisor_name']: false,}));
    }else if(type == 'supervisor_email'){
      setFormErrors((prevErrors) => ({ ...prevErrors, ['supervisor_email']: false,}));
    }else if(type == 'organization_name'){
      setFormErrors((prevErrors) => ({ ...prevErrors, ['organization_name']: false,}));
    }
    
    
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setIsGenerating(true)
    let hasErrors = false;

    if (!formData.full_name) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['full_name']: true, 
      }));
      hasErrors = true;
    }
    
    if (!formData.email) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['email']: true, 
      }));
      hasErrors = true;
    }
    
    if (!formData.volunteer_date) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['volunteer_date']: true, 
      }));
      hasErrors = true;
    }

    if (!formData.hours_completed) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['hours_completed']: true, 
      }));
      hasErrors = true;
    }
    if (!formData.description) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['description']: true, 
      }));
      hasErrors = true;
    }
    if (!formData.supervisor_name) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['supervisor_name']: true, 
      }));
      hasErrors = true;
    }
    if (!formData.supervisor_email) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['supervisor_email']: true, 
      }));
      hasErrors = true;
    }
    
    if (!formData.organization_name) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['organization_name']: true, 
      }));
      hasErrors = true;
    }

    // If there are errors, prevent form submission
    if (hasErrors) {
      toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      setIsGenerating(false);
      return;
    }

    axios.post(`${baseUrl}/volunteer-certificates/store?org=${// @ts-ignore:
      currentOrganization?.slug}`, formData, {
      headers: {
        Authorization: 'Bearer ' + accessToken(),
      }
    })
    .then((response) => {
      router.push(`/organization/volunteer-applications/${listing}/${application}/certification`);
      setIsGenerating(false)
      toast({ position: "top", title: response.data.message, status: "success" })
    })
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
        <form onSubmit={handleSubmit}>
          {/* <div className="card shadow col-md-6 p-4 mt-3 ms-5">
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
                type="radio"
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
                type="radio"
                // checked={isRequired}
                // onChange={(event) => setIsRequired(event.target.checked)}
                //  // @ts-ignore: Unreachable code error
                // onBlur={handleFormSubmit}
              />
              <span>No</span>
            </div>
          </div> */}
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
                className={`form-control mt-1 ${formErrors['full_name'] ? 'input-error' : ''}`}
                name="full_name"
                value={formData.full_name}
                onChange={(e)=> (handleInputChange(e, 'full_name'))}
                placeholder="Full Name"
                required
                disabled
              />
              {formErrors['full_name'] && <p className="error-message">Please fill out the field.</p>}
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
                type="email"
                className={`form-control mt-1 ${formErrors['email'] ? 'input-error' : ''}`}
                name="email"
                value={formData.email}
                onChange={(e)=> (handleInputChange(e, 'email'))}
                placeholder="Email"
                required
                disabled
              />
              {formErrors['email'] && <p className="error-message">Please fill out the field.</p>}
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
                type="date"
                className={`form-control mt-1 ${formErrors['volunteer_date'] ? 'input-error' : ''}`}
                name="volunteer_date"
                value={formData.volunteer_date}
                onChange={(e)=> (handleInputChange(e, 'volunteer_date'))}
                placeholder="Date"
                required
              />
              {formErrors['volunteer_date'] && <p className="error-message">Please select date of volunteer.</p>}
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
                type="number"
                className={`form-control mt-1 ${formErrors['hours_completed'] ? 'input-error' : ''}`}
                name="hours_completed"
                value={formData.hours_completed}
                onChange={(e)=> (handleInputChange(e, 'hours_completed'))}
                placeholder="Hours"
                required
              />
              {formErrors['hours_completed'] && <p className="error-message">Please fill out the field.</p>}
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
                className={`form-control mt-1 ${formErrors['description'] ? 'input-error' : ''}`}
                name="description"
                value={formData.description}
                onChange={(e)=> (handleInputChange(e, 'description'))}
                placeholder="Description"
                required
                rows={6}
              />
              {formErrors['description'] && <p className="error-message">Please fill out the field.</p>}
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
                className={`form-control mt-1 ${formErrors['supervisor_name'] ? 'input-error' : ''}`}
                name="supervisor_name"
                value={formData.supervisor_name}
                onChange={(e)=> (handleInputChange(e, 'supervisor_name'))}
                placeholder="Supervisor Name"
                required
              />
              {formErrors['supervisor_name'] && <p className="error-message">Please fill out the field.</p>}
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
                className={`form-control mt-1 ${formErrors['supervisor_email'] ? 'input-error' : ''}`}
                name="supervisor_email"
                value={formData.supervisor_email}
                onChange={(e)=> (handleInputChange(e, 'supervisor_email'))}
                placeholder="Email"
                required
              />
              {formErrors['supervisor_email'] && <p className="error-message">Please fill out the field.</p>}
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
                className={`form-control mt-1 ${formErrors['organization_name'] ? 'input-error' : ''}`}
                name="organization_name"
                value={formData.organization_name}
                onChange={(e)=> (handleInputChange(e, 'organization_name'))}
                placeholder="Organization Name"
                required
                disabled
              />
              {formErrors['organization_name'] && <p className="error-message">Please fill out the field.</p>}
            </div>
          </div>
          <div className="mb-5 mt-5 ms-5">
            <button type="submit" onClick={handleSubmit} id="submit" className="update-v-btn mb-5">
              <span id="button-text">
                {isGenerating ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden"></span></div> : "Generate Certificate"}
              </span>
            </button>
          </div>
          </form>
        </form>
      </Sidebar>
      <Footer />
    </>
  );
};

export default CompletedVolunteer;
