import '../styles/globals.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '../theme'
import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { accessToken, baseUrl, currentOrganization } from "../components/Helper/index";
import axios from "axios";

function MyApp ({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      // Check if the current route is not an organization-related route
      if (!router.asPath.startsWith('/organization')) {
        // Remove the `currentOrganization` local storage variable
        // @ts-ignore: Unreachable code error
        localStorage.setItem('currentOrganization', null);
      }
    };
    handleRouteChange();

  }, [router, currentOrganization]);

  return (
    <>
    <head >
    <link rel="icon" href="/favicon.ico" />
    </head>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
    </>

  )
}

export default MyApp
