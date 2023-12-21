import '../styles/globals.css'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '../theme'
// import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import fav from "../assets/imgs/favicon.ico"
import { OrganizationProvider } from '../components/Helper/OrganizationProvider';

function MyApp ({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

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

export default MyApp