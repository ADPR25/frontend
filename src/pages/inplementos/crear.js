import React, { useEffect, useState } from 'react';
import { estado_implemento } from '../../api/estado-implemento.ts';
import { obtener_inplemeto } from '../../api/nombre-inplemento.ts';
import {
  Grid,
  OutlinedInput,
  InputLabel,
  Button,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import jsPDF from 'jspdf';

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

    fetchData();
  }, []);

  const [e_iData, sete_iDate] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const e_i = await estado_implemento();
        sete_iDate(e_i);
      } catch (error) {
        console.error('Error al obtener los estados de los implementos', error);
      }
    }

    fetchData();
  }, []);

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

  const [formData, setFormData] = useState({
    fecha: '',
    N_informe: '',
    N_funcionario: '',
    N_documento: '',
    Dependencia_oficina: '',
    Implementos: 'seleccion',
    descripcion: 'seleccion',
    detalle: 'seleccion',
    cantidad: '',
    unidades: '',
    Caracteristicas: '',
    nombre_i: 'seleccion',
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDownloadPDF = () => {
    if (
      formData.fecha === '' ||
      formData.N_informe === '' ||
      formData.N_funcionario === '' ||
      formData.N_documento === ''
    ) {
      alert('Por favor, complete todos los campos obligatorios antes de generar el PDF.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Informe de Mantenimiento de Implementos', 70, 15);
    let yPosition = 30;

    doc.text(`Fecha: ${formData.fecha}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Número de Informes: ${formData.N_informe}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Nombre del Funcionario: ${formData.N_funcionario}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Documento de Identidad: ${formData.N_documento}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Dependencia u Oficina: ${formData.Dependencia_oficina}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Tipo: ${formData.Implementos === 'seleccion' ? 'No especificado' : formData.Implementos}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Descripción: ${formData.descripcion === 'seleccion' ? 'No especificado' : formData.descripcion}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Estado: ${formData.detalle === 'seleccion' ? 'No especificado' : formData.detalle}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Nombre del Implemento: ${formData.nombre_i === 'seleccion' ? 'No especificado' : formData.nombre_i}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Cantidad: ${formData.cantidad}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Unidades: ${formData.unidades}`, 20, yPosition);
    yPosition += 10;

    doc.text(`Características: ${formData.Caracteristicas}`, 20, yPosition);
    yPosition += 10;

    doc.save('informe_mantenimiento.pdf');
  };

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
              value={formData.fecha}
              onChange={handleFormChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="N_informe">Numero de informes</InputLabel>
            <OutlinedInput
              id="N_informe"
              type="string"
              name="N_informe"
              fullWidth
              placeholder="Número de informes"
              value={formData.N_informe}
              onChange={handleFormChange}
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
              value={formData.N_funcionario}
              onChange={handleFormChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="N_documento">Documento de identidad</InputLabel>
            <OutlinedInput
              id="N_documento"
              type="string"
              name="N_documento"
              fullWidth
              placeholder="Documento de identidad"
              value={formData.N_documento}
              onChange={handleFormChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="Dependencia_oficina">Dependencia u oficina </InputLabel>
            <OutlinedInput
              id="Dependencia_oficina"
              type="string"
              name="Dependencia_oficina"
              fullWidth
              placeholder="Dependencia u oficina"
              value={formData.Dependencia_oficina}
              onChange={handleFormChange}
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
              {tipos.map((option) => (
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
              value={formData.Implementos}
              onChange={handleFormChange}
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
            <InputLabel htmlFor="descripcion">Descripción</InputLabel>
            <Select
              id="descripcion"
              name="descripcion"
              fullWidth
              value={formData.descripcion}
              onChange={handleFormChange}
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
            <InputLabel htmlFor="detalle">Estado</InputLabel>
            <Select
              id="detalle"
              name="detalle"
              fullWidth
              value={formData.detalle}
              onChange={handleFormChange}
            >
              {e_iData.map((option) => (
                <MenuItem key={option._id} value={option.estado}>
                  {option.estado}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="cantidad">Cantidad</InputLabel>
            <OutlinedInput
              id="cantidad"
              type="string"
              name="cantidad"
              fullWidth
              value={formData.cantidad}
              onChange={handleFormChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <InputLabel htmlFor="nombre_i">Nombre del implemento</InputLabel>
            <Select
              id="nombre_i"
              name="nombre_i"
              fullWidth
              value={formData.nombre_i}
              onChange={handleFormChange}
            >
              {n_iData.map((option) => (
                <MenuItem key={option._id} value={option.nombre}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <InputLabel htmlFor="unidades">Unidades</InputLabel>
            <OutlinedInput
              id="unidades"
              type="number"
              name="unidades"
              fullWidth
              value={formData.unidades}
              onChange={handleFormChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={1}>
            <InputLabel htmlFor="Caracteristicas">Características</InputLabel>
            <OutlinedInput
              id="Caracteristicas"
              type="string"
              name="Caracteristicas"
              fullWidth
              required
              value={formData.Caracteristicas}
              onChange={handleFormChange}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <center>
            <Button onClick={handleDownloadPDF} variant="contained" color="primary">
              Descargar PDF
            </Button>
          </center>
        </Grid>
      </Grid>
    </form>
  );
};

export default CrearInplementos;
