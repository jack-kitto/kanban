# Kanban

A lightweight task management app with a Kanban board, developed as a solution to a Frontend Mentor challenge.

## Project Overview

This Kanban app is built using the T3 stack (Next.js, Prisma, PostgreSQL, Tailwind CSS, and TypeScript). It offers a visual approach to managing tasks and projects through customizable Kanban boards.

## Features

- Multiple projects
- Each project has its own Kanban board with customizable columns
- Drag and drop columns to rearrange them
- Drag and drop tasks to rearrange them within their column or across columns
- Dark mode support
- Passwordless Sign in

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/jack-kitto/kanban.git
   ```
2. Navigate to the project directory:
   ```
   cd kanban
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Configuration

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_FROM=
DATABASE_USERNAME=
DATABASE_PASSWORD=
```

## Database Setup

1. Push the database schema to your PostgreSQL instance:
   ```
   npx prisma db push
   ```

2. (Optional) Seed the database for development:
   ```
   npx prisma db seed
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. To run Storybook for UI component development:
   ```
   npm run storybook
   ```

## Technologies Used

- Next.js
- Prisma
- PostgreSQL
- Tailwind CSS
- TypeScript
- React Beautiful DND
- NextAuth.js
- Storybook

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](https://opensource.org/licenses/MIT)

## Author

Jack Kitto

---

For more information about the T3 Stack, check out [create.t3.gg](https://create.t3.gg/).
