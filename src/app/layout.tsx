import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/react"

import { GeistSans } from "geist/font/sans";
import { Plus_Jakarta_Sans } from 'next/font/google'
import { TRPCReactProvider } from "~/trpc/react";
import dynamic from 'next/dynamic'
import { PHProvider } from "./providers";
import { Provider } from "~/hooks/use-provider";

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

export const metadata = {
  title: "Kanban",
  description: "Solution for the Kanban challenge from Frontend Mentor",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
    { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
    { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    { rel: 'favicon-16x16', url: '/favicon-16x16.png' },
    { rel: 'favicon-32x32', url: '/favicon-32x32.png' },
  ],
};

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${plusJakartaSans.variable}`}
    >
      <PHProvider>
        <Provider>
          <body>
            <PostHogPageView />
            <TRPCReactProvider>
              {children}
            </TRPCReactProvider>
            <Analytics />
          </body>
        </Provider>
      </PHProvider>
    </html>
  );
}


// test commit
