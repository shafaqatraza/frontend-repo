import React, { useState, useEffect, useRef } from "react";
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
import { accessToken, baseUrl} from "../../../components/Helper/index";
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardCvcElement, CardExpiryElement} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from '@chakra-ui/toast'
import Link from "next/link";
// import { GoogleMap, Autocomplete } from '@react-google-maps/api';
import { getErrorMessage } from '../../../components/Helper/errorMessages';

const calculateHST = (price: number): number => {
  const hst = parseFloat(price.toString()) * 0.13;
  return hst; // Round to 2 decimal places

};

const calculateTotalPrice = (price: number, calculatedHST: number): number => {
  const tempPrice = parseFloat(price.toString()) + parseFloat(calculatedHST.toString());
  return tempPrice;
};
const stripePromise = loadStripe('pk_live_51MzNd8HXctCE4qHqlt3Cbhy44gHXe3704OiRbqwwrRv0ByEfuxCxQrs2GlkC7cMgpjQzZzHJBrCop9fDKrcC6xqA00acC3JRde');

const StripeForm = () => {
  const toast = useToast()
  const autocompleteRef = useRef(null);
  const [orgData, setOrgData] = useState({  
    slug: ''
  });
  const [show, setShow] = useState(false);
  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);
  const router = useRouter();
  const { id } = router.query;
  const [price, setPrice] = useState(0);
  const [pricingTenure, setPricingTenure] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [hst, setHST] = useState(0);
  const [countryOptions, setCountryOptions] = useState([]);
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


  useEffect( ()=> {
    axios
    .get(`${baseUrl}/organizations`, {
      headers: {
        Authorization: "Bearer " + accessToken(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      setOrgData(res.data[0]);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [])

  const cardElementOptions = {
    // iconStyle: 'default', 
    style: {
      base: {
        fontSize: '16px',
        lineHeight: '24px',
        padding: '10px',
        borderRadius: '4px',
        // backgroundColor: '#E8E 8E8',
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
    country_short_name:"",
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
    if(orgData?.slug !== ''){
      axios
        .get(`${baseUrl}/organization/packages/${id}?org=${// @ts-ignore:
          orgData?.slug}`, {
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
    }
        
  }, [id, orgData])

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
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState("");
  
  const handlePlaceSelect = (place: any) => {
    if (place && place.address_components) {
      // Find the country in the address_components
      const countryComponent = place.address_components.find(
        (component: any) => component.types.includes('country')
      );

      // Get the full name and short name of the country
      const countryFullName = countryComponent ? countryComponent.long_name : '';
      const countryShortName = countryComponent ? countryComponent.short_name : '';

      // Update the formData with both full name and short name
      setFormData({
        ...formData,
        country: countryFullName,
        country_short_name: countryShortName, // Add this line if you want to store the short name separately
      });
    }
  };


  const createPaymentIntent = async (event:any) =>{
    setIsLoading(true);
    event.preventDefault();

    if (orgData?.slug === '') {
      toast({ position: 'top', title: 'Something went wrong, please try again later!', status: 'warning' })
      setIsLoading(false);
      return;
    }


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
          state: formData.state,
          city: formData.city,
          postal_code: formData.postal_code,
        },
        email: formData.email,
        phone: formData.phone_number,
      },
    });

    // Check for errors
    if (error) {
      toast({ position: 'top', title: 'Please fill in the card details!', status: 'info' })
      setIsLoading(false);
      return;
    }

    // Check if paymentMethod is defined
    if (!paymentMethod) {
      // Handle the case where paymentMethod is undefined
      toast({ position: 'top', title: 'Payment method is undefined!', status: 'error' })
      setIsLoading(false);
      return; 
    }

    // Get the payment method ID
    const paymentToken = paymentMethod.id;
    // Collect form data.
    const form = collectFormData(paymentToken);

    try {
      const response = await axios.post(`${baseUrl}/organization/subscriptions/payment?org=${orgData?.slug}`, form, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      
      const { errorr, success } = response.data;

      setIsLoading(false);

      if (success) {
        console.log('Payment succeeded:', success);
        toast({ position: "top", title: success, status: "success" });
        router.push("/organization")
      }
    } catch (err: any) {
      // Network or other errors

      setIsLoading(false);
      if (err.response) {
        if(err.response.status === 422){
          toast({ position: "top", title: err.response.data.message, status: "warning" });
          router.push("/organization")
        }else{
          console.log('Error response:', err.response.data.errorr);
          toast({ position: "top", title: err.response.data.errorr, status: "error" });
        }
      }else{
        toast({ position: "top", title: "Network error, please try again later.", status: "error" });
      }

    }

  }

  const collectFormData = (paymentToken: any) => {
    const form = new FormData();
    // @ts-ignore:
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

    return form;
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
              <Link href="/organization/payment-plans">
                <Image src={back.src!} style={{ cursor: 'pointer' }} />
              </Link>
            </div>
            <div className="mt-5">
              <p className="modal-txt">Billing Information</p>
            </div>
            <form id="payment-form" onSubmit={createPaymentIntent}>
            <Row>
              
                <Col md={6}>
                  <div className="mb-3 mt-3">
                      <label className="form-label fw-bold">First Name</label>
                      <Input
                        // style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData.first_name}
                        onChange={(event: any) =>
                        setFormData({ ...formData, first_name: event.target.value })
                        }
                        name="first_name"
                        id="first_name"
                        required
                        placeholder="Enter first name"
                      />
                    </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3 mt-3">
                      <label className="form-label fw-bold">Last Name</label>
                      <Input
                        // style={{ backgroundColor: "#E8E8E8" }}
                        type="text"
                        className="form-control"
                        value={formData.last_name}
                        onChange={(event: any) =>
                        setFormData({ ...formData, last_name: event.target.value })
                        }
                        name="last_name"
                        id="last_name"
                        required
                        placeholder="Enter last name"
                      />
                    </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <Input
                      // style={{ backgroundColor: "#E8E8E8" }}
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(event: any) =>
                      setFormData({ ...formData, email: event.target.value })
                      }
                      name="email"
                      id="email"
                      required
                      placeholder="Enter email address"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Country</label>
                    {/* <Autocomplete // @ts-ignore: Unreachable code error
                      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                      onPlaceChanged={() => {
                        // @ts-ignore: Unreachable code error
                        const selectedPlace = autocompleteRef.current.getPlace();
                        // Call the handlePlaceSelect function with the selected place
                        handlePlaceSelect(selectedPlace);
                      }} // @ts-ignore: Unreachable code error
                      style={{ backgroundColor: "#E8E8E8" }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        value={formData.country}
                        onChange={(event) => setFormData({ ...formData, country: event.target.value })}
                        placeholder="Search a country"
                      />
                    </Autocomplete> */}
                    <select 
                      className="form-select" 
                      id="country"
                      name="country" 
                      value={formData.country} 
                      onChange={(event) => setFormData({ ...formData, country: event.target.value })}
                      required
                     >
                      <option value="">select country</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AX">Aland Islands</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua and Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia</option>
                      <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                      <option value="BA">Bosnia and Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BV">Bouvet Island</option>
                      <option value="BR">Brazil</option>
                      <option value="IO">British Indian Ocean Territory</option>
                      <option value="BN">Brunei Darussalam</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="CV">Cape Verde</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CX">Christmas Island</option>
                      <option value="CC">Cocos (Keeling) Islands</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comoros</option>
                      <option value="CG">Congo</option>
                      <option value="CD">Congo, Democratic Republic of the Congo</option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="CI">Cote D'Ivoire</option>
                      <option value="HR">Croatia</option>
                      <option value="CU">Cuba</option>
                      <option value="CW">Curacao</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FK">Falkland Islands (Malvinas)</option>
                      <option value="FO">Faroe Islands</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="GF">French Guiana</option>
                      <option value="PF">French Polynesia</option>
                      <option value="TF">French Southern Territories</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GR">Greece</option>
                      <option value="GL">Greenland</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GU">Guam</option>
                      <option value="GT">Guatemala</option>
                      <option value="GG">Guernsey</option>
                      <option value="GN">Guinea</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HM">Heard Island and Mcdonald Islands</option>
                      <option value="VA">Holy See (Vatican City State)</option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">Iran, Islamic Republic of</option>
                      <option value="IQ">Iraq</option>
                      <option value="IE">Ireland</option>
                      <option value="IM">Isle of Man</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JE">Jersey</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KP">Korea, Democratic People's Republic of</option>
                      <option value="KR">Korea, Republic of</option>
                      <option value="XK">Kosovo</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">Lao People's Democratic Republic</option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libyan Arab Jamahiriya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MO">Macao</option>
                      <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                      <option value="MG">Madagascar</option>
                      <option value="MW">Malawi</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">Mexico</option>
                      <option value="FM">Micronesia, Federated States of</option>
                      <option value="MD">Moldova, Republic of</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NL">Netherlands</option>
                      <option value="AN">Netherlands Antilles</option>
                      <option value="NC">New Caledonia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PW">Palau</option>
                      <option value="PS">Palestinian Territory, Occupied</option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="RE">Reunion</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russian Federation</option>
                      <option value="RW">Rwanda</option>
                      <option value="BL">Saint Barthelemy</option>
                      <option value="SH">Saint Helena</option>
                      <option value="KN">Saint Kitts and Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="MF">Saint Martin</option>
                      <option value="PM">Saint Pierre and Miquelon</option>
                      <option value="VC">Saint Vincent and the Grenadines</option>
                      <option value="WS">Samoa</option>
                      <option value="SM">San Marino</option>
                      <option value="ST">Sao Tome and Principe</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="CS">Serbia and Montenegro</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SX">Sint Maarten</option>
                      <option value="SK">Slovakia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="GS">South Georgia and the South Sandwich Islands</option>
                      <option value="SS">South Sudan</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SJ">Svalbard and Jan Mayen</option>
                      <option value="SZ">Swaziland</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syrian Arab Republic</option>
                      <option value="TW">Taiwan, Province of China</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania, United Republic of</option>
                      <option value="TH">Thailand</option>
                      <option value="TL">Timor-Leste</option>
                      <option value="TG">Togo</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad and Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="TC">Turks and Caicos Islands</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="UM">United States Minor Outlying Islands</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Viet Nam</option>
                      <option value="VG">Virgin Islands, British</option>
                      <option value="VI">Virgin Islands, U.s.</option>
                      <option value="WF">Wallis and Futuna</option>
                      <option value="EH">Western Sahara</option>
                      <option value="YE">Yemen</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                  </select>

                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">State</label>
                    <Input
                      // style={{ backgroundColor: "#E8E8E8" }}
                      type="text"
                      className="form-control"
                      value={formData.state}
                      onChange={(event: any) =>
                      setFormData({ ...formData, state: event.target.value })
                      }
                      name="state"
                      id="state"
                      placeholder="Enter state"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">City</label>
                    <Input
                      // style={{ backgroundColor: "#E8E8E8" }}
                      type="text"
                      className="form-control"
                      value={formData.city}
                      onChange={(event: any) =>
                      setFormData({ ...formData, city: event.target.value })
                      }
                      name="city"
                      id="city"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Billing address</label>
                    <Input
                      // style={{ backgroundColor: "#E8E8E8" }}
                      type="text"
                      className="form-control"
                      value={formData.address_line1}
                      onChange={(event: any) =>
                      setFormData({ ...formData, address_line1: event.target.value })
                      }
                      name="address_line1"
                      id="address_line1"
                      placeholder="Enter address line 1"
                      required
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Billing address, line 2
                    </label>
                    <Input
                      // style={{ backgroundColor: "#E8E8E8" }}
                      type="text"
                      className="form-control"
                      value={formData.address_line2}
                      onChange={(event: any) =>
                      setFormData({ ...formData, address_line2: event.target.value })
                      }
                      name="address_line2"
                      id="address_line2"
                      placeholder="Enter address line 2"
                    />
                  </div>
                </Col>
            </Row>
            <div className="mt-5">
              <p className="modal-txt">Payment Method</p>
            </div>
            <Row>
              <Col md={12}>
                <div className="mb-3" style={{ backgroundColor: 'white'}}>
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
                  <label className="form-label fw-bold">Postal Code/Zip Code</label>
                  <Input
                    // style={{ backgroundColor: "#E8E8E8" }}
                    type="text"
                    className="form-control"
                    value={formData.postal_code}
                    onChange={(event: any) =>
                    setFormData({ ...formData, postal_code: event.target.value })
                    }
                    name="postal_code"
                    id="postal_code"
                    required
                    placeholder="Enter postal or zip code"
                    maxLength={8}
                  />
                </div>
              </Col>
              {/* <div className="col-md-6"></div> */}
              <Col>
                <button disabled={isLoading || !stripe || !elements} id="submit" className="sub-btn mt-5 mb-5">
                  <span id="button-text">
                    {isLoading ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Submit Payment"}
                  </span>
                </button>
              </Col>
            </Row>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
            {errorMessage && (
              <div id="payment-error-message" className={'payment-error-message'}>
                {errorMessage}
              </div>
            )}
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
              <div className="d-flex justify-content-around mt-3">
                <p style={{ color: 'red' }}>Free Trial: Payment will be charged after 3 months.</p>
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