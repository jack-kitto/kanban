import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { observer } from "mobx-react-lite";
import { useRouter } from 'next/router';
import { useStores } from '~/models';

export const LeftContent = observer(() => {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const { projectName } = router.query
  const { theme } = useStores()
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
      {!theme.darkMode && <p className='text-3xl font-bold ml-8 text-black'>{projectName}</p>}
      {theme.darkMode && <p className='text-3xl font-bold ml-8 text-white'>{projectName}</p>}
    </div>
  )
});
