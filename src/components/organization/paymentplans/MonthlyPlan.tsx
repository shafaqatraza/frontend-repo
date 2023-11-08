import { Image, Link, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import good from "../../../assets/imgs/good.png";
import axios from 'axios';
import { accessToken, baseUrl, isLogin, currentOrganization } from "../../Helper/index";
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/toast'

const MonthlyPlan = () => {
  const [data, setData] = useState([]);
  const [dataone, setDataOne] = useState<{ id: number } | null>(null);
  const [dataonedesc, setDataOneDesc] = useState([]);
  const [datatwodesc, setDataTwoDesc] = useState([]);
  const [datadesc, setDataDesc] = useState([]);
  const [datatwo, setDataTwo] = useState([]);
  const [datathree, setDataThree] = useState([]);
  const [datathreedesc, setDataThreeDesc] = useState([]);
  const [orgData, setOrgData] = useState(null);
  const [id, setID] = useState([]);
  const router = useRouter()
  const toast = useToast()

  // console.log('orgData', orgData)

  useEffect(() => {

    if(isLogin() && !orgData){
      axios
        .get(`${baseUrl}/organizations`, {
          headers: {
            Authorization: "Bearer " + accessToken(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          setOrgData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
    axios
      .get(`${baseUrl}/public/organization/subscriptions/plans`)
      .then((res) => {
        
        setData(res.data.data[0]?.packages[0])
        setDataDesc(res.data.data[0]?.packages[0]?.description)
        setDataOne(res.data.data[0]?.packages[1])
        setDataOneDesc(res.data.data[0]?.packages[1]?.description)
        setDataTwo(res.data.data[0]?.packages[2])
        setDataTwoDesc(res.data.data[0]?.packages[2]?.description)
        setDataThree(res.data.data[0]?.packages[3])
        setDataThreeDesc(res.data.data[0]?.packages[3]?.description)

      })
      .catch((err) => {
      })

  }, [])

  const handlePlanButton = (plan_id: any) => {
    if (isLogin()) {
      if (currentOrganization || orgData) {
        router.push(`/organization/payment-plans/${plan_id}`)
      } else {
        toast({ position: "top", title: "Please create your organization first!", status: "error" })
      }
    } else {
      toast({ position: "top", title: "Please login to select plan!", status: "error" })
    }
  };


  return (
    <>
      <Container>
        <Row className='pt-md-5'>
          <Col md={12}>
            {
              Object.keys(data).length > 0 ? (<div className="d-flex justify-content-center mb-5 flex-wrap">
                <div>
                  <div
                    className="card border-0 px-3"
                    style={{
                      backgroundColor: "#f6d6c1",
                      width: "243px",
                      height: "599px",
                      marginTop: "2rem",
                      borderRadius:"0",
                      boxShadow:"0 4px 4px #00000040"
                      
                    }}
                  >
                    <div className="card-body ">
                      <p className="card-title mt-4 pt-2 free-txt text-center">

                        {// @ts-ignore: Unreachable code error
                          dataone?.name}
                      </p>
                      <p className=" mt-4 text-center free-txt2">
                        {dataonedesc}
                      </p>
                      <p
                        className="mt-1 text-center"
                        style={{
                          color: "#183553",
                          fontSize: "11px",
                          fontWeight: "700",
                          lineHeight: "12px",
                        }}
                      >

                        <span className="free-txt3">
                          {
                            // @ts-ignore: Unreachable code error
                            dataone?.currency_symbol}{parseInt(dataone?.amount)}</span>
                       <span className=''>/month, billed</span>
                      <span className='ms-5 ps-5'> monthly</span>
                      </p>
                      <hr className="mt-3" style={{opacity:"1"}}/>
                      <div className="mt-3">
                        <div className="d-flex mt-3">
                          <p className="ms-2 free-txt4">
                            {
                              // @ts-ignore: Unreachable code error
                              dataone?.features?.map((item, index) => (
                                <>
                                  {item && item[0] && (
                                    <div className="d-flex justify-content-start align-items-start mb-2" style={{ gap: '10px' }}>
                                      <Image src={good.src} alt={"Plan"} className='pt-1' width="12px" />
                                      <p className='m-0 free-txt4'>
                                        {item}
                                      </p>
                                    </div>
                                  )}
                                </>
                              ))
                            }

                          </p>
                        </div>

                      </div>
                    </div>
                    <div className="mt-3 ms-3">
                      <p className="free-txt5">
                        *Volunteer rewards based on 20 Deed Dollars per hour
                      </p>
                    </div>

                    <Button
                      variant={'solid'}
                      colorScheme={'orange'}
                      size={'md'}
                      fontSize="16px"
                      onClick={() => handlePlanButton(dataone?.id)}
                      w="150px"
                      className='my-4 mx-auto'
                    >
                      Select
                    </Button>
                  </div>
                </div>
                <div>
                  <div
                    className="card border-0 px-3"
                    style={{
                      backgroundColor: "#DEE3E6",
                      width: "243px",
                      height: "599px",
                      marginTop: "2rem",
                      borderRadius:"0",
                      boxShadow:"0 4px 4px #00000040"
                    }}
                  >
                    <div className="card-body ">
                      <p className="card-title mt-3 free-txt text-center">
                        {
                          // @ts-ignore: Unreachable code error
                          data?.name}
                      </p>
                      <p className=" mt-4  text-center free-txt2">
                        {datadesc}


                      </p>
                      <p
                        className="mt-1 text-center"
                        style={{
                          color: "#183553",
                          fontSize: "11px",
                          fontWeight: "700",
                          lineHeight: "12px",
                        }}
                      >
                        <span className="free-txt3">  {
                          // @ts-ignore: Unreachable code error
                          data?.currency_symbol}{parseInt(data?.amount)}</span>
                        <span className=''>/month,billed</span>
                        <div className='ms-4 ps-1'><span className="ms-5 ps-5">monthly</span></div>
                      </p>
                      <hr className="mt-3" style={{opacity:"1"}}/>
                      <div className="mt-3">
                        <div className="d-flex mt-3">

                          <p className="ms-2 free-txt4">

                            {
                              // @ts-ignore: Unreachable code error
                              data?.features?.map((item, index) => (
                                <>
                                  {item && item[0] && (
                                    <div className="d-flex justify-content-start align-items-start mb-2" style={{ gap: '10px' }}>
                                      <Image src={good.src} alt={"Plan"} className='pt-1' width="12px" />
                                      <p className='m-0 free-txt4'>
                                        {item}
                                      </p>
                                    </div>
                                  )}
                                </>
                              ))
                            }

                          </p>
                        </div>
                      </div>
                    </div>
                        {/* <div className="mt-3 ms-3">
                      <p className="free-txt5">
                        *Volunteer rewards based on 20 Deed Dollars per hour
                      </p>
                    </div> */}

                    <Button
                      variant={'solid'}
                      colorScheme={'orange'}
                      size={'md'}
                      fontSize="16px"
                      onClick={() => handlePlanButton( // @ts-ignore: Unreachable code error
                        data?.id)}
                      w="150px"
                      className='my-4 mx-auto'
                    >
                      Select
                    </Button>
                        {/* <div className="btns d-flex justify-content-center">
                      <button onClick={()=>console.log(data?.id, "data")} className="select-btn mt-4 mb-4">Select</button>
                    </div> */}
                  </div>
                </div>
                <div>
                  <div
                    className="card border-0 px-3"
                    style={{
                      backgroundColor: "#f9e4d6",
                      width: "243px",
                      height: "599px",
                      marginTop: "2rem",
                      borderRadius:"0",
                      boxShadow:"0 4px 4px #00000040"
                    }}
                  >
                    <div className="card-body ">
                      <p className="card-title mt-3 px-3 pre-txt text-center"style={{color:"#E27832"}}>
                        {
                          // @ts-ignore: Unreachable code error
                          datatwo?.name}
                      </p>
                      <p className=" mt-4 text-center free-txt2">
                        {datatwodesc}
                      </p>
                      <p
                        className="mt-1 text-center"
                        style={{
                          color: "#183553",
                          fontSize: "11px",
                          fontWeight: "700",
                          lineHeight: "12px",
                        }}
                      >
                        <span className="free-txt3" style={{color:"#E27832"}}>    {
                          // @ts-ignore: Unreachable code error
                          datatwo?.currency_symbol}{parseInt(datatwo?.amount)}</span><span>/month,billed</span>
                        <div className='ms-4 ps-1'><span className="ms-5 ps-5">monthly</span></div>
                      </p>
                      <hr className="mt-3" style={{opacity:"1"}}/>
                      <div className="mt-3">
                        <div className="d-flex mt-3">
                          <p className="free-txt4">
                            {
                              // @ts-ignore: Unreachable code error
                              datatwo?.features?.map((item, index) => (
                                <>
                                  {item && item[0] && (
                                    <div className="d-flex justify-content-start align-items-start mb-2" style={{ gap: '10px' }}>
                                      <Image src={good.src} alt={"Plan"} className='pt-1' width="12px" />
                                      <p className='m-0 free-txt4'>
                                        {item}
                                      </p>
                                    </div>
                                  )}
                                </>
                              ))
                            }
                          </p>
                        </div>

                      </div>
                    </div>
                    <Button
                      variant={'solid'}
                      colorScheme={'orange'}
                      size={'md'}
                      fontSize="16px"
                      onClick={() => handlePlanButton( // @ts-ignore: Unreachable code error
                        datatwo?.id)}
                      w="150px"
                      className='my-4 mx-auto'
                    >
                      Select
                    </Button>
                  </div>
                </div>
                <div>
                  <div
                    className="card border-0"
                    style={{
                      backgroundColor: "rgb(209 215 221)",
                      width: "243px",
                      height: "599px",
                      marginTop: "2rem",
                      borderRadius:"0",
                      boxShadow:"0 4px 4px #00000040"
                    }}
                  >
                    <div className="card-body ">
                      <p className="card-title mt-3 free-txt text-center">
                        {
                          // @ts-ignore: Unreachable code error
                          datathree?.name}
                      </p>
                      <p className=" mt-4 text-center free-txt2">
                        {datathreedesc}
                      </p>
                      <p
                        className="mt-1 text-center"
                        style={{
                          color: "#183553",
                          fontSize: "11px",
                          fontWeight: "700",
                          lineHeight: "12px",
                        }}
                      >
                        <span className="free-txt3">    {
                          // @ts-ignore: Unreachable code error
                          datathree?.currency_symbol}{parseInt(datathree?.amount)}</span>
                          <span>/month,billed</span>
                        <div className='ms-5 ps-3'><span className="ms-5 ps-5">monthly</span></div>
                      </p>
                      <hr className="mt-3 px-2" style={{opacity:"1"}}/>
                      <div className="mt-3 px-2">
                        {
                          // @ts-ignore: Unreachable code error
                          datathree?.features?.map((item, index) => (
                            <>
                              {item && item[0] && (
                                <div className="d-flex justify-content-start align-items-start mb-2" style={{ gap: '10px' }}>
                                  <Image src={good.src} alt={"Plan"} className='pt-1' width="12px" />
                                  <p className='m-0 free-txt4'>
                                    {item}
                                  </p>
                                </div>
                              )}
                            </>
                          ))
                        }


                      </div>
                    </div>
                    <Button
                      variant={'solid'}
                      colorScheme={'orange'}
                      size={'md'}
                      fontSize="16px"
                      onClick={()=> handlePlanButton( // @ts-ignore: Unreachable code error
                        datathree?.id) }
                      w="150px"
                      className='my-4 mx-auto'
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </div>) : (<>
                <div className='d-flex justify-content-center mt-5'>
                  <div
                    style={{ color: "#E27832" }}
                    className="spinner-border"
                  ></div>
                </div>
              </>)
            }
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default MonthlyPlan
