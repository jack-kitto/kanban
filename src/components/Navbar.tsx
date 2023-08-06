import { useUser, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { observer } from 'mobx-react-lite'
import { useStores } from '~/models'
import { Icon } from './icon'
import { Button } from './button'
import { toast } from 'react-hot-toast'
import { MainModal } from './mainModal'
import { typography } from '~/styles/typography'
import { useState } from 'react'
import { api } from '~/utils/api'
const NavbarComponent = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const { theme, projects } = useStores()
  const [open, setOpen] = useState(false)
  const { mutate } = api.projects.deleteProjectById.useMutation({
    onError: (e) => {
      if (!e.data?.zodError?.fieldErrors?.content) return toast('Something went wrong')
      const errorMessage: string[] = e.data?.zodError?.fieldErrors.content;
      errorMessage.forEach((error) => {
        toast(error)
      })
    },
  });

  if (!isLoaded) return null
  if (!user) return null
  return (
    <div className={`flex h-24 w-auto flex-row bg-${theme.darkMode ? "darkGrey" : "white"} border-b-2 border-${theme.darkMode ? "linesDark" : "linesLight"}`}>
      <div className="flex justify-between items-center w-full ml-6 mr-6">
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
        <div className='flex flex-row'>
          {projects.currentProject != null && (
            <>
              <div>
                <Button fitText type='primary' size='lg' text='+ Add New Task' onPress={() => toast("Adding new task")} />
              </div>
              <div className='m-4 hover:opacity-50 cursor-pointer'>
                <button onClick={() => setOpen(true)} className='cursor-pointer'>
                  <Icon icon="options" size='xxxs' />
                </button>
                <MainModal size='2xl' open={open} setOpen={setOpen} onClose={() => setOpen(false)}
                  header={
                    <div className='mt-6'>
                      <p style={typography.heading.L} className='text-red'>Delete this board?</p>
                    </div>
                  }
                  body={
                    <div>
                      <p>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                      <div className='flex flex-row flex-1 mt-8 mb-12'>
                        <div className='flex flex-col flex-1'>
                          <Button type='destructive' size='lg' text='Delete Board' onPress={() => mutate({ id: "as" })} />
                        </div>
                        <div className='flex flex-col flex-1'>
                          <Button type='secondary' size='lg' text='Cancel' onPress={() => setOpen(false)} />
                        </div>
                      </div>
                    </div>
                  } />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export const Navbar = observer(NavbarComponent)
