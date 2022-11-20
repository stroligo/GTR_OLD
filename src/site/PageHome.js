import { Container, Grid } from "@mui/material";
import NavBar from "../components/NavBar";

function PageHome() {
  return (
    <Container maxWidth="xl">
      <NavBar />
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <h1>Page HOME ja com MUI</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageHome;
