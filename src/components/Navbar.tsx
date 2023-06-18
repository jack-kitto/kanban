import Image from 'next/image'
import { ClerkProvider, useUser, SignIn, SignedOut, SignUp, SignOutButton, SignInButton, SignUpButton } from '@clerk/nextjs'
export const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!isLoaded) return null
  if (!user) return null
  console.log(user)
  return (
    // a div with a height of 97px and a width that fills the screen
    <div className="flex h-24 w-auto flex-row bg-white">
      <div className="flex items-center w-full ml-6 mr-6">
        {
          isSignedIn ?
            <div className='w-full flex justify-between items-center'>
              Hi {user.firstName} !
              <SignOutButton />
            </div>
            :
            <div>
              <SignInButton />
              <SignUpButton />
            </div>

        }
      </div>
    </div>
  );
}
