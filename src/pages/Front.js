import SidebarMenu from "react-bootstrap-sidebar-menu";

function Front() {
  return (
    <SidebarMenu>
      <SidebarMenu.Nav.Link>
        <SidebarMenu.Nav.Icon>{/* Menu item icon */}</SidebarMenu.Nav.Icon>
        <SidebarMenu.Nav.Title>{/* Menu item title */}</SidebarMenu.Nav.Title>
      </SidebarMenu.Nav.Link>
      <SidebarMenu.Nav />
      <SidebarMenu.Sub>
        <SidebarMenu.Sub.Toggle>
          <SidebarMenu.Nav.Icon />
          <SidebarMenu.Nav.Title>{/* Submenu title */}</SidebarMenu.Nav.Title>
        </SidebarMenu.Sub.Toggle>
        <SidebarMenu.Sub.Collapse>
          <SidebarMenu.Nav>
            <SidebarMenu.Nav.Link>
              <SidebarMenu.Nav.Icon>
                {/* Submenu item icon */}
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title>
                {/* Submenu item title */}
              </SidebarMenu.Nav.Title>
            </SidebarMenu.Nav.Link>
          </SidebarMenu.Nav>
        </SidebarMenu.Sub.Collapse>
      </SidebarMenu.Sub>
      <SidebarMenu.Body />
    </SidebarMenu>
  );
}

export default Front;
