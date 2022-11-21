import { Container, Grid } from "@mui/material";

function PageHome() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h1>Page HOME ja com MUI</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageHome;
