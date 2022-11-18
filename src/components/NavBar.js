import { Link } from "react-router-dom";
function NavBar() {
  return (
    <section>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/project">
          <li>Project</li>
        </Link>

        <Link to="/modelo">
          <li>Modelo da semana</li>
        </Link>
      </ul>
    </section>
  );
}

export default NavBar;
