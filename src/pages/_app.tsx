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
import { isLogin, accessToken, baseUrl, ORGANIZATION_SECRET_KEY} from '../components/Helper/index'
import axios from 'axios'
import CryptoJS from 'crypto-js';

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

    // Function to decrypt organization data
    const decryptOrganizationData = (encryptedData: any) => {
      try {
          // Decrypt the encrypted data and parse it as JSON
          const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, ORGANIZATION_SECRET_KEY);
          const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
          return decryptedData;
      } catch (error) {
          console.error('Error decrypting organization data:', error);
          // Return null or an empty object in case of decryption error
          return null;
      }
    };
    // Function to encrypt organization data
    const encryptOrganizationData = (data: any) => {
        // Convert data to a string and encrypt it
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), ORGANIZATION_SECRET_KEY).toString();
        return encryptedData;
    };

    const handleSetOrganization = () => { 
        if (isLogin()) { 

            const encryptedData = localStorage.getItem('currentOrganization');
          
            // Check if organization info is already in local storage
            const organizationInfo = decryptOrganizationData(encryptedData);
            if (!organizationInfo) { 
                axios.get(`${baseUrl}/organizations`, {
                    headers: {
                        Authorization: 'Bearer ' + accessToken(),
                    }
                }).then((res: any) => {

                  // Encrypt organization data before storing it in local storage
                  const encryptedOrganizationData = encryptOrganizationData(res.data[0]);
                  // Set organization info in local storage
                  localStorage.setItem('currentOrganization', encryptedOrganizationData);
                }).catch((err) => {})
            }
        }
    };

    handleSetOrganization()
  }, []);


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