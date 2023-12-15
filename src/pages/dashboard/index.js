import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
}));

const StyledWelcomeText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Cedarville Cursive, cursive', // Use the correct font family and fallback
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const DashboardDefault = () => {
  return (
    <Grid container rowSpacing={40.5} columnSpacing={20.75} justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6}>
        <StyledPaper elevation={3}>
          <StyledWelcomeText variant="h1">
            ¡Bienvenido Bienestar Sport!
          </StyledWelcomeText>
          <Typography variant="body1">
            <h3>Prestamos y otros servicios de bienestar.</h3>
          </Typography>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
