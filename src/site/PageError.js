import { Container, Grid } from "@mui/material";

function PageError() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h1>Page ERROR</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageError;
