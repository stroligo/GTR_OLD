import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  BsFillFilePersonFill,
  BsClipboardData,
  BsFillBriefcaseFill,
  BsThreeDots,
} from "react-icons/bs";

export default function NavBar() {
  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar width="270px" collapsedWidth="100px" transitionDuration={1000}>
      <Menu>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <MenuItem routerLink={<Link to="/" />}>GTR</MenuItem>
          <div
            style={{
              borderRadius: "50%",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              display: "inline-flex",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          >
            <BsThreeDots
              style={{ color: "rgba(0,0,0,0.6)" }}
              onClick={() => collapseSidebar()}
            />
          </div>
        </div>
        <MenuItem
          icon={<BsFillFilePersonFill />}
          routerLink={<Link to="/user" />}
        >
          Cadastro de Usuários
        </MenuItem>
        <MenuItem icon={<BsClipboardData />} routerLink={<Link to="/tasks" />}>
          Cadastro de Tarefas
        </MenuItem>
        <MenuItem
          icon={<BsFillBriefcaseFill />}
          routerLink={<Link to="/taskuser/1212125" />}
        >
          Minhas Tarefas
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
