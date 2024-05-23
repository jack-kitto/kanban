import { redirect } from "next/navigation";
import React from "react";
import { Login } from "~/components/pages";
import { getServerAuthSession } from "~/server/auth";
export default async function Page() {
  const session = await getServerAuthSession()
  if (session) {
    redirect('/')
  }

  return (
    <Login />
  );
}

