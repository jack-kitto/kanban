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
      await signIn("email", { email: z.string().email().parse(email), redirect: false })
    },
    onSuccess: () => {
      setView('email sent')
    },
  })

  const buttonText = useMemo(() => view === 'landing' ? "Let's go!" : 'Try again', [view])
  const titleText = useMemo(() => view === 'landing' ? "Enter your email to get started." : 'Check your email.', [view])

  function onPress() {
    if (view === 'landing') {
      signInMutation.mutate(email)
    } else {
      setView('landing')
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center px-4">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <div className="pr-4">
            <Icon icon="Logo" size="medium" />
          </div>
          <h1 className="text-2xl font-bold dark:text-white">{'Kanban'}</h1>
        </div>
        <div className="mb-4">
          {view === 'landing' ? (
            <>
              <h2 className="prose-xl font-semibold dark:text-white mb-4">{titleText}</h2>
              <TextField
                type="email"
                text={email}
                placeholder="anakin.skywalker@gmail.com"
                setText={setEmail}
                validationErrors={[]}
              />
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <h2 className="prose-xl font-semibold dark:text-white mb-4">{titleText}</h2>
                <p className="prose-bm dark:text-white mb-2">We’ve sent a temporary login link to your email.</p>
                <div className="flex flex-col items-center gap-2">
                  <p className="prose-bm text-black">Please check your inbox at</p>
                  <button onClick={() => window.open('mailto:', '_blank')} className="text-lg font-bold text-mainPurple">{email}</button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-center">
          {view === 'landing' ? (
            <Button
              disabled={!email || !z.string().email().safeParse(email).success}
              btn={{ onMouseDown: onPress }}
              type="login"
              loading={signInMutation.isPending}
              text={buttonText}
            />
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <p className="prose-bm text-black">Didn't receive an email?</p>
              <button onClick={onPress} className="prose-bl font-bold text-mainPurple">Try again.</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
