import React, { useState, useEffect } from 'react';
import {
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
} from '@mui/material';

import AutoCompleteInput from '../../../components/autocomplete';
import { buscarEps } from '../../../api/obtenerEps.ts';
import { obtenerRol } from '../../../api/obtenerRol.ts';
import { obtenerFichas } from '../../../api/obtenerFichas.ts';

// Importa la función para crear usuarios
import { createusuariorequest } from '../../../api/usuario.ts';

const AuthRegister = () => {
  const [epsData, setEpsData] = useState([]);
  const [fichaData, setFichaData] = useState([]);
  const [rolData, setRolData] = useState([]);
  const [usuario, setusuario] = useState({
    nombre: '',
    apellido: '',
    eps: '',
    genero: 'seleccion',
    tipo_documento: 'Seleccione',
    numero_documento: '',
    correo_sena: '',
    fecha_nacimiento: '',
    correo_personal: '',
    rol: 'Seleccione',
    password: '',
    telefono: '',
    numero_ficha: '', // Valor predeterminado establecido como vacío
    tipo_sangre: 'Seleccione',
    direccion: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    async function fetchRolData() {
      try {
        const rol = await obtenerRol();
        setRolData(rol);
      } catch (error) {
        console.error('Error al cargar los datos de rol:', error);
      }
    }

    fetchRolData();
  }, []);

  useEffect(() => {
    async function fetchEpsData() {
      try {
        const eps = await buscarEps();
        setEpsData(eps);
      } catch (error) {
        console.error('Error al cargar los datos de EPS:', error);
      }
    }

    fetchEpsData();
  }, []);

  useEffect(() => {
    async function fetchFichaData() {
      try {
        const ficha = await obtenerFichas();
        setFichaData(ficha);
      } catch (error) {
        console.error('Error al cargar los datos de FICHA:', error);
      }
    }

    fetchFichaData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'eps' || name === 'rol') {
      setusuario({ ...usuario, [name]: value });
    } else if (name === 'numero_ficha') {
      setusuario({ ...usuario, [name]: value.value });
    } else {
      setusuario({ ...usuario, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log(usuario);
    e.preventDefault();
    try {
      await createusuariorequest(usuario);
      setusuario({
        nombre: '',
        apellido: '',
        eps: '',
        genero: 'seleccion',
        tipoDocumento: 'Seleccione',
        numero_documento: '',
        correo_sena: '',
        fecha_nacimiento: '',
        correo_personal: '',
        rol: 'Seleccione',
        password: '',
        telefono: '',
        numero_ficha: '',
        tipo_sangre: 'Seleccione',
        direccion: '',
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const genero = [
    { value: 'seleccion', label: 'Seleccione' },
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'no_aporta', label: 'No aporta' },
  ];

  const tipo_documento = [
    { value: 'Seleccione', label: 'Seleccione' },
    { value: 'TI', label: 'Tarjeta de identidad' },
    { value: 'cedula', label: 'Cédula' },
    { value: 'dni', label: 'DNI (Documento Nacional de Identidad)' },
    { value: 'licencia', label: 'Licencia de Conducir' },
    { value: 'rut', label: 'RUT (Registro Único Tributario)' },
    { value: 'paspextranjero', label: 'Pasaporte de Extranjería' },
    { value: 'otro', label: 'Otro documento' },
  ];

  const tipo_sangre = [
    { value: 'Seleccione', label: 'Seleccione' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'no_sabe', label: 'No sabe/no está seguro' },
  ];

  return (
    <>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="nombre">Nombres</InputLabel>
              <OutlinedInput
                id="nombre"
                type="text"
                name="nombre"
                fullWidth
                value={usuario.nombre}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="apellido">Apellidos</InputLabel>
              <OutlinedInput
                id="apellido"
                type="text"
                name="apellido"
                fullWidth
                value={usuario.apellido}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="eps">Eps</InputLabel>
              <Select
                id="eps"
                name="eps"
                fullWidth
                value={usuario.eps ? usuario.eps._id : ''}
                onChange={handleChange}
              >
                {epsData.map((option) => (
                  <MenuItem key={`eps-option-${option._id}`} value={option._id}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="genero">Género</InputLabel>
              <Select
                id="genero"
                name="genero"
                fullWidth
                value={usuario.genero}
                onChange={handleChange}
              >
                {genero.map((option) => (
                  <MenuItem key={`genero-option-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="tipo_documento">Tipo de Documento</InputLabel>
              <Select
                id="tipo_documento"
                name="tipo_documento"
                fullWidth
                value={usuario.tipo_documento}
                onChange={handleChange}
              >
                {tipo_documento.map((option) => (
                  <MenuItem key={`tipo_documento-option-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="numero_documento">Número de Documento</InputLabel>
              <OutlinedInput
                id="numero_documento"
                type="string"
                name="numero_documento"
                fullWidth
                value={usuario.numero_documento}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="correo_sena">Correo Sena</InputLabel>
              <OutlinedInput
                id="correo_sena"
                type="string"
                name="correo_sena"
                fullWidth
                value={usuario.correo_sena}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="fecha_nacimiento">Fecha de Nacimiento</InputLabel>
              <OutlinedInput
                id="fecha_nacimiento"
                type="date"
                name="fecha_nacimiento"
                fullWidth
                value={usuario.fecha_nacimiento}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="correo_personal">Correo Personal</InputLabel>
              <OutlinedInput
                id="correo_personal"
                type="string"
                name="correo_personal"
                fullWidth
                value={usuario.correo_personal}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="rol">Rol</InputLabel>
              <Select
                id="rol"
                name="rol"
                fullWidth
                value={usuario.rol ? usuario.rol._id : ''}
                onChange={handleChange}
              >
                {rolData.map((option) => (
                  <MenuItem key={`rol-option-${option._id}`} value={option._id}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="numero_telefono">Numero de telefono</InputLabel>
              <OutlinedInput
                id="telefono"
                type="text"
                name="telefono"
                fullWidth
                value={usuario.telefono}
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
            <Stack spacing={1}>
              <InputLabel htmlFor="confirm_password">Confirme su contraseña</InputLabel>
              <OutlinedInput
                fullWidth
                id="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordConfirmation}
                name="confirm_password"
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="large"
                    >
                      {showConfirmPassword ? '🙉' : '🙈'}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Confirme su contraseña"
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <AutoCompleteInput
                id="numero_ficha"
                name="numero_ficha"
                label="numero de Ficha"
                options={fichaData.map((option) => ({
                  value: option._id,
                  label: option.codigo,
                  key: `numero_ficha-option-${option._id}`,
                }))}
                onInputChange={handleChange}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="tipo_sangre">Tipo de Sangre</InputLabel>
              <Select
                id="tipo_sangre"
                name="tipo_sangre"
                fullWidth
                value={usuario.tipo_sangre}
                onChange={handleChange}
              >
                {tipo_sangre.map((option) => (
                  <MenuItem key={`tipo_sangre-option-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="direccion">Dirección</InputLabel>
              <OutlinedInput
                id="direccion"
                type="text"
                name="direccion"
                fullWidth
                value={usuario.direccion}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        message={usuario.password !== passwordConfirmation ? "Las contraseñas no coinciden." : "Usuario registrado con éxito."}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setAlertOpen(false)}
          >
            x
          </IconButton>
        }
      />
    </>
  );
};

export default AuthRegister;
