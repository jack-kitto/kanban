import React from 'react'
import { Switch } from '@chakra-ui/react'
export const Toggle = ({ size, isDisabled, isChecked }:
  {
    size: 'sm' | 'md' | 'lg',
    isDisabled?: boolean,
    isChecked?: boolean
  }) => {
  return (
    <div>
      <Switch size={size} isChecked={isChecked} isDisabled={isDisabled} />
    </div>
  )
}
