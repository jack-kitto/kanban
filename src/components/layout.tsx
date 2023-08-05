import type { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./sidebar";
import { colors } from "~/styles/colors";
import { observer } from "mobx-react-lite";
import { useStores } from "~/models";

const PageLayoutComponent = (props: PropsWithChildren) => {
  const { theme } = useStores()
  return (
    <main className="overflow-none flex h-screen justify-center">
      <Sidebar />
      <div style={{ backgroundColor: theme.darkMode ? colors.veryDarkGrey : colors.lightGrey }} className="flex h-full w-full flex-col">
        <Navbar />
        {props.children}
      </div>
    </main>
  );
};
export const PageLayout = observer(PageLayoutComponent);
