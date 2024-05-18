import { Prisma, PrismaClient } from '@prisma/client'
import { fakeColumn, fakeProject, fakeSubtask, fakeTask } from './fake-data'
const prisma = new PrismaClient()
async function main() {
  const fakeProjects = Array.from({ length: 2 }, fakeProject)
  const fakeTasks = Array.from({ length: 2 }, fakeTask)
  const fakeColumns = Array.from({ length: 3 }, fakeColumn)
  const fakeSubtasks = Array.from({ length: 3 }, fakeSubtask)
  const creatProjectInputs = fakeProjects.map((project: { name: string }): Prisma.ProjectCreateInput => {
    return {
      name: project.name,
      columns: {
        create: fakeColumns.map((column: { title: string, colour: string, position: string }) => {
          return {
            title: column.title,
            colour: column.colour,
            position: column.position,
            tasks: {
              create: fakeTasks.map((task: { title: string, description: string, position: string }) => {
                return {
                  title: task.title,
                  description: task.description,
                  position: task.position,
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
