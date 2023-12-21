import React, {useState, useEffect} from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import back from "../../../assets/imgs/back.png";
import { Image, Input } from "@chakra-ui/react";
import { accessToken, baseUrl, currOrgSlug } from "../../../components/Helper/index";
import { useToast } from '@chakra-ui/toast'
import axios from "axios";

const PayoutMethodForm = () => {
  const router = useRouter();
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [userPermissions, setUserPermissions] = useState({
    role: '',
    permissions: []
  });

  const [formData, setFormData] = useState({
    email: '',
    address: '',
    legal_business_name: '',
    city: '',
    province: '',
    country: '',
    postal_code: '',
    bank_name: '',
    transit_number: '',
    account_number: '',
  });
  
  function getPermissions(){ 
    const rolePermissionsString = localStorage.getItem('rolePermissions');
    if (rolePermissionsString !== null) {
      const rolePermissions = JSON.parse(rolePermissionsString);
      setUserPermissions(rolePermissions);
    }
  }

  useEffect( ()=> {
    getPermissions()
  }, [])

  useEffect(() => {
    if(currOrgSlug){
      axios
        .get(
          `${baseUrl}/billing-and-payments/donation-method/show?org=${currOrgSlug}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken()
            },
          }
        )
        .then((res) => {
            setFormData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, [currOrgSlug]);


  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)

    let hasErrors = false;

    Object.keys(formData).forEach((field) => { 
        if (!formData[field]) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: true,
          }));
          hasErrors = true;
        }
    });

    if (hasErrors) {
      toast({ position: "top", title: 'Please fill out the complete form.', status: "warning" })
      setIsLoading(false);
      return;
    }

    axios
      .post(
        `${baseUrl}/donation-methods/store?org=${currOrgSlug}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + accessToken()
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        router.push(`/organization/billing-and-payments/donation-payouts`)
        toast({ position: "top", title: res.data.message, status: "success" })
      })
      .catch((err) => {
        setIsLoading(false);
        toast({ position: "top", title: err.response.data.message, status: "warning" })
        console.log(err);
      });
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setFormErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: false,
    }));

  };


  return (
    <>
    <div className="col">
        <div className='d-flex justify-content-md-between justify-content-center mt-5 pb-4 pr-3 mr-4 flex-wrap'>
            <div className='mt-md-5 d-flex align-items-center'>
                <Link href={`/organization/billing-and-payments/donation-payouts`}>
                    <Image src={back.src} style={{ cursor: 'pointer' }} />
                </Link>
                <p style={{ fontSize:"30px", fontWeight:"600", lineHeight:"37px", marginLeft: "15px" }} className='text-center text-md-start'>Payout Method</p>
            </div>
            <div className='mt-5 align-items-center d-flex'>
                
                <button type="submit" onClick={handleSubmit}  id="submit" className="payout-method-btn ml-2">
                    <span id="button-text">
                      {isLoading ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "Save"}
                    </span>
                  </button>
            </div>
        </div>
        <div className="row mr-12 pr-5">
            <div className="col-md-12 col-sm-6 pt-5">
                <div className="card mb-5 shadow mt-3 border-0">
                    <div className="mt-3 mb-5+-+ ml-7">
                        <div className="d-flex justify-content-end pr-7">
                            <div className="pt-3" style={{ color: '#0393fb'}}>
                                <Link href={`/organization/billing-and-payments/donation-payouts`}>View Donations</Link>
                            </div>
                        </div>
                        <div className="row pr-7">
                            <div className="col-md-12">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-1">
                                                <label className="form-label fw-bold">Email</label>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Email"
                                                />
                                            {formErrors['email'] && <p className="error-message">Email is required.</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">Address</label>
                                                <Input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    className="form-control"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Address"
                                                />
                                                {formErrors['address'] && <p className="error-message">Address is required.</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">Legal Business Name</label>
                                                <Input
                                                    type="text"
                                                    id="legal_business_name"
                                                    name="legal_business_name"
                                                    className="form-control"
                                                    value={formData.legal_business_name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Legal Business Name"
                                                />
                                                {formErrors['legal_business_name'] && <p className="error-message">Legal business name is required.</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">City</label>
                                                <Input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    className="form-control"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="City"
                                                />
                                                {formErrors['city'] && <p className="error-message">City is required.</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">Province</label>
                                                <Input
                                                    type="text"
                                                    id="province"
                                                    name="province"
                                                    className="form-control"
                                                    value={formData.province}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Province"
                                                />
                                                {formErrors['province'] && <p className="error-message">Province is required.</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">Country</label>
                                                <Input
                                                    type="text"
                                                    id="country"
                                                    name="country"
                                                    className="form-control"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Country"
                                                />
                                                {formErrors['country'] && <p className="error-message">Country is required.</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">Postal Code</label>
                                                <Input
                                                    type="text"
                                                    id="postal_code"
                                                    name="postal_code"
                                                    className="form-control"
                                                    value={formData.postal_code}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Postal Code"
                                                />
                                                {formErrors['postal_code'] && <p className="error-message">Postal code is required.</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">Bank Name</label>
                                                <Input
                                                    type="text"
                                                    id="bank_name"
                                                    name="bank_name"
                                                    className="form-control"
                                                    value={formData.bank_name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Bank Name"
                                                />
                                                {formErrors['bank_name'] && <p className="error-message">Bank name is required.</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">Transit Number</label>
                                                <Input
                                                    type="number"
                                                    id="transit_number"
                                                    name="transit_number"
                                                    className="form-control"
                                                    value={formData.transit_number}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Transit Number"
                                                />
                                                {formErrors['transit_number'] && <p className="error-message">Transit number is required.</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3 mt-3">
                                                <label className="form-label fw-bold">Account Number</label>
                                                <Input
                                                    type="number"
                                                    id="account_number"
                                                    name="account_number"
                                                    className="form-control"
                                                    value={formData.account_number}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Account Number"
                                                />
                                                {formErrors['account_number'] && <p className="error-message">Account number is required.</p>}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>  
    </>
  );
};

export default PayoutMethodForm;
