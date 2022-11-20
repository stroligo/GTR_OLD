import { Container, Grid } from "@mui/material";
import NavBar from "../components/NavBar";

function PageProject() {
  return (
    <Container maxWidth="xl">
      <NavBar />
      <Grid container spacing={2}>
        <Grid xs={12} md={8}>
          <h1>Project</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageProject;
