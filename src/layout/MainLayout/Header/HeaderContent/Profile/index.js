import { useNavigate } from 'react-router-dom';
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const anchorRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '16px',
        right: '16px',
      }}
    >
      <ButtonBase
        aria-label="Cerrar sesión"
        ref={anchorRef}
        onClick={handleLogout}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Typography variant="subtitle1">Cerrar sesión</Typography>
        </Stack>
      </ButtonBase>
    </Box>
  );
};

export default Profile;
