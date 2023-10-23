import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Iniciar sesion</Typography>
          <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            crear una cuenta?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
      &nbsp; &nbsp; &nbsp; &nbsp;<Typography style={{ marginTop: "10px" }} component={Link} to="/Rest_contrasena" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
        Cambiar contraseña
      </Typography>
    </Grid>
  </AuthWrapper>
);

export default Login;
