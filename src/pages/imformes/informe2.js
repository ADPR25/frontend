import React, { useState, useEffect } from 'react';
import {
    Grid,
    Stack,
    InputLabel,
    TextField,
    Button,
    MenuItem,
    Select,
    TextareaAutosize
} from '@mui/material';
import { informes } from '../../api/informe.ts';
import { estado_implemento } from '../../api/estado-implemento.ts';

const Informes2 = () => {
    const [formData, setFormData] = useState({
        tipo_informe: '65374b884d00eddbedad40fe',
        usuario: '',
        dependencia: '',
        estado_implemento: [],
        observaciones: ''
    });

    const [estadoData, setEstadoData] = useState([]); // Define estadoData state

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

        if (name === 'estado_implemento') {
            const selectedValues = Array.isArray(value) ? value : [value];
            setFormData({
                ...formData,
                [name]: selectedValues.map((id) => id._id),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const n_i = await estado_implemento();
                setEstadoData(n_i);
            } catch (error) {
                console.error('Error al obtener los estados de los implementos', error);
            }
        }
        fetchData();
    }, []);

    const handleGuardarInforme = async () => {
        try {
            console.log(formData);
            const response = await informes(formData);
            console.log('Informe guardado con éxito:', response);

            setFormData({
                tipo_informe: '65374b884d00eddbedad40fe',
                usuario: formData.usuario,
                dependencia: '',
                estado_implemento: [],
                observaciones: ''
            });
        } catch (error) {
            console.error('Error al guardar el informe:', error);

            if (error.response) {
                console.error('Response data:', error.response.data);
            }

            if (error.response && error.response.status === 400) {
                console.error('Error 400: Bad Request');
            }
        }
    };

    return (
        <>
            <form>
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
        <InputLabel htmlFor={`estado`}>Estado implemento</InputLabel>
        <Select
            id={`estado`}
            name={`estado_implemento`}
            fullWidth
            value={formData.estado_implemento}  // Check the variable name here
            onChange={(e) => handleFormChange(e)}
        >
            {estadoData.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                    {option.estado}
                </MenuItem>
            ))}
        </Select>
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

                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleGuardarInforme}>
                                Guardar informe
                            </Button>
                        </center>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default Informes2;
