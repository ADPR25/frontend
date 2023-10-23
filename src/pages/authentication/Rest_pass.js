// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import Restablecer from './auth-forms/Rest_password';
import AuthWrapper from './AuthWrapper';

// ================================|| REGISTER ||================================ //

const Rest_contrasena = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Recuperar contraseña</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Restablecer />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Rest_contrasena;
