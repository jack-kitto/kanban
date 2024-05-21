import React from 'react';
// import { Tag } from '~/components/molecules';
import { Project } from '~/components/types';
import ProjectCard from '../projectCard/ProjectCard';

export interface ProjectCardListProps {
  projects: Project[];
}

export default function ProjectCardList(props: ProjectCardListProps): JSX.Element {
  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      {
        props.projects.map((project: Project, index: number): JSX.Element => (
          <div className='bg-white dark:bg-darkGray  h-[250px] rounded-lg flex flex-col items-center justify-center'>
            <ProjectCard project={project} />
          </div>
        ))
      }
    </div>
  )
}
