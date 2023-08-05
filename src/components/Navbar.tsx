import { ClerkProvider, useUser, SignIn, SignedOut, SignUp, SignOutButton, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { observer } from 'mobx-react-lite'
import { useStores } from '~/models'
import { Icon } from './icon'
const NavbarComponent = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const { theme } = useStores()
  if (!isLoaded) return null
  if (!user) return null
  console.log(user)
  return (
    // a div with a height of 97px and a width that fills the screen
    <div className={`flex h-24 w-auto flex-row bg-${theme.darkMode ? "darkGrey" : "white"} border-b-2 border-${theme.darkMode ? "linesDark" : "linesLight"}`}>
      <div className="flex items-center w-full ml-6 mr-6">
        {
          isSignedIn ?
            <div className='w-full flex justify-end items-center'>
              <UserButton />
              <div className='m-4 hover:opacity-50 cursor-pointer'>
                <Icon icon="options" size='xxxs' />
              </div>
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
