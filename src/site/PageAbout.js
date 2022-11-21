import { Container, Grid } from "@mui/material";

function PageAbout() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h1>Page About</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageAbout;
