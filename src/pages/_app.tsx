import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast';
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return null

  return (
    <ChakraProvider>
      <ClerkProvider>
        <Component {...pageProps} />
        <Toaster />
      </ClerkProvider>
    </ChakraProvider>
  )
};

export default api.withTRPC(MyApp);
