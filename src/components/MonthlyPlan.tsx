import { Image, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import good from "../assets/imgs/good.png";
import axios from 'axios';
import { accessToken, baseUrl } from "../components/Helper/index";

const MonthlyPlan = () => {
  const [data, setData] = useState([]);
  const [dataone, setDataOne] = useState([]);
  const [dataonedesc, setDataOneDesc] = useState([]);
  const [datatwodesc, setDataTwoDesc] = useState([]);
  const [datadesc, setDataDesc] = useState([]);
  const [datatwo, setDataTwo] = useState([]);
  const [datathree, setDataThree] = useState([]);
  const [datathreedesc, setDataThreeDesc] = useState([]);
  const [id, setID] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/organization/subscriptions/plans`, {
        headers: {
          Authorization: "Bearer " + accessToken(),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data.data[0]?.packages[0]);

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
      });
  }, [])
  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            {
              Object.keys(data).length > 0 ? (<div className="d-flex justify-content-center mb-5 flex-wrap">
                <div>
                  <div
                    className="card border-0"
                    style={{
                      backgroundColor: "#f6d6c1",
                      width: "243px",
                      height: "599px",
                      marginTop: "2rem",
                    }}
                  >
                    <div className="card-body ">
                      <p className="card-title mt-3 free-txt text-center">

                        {// @ts-ignore: Unreachable code error
                          dataone.name}
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
                        {/* /month, billed{" "}
                    <span className="ms-5">monthly</span> */}
                      </p>
                      <hr className="mt-3" />
                      <div className="mt-3">
                        <div className="d-flex mt-3">
                          <p className="ms-2 free-txt4">
                            {
                              // @ts-ignore: Unreachable code error
                              dataone?.features?.map((item, index) => (
                                <>
                                  <div className="d-flex">
                                    <span className="ms-2 pt-2">
                                      <Image src={good.src} alt={"Plan"} />
                                    </span>
                                    <div className='pt-2 ms-2'>
                                      {item}
                                    </div>
                                  </div>
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
                    <Link className="btns d-flex justify-content-center" href={`/payment/${
                      // @ts-ignore: Unreachable code error
                      dataone?.id}`}>
                      <button className="select-btn mt-4 mb-4">Select</button>
                    </Link>
                  </div>
                </div>
                <div>
                  <div
                    className="card border-0"
                    style={{
                      backgroundColor: "#DEE3E6",
                      width: "243px",
                      height: "599px",
                      marginTop: "2rem",
                    }}
                  >
                    <div className="card-body ">
                      <p className="card-title mt-2 free-txt text-center">
                        {
                          // @ts-ignore: Unreachable code error
                          data?.name}
                      </p>
                      <p className=" mt-4 text-center free-txt2">
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
                          data?.currency_symbol}{parseInt(data?.amount)}</span>/month,billed
                        <span className="ms-5">monthly</span>
                      </p>
                      <hr className="mt-3" />
                      <div className="mt-3">
                        <div className="d-flex mt-3">

                          <p className="ms-2 free-txt4">

                            {
                              // @ts-ignore: Unreachable code error
                              data?.features?.map((item, index) => (
                                <>
                                  <div className="d-flex">
                                    <span className="ms-2 pt-2">
                                      <Image src={good.src} alt={"Plan"} />
                                    </span>
                                    <div className='pt-2 ms-2'>
                                      {item}

                                    </div>
                                  </div>
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

                    <Link className="btns d-flex justify-content-center" href={`/payment/${
                      // @ts-ignore: Unreachable code error
                      data?.id}`}>
                      <button className="select-btn mt-4 mb-4">Select</button>
                    </Link>
                    {/* <div className="btns d-flex justify-content-center">
                  <button onClick={()=>console.log(data?.id, "data")} className="select-btn mt-4 mb-4">Select</button>
                </div> */}
                  </div>
                </div>
                <div>
                  <div
                    className="card border-0"
                    style={{
                      backgroundColor: "#f9e4d6",
                      width: "243px",
                      height: "599px",
                      marginTop: "2rem",
                    }}
                  >
                    <div className="card-body ">
                      <p className="card-title mt-3 pre-txt text-center">
                        {
                          // @ts-ignore: Unreachable code error
                          datatwo?.name}
                      </p>
                      <p className=" mt-4 text-center free-txt2">
                        {datatwodesc}
                      </p>
                      <p
                        className="mt-4 text-center"
                        style={{
                          color: "#183553",
                          fontSize: "11px",
                          fontWeight: "700",
                          lineHeight: "12px",
                        }}
                      >
                        <span className="free-txt3">    {
                          // @ts-ignore: Unreachable code error
                          datatwo?.currency_symbol}{parseInt(datatwo?.amount)}</span>/month,billed
                        <span className="ms-5">monthly</span>
                      </p>
                      <hr className="mt-3" />
                      <div className="mt-3">
                        <div className="d-flex mt-3">
                          <p className="free-txt4">
                            {
                              // @ts-ignore: Unreachable code error
                              datatwo?.features?.map((item, index) => (
                                <>
                                  <div className="d-flex">
                                    <span className="ms-2 pt-2">
                                      <Image src={good.src} alt={"Plan"} />
                                    </span>
                                    <div className='pt-2 ms-2'>
                                      {item}
                                    </div>
                                  </div>
                                </>
                              ))
                            }
                          </p>
                        </div>

                      </div>
                    </div>
                    <Link className="btns d-flex justify-content-center" href={`/payment/${
                      // @ts-ignore: Unreachable code error
                      datatwo?.id}`}>
                      <button className="select-btn mt-4 mb-4">Select</button>
                    </Link>
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
                          datathree?.currency_symbol}{parseInt(datathree?.amount)}</span>/month,billed{" "}
                        <span className="ms-5">monthly</span>
                      </p>
                      <hr className="mt-3" />
                      <div className="mt-3">
                        {
                          // @ts-ignore: Unreachable code error
                          datathree?.features?.map((item, index) => (
                            <>
                              <div className="d-flex">
                                <span className="ms-2 pt-2">
                                  <Image src={good.src} alt={"Plan"} />
                                </span>
                                <div className='free-txt4 pt-2 ms-2'>
                                  {item}
                                </div>
                              </div>
                            </>
                          ))
                        }


                      </div>
                    </div>

                    <Link className="btns d-flex justify-content-center" href={`/payment/${
                      // @ts-ignore: Unreachable code error
                      datathree?.id}`}>
                      <button className="select-btn mt-4 mb-4">Select</button>
                    </Link>
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
