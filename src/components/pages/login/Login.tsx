'use client'
import { signIn } from "next-auth/react"
import { useState } from "react";
import { z } from "zod";
import { Button, TextField } from "~/components/atoms";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("")
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="max-sm:px-4 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="py-3">
          <h2 className="prose-hl text-mediumGray">Welcome! 👋</h2>
          <h1 className="prose-hxl dark:text-white">Login to you account</h1>
        </div>
        <TextField
          text={email}
          setText={setEmail}
          label="Email"
          validationErrors={[
            {
              schema: z.string().email(),
              message: "Invalid email",
              active: false,
            },
          ]}
        />
        <div className="py-3">
          <Button
            disabled={!email || !z.string().email().safeParse(email).success}
            btn={{
              onClick: () => {
                signIn("email", { email }).catch(() => { console.log("Error") })
              }
            }}
            type="login"
            text="Send Login Email"
          />
          <div className="w-full flex justify-center items-center">
            <p className="prose-bl">Make sure to check you spam folder 😭</p>
          </div>
        </div>
      </div>
    </div>
  )
}
