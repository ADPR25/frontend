import React, { useState, useEffect } from 'react';
import { estado_implemento } from '../../api/estado-implemento.ts';
import {
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import jsPDF from 'jspdf';

const Mantenimiento = () => {

  const [formData, setFormData] = useState({
    fecha: '',
    n_informe: '',
    N_funcionario: '',
    N_documento: '',
    Dependencia_oficina: '',
    Implementos: 'seleccion',
    descripcion: 'seleccion',
    detalle: 'seleccion',
    cantidad: '',
  });

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

  const [e_iData, sete_iDate] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const e_i = await estado_implemento();
        sete_iDate(e_i);
      } catch (error) {
        console.error('Error al obtener los nombres de los implementos', error);
      }
    }

    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    if (
      formData.fecha === '' ||
      formData.n_informe === '' ||
      formData.N_funcionario === '' ||
      formData.N_documento === '' ||
      formData.Dependencia_oficina === '' ||
      formData.Implementos === 'seleccion' ||
      formData.descripcion === 'seleccion' ||
      formData.detalle === 'seleccion' ||
      formData.cantidad === ''
    ) {
      alert('Por favor, complete todos los campos obligatorios antes de generar el PDF.');
      return;
    }

    const doc = new jsPDF();
    doc.text('Informe de Mantenimiento de Implementos', 70, 15);
    let yPosition = 30;

    doc.text(`Fecha: ${formData.fecha}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Número de Informe: ${formData.n_informe}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Nombre del Funcionario: ${formData.N_funcionario}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Documento de Identidad: ${formData.N_documento}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Dependencia u Oficina: ${formData.Dependencia_oficina}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Tipo: Implemento en mantenimiento`, 20, yPosition);
    yPosition += 10;
    doc.text(`Implementos: ${formData.Implementos}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Descripción: ${formData.descripcion}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Detalle: ${formData.detalle}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Cantidad: ${formData.cantidad}`, 20, yPosition);

    doc.save('informe_mantenimiento.pdf');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
            <InputLabel htmlFor="n_informe">Número de informes</InputLabel>
            <OutlinedInput
              id="n_informe"
              type="string"
              name="n_informe"
              fullWidth
              placeholder="Número de informes"
              value={formData.n_informe}
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
            <InputLabel htmlFor="Dependencia_oficina">Dependencia u oficina</InputLabel>
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

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="Implementos">Implementos</InputLabel>
            <Select
              id="Implementos"
              name="Implementos"
              fullWidth
              value={formData.Implementos}
              onChange={handleFormChange}
            >
              {Implementos.map((option) => (
                <MenuItem key={option.value} value={option.value}>
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
                <MenuItem key={option.value} value={option.value}>
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
              )
              )}
            </Select>
          </Stack>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="cantidad">Cantidad</InputLabel>
            <OutlinedInput
              id="cantidad"
              type="number"
              name="cantidad"
              fullWidth
              placeholder="Cantidad"
              value={formData.cantidad}
              onChange={handleFormChange}
            />
          </Stack>
        </Grid>
      </Grid>

      <br />
      
      <Grid item xs={12} md={12}>
        <center>
          <Button onClick={handleDownloadPDF} variant="contained" color="primary">
            Descargar PDF
          </Button>
        </center>
      </Grid>
    </form>
  );
};

export default Mantenimiento;
