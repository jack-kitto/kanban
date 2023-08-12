import './ReactotronConfig'
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div id="root">
      <ChakraProvider>
        <ClerkProvider>
          <Component {...pageProps} />
          <Toaster />
        </ClerkProvider>
      </ChakraProvider>
    </div>
  )
};

export default api.withTRPC(MyApp);
