import { observer } from 'mobx-react-lite'
import { useStores } from '~/models'
import { LeftContent } from './LeftContent'
import { RightContent } from './RightContent'
export const Navbar = observer(() => {
  const { theme } = useStores()

  if (theme.darkMode) {
    return (
      <div className='flex h-24 w-auto flex-row bg-darkGrey border-b-2 border-linesDark'>
        <div className="flex justify-between items-center w-full ml-6 mr-6 h-full">
          <LeftContent />
          <RightContent />
        </div>
      </div>
    )
  }
  return (
    <div className='flex h-24 w-auto flex-row bg-white border-b-2 border-linesLight'>
      <div className="flex justify-between items-center w-full ml-6 mr-6 h-full">
        <LeftContent />
        <RightContent />
      </div>
    </div>
  )
})
