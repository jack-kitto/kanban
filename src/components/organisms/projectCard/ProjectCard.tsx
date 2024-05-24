import React from 'react';
import { Tag } from '~/components/molecules';
import type { Project } from '~/components/types';

export interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

export default function ProjectCard(props: ProjectCardProps): JSX.Element {
  return (
    <button
      className='bg-white dark:bg-darkGray   justify-center py-12 w-full h-full shadow-[#979797] dark:shadow-gray-800 shadow-md  px-4 flex flex-col items-center rounded-lg transition outline-none hover-duration-150 hover:shadow-2xl active:scale-95 cursor-pointer ease-in-out hover:scale-105 select-none'
      onMouseDown={() => props.onClick?.(props.project)}
    >
      <h1 className='prose-hxl dark:text-white'>{props.project.title}</h1>
      <div className='flex flex-col gap-2 mt-2 items-start'>
        {
          props.project.columns.map((column, index) => (
            <Tag key={index} label={`${column.title} (${column.tasks.length})`} colour={column.colour} />
          ))
        }
      </div>
    </button>
  )
}
