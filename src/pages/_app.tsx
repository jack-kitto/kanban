import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div id="root">
      <ClerkProvider>
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  )
};

export default api.withTRPC(MyApp);
