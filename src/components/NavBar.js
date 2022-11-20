import { Container, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Container maxWidth="xl" sx={{ m: 4 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <Button variant="contained">
            <Link to="/">Home </Link>
          </Button>
          <Button variant="contained">
            <Link to="/about">about </Link>
          </Button>
          <Button variant="contained">
            <Link to="/project">project </Link>
          </Button>
          <Button variant="contained">
            <Link to="/modelo">Week Model </Link>
          </Button>
          <Button variant="contained">
            <Link to="/dashboard">Model dashboard </Link>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NavBar;
