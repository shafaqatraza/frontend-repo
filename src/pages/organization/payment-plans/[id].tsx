import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Sidebar from "../../../components/Sidebar.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { Image, Input } from "@chakra-ui/react";
import back from "../../../assets/imgs/back.png";
import gooddeedsorange from "../../../assets/imgs/gooddeedsorange.png";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import { accessToken, baseUrl, currentOrganization } from "../../../components/Helper/index";
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
const calculateHST = (price: number): number => {
  const hst = parseFloat(price.toString()) * 0.13;
  return hst; // Round to 2 decimal places

};

const calculateTotalPrice = (price: number, calculatedHST: number): number => {
  const tempPrice = parseFloat(price.toString()) + parseFloat(calculatedHST.toString());
  return tempPrice;
};
const stripePromise = loadStripe('pk_test_51MzNd8HXctCE4qHqr1vcficqBBBYQp6cFwZxDFefUmKIx6C11wm0pHZCG52m4NYghl36riJi7TZZbZ1ACNg8vJAZ00XFHi92vG');

const StripeForm = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const router = useRouter();
  const { id } = router.query;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hst, setHST] = useState(0);
  const [packageData, setPackageData] = useState({
    name: '',
    currency_symbol: '',
    amount: 0,
    tenure: ''
  });

  
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    country:"",
    postal_code: "",
    payment_token: "U?!U!meN67RPNuF4UKlNqU1Yg1Y5k8U-?U-BN1cM-RurSFqQz6QqOBAD79/kuxzW",
    email:"",
    city: "Toronto",
    state:"ON",
    phone_number: "87337382827",
    card_detail: {
      name_on_card: '',
      card_number: '',
      expiry_date: '',
      cvv: ''
    }

  });

  useEffect(() => {
    axios
        .get(`${baseUrl}/organization/packages/${id}?org=${// @ts-ignore: Unreachable code error
          currentOrganization?.slug}`, {
          headers: {
            Authorization: "Bearer " + accessToken(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          setPackageData(res.data.data);
          setPrice(res.data.data?.amount);
        })
        .catch((err) => {
          console.log(err);
        });
        
  }, [id, currentOrganization])

  useEffect(() => {
    const calculatedHST = calculateHST(price);
    if(calculatedHST){
      setHST(calculatedHST);
    }
  }, [price]);

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice(price, hst);
    setTotalPrice(calculatedTotalPrice);
  }, [hst])

  const stripe = useStripe();
  const elements = useElements();
  

  const handleSubmit = async (event:any) =>{
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      // Handle error, CardElement is not available
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: formData.full_name,
        address: {
          line1: formData.address,
          country: formData.country,
          postal_code: formData.postal_code,
          state: formData.state,
          city: formData.city,
        },
        email: formData.email,
        phone: formData.phone_number,
      },
    });

    // Check for errors
    if (error) {
      // Handle the payment error
      console.log(error);
      return; // or perform any necessary error handling
    }

    // Check if paymentMethod is defined
    if (!paymentMethod) {
      // Handle the case where paymentMethod is undefined
      console.log("Payment method is undefined");
      return; // or perform any necessary error handling
    }

    // Get the payment method ID
    const paymentToken = paymentMethod.id;

    const form = new FormData();
    // @ts-ignore: Unreachable code error
    form.append("package_id", id);
    form.append("full_name", formData.full_name);
    form.append("address", formData.address);
    form.append("country", formData.country);
    form.append("email", formData.email);
    // Append the payment_token to the form data
    form.append("payment_token", paymentToken);

    form.append("postal_code", formData.postal_code);
    form.append("state", formData.state);
    form.append("city", formData.city);
    form.append("phone_number", formData.phone_number);
    //Append card details
    form.append("name_on_card", formData.card_detail.name_on_card);
    form.append("card_number", formData.card_detail.card_number);
    form.append("expiry_date", formData.card_detail.expiry_date);
    form.append("cvv", formData.card_detail.cvv);
    

    axios.post(`${baseUrl}/organization/subscriptions/payment?org=${ // @ts-ignore: Unreachable code error
      currentOrganization?.slug}`, form,  {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },}).then((res)=>{
      console.log(res);
      handleShow();
      router.push("/organization");

    }).catch((err)=>{
      console.log(err);
      handleShowSuccess();

    })

  }
  return (
    <>
      <Navbar />
      <Modal show={show} onHide={handleClose} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            You have successfully subscribed
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button className="modal-btn">Got it</button>
        </div>
      </Modal>
      <Modal show={showSuccess} onHide={handleCloseSuccess} closeButton>
        <div className="p-3">
          <p className="modal-txt text-center p-5 mt-3">
            You have already subscribed another plan
          </p>
        </div>
        <div className="d-flex justify-content-center pb-5">
          <button onClick={handleCloseSuccess} className="modal-btn">
            Got it
          </button>
        </div>
      </Modal>
      <Sidebar>
        <Row>
          <Col md={6}>
            <div className="payment-plan-main"></div>
            <div className="ms-2">
              <Image src={back.src} />
            </div>
            <div className="mt-5">
              <p className="modal-txt">Billing Information</p>
            </div>
            <form>
            <Row>
              <div>
                <CardElement  />
              </div>
                <div className="mb-3 mt-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <Input
                    style={{ backgroundColor: "#E8E8E8" }}
                    type="text"
                    className="form-control"
                    value={formData.full_name}
                    onChange={(event) =>
                    setFormData({ ...formData, full_name: event.target.value })
                    }
                    name="full_name"
                    id="full_name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <Input
                    style={{ backgroundColor: "#E8E8E8" }}
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                    }
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Address</label>
                  <Input
                    style={{ backgroundColor: "#E8E8E8" }}
                    type="text"
                    className="form-control"
                    value={formData.address}
                    onChange={(event) =>
                    setFormData({ ...formData, address: event.target.value })
                    }
                    name="address"
                    id="address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Country</label>
                  <Input
                    style={{ backgroundColor: "#E8E8E8" }}
                    type="text"
                    className="form-control"
                    value={formData.country}
                    onChange={(event) =>
                    setFormData({ ...formData, country: event.target.value })
                    }
                    name="country"
                    id="country"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Zip Code</label>
                  <Input
                    style={{ backgroundColor: "#E8E8E8" }}
                    type="text"
                    className="form-control"
                    value={formData.postal_code}
                    onChange={(event) =>
                    setFormData({ ...formData, postal_code: event.target.value })
                    }
                    name="postal_code"
                    id="postal_code"
                    required
                  />
                </div>
            </Row>
            <div className="mt-5">
              <p className="modal-txt">Payment Method</p>
            </div>
            <Row>
              <div className="mb-3 mt-3">
                <label className="form-label fw-bold">Name on Card</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="text"
                  className="form-control"
                  name="name_on_card"
                  id="name_on_card"
                  value={formData.card_detail.name_on_card}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      card_detail: {
                        ...formData.card_detail,
                        name_on_card: event.target.value
                      }
                    })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Credit Card No</label>
                <Input
                  style={{ backgroundColor: "#E8E8E8" }}
                  type="number"
                  className="form-control"
                  placeholder="xxxx xxxx xxxx"
                  name="card_number"
                  id="card_number"
                  value={formData.card_detail.card_number}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      card_detail: {
                        ...formData.card_detail,
                        card_number: event.target.value
                      }
                    })
                  }
                  required
                />
              </div>
              <Row>
                <Col md={5}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Expiry Date</label>
                    <Input
                      style={{ backgroundColor: "#E8E8E8" }}
                      type="text"
                      className="form-control"
                      placeholder="mm/yy"
                      name="expiry_date"
                      id="expiry_date"
                      value={formData.card_detail.expiry_date}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          card_detail: {
                            ...formData.card_detail,
                            expiry_date: event.target.value
                          }
                        })
                      }
                      required
                    />
                  </div>
                </Col>
                <Col md={5}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">CVV</label>
                    <Input
                      style={{ backgroundColor: "#E8E8E8" }}
                      type="number"
                      className="form-control"
                      placeholder="***"
                      name="cvv"
                      id="cvv"
                      value={formData.card_detail.cvv}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          card_detail: {
                            ...formData.card_detail,
                            cvv: event.target.value
                          }
                        })
                      }
                      required
                    />
                  </div>
                </Col>
              </Row>
              {isSubmitting ? (
            <div
              style={{ color: "#E27832" }}
              className="spinner-border mt-5"
            ></div>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="sub-btn mt-5 mb-5 col-md-4"
            >
              Submit Payment
            </button>
          )}
            </Row>
            </form>
          </Col>
          <Col md={6}>
            <div className="payment-plan-main2"></div>
            <div className="card shadow p-3">
              <div className="d-flex">
              <div>
                <Image src={gooddeedsorange.src}/>
              </div>
              <div className="mt-4 ms-3">
                <p style={{fontSize:"24px", lineHeight:"30px", fontWeight:"700"}}>{packageData?.name}</p>
                <p style={{fontSize:"16px", lineHeight:"20px", fontWeight:"500", color:"#E27832"}}>Auto-renewal</p>
                <p style={{fontSize:"16px", lineHeight:"20px", fontWeight:"500", color:"#979797"}}>
                  {packageData?.currency_symbol}{packageData?.amount} month / billed {packageData?.tenure}</p>
              </div>
              </div>
              <div className="mt-4">
              <hr />
              </div>
              <div className="d-flex justify-content-around mt-3">
                <div>
                  <span style={{fontSize:"16px", lineHeight:"20px", fontWeight:"500", color:"#E27832"}}>HST (13.00%):</span>
                  <p style={{fontSize:"24px", lineHeight:"30px", fontWeight:"700"}}>Total:</p>
                </div>
                <div>
                  <span style={{fontSize:"16px", lineHeight:"20px", fontWeight:"500", color:"#E27832"}}>
                  {packageData?.currency_symbol}{(hst).toFixed(2)}
                    </span>
                  <p style={{fontSize:"24px", lineHeight:"30px", fontWeight:"700"}}>{packageData?.currency_symbol}{(totalPrice).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Sidebar>
      <Footer />
    </>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  );
};

export default PaymentPage;