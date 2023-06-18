import type { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./sidebar";
import { colors } from "~/styles/colors";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <Sidebar />
      <div style={{ backgroundColor: colors.lightGrey }} className="flex h-full w-full flex-col">
        <Navbar />
        {props.children}
      </div>
    </main>
  );
};
