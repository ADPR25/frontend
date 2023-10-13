import React from 'react';
import {
    Grid,
    OutlinedInput,
    InputLabel,
    Select,
    MenuItem,
    Stack,
} from '@mui/material';

const tipos = [
    { value: 'seleccion', label: 'Seleccione' },
    { value: 'Implemento en uso', label: 'Implemento en uso' },
    { value: 'Implemento en mantenimiento', label: 'Implemento en mantenimiento' },
    { value: 'Implemento disponibles', label: 'Implemento disponibles' },
    { value: 'Implemento solicitados', label: 'Implemento solicitado' },
  ];
  const Implementos = [
    { value: 'seleccion', label: 'Seleccione' },
    { value: 'Implemento del gimasion', label: 'Implemento del gimasion' },
    { value: 'Implemento de deportivo', label: 'Implemento de deportivo' },
    { value: 'Implemento del gimasion y deportivo', label: 'Implemento disponiblesImplemento del gimasion y deportivo' }, 
  ];
  const descripcion = [
    { value: 'seleccion', label: 'Seleccione' },
    { value: 'Estado', label: 'Estado' },
    { value: 'Solicitud', label: 'Solicitud' },
    { value: 'En prestamo', label: 'En prestamo' },
    { value: 'En mantenimiento', label: 'En mantenimiento' },

  ]
  const CrearInplementos = () => {
    return (
        <form>
            <Grid container spacing={2}>

                
                
                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="fecha">Fecha</InputLabel>
                        <OutlinedInput
                            id="fecha"
                            type="date"
                            name="fecha"
                            fullWidth
                            required
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="N_informe">Numero de informes</InputLabel>
                        <OutlinedInput
                            id="N_informe"
                            type="string"
                            name="n_informe"
                            fullWidth
                            placeholder="numero de informes"
                            required
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="N_funcionario">Nombre del funcionario</InputLabel>
                        <OutlinedInput
                            id="N_funcionario"
                            type="string"
                            name="N_funcionario"
                            fullWidth
                            placeholder="Nombre del funcionario"
                            required
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="N_docuemto">Documento de indentidad</InputLabel>
                        <OutlinedInput
                            id="N_docuemto"
                            type="string"
                            name="N_docuemto"
                            fullWidth
                            placeholder="Documento de indentidad"
                            required
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="Dependecia_oficina">Dependencia u oficina </InputLabel>
                        <OutlinedInput
                            id="Dependecia_oficina"
                            type="string"
                            name="Dependecia_oficina"
                            fullWidth
                            placeholder="Dependencia u oficina"
                            required
                        />
                    </Stack>
             </Grid>

          
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="tipos">tipos</InputLabel>
              <Select
                id="tipos "
                name="tipos "
                fullWidth
              >
                {tipos .map((option) => (
                  <MenuItem key={`tipos -option-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="Implementos">Implemento</InputLabel>
              <Select
                id="Implementos"
                name="Implementos"
                fullWidth
              >
                {Implementos.map((option) => (
                  <MenuItem key={`Implementos-option-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>
           
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="descripcion">Descripcion</InputLabel>
              <Select
                id="descripcion"
                name="descripcion"
                fullWidth
              >
                {descripcion.map((option) => (
                  <MenuItem key={`descripcion-option-${option.value}`} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

        </Grid>
        </form>
    );
};

export default CrearInplementos;
