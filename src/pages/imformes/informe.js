import React, { useState, useEffect } from 'react';
import { Grid, Stack, InputLabel, TextField, Button, TextareaAutosize } from '@mui/material';
import { informes } from '../../api/informe.ts';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import * as html2pdf from 'html2pdf.js';


const Informes = () => {
    const [formData, setFormData] = useState({
        tipo_informe: '6543a1b131f287853861d968',
        usuario: '',
        dependencia: '',
        implemento: {
            nombre: '',
            cantidad: 0,
            caracteristicas: '',
        },
        observaciones: ''
    });

    useEffect(() => {
        const loadUserId = async () => {
            try {
                const token = localStorage.getItem('token');
                const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
                const userId = tokenData.id || '';
                setFormData({
                    ...formData,
                    usuario: userId,
                });
            } catch (error) {
                console.error('Error al cargar el ID del usuario:', error);
            }
        };

        loadUserId();
    }, []);

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith('implemento.')) {
            const implementoField = name.split('.')[1];
            setFormData({
                ...formData,
                implemento: {
                    ...formData.implemento,
                    [implementoField]: implementoField === 'cantidad' ? Number(value) : value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleGuardarInforme = async () => {
        console.log(formData);
        try {
            const response = await informes(formData);
            console.log('Informe guardado con éxito:', response);

            setFormData({
                tipo_informe: '6543a1b131f287853861d968',
                usuario: formData.usuario,
                dependencia: '',
                implemento: {
                    nombre: '',
                    cantidad: 0,
                    caracteristicas: '',
                },
                observaciones: ''
            });
        } catch (error) {
            console.error('Error al guardar el informe:', error);
        }
    };

    const handleDescargarPDF = () => {
        const pdfElement = document.getElementById('pdf-container');
        html2pdf(pdfElement);
    };

    const handleDescargarExcel = () => {
        // Extract the names from the token
        const { nombres, apellidos } = extractNamesFromToken();

        // Concatenate names into "Nombre completo"
        const nombreCompleto = `${nombres} ${apellidos}`;

        // Create a new worksheet
        const ws = XLSX.utils.aoa_to_sheet([
            ['tipo_informe', 'usuario', 'dependencia', 'implemento', 'observaciones'],
            [
                'informe de implemento',
                nombreCompleto,
                formData.dependencia,
                formData.implemento.nombre,
                formData.observaciones
            ]
        ]);

        // Create a new workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Informe');

        // Convert the workbook to a binary Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        // Create a Blob and save the file
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(data, 'Informe.xlsx');
    };

    const extractNamesFromToken = () => {
        try {
            const token = localStorage.getItem('token');
            const tokenData = token ? JSON.parse(atob(token.split('.')[1])) : {};
            const nombres = tokenData.nombre || '';
            const apellidos = tokenData.apellidos || '';
            return { nombres, apellidos };
        } catch (error) {
            console.error('Error al obtener nombres y apellidos desde el token:', error);
            return { nombres: '', apellidos: '' };
        }
    };

    return (
        <>
            <form id="pdf-container">
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="dependencia">Dependencia</InputLabel>
                            <TextField
                                fullWidth
                                type="string"
                                name="dependencia"
                                value={formData.dependencia}
                                onChange={handleFormChange}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="implemento.nombre">Nombre</InputLabel>
                            <TextField
                                fullWidth
                                type="string"
                                name="implemento.nombre"
                                value={formData.implemento.nombre}
                                onChange={handleFormChange}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="implemento.cantidad">Cantidad</InputLabel>
                            <TextField
                                fullWidth
                                type="number"
                                name="implemento.cantidad"
                                value={formData.implemento.cantidad}
                                onChange={handleFormChange}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Stack spacing={0}>
                            <InputLabel htmlFor="implemento.caracteristicas">Características</InputLabel>
                            <TextField
                                fullWidth
                                type="string"
                                name="implemento.caracteristicas"
                                value={formData.implemento.caracteristicas}
                                onChange={handleFormChange}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="observaciones">Observaciones</InputLabel>
                            <TextareaAutosize
                                id="observaciones"
                                name="observaciones"
                                minRows={4}
                                value={formData.observaciones}
                                onChange={handleFormChange}
                                placeholder="Descripción de la observacion"
                                style={{ width: '100%', height: '250px' }}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </form>

            <Grid item xs={12} md={12}>
                <center>
                    <Button variant="contained" color="primary" onClick={handleGuardarInforme}>
                        Guardar informe
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDescargarPDF} style={{ marginLeft: '10px' }}>
                        Descargar PDF
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDescargarExcel} style={{ marginLeft: '10px' }}>
                        Descargar Excel
                    </Button>
                </center>
            </Grid>
        </>
    );
};

export default Informes;
