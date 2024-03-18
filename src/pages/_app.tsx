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
import { OrganizationFormProvider } from '../components/organizationForm/organizationFormContext';
import OrganizationFormModal from '../components/organizationForm/OrganizationFormModal';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import withMobileRedirect from '../utils/withMobileRedirect';
import Navbar from '../components/Navbar'; // Import your Navbar component
import { isLogin, accessToken, baseUrl} from '../components/Helper/index'
import axios from 'axios'

function MyApp ({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  useEffect(() => {
    const handleSetOrganization = () => { 
        if (isLogin()) { 
            // Check if organization info is already in local storage
            const organizationInfo = localStorage.getItem('currentOrganization');
            if (!organizationInfo) { 
                axios.get(`${baseUrl}/organizations`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken(),
                    }
                }).then((res: any) => {
                    // Set organization info in local storage
                    localStorage.setItem('currentOrganization', JSON.stringify(res.data[0]));
                }).catch((err) => {})
            }
        }
    };

    handleSetOrganization()
  }, [router]);


  return (
    <>
    <head >
    <link rel="icon" href={fav.src}/>
    </head>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        {/* <OrganizationProvider> */}
          <OrganizationFormProvider>
            {/* <Navbar /> */}
            <OrganizationFormModal />
            <Component {...pageProps} />
          </OrganizationFormProvider>
        {/* </OrganizationProvider> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
    </>

  )
}

export default withMobileRedirect(MyApp);