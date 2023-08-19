import type { PropsWithChildren } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { observer } from "mobx-react-lite";
import { useStores } from "~/models";
import { ShowSidebar } from "./showSidebar";
import { colors } from "~/styles/colors";

const PageLayoutComponent = (props: PropsWithChildren) => {
  const { uiState, theme } = useStores()
  return (
    <main style={{ ...$main, gridTemplateColumns: `${uiState.sidebarOpen ? "300px" : "0px"}` }}>
      <div style={$sidebar}>
        {uiState.sidebarOpen && <Sidebar />}
        {!uiState.sidebarOpen && <ShowSidebar />}
      </div>
      <div style={$navbar}>
        <Navbar />
      </div>
      <div style={{ ...$content, backgroundColor: !theme.darkMode ? colors.lightGrey : colors.veryDarkGrey }}>
        {props.children}
      </div>
    </main>
  );
};
export const PageLayout = observer(PageLayoutComponent);

const $main = {
  display: "grid",
  gridTemplateRows: "100px auto",
  height: "100vh",
}

const $navbar = {
  gridColumnStart: 2,
  gap: 0,
}

const $sidebar = {
  gridRowStart: 1,
  gridRowEnd: 3,
}

const $content = {
  gridColumnStart: 2,
  overflow: 'scroll',
}
