import React, { useEffect, useState } from 'react';
import { obtener_inplemeto } from '../../api/nombre-inplemento.ts';
import {
  Grid,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';

const CrearInplementos = () => {
  const [n_iData, setn_iData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const n_i = await obtener_inplemeto();
        setn_iData(n_i);
      } catch (error) {
        console.error('Error al obtener los nombres de los implementos', error);
      }
    }

    fetchData(); // Llama a la función fetchData en useEffect para cargar los datos al montar el componente
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  const tipos = [
    { value: 'seleccion', label: 'Seleccione' },
    { value: 'Implemento en uso', label: 'Implemento en uso' },
    { value: 'Implemento en mantenimiento', label: 'Implemento en mantenimiento' },
    { value: 'Implemento disponibles', label: 'Implemento disponibles' },
    { value: 'Implemento solicitados', label: 'Implemento solicitado' },
  ];
  const Implementos = [
    { value: 'seleccion', label: 'Seleccione' },
    { value: 'Implemento del gimnasio', label: 'Implemento del gimnasio' },
    { value: 'Implemento deportivo', label: 'Implemento deportivo' },
    { value: 'Implemento gimnasio y deportivo', label: 'Implemento gimnasio y deportivo' },
  ];
  const descripcion = [
    { value: 'seleccion', label: 'Seleccione' },
    { value: 'Estado', label: 'Estado' },
    { value: 'Solicitud', label: 'Solicitud' },
    { value: 'En préstamo', label: 'En préstamo' },
    { value: 'En mantenimiento', label: 'En mantenimiento' },
  ];

    return (
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={6}>
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

                <Grid item xs={12} md={12}>
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

          
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="tipos">Tipos</InputLabel>
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

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="cantidad">Cantidad</InputLabel>
                        <OutlinedInput
                            id="cantidad"
                            type="string"
                            name="cantidad"
                            fullWidth
                            required
                        />
                    </Stack>
                </Grid>

            <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="detalle">Nombre del implemento</InputLabel>
              <Select
                id="detalle"
                name="detalle"
                fullWidth
              >
                {n_iData.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.nombre}
                  </MenuItem>
                )
                )}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="Caracteristicas">Caracteristicas</InputLabel>
                        <OutlinedInput
                            id="Caracteristicas"
                            type="string"
                            name="Caracteristicas"
                            fullWidth
                            required
                        />
                    </Stack>
                </Grid>

        </Grid>
        </form>
    );
};

export default CrearInplementos;
