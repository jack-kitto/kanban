import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { ClerkProvider, useUser, SignIn, SignedOut, SignUp } from '@clerk/nextjs'
import { PageLayout } from "~/components/layout";

export default function Home() {

  const { isLoaded, isSignedIn, user } = useUser()

  return (
    <>
      <PageLayout>
        <div> hello </div>
      </PageLayout>
    </>
  );
}
