import React from 'react'
import { Switch } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
const ToggleComponent = ({ size, isDisabled, isChecked, toggle }:
  {
    size: 'sm' | 'md' | 'lg',
    isDisabled?: boolean,
    isChecked?: boolean
    toggle: () => void
  }) => {
  return (
    <div>
      <Switch isChecked={isChecked} onChange={() => toggle()} size={size} isDisabled={isDisabled} />
    </div>
  )
}
export const Toggle = observer(ToggleComponent)
