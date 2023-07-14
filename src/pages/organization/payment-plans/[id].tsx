import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import Sidebar from "../../../components/Sidebar.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { Image, Input, color } from "@chakra-ui/react";
import back from "../../../assets/imgs/back.png";
import gooddeedsorange from "../../../assets/imgs/gooddeedsorange.png";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import { accessToken, baseUrl, currentOrganization } from "../../../components/Helper/index";
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardCvcElement, CardExpiryElement} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from '@chakra-ui/toast'

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
  const toast = useToast()
  const [show, setShow] = useState(false);
  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);
  const router = useRouter();
  const { id } = router.query;
  const [price, setPrice] = useState(0);
  const [pricingTenure, setPricingTenure] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [hst, setHST] = useState(0);
  const [packageData, setPackageData] = useState({
    name: '',
    currency: '',
    currency_symbol: '',
    amount: 0,
    tenure: ''
  });

  let tenureAbbreviation = '';

  if (pricingTenure === 'annually') {
    tenureAbbreviation = 'yr';
  } else if (pricingTenure) {
    tenureAbbreviation = pricingTenure.substr(0, 2);
  }

  const cardElementOptions = {
    // iconStyle: 'default', 
    style: {
      base: {
        fontSize: '16px',
        lineHeight: '24px',
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: '#E8E8E8',
        border: '1px solid #d3dce6',
      },
    },
    showIcon: true, // Add this option to show the card icon
  };
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address_line1: "",
    address_line2: "",
    country:"",
    postal_code: "",
    payment_token: "",
    email:"",
    city: "",
    state:"",
    phone_number: "",
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
          setPricingTenure(res.data.data?.tenure);
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
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState("");

  const handleSubmit = async (event:any) =>{
    setIsLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      toast({ position: 'top', title: 'Please fill in the card details!', status: 'info' })
      setIsLoading(false);
      return;
    }

    if (!stripePromise) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    // Check if card details are filled
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      // Handle error, Card elements are not available
      toast({ position: 'top', title: 'Something went wrong, please try again later.', status: 'error' })
      setIsLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: {
        name: formData.first_name + ' ' + formData.last_name,
        address: {
          line1: formData.address_line1,
          line2: formData.address_line2,
          country: formData.country,
          postal_code: formData.postal_code,
        },
        email: formData.email,
        phone: formData.phone_number,
      },
    });

    // Check for errors
    if (error) {
      // Handle the payment error
      // console.log(error);
      toast({ position: 'top', title: 'Please fill in the card details!', status: 'info' })
      setIsLoading(false);
      return;
    }

    // Check if paymentMethod is defined
    if (!paymentMethod) {
      // Handle the case where paymentMethod is undefined
      // console.log("Payment method is undefined");
      toast({ position: 'top', title: 'Payment method is undefined!', status: 'error' })
      setIsLoading(false);
      return; 
    }

    // Get the payment method ID
    const paymentToken = paymentMethod.id;

    const form = new FormData();
    // @ts-ignore: Unreachable code error
    form.append("package_id", id);
    form.append("first_name", formData.first_name);
    form.append("last_name", formData.last_name);
    form.append("address_line1", formData.address_line1);
    form.append("address_line2", formData.address_line2);
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
    
    console.log('kkkkkk', paymentMethod)
    setIsLoading(false);
    axios.post(`${baseUrl}/organization/subscriptions/payment?org=${ // @ts-ignore: Unreachable code error
      currentOrganization?.slug}`, form,  {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },}).then((res)=>{
        if(res.status == 200){
          // setPaymentStatus('success')
          setMessage(res.data.message)
          handleShowModal();
        }
      // router.push("/organization");
    }).catch((err)=>{
      console.log(err);
      // setPaymentStatus('failed')
      setMessage(err.error)
      handleShowModal();
    })

  }

  const goToDashboard = () =>{
    handleCloseModal()
    router.push("/organization");
  }
  return (
    <>
      <Navbar />

      {/* Show Success Modal */}
      {/* <Modal show={show} onHide={handleCloseModal} closeButton>
      <div className="p-3">
        <p className="modal-txt text-center p-5 mt-3">{message}</p>
      </div>
      <div className="d-flex justify-content-center pb-5">
        {paymentStatus == 'success'?
          <button onClick={goToDashboard} className="modal-btn">
            Got it
          </button>
        :
          <button onClick={handleCloseModal} className="modal-btn">
            Got it
          </button>
        }
      </div>
    </Modal> */}
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
            <form id="payment-form" onSubmit={handleSubmit}>
            <Row>
              
                <Col md={6}>
                  <div className="mb-3 mt-3">
                      <label className="form-label fw-bold">First Name</label>
                      <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData.first_name}
                        onChange={(event) =>
                        setFormData({ ...formData, first_name: event.target.value })
                        }
                        name="first_name"
                        id="first_name"
                        required
                      />
                    </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3 mt-3">
                      <label className="form-label fw-bold">Last Name</label>
                      <Input
                        style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData.last_name}
                        onChange={(event) =>
                        setFormData({ ...formData, last_name: event.target.value })
                        }
                        name="last_name"
                        id="last_name"
                        required
                      />
                    </div>
                </Col>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
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
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Billing address</label>
                    <Input
                      style={{ backgroundColor: "#E8E8E8" }}
                      type="text"
                      className="form-control"
                      value={formData.address_line1}
                      onChange={(event) =>
                      setFormData({ ...formData, address_line1: event.target.value })
                      }
                      name="address_line1"
                      id="address_line1"
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Billing address, line 2
                    </label>
                    <Input
                      style={{ backgroundColor: "#E8E8E8" }}
                      type="text"
                      className="form-control"
                      value={formData.address_line2}
                      onChange={(event) =>
                      setFormData({ ...formData, address_line2: event.target.value })
                      }
                      name="address_line2"
                      id="address_line2"
                      required
                    />
                  </div>
                </Col>
            </Row>
            <div className="mt-5">
              <p className="modal-txt">Payment Method</p>
            </div>
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Card Number</label>
                  <CardNumberElement className="form-control" id="cardNumber" options={cardElementOptions} />
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Expiry Date</label>
                  <CardExpiryElement className="form-control" id="expiryDate" options={cardElementOptions}/>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-3">
                  <label className="form-label fw-bold">CVC</label>
                  <CardCvcElement className="form-control" id="cvc" options={cardElementOptions}/>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Postal Code</label>
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
              </Col>
              {/* <div className="col-md-6"></div> */}
              <button disabled={isLoading || !stripe || !elements} id="submit" className="sub-btn mt-5 mb-5">
                <span id="button-text">
                  {isLoading ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Pay now"}
                </span>
              </button>
            </Row>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
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
                {packageData?.currency?.toUpperCase()} {packageData?.currency_symbol}{packageData?.amount}/{tenureAbbreviation}, billed {packageData?.tenure}</p>
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