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
import { obtenerEPS } from '../../../api/obtenerEps.ts';
import { obtenerRol } from '../../../api/obtenerRol.ts';
import { obtenerFichas } from '../../../api/obtenerFichas.ts';

// Importa la función para crear usuarios
import { createUsuarioRequest } from '../../../api/usuario.ts';

const AuthRegister = () => {
  const [epsData, setEpsData] = useState([]);
  const [fichaData, setFichaData] = useState([]);
  const [rolData, setRolData] = useState([]);
  const [usuario, setUsuario] = useState({
    nombres: '',
    apellidos: '',
    eps: '',
    genero: 'seleccion',
    tipo_doc: 'Seleccione',
    n_doc: '',
    correo_inst: '',
    nacimiento: '',
    correo_pers: '',
    rol: 'Seleccione',
    contrasena: '',
    telefono: '',
    ficha: '', // Valor predeterminado establecido como vacío
    rh: 'Seleccione',
    direccion: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [alertOpen, setAlertOpen] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');

  useEffect(() => {
    async function fetchRolData() {
      try {
        const rol = await obtenerRol();
        setRolData(rol);
      } catch (error) {
        console.error('Error al cargar los datos de Rol:', error);
      }
    }

    fetchRolData();
  }, []);

  useEffect(() => {
    async function fetchEpsData() {
      try {
        const eps = await obtenerEPS();
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
        console.error('Error al cargar los datos de Ficha:', error);
      }
    }

    fetchFichaData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'eps' || name === 'rol') {
      setUsuario({ ...usuario, [name]: value });
    } else if (name === 'ficha') {
      setUsuario({ ...usuario, [name]: value.value });
    } else if (name === 'contrasena') {
      // Validar la contraseña aquí
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
      if (!regex.test(value)) {
        setPasswordError2('La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
      } else {
        setPasswordError2('');
      }
      setUsuario({ ...usuario, [name]: value });
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /@soy\.sena\.edu\.co$|@sena\.edu\.co$|@misena\.edu\.co$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(usuario.correo_inst)) {
      setEmailError('Correo no válido. Utilice una dirección de correo permitida.');
      return;
    } else {
      setEmailError('');
    }

    if (usuario.contrasena !== passwordConfirmation) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    } else {
      setPasswordError('');
    }


    try {
      const response = await createUsuarioRequest({
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        eps: usuario.eps,
        genero: usuario.genero,
        tipo_doc: usuario.tipo_doc,
        n_doc: usuario.n_doc,
        correo_inst: usuario.correo_inst,
        fecha_nacimiento: usuario.nacimiento,
        correo_pers: usuario.correo_pers,
        rol: usuario.rol,
        telefono: usuario.telefono,
        ficha: usuario.ficha,
        contrasena: usuario.contrasena,
        rh: usuario.rh,
        direccion: usuario.direccion,
        pps: true,
        activacion: false,
      });

      if (response) {
        setAlertOpen(true);
        setUsuario({
          nombres: '',
          apellidos: '',
          eps: '',
          genero: 'seleccion',
          tipo_doc: 'Seleccione',
          n_doc: '',
          correo_inst: '',
          nacimiento: '',
          correo_pers: '',
          rol: 'Seleccione',
          contrasena: '',
          telefono: '',
          ficha: '',
          rh: 'Seleccione',
          direccion: '',
        });
        setPasswordConfirmation('');
      } else {
        console.error('Error al crear usuario:', response);
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const handleEmailBlur = () => {
    // Verificar si el correo es válido
    if (!isEmailValid(usuario.correo_inst)) {
      setEmailError('Correo no válido. Utilice una dirección de correo permitida.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordConfirm = () => {
    if (usuario.contrasena !== passwordConfirmation) {
      setPasswordError('Las contraseñas no coinciden.');
    } else {
      setPasswordError('');
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
    { value: 'T.I', label: 'Tarjeta de identidad' },
    { value: 'C.C', label: 'Cédula' },
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
              <InputLabel htmlFor="nombres">Nombres</InputLabel>
              <OutlinedInput
                id="nombres"
                type="string"
                name="nombres"
                fullWidth
                value={usuario.nombres}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
              <OutlinedInput
                id="apellidos"
                type="string"
                name="apellidos"
                fullWidth
                value={usuario.apellidos}
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
                onChange={handleChange}
              >
                {epsData.map((option) => (
                  <MenuItem key={`eps-option-${option._id}`} value={option._id} label={option.nombre}>
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
              <InputLabel htmlFor="tipo_doc">Tipo de Documento</InputLabel>
              <Select
                id="tipo_doc"
                name="tipo_doc"
                fullWidth
                value={usuario.tipo_doc}
                onChange={handleChange}
              >
                {tipo_documento.map((option) => (
                  <MenuItem key={`tipo_doc-option-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="n_doc">Número de Documento</InputLabel>
              <OutlinedInput
                id="n_doc"
                type="string"
                name="n_doc"
                fullWidth
                value={usuario.n_doc}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="correo_inst">Correo Sena</InputLabel>
              <OutlinedInput
                id="correo_inst"
                type="string"
                name="correo_inst"
                fullWidth
                value={usuario.correo_inst}
                onChange={handleChange}
                onBlur={handleEmailBlur} // Agrega el evento onBlur aquí
              />
            </Stack>
            <p style={{ color: 'red' }}>{emailError}</p>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="nacimiento">Fecha de Nacimiento</InputLabel>
              <OutlinedInput
                id="nacimiento"
                type="date"
                name="nacimiento"
                fullWidth
                value={usuario.nacimiento}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="correo_pers">Correo Personal</InputLabel>
              <OutlinedInput
                id="correo_pers"
                type="string"
                name="correo_pers"
                fullWidth
                value={usuario.correo_pers}
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
              <InputLabel htmlFor="telefono">Numero de telefono</InputLabel>
              <OutlinedInput
                id="telefono"
                type="string"
                name="telefono"
                fullWidth
                value={usuario.telefono}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="contrasena">Contraseña</InputLabel>
              <OutlinedInput
                fullWidth
                id="contrasena"
                type={showPassword ? 'string' : 'password'}
                value={usuario.contrasena}
                name="contrasena"
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
            <p style={{ color: 'red' }}>{passwordError2}</p>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="confirm_password">Confirme su contraseña</InputLabel>
              <OutlinedInput
                fullWidth
                id="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordConfirmation}
                name="confirm_password"
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                onBlur={handlePasswordConfirm} // Agrega el evento onBlur aquí
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
            <p style={{ color: 'red' }}>{passwordError}</p>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <AutoCompleteInput
                id="ficha"
                name="ficha"
                label="Numero de Ficha"
                options={fichaData.map((option) => ({
                  value: option._id,
                  label: option.codigo,
                  key: `ficha-option-${option._id}`,
                }))}
                onInputChange={handleChange}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="rh">Tipo de Sangre</InputLabel>
              <Select
                id="rh"
                name="rh"
                fullWidth
                value={usuario.rh}
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
        message={usuario.password == passwordConfirmation ? '' :'Usuario registrado con éxito.'}
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
