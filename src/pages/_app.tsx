import '../styles/globals.css'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '../theme'
import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import fav from "../assets/imgs/favicon.ico"
import { OrganizationProvider } from '../components/Helper/OrganizationProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import withMobileRedirect from '../utils/withMobileRedirect';

function MyApp ({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  // useEffect(() => {
  //   const shouldRedirect = isMobile && router.asPath.includes('/organization');
  
  //   if (shouldRedirect) {
  //     router.push('/donor-management-portal');
  //   }
  // }, [router.asPath]);
  

  return (
    <>
    <head >
    <link rel="icon" href={fav.src}/>
    </head>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <OrganizationProvider>
        <Component {...pageProps} />
        </OrganizationProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
    </>

  )
}

export default withMobileRedirect(MyApp);