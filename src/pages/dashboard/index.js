import React from 'react';
import { Grid, Typography } from '@mui/material';

import fondo from '../../assets/images/fondo.jpg';

const backgroundImage = {
  backgroundImage: `url(${fondo})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'fixed',
  width: '81%',
  height: '94%',
  opacity: 0.5, // Set the opacity value between 0 (transparent) and 1 (opaque)
};


const DashboardDefault = () => {
  const token = localStorage.getItem('token');

  console.log('token:', token);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={backgroundImage}>
        <Typography variant="h4" color="primary" align="center">
          Bienvenido
        </Typography>
      </Grid>
      {/* Additional content goes here */}
    </Grid>
  );
};

export default DashboardDefault;
