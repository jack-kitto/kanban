import type { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./sidebar";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <Sidebar />
      <div className="flex h-full w-full flex-col bg-blue-50">
        <Navbar />
        {props.children}
      </div>
    </main>
  );
};
