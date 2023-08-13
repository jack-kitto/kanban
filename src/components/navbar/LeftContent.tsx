import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { observer } from "mobx-react-lite";
import { useRouter } from 'next/router';

export const LeftContent = observer(() => {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const { projectName } = router.query
  if (!user) return null
  if (!isLoaded) return null
  return (
    <div className='flex flex-row h-full justify-start items-center w-full'>
      {
        isSignedIn ?
          <div className='flex justify-end items-center'>
            <UserButton />
          </div>
          :
          <div>
            <SignInButton />
            <SignUpButton />
          </div>
      }
      {<p className='text-3xl font-bold ml-8'>{projectName}</p>}
    </div>
  )
});
