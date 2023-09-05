import { Box } from "@chakra-ui/react";
import { Spacer, Divider , Container} from '@chakra-ui/react'
import Head from "next/head";
import React from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Section1 } from "../components/howToUse/section1";
import { BlogCard } from "../components/blog/card";
import fav from "../assets/imgs/favicon.ico"
const Blog = () => {
    return (
        <Box>
            <Head>
                {/* <title>Good Deeds | Community Updates Good Deeds</title> */}
                <title>Good Deeds | An Online Marketplace of Opportunities</title>
                <link rel="icon" href={fav.src} />
                <meta name="title" content="A marketplace of opportunity" />
                <meta name="description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
                <meta name="keywords" content="Marketplace, Goodddeds, Canada, Toronto, Ontario, Community" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="1 days" />

                <meta property="og:title" content="A marketplace of opportunity" />
                <meta property="og:description" content="A marketplace of opportunity. An online community of do-gooders; paying it forward, and getting rewarded." />
                <meta property="og:image" content="/gd-favicon.ico" />
                {/* <meta property="og:url" content="" /> */}
                <meta property="og:site_name" content="Good Deeds" />

                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=UA-230154537-1`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-230154537-1', {
                        page_path: window.location.pathname,
                        });
                    `,
                    }}
                />
            </Head>
            <Navbar />
            {/* <Section1 title="Good Deeds Community Updates" /> */}

              <p className="good-deeds-blog container text-center pt-md-5">Good Deeds <span style={{color:"#E27832"}}>Blog</span> </p>
              <p className="good-deeds-bl mt-3 mt-md-5 mb-md-4">Discover How You Can Make A Difference</p>
            <div className="mb-5 pb-5 pt-md-2">
                <BlogCard />
            </div>
            <Footer />
        </Box>
    );
}

export default Blog;
