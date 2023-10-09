import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Stack, Typography } from '@mui/material';

// project import
import Activation_acount from './auth-forms/activation_acount';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const activation = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <center>
            <Typography variant="h3">Activar cuenta</Typography>
          </center>
         <br />
         <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
            Ya activaste tu cuenta inicia sesion aqui?
          </Typography> 
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Activation_acount />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default activation;
