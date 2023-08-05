import { ClerkProvider, useUser, SignIn, SignedOut, SignUp, SignOutButton, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { observer } from 'mobx-react-lite'
import { useStores } from '~/models'
const NavbarComponent = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const { theme } = useStores()
  if (!isLoaded) return null
  if (!user) return null
  console.log(user)
  return (
    // a div with a height of 97px and a width that fills the screen
    <div className={`flex h-24 w-auto flex-row bg-${theme.darkMode ? "darkGrey" : "white"}`}>
      <div className="flex items-center w-full ml-6 mr-6">
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
    </div>
  );
}
export const Navbar = observer(NavbarComponent)
