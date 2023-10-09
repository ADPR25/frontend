import React from 'react';

import { Grid, Stack, Typography } from '@mui/material';

// project import
import Activation_acount from './auth-forms/activation_acount';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const activation = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Activar cuenta</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Activation_acount />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default activation;
