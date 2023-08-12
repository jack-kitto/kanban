import React from 'react';
import { Button } from '~/components';
import { colors } from '~/styles/colors';
import { typography } from '~/styles/typography';

export default function EmptyState({ onAddNewColumn }: { onAddNewColumn: () => void }) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p style={{ ...typography.heading.L, color: colors.mediumGrey }}>This board is empty. Create a new column to get started.</p>
      <div className='mt-4'>
        <Button text='+ Add New Column' type='primary' size='lg' onPress={onAddNewColumn} />
      </div>
    </div>
  )
}
