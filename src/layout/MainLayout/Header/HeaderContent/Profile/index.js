import { useNavigate } from 'react-router-dom';
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const anchorRef = useRef();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        position: 'absolute', // Set the position to absolute
        bottom: '16px',      // Adjust the bottom property as needed
        right: '16px',        // Adjust the left property as needed
      }}
    >
      <ButtonBase
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={() => {
          handleLogin();
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Typography variant="subtitle1">Cerrar sesión</Typography>
        </Stack>
      </ButtonBase>
    </Box>
  );
};

export default Profile;
