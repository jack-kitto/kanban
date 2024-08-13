'use client'
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react"
import { useMemo, useState } from "react";
import { z } from "zod";
import { Button, TextField } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("")
  const [view, setView] = useState<'landing' | 'email sent'>('landing')
  const signInMutation = useMutation({
    mutationFn: async (email: string) => {
      signIn("email", { email: z.string().email().parse(email), redirect: false })
    },
    onSuccess: () => {
      setView('email sent')
    },
  })

  const buttonText = useMemo(() => view === 'landing' ? "Let's go!" : 'Try again', [view])
  const titleText = useMemo(() => view === 'landing' ? "enter your email to get started." : 'check your email.', [view])

  function onPress() {
    if (view === 'landing') {
      signInMutation.mutate(email)
    } else {
      setView('landing')
    }
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="max-sm:px-4 h-1/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="w-full flex flex-col justify-between items-center h-full">
          <div className="flex">
            <div className="pr-4">
              <Icon icon="Logo" size="medium" />
            </div>
            <h1 className="prose-hxl dark:text-white">{'Kanban'}</h1>
          </div>
          <h1 className="prose-hxl dark:text-white">{titleText}</h1>
          <div className="w-2/3">
            {
              view === 'landing'
                ?
                <TextField
                  type="email"
                  text={email}
                  placeholder="anakin.skywalker@gmail.com"
                  setText={setEmail}
                  validationErrors={[
                  ]}
                />
                :
                <div className="w-full flex flex-col items-center justify-center">
                  <p className="prose-bm dark:text-white">we’ve sent a temporary login link to your email.</p>
                  <div className="flex gap-2">
                    <p className="prose-bm text-black">please check your inbox at</p>
                    <p className="prose-bm font-bold text-mainPurple">{email}</p>
                  </div>
                </div>
            }
          </div>
          <div className="py-3 w-full flex items-center justify-center">
            <div className="w-1/2 flex items-center justify-center">
              <Button
                disabled={!email || !z.string().email().safeParse(email).success}
                btn={{ onMouseDown: onPress }}
                type="login"
                loading={signInMutation.isPending}
                text={buttonText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
