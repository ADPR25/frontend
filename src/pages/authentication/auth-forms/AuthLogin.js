import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarusuario } from '../../../api/usuario_ini.ts';
import {
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  InputAdornment,
  IconButton,
  Button,
  Alert,
} from '@mui/material';

const AuthLogin = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    correo_inst: '',
    contrasena: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    navigate('/inicio');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await buscarusuario(usuario);
      const data = await response.json();

      if (response.status === 201 && data.token) { // Cambié 200 a 201 para reflejar la respuesta del servidor
        // Llama a la función de inicio de sesión con el token.
        handleLogin(data.token);

        setUsuario({
          correo_inst: '',
          contrasena: '',
        });
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al encontrar el usuario');
      console.error(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="correo_inst">Correo Sena</InputLabel>
            <OutlinedInput
              id="correo_inst"
              type="email"
              name="correo_inst"
              fullWidth
              value={usuario.correo_inst}
              onChange={handleChange}
              required // Agregué la propiedad "required" para hacer que los campos sean obligatorios
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="contrasena">Contraseña</InputLabel>
            <OutlinedInput
              fullWidth
              id="contrasena"
              type={showPassword ? 'text' : 'password'}
              value={usuario.contrasena}
              name="contrasena"
              onChange={handleChange}
              required // Agregué la propiedad "required" para hacer que los campos sean obligatorios
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
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default AuthLogin;
