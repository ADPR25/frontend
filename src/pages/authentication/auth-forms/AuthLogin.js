import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
import { buscarusuario } from '../../../api/usuario_ini.ts';
import {
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';

const AuthLogin = () => {
  const navigate = useNavigate(); // Utiliza useNavigate en lugar de useHistory

  const [usuario, setUsuario] = useState({
    correo_sena: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await buscarusuario(usuario);

      if (user) {
        setUsuario({
          correo_sena: '',
          password: '',
        });

        // Redirige al mismo lugar después de una autenticación exitosa
        navigate('/'); // Reemplaza '/ruta-a-redirigir' con la ruta a la que deseas redirigir
      } else {
        console.error('Inicio de sesión fallido.');
      }
    } catch (error) {
      console.error('Error al encontrar el usuario:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="correo_sena">Correo Sena</InputLabel>
            <OutlinedInput
              id="correo_sena"
              type="email"
              name="correo_sena"
              fullWidth
              value={usuario.correo_sena}
              onChange={handleChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={usuario.password}
              name="password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? '🙉' : '🙈'}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Ingrese su contraseña"
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
            Iniciar sesión
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthLogin;
