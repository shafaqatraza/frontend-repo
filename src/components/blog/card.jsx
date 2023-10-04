import {
  Container,
  SimpleGrid,
  Spacer,
  Center,
  Spinner,
  Stack,
  Text,
  Image
} from '@chakra-ui/react'
import Link from 'next/link';
import NoImage from '../../assets/imgs/no-image.png'
import React, { useEffect, useCallback, useState } from 'react'
import axios from 'axios'
import { baseUrl, baseImgUrl } from '../../components/Helper/index'
import { SingleBlogCard } from './SingleBlogCard'
import { Card, Col, Row } from "react-bootstrap";
import imagevolun from "../../assets/imgs/imagevolun.png";

export const BlogCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalBlogs, settotalBlogs] = useState(0);
  

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  useEffect(() => {
    setLoading(true);
    setBlogs([])
    fetchBlogs(currentPage);
  }, []);

  const fetchBlogs = async (page) => {
    try {
      const response = await fetch(`${baseUrl}/blogs?page=${page}`);
      if (response.ok) {
        const data = await response.json(); 
        setBlogs((prevBlogs) => [...prevBlogs, ...data.data]);
        settotalBlogs(data.meta.total)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleViewMore = () => {
    if(blogs.length < totalBlogs){
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
      fetchBlogs(currentPage + 1);
    }
  };
  
  return (
    <>
      {loading && (
        <Center h={'300px'}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="orange.200"
            color="orange.500"
            size="xl"
          />
        </Center>
      )}
      <div className="d-flex justify-content-center flex-wrap mt-5 container">
        {!loading && (
          blogs.map((blog) => (
            <div className="col-xl-4 col-md-6 mt-3 mb-5 pb-xxl-5 part-card" key={blog.id}>
              <a href={`/blogs/${blog.slug}`}>
                <div className="d-flex justify-content-center">
                  <div
                    className="card blog-card-shadow blog-cards border-0"
                    style={{ height: "525px", width: "326px", borderRadius: "10px" }}
                  >
                    <div className="d-flex justify-content-center mb-3s">
                      <Image
                        style={{ borderRadius: '10px' }}
                        src={
                          blog.image !== null
                            ? `${baseImgUrl}/${blog.image}`
                            : NoImage.src
                        }
                        alt={"Image"}
                      />
                    </div>
                    <div className="card-body">
                      <p
                        style={{
                          fontSize: "clamp(20px, 4vw, 24px)",
                          lineHeight: "1.3",
                          color: "#E27832",
                          fontWeight: "500"
                        }}
                      >
                        {blog?.title}
                      </p>
                      <div className='d-flex justify-content-between mt-3'>
                        <p style={{ color: "#979797" }}>Posted By {blog?.posted_by?.full_name}</p>
                        <p style={{ color: "#979797" }}>{blog?.created_at_human_diff}</p>
                      </div>
                      <p style={{ color: "#000000" }} className="mt-3 mb-3">
                        {truncateText(blog?.description, 143)}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))
        )}
        
      </div>
      <div className='d-flex justify-content-center flex-wrap mt-5'>
        <div className='mt-md-5'>
          <button type="submit" onClick={handleViewMore} disabled={loadingMore || blogs.length == totalBlogs} id="submit" className="view-blog-btn mb-md-5 mt-md-5">
            <span id="button-text">
              {loadingMore ? <div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden">Loading...</span></div> : "View More"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
  
}
