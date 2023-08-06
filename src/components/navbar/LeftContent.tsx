import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { observer } from "mobx-react-lite";

export const LeftContent = observer(() => {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!user) return null
  if (!isLoaded) return null
  return (
    <div>
      {
        isSignedIn ?
          <div className='w-full flex justify-end items-center'>
            <UserButton />
          </div>
          :
          <div>
            <SignInButton />
            <SignUpButton />
          </div>
      }
    </div>
  )
});
