import type { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./sidebar";
import { colors } from "~/styles/colors";
import { observer } from "mobx-react-lite";
import { useStores } from "~/models";
import { ShowSidebar } from "./showSidebar";

const PageLayoutComponent = (props: PropsWithChildren) => {
  const { theme, uiState } = useStores()
  return (
    <main className="overflow-none flex h-screen justify-center">
      {uiState.sidebarOpen && <Sidebar />}
      {!uiState.sidebarOpen && <ShowSidebar />}

      <div style={{ backgroundColor: theme.darkMode ? colors.veryDarkGrey : colors.lightGrey }} className="flex h-full w-full flex-col">
        <Navbar />
        {props.children}
      </div>
    </main>
  );
};
export const PageLayout = observer(PageLayoutComponent);
