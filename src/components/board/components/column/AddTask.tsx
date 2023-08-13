import { typography } from "~/styles/typography";

export const AddTask = () => {
  return (
    <div className="w-full opacity-25 bg-white group rounded-md cursor-pointer h-24 shadow-md shadow-mediumGrey items-center justify-center flex">
      <p className="group-hover:text-mainPurple cursor-pointer" style={{ ...typography.heading.M }}>+ New Task</p>
    </div>
  )
};
