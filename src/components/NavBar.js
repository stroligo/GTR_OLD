import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  BsFillFilePersonFill,
  BsClipboardData,
  BsFillBriefcaseFill,
  BsThreeDots,
} from "react-icons/bs";
import logo from "../assets/logo2.png";

export default function NavBar() {
  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar width="270px" collapsedWidth="70px" transitionDuration={500}>
      <Menu>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BsThreeDots
            style={{ color: "rgba(0,0,0,0.6)" }}
            onClick={() => collapseSidebar()}
            className="menu-collapse"
          />

          <img src={logo} alt="Logo" className="logo" />
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
