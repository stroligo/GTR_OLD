import { Container, Grid } from "@mui/material";
import NavBar from "../components/NavBar";

function PageAbout() {
  return (
    <Container maxWidth="xl">
      <NavBar />
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <h1>Page About</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageAbout;
