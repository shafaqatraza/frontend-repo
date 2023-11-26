import React from 'react'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import back from "../../src/assets/imgs/back.png"
import imagevolun from "../../src/assets/imgs/imagevolun2.png"
import { Image } from '@chakra-ui/react'

const IndividualBlog = () => {
  return (
    <>
    <Navbar/>
    <div className='container mt-5'>
      <Image src={back.src}/>
    </div>
   <div className="container">
   <div className="ms-5 mt-5 col-md-10">
      <p className='good-deed-blo'>10 Good Deeds to do in your community this month</p>
      <p className='mt-2' style={{fontSize: "clamp(16px, 2vw, 20px)", lineHeight: "clamp(1.5, 3vw, 28px)", fontWeight:"600"}}>Good Deeds is a 100% free platform.  In exchange for donating things <span className='d-block'>that you no longer need or.</span></p>
    </div>
    <div className='ms-5 d-flex justify-content-between mt-3 col-md-4'>
                <p style={{color:"#979797"}}>Posted By Amber</p>
                <p style={{color:"#979797"}}>1 week ago</p>
              </div>
   </div>
   <div className='container d-flex'>
   <div className="ms-5 mt-2 col-md-8">
    <Image style={{width:"100%", borderRadius:"10px"}} src={imagevolun.src}/>
    <p style={{fontSize:"14px", fontWeight:"500", lineHeight:"20px"}} className='mt-4'>Good deeds are acts of kindness that have a positive impact on others and the world around us. They can be small or large gestures, but all contribute to making the world a better place. Engaging in good deeds brings joy and fulfillment, not only to those who receive the kindness but also to the ones who perform them. From volunteering at local organizations to helping a neighbor in need, good deeds promote compassion, empathy, and a sense of community.Whether it's donating to a charitable cause, offering support to someone in need, or spreading love and positivity.</p>
    <p style={{fontSize:"14px", fontWeight:"500", lineHeight:"20px"}} className='mt-4'>They remind us of our shared humanity and the power we have to create positive change through simple acts of kindness. By practicing good deeds, we inspire others to do the same, creating a ripple effect of goodness and positivity.Whether it's donating to a charitable cause, offering support to someone in need, or spreading love and positivity.</p>
    <p style={{fontSize:"14px", fontWeight:"500", lineHeight:"20px"}} className='mt-4 mb-5'>Good deeds are like rays of sunshine that brighten the lives of those we encounter. They can be as simple as a smile, a kind word, or a helping hand. Acts of kindness have the power to uplift spirits, heal wounds, and restore faith in humanity.Whether it's donating to a charitable cause, offering support to someone in need, or spreading love and positivity.</p>
   </div>
   <div className="ms-5 mt-2 col-md-4 d-none d-md-block">
    <div style={{width:"337px"}} className="card shadow">
      <p className='mt-2 text-center'>Other Posts</p>
      <div className='d-flex justify-content-between align-items-center p-3'>
        <Image style={{width:"118px", height:"94px", borderRadius:"5px"}} src={imagevolun.src}/>
        <p className='ms-2'>Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or</p>
      </div>
      <div className='d-flex justify-content-between align-items-center p-3'>
        <Image style={{width:"118px", height:"94px", borderRadius:"5px"}} src={imagevolun.src}/>
        <p className='ms-2'>Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or</p>
      </div>
      <div className='d-flex justify-content-between align-items-center p-3'>
        <Image style={{width:"118px", height:"94px", borderRadius:"5px"}} src={imagevolun.src}/>
        <p className='ms-2'>Good Deeds is a 100% free platform.  In exchange for donating things that you no longer need or</p>
      </div>
    </div>
   </div>
   </div>

    <Footer/>
    </>
  )
}

export default IndividualBlog
