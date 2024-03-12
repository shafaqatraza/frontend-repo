import React, {useState, useEffect} from "react";
import Navbar from "../../../../components/Navbar";
import Sidebar from "../../../../components/Sidebar";
import { Footer } from "../../../../components/Footer";
import listing from "../../../../assets/imgs/listing.png";
import back from "../../../../assets/imgs/back.png";
import Link from "next/link";
import axios from "axios";
import { Image, Input } from "@chakra-ui/react";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { accessToken, baseUrl, currOrgSlug } from "../../../../components/Helper/index";
import { useToast } from '@chakra-ui/toast'
import Head from "next/head";
import fav from "../../../../assets/imgs/favicon.ico"

interface FormErrors {
  email:boolean,
}
const initialFormErrors: FormErrors = {
  email: false,
};

const EditMember = () => {
  const router = useRouter();
  const toast = useToast()
  const { member } = router.query;
  const [invitedMember, setInvitedMember] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role_id: 0
  });

  useEffect(() => {
    if(currOrgSlug && member){
      axios
        .get(
          `${baseUrl}/organizations/${currOrgSlug}/invitations/${member}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken(),
              // 'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        )
        .then((res) => {
          setInvitedMember(res.data.data);
          setFormData(preFormData => ({
            ...preFormData,
            name: res.data.data.name,
            email: res.data.data.email,
            role_id: res.data.data.role_id,
          }));

        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, [currOrgSlug, member]);

  const handleUpdateMember = () => {
    setIsUpdating(true);
    let hasErrors = false;

    if (!formData.email) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['email']: true, 
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      setIsUpdating(false);
      return;
    }

    axios
      .post(
        `${baseUrl}/organizations/${currOrgSlug}/invitations/${member}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + accessToken(),
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
      )
      .then((res) => {
        setIsUpdating(false);
        router.push(`/organization/profile`)
        toast({ position: "top", title: res.data.message, status: "success" })
      })
      .catch((err) => {
        setIsUpdating(false);
        toast({ position: "top", title: err.response.data.message, status: "warning" })
        console.log(err);
      });
  }

  const handleRadioChange = (roleId: number) => { console.log('roleIdroleIdroleId', roleId)
    setFormData(preFormData => ({
      ...preFormData,
      role_id: roleId,
    }));
  };

  const handleInputChange = (e: any) => { 
    setFormData(preFormData => ({
      ...preFormData,
      [e.target.name]: e.target.value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: false,
    }));


  }

  return (
    <>
      <Head>
          <title>Good Deeds | Organization Edit-Member</title>
          <link rel="icon" href={fav.src}  />
      </Head>
      <Navbar />
      <div className="row container-fluid main-side">
      <Sidebar>
        <div className="col-md-8">
          <div className="empty-div"></div>
          <div className="d-flex align-items-center">
            <Link href={`/organization/profile`}>
              <Image src={back.src} style={{ cursor: 'pointer' }} />
            </Link>
            <p className="modal-txt ms-5">Edit Member</p>
          </div>
          <div className="col-md-5">
            <form>
              {/* <div className="mb-3 mt-5">
                <label className="form-label fw-bold">Name</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="email"
                  className="form-control"
                  value={formData.name}
                  name="name"
                  onChange={(e)=>{handleInputChange(e)}}
                  placeholder="Name"
                  disabled
                />
              </div> */}
              <div className="mb-3 mt-3">
                <label className="form-label fw-bold">Email</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="email"
                  className={`form-control ${formErrors['email'] ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={(e)=>{handleInputChange(e)}}
                  name="email"
                  placeholder="Email"
                  
                />
                {formErrors['email'] && <p className="error-message">Please fill out the field.</p>}
              </div>
            </form>
          </div>
          <hr />
          <Container>
            <p
              className="mt-4"
              style={{ fontSize: "20px", lineHeight: "25px", fontWeight: 500 }}
            >
              Roles(s)*
            </p>
            <p
              style={{ fontSize: "14px", lineHeight: "22px", fontWeight: 500 }}
            >
              Select one role for the person you’re inviting
            </p>
          </Container>
          <Container>
            <div className="d-flex mt-3">
              <div>
                <Form.Check
                  type="radio"
                  name="radio-group"
                  id="radio-option-1"
                  checked={formData.role_id === 7}
                  onChange={() => handleRadioChange(7)} // Call a function to handle radio button change
                />
              </div>
              <div>
                <p
                  className="ms-2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "25px",
                    fontWeight: 500,
                  }}
                >
                  Admin (Co-owner)
                </p>
                <p
                  className="ms-2"
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                  }}
                >
                  Has full access to manage, edit & publish, edit users,
                  including billing, inviting people, but cannot delete site
                </p>
              </div>
            </div>
          </Container>
          <Container>
            <div className="d-flex mt-3">
              <div>
                <Form.Check
                  type="radio"
                  name="radio-group"
                  id="radio-option-1"
                  checked={formData.role_id === 9}
                  onChange={() => handleRadioChange(9)} // Call a function to handle radio button change
                />
              </div>
              <div>
                <p
                  className="ms-2"
                  style={{
                    fontSize: "20px",
                    lineHeight: "25px",
                    fontWeight: 500,
                  }}
                >
                  User
                </p>
                <p
                  className="ms-2"
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    fontWeight: 500,
                  }}
                >
                  Has access to manage, edit & publish, but cannot edit users,
                  billing, invite people, or delete site
                </p>
              </div>
            </div>
          </Container>
          <Container>
            <div className="col-md-10 mt-5">
             
              <button type="submit" onClick={handleUpdateMember} disabled={isUpdating} id="submit" className="float-end save-btn-edit">
                <span id="button-text">
                  {isUpdating ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Update"}
                </span>
              </button>
            </div>
          </Container>
          <div></div>
        </div>
        </Sidebar>
      </div>
      <Footer />
    </>
  );
};

export default EditMember;
