import React from 'react';
import type { Project } from '~/components/types';
import ProjectCard from '../projectCard/ProjectCard';

export interface ProjectCardListProps {
  projects: Project[];
}

export default function ProjectCardList(props: ProjectCardListProps): JSX.Element {
  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      {
        props.projects.map((project: Project, index: number): JSX.Element => (
          <div key={`${project.id} ${index}`} className='bg-white dark:bg-darkGray  h-[250px] rounded-lg flex flex-col items-center justify-center'>
            <ProjectCard project={project} />
          </div>
        ))
      }
    </div>
  )
}
