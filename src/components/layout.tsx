import type { PropsWithChildren } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { colors } from "~/styles/colors";
import { observer } from "mobx-react-lite";
import { useStores } from "~/models";
import { ShowSidebar } from "./showSidebar";

const PageLayoutComponent = (props: PropsWithChildren) => {
  const { theme, uiState } = useStores()
  return (
    <main style={$main}>
      <div style={$sidebar}>
        <Sidebar />
        {/* <ShowSidebar /> */}
      </div>
      <div style={$navbar}>
        <Navbar />
      </div>
      <div style={$content}>
        {props.children}
      </div>
    </main>
  );
};
export const PageLayout = observer(PageLayoutComponent);

const $main = {
  display: "grid",
  gridTemplateColumns: "300px auto",
  gridTemplateRows: "100px auto",
  height: "100vh",
}

const $navbar = {
  gridColumnStart: 2,
  borderWidth: 2,
  borderColor: colors.red,
}

const $sidebar = {
  gridRowStart: 1,
  gridRowEnd: 3,
  borderWidth: 2,
  borderColor: colors.red,
}

const $content = {
  gridColumnStart: 2,
  borderWidth: 2,
  borderColor: colors.red,
}
