import { Prisma, PrismaClient } from '@prisma/client'
import { fakeColumn, fakeProject, fakeSubtask, fakeTask } from './fake-data'
import { generateNKeysBetween } from 'fractional-indexing'
const prisma = new PrismaClient()
async function main() {
  await prisma.project.deleteMany()
  const fakeProjects = Array.from({ length: 2 }, fakeProject)
  const fakeTasks = Array.from({ length: 10 }, fakeTask)
  const fakeColumns = Array.from({ length: 3 }, fakeColumn)
  const fakeSubtasks = Array.from({ length: 3 }, fakeSubtask)
  const creatProjectInputs = fakeProjects.map((project: { title: string, description: string }, index: number): Prisma.ProjectCreateInput => {
    const columnPositions = generateNKeysBetween(null, null, 3)
    return {
      title: project.title,
      description: project.description,
      columns: {
        create: fakeColumns.map((column: { title: string, colour: string, position: string }, index: number) => {
          const taskPositions = generateNKeysBetween(null, null, 10)
          return {
            title: column.title,
            colour: column.colour,
            position: `${columnPositions[index]}`,
            tasks: {
              create: fakeTasks.map((task: { title: string, description: string, position: string }, index: number) => {
                return {
                  title: task.title,
                  columnTitle: column.title,
                  description: task.description,
                  position: `${taskPositions[index]}`,
                  subtasks: {
                    create: fakeSubtasks.map((subtask: { title: string, completed: boolean }) => {
                      return {
                        title: subtask.title,
                        completed: subtask.completed,
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    }
  })
  await Promise.all(creatProjectInputs.map((projectInput) => { return prisma.project.create({ data: projectInput }) }))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
