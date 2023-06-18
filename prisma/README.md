# Kanban Database Models

This repository contains the database models for a kanban web app, using Prisma as the ORM. The models define the structure of the data and the relationships between entities in the application.

## Models

### :bust_in_silhouette: User

The `User` model represents a user of the kanban web app.

- `id`: The unique identifier for the user.
- `username`: The username of the user.
- `email`: The email address of the user.
- `password`: The password of the user.
- `projects`: A list of projects associated with the user.

### :clipboard: Project

The `Project` model represents a project or a kanban board in the app.

- `id`: The unique identifier for the project.
- `name`: The name of the project.
- `users`: A list of users associated with the project.
- `columns`: A list of columns in the project.

### :bookmark_tabs: Column

The `Column` model represents a column or category within a project.

- `id`: The unique identifier for the column.
- `name`: The name of the column.
- `color`: The color associated with the column.
- `project`: The project to which the column belongs.
- `tasks`: A list of tasks within the column.

### :memo: Task

The `Task` model represents a task or card within a column.

- `id`: The unique identifier for the task.
- `name`: The name of the task.
- `description`: The description of the task.
- `column`: The column to which the task belongs.
- `subtasks`: A list of subtasks or checklist items within the task.

### :white_check_mark: Subtask

The `Subtask` model represents a subtask or checklist item within a task.

- `id`: The unique identifier for the subtask.
- `name`: The name of the subtask.
- `isCompleted`: Indicates whether the subtask is completed or not.
- `task`: The task to which the subtask belongs.

## Relationships

- A user can be associated with multiple projects.
- A project can have multiple users (including the owner).
- A project can have multiple columns.
- A column belongs to a single project.
- A column can have multiple tasks.
- A task belongs to a single column.
- A task can have multiple subtasks.
- A subtask belongs to a single task.
