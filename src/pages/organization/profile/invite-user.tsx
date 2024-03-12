import React, {useState, useEffect} from "react";
import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import user from "../../../assets/imgs/user.png";
import home from "../../../assets/imgs/home.png";
import setting from "../../../assets/imgs/setting.png";
import volunteer from "../../../assets/imgs/volunteer.png";
import listing from "../../../assets/imgs/listing.png";
import back from "../../../assets/imgs/back.png";
import donation from "../../../assets/imgs/donation.png";
import Link from "next/link";
import { Image, Input } from "@chakra-ui/react";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { accessToken, baseUrl } from '../../../components/Helper/index'
import { useRouter } from "next/router";
import { useToast } from '@chakra-ui/toast'
import Head from "next/head";
import fav from "../../../assets/imgs/favicon.ico"

const InviteUser = () => {
  const [email, setEmail] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [slug, setSlug] = useState([]);
  const router = useRouter();
  const toast = useToast()

  function handleEmailChange(e:any) {
    setEmail(e.target.value);
  }

  function handleRadioChange(e:any) {
    setSelectedRadio(e.target.value);
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
        setSlug(res.data[0].slug);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (event: any) =>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('role_id', selectedRadio);

    axios.post(`${baseUrl}/organizations/${slug}/invitations`, formData, {
      headers: {
        Authorization: 'Bearer ' + accessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        router.push("/organization/profile");
        toast({ position: "top", title: response.data.message, status: "success" });
      })
      .catch((error) => {
        // console.log(error.response);
        router.push("/organization/profile");
        toast({ position: 'top', title: error.response.data.message, status: 'warning' })
      });



  }
  return (
    <>
      <Head>
          <title>Good Deeds | Organization Invite-Member</title>
          <link rel="icon" href={fav.src}  />
      </Head>
     <Navbar />
      <div className="row container-fluid main-side">
        <Sidebar>
        <div className="col-md-12">
          <div className="empty-div"></div>
          <div className="d-flex align-items-center">
            <Link href={`/organization/profile`}>
              <Image src={back.src} style={{ cursor: 'pointer' }} />
            </Link>
            <p className="modal-txt ms-5">Invite a User</p>
          </div>
          <form onSubmit={handleSubmit}>

          <div className="col-md-5">

              <div className="mb-3 mt-5">
                <label className="form-label fw-bold">Email</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  className="form-control"
                  id="email"
                  required
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  />
              </div>
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
                  id="checkbox1"
                  name="checkbox1"
                  value="7" checked={selectedRadio === '7'} onChange={handleRadioChange}/>

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
                  value="8" checked={selectedRadio === '8'} onChange={handleRadioChange}
                  name="checkbox2"
                  id="checkbox2"
                />
                {/* <input type="hidden" name="role_id" value={formData.role_id}  onChange={(event) =>
                  setFormData({ ...formData, role_id: event.target.value })
                } /> */}
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
              <button className="cancel-btn float-end">Cancel</button>
              <button className="float-end save-btn-edit me-3">Save</button>
            </div>
          </Container>

          <div></div>
                  </form>
        </div>
        </Sidebar>
      </div>
      <Footer />
    </>
  )
}

export default InviteUser
