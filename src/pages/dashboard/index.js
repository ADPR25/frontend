import React from 'react';
import { Grid, Typography } from '@mui/material';

import logo from '../../assets/images/logo.png';


const backgroundImage = {
  backgroundImage: `url(${logo})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'fixed',
  width: '80%',
  height: '90%',
  // opacity: 0.5, 
};


const DashboardDefault = () => {
  const token = localStorage.getItem('token');

  console.log('token:', token);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={backgroundImage}>
        <Typography variant="h4" color="primary" align="center">
          
        </Typography>
      </Grid>
      {/* Additional content goes here */}
    </Grid>
  );
};

export default DashboardDefault;
