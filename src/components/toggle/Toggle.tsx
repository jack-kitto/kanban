import React from 'react'
import { Switch } from '@chakra-ui/react'
export const Toggle = ({ size, isDisabled, isChecked, toggle }:
  {
    size: 'sm' | 'md' | 'lg',
    isDisabled?: boolean,
    isChecked?: boolean
    toggle: () => void
  }) => {
  return (
    <div>
      <Switch onChange={() => toggle()} size={size} isChecked={isChecked} isDisabled={isDisabled} />
    </div>
  )
}
