import { Grid, Stack, Typography } from '@mui/material';
import Contrasena from './auth-forms/contrasena';
import AuthWrapper from './AuthWrapper';

const Cambio = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Cambiar contyraseña</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Contrasena />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Cambio;
