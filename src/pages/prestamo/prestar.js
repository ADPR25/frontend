import React, { useState, useEffect } from 'react';

import {
    Grid,
    Stack,
    MenuItem,
    InputLabel,
    Select,
    TextField,
    Button
} from '@mui/material';
import { estado_implemento } from '../../api/estado-implemento.ts';
import { obtener_inplemeto } from '../../api/nombre-inplemento.ts';
import { crearPrestamo } from '../../api/prestar.ts';

const Prestar = () => {

    
    const [e_iData, setE_iData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const e_i = await estado_implemento();
                setE_iData(e_i);
            } catch (error) {
                console.error('Error al obtener los estados de los implementos', error);
            }
        }
        fetchData();
    }, []);

    const [usuario, setUsuario] = useState({
        detalle: '',
        fechaInicio: '',
        horaInicio: '',
        fechaDevolucion: '',
        horaDevolucion: '',
        estado: '',
    });


    const [n_iData, setN_iData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const n_i = await obtener_inplemeto();
                setN_iData(n_i);
            } catch (error) {
                console.error('Error al obtener los nombres de los implementos', error);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario.fechaInicio || !usuario.horaInicio || !usuario.fechaDevolucion || !usuario.horaDevolucion) {
            console.error('Las fechas y horas no pueden estar vacías');
            return;
        }

        try {
            // Formatea las fechas y horas
            const fechaInicio = `${usuario.fechaInicio}T${usuario.horaInicio}`;
            const fechaDevolucion = `${usuario.fechaDevolucion}T${usuario.horaDevolucion}`;

            const prestamoData = {
                implementos: [usuario.detalle],
                fecha_inicio: fechaInicio,
                fecha_fin: fechaDevolucion,
                estado: usuario.estado
            };

            await crearPrestamo(prestamoData);

            setUsuario({
                detalle: '',
                fechaInicio: '',
                horaInicio: '',
                fechaDevolucion: '',
                horaDevolucion: '',
                estado: '',
            });
        } catch (error) {
            console.error('Error al enviar el préstamo', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="detalle">Nombre del implemento</InputLabel>
                        <Select
                            id="detalle"
                            name="detalle"
                            fullWidth
                            value={usuario.detalle}
                            onChange={handleChange}
                        >
                            {n_iData.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="estado">Estado</InputLabel>
                        <Select
                            id="estado"
                            name="estado"
                            fullWidth
                            value={usuario.estado}
                            onChange={handleChange}
                        >
                            {e_iData.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.estado}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="fechaInicio">Fecha inicio del préstamo</InputLabel>
                        <TextField
                            id="fechaInicio"
                            type="date"
                            name="fechaInicio"
                            fullWidth
                            value={usuario.fechaInicio}
                            onChange={handleChange}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="fechaInicio">Hora de inicio del préstamo</InputLabel>
                        <TextField
                            id="horaInicio"
                            type="time"
                            name="horaInicio"
                            fullWidth
                            value={usuario.horaInicio}
                            onChange={handleChange}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="fechaDevolucion">Fecha devolución</InputLabel>
                        <TextField
                            id="fechaDevolucion"
                            type="date"
                            name="fechaDevolucion"
                            fullWidth
                            value={usuario.fechaDevolucion}
                            onChange={handleChange}
                        />
                    </Stack>
                </Grid>


                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="fechaDevolucion">Hora de devolución</InputLabel>
                        <TextField
                            id="horaDevolucion"
                            type="time"
                            name="horaDevolucion"
                            fullWidth
                            value={usuario.horaDevolucion}
                            onChange={handleChange}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={12}>
                    <center>
                        <Button type="submit" variant="contained" color="primary">Prestar</Button>
                    </center>
                </Grid>
            </Grid>
        </form>
    );
};

export default Prestar;
