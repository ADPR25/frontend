import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loguear } from '../../../api/usuario_ini.ts';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loguear({
        correo_inst: usuario.correo_inst,
        contrasena: usuario.contrasena,
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        localStorage.setItem('token', token);
        navigate('/dashboard/default');
      } else {
        console.error('Error al iniciar sesión:', response.statusText);
        setError('Contraseña incorrecta. Por favor, verifica tus credenciales.');
      }
    } catch (e) {
      console.error('Error al iniciar sesión:', e);
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
              required 
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
              required 
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />} 
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