import React, { useState, useEffect } from 'react';
import { obtener_inplemeto } from '../../api/nombre-inplemento.ts';
import { crearPrestamo } from '../../api/prestar.ts';
import {
    Grid,
    Stack,
    MenuItem,
    InputLabel,
    Select,
    TextField,
    Button
} from '@mui/material';

const Prestar = () => {
    const [usuario, setUsuario] = useState({
        detalle: '',
        fechaInicio: '',
        fechaDevolucion: '',
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
        try {
            const prestamoData = {
                implementos: [usuario.detalle],
                fecha_inicio: usuario.fechaInicio,
                fecha_fin: usuario.fechaDevolucion
            };

            await crearPrestamo(prestamoData);
            // Realiza cualquier otra acción que desees después de enviar el préstamo
        } catch (error) {
            console.error('Error al enviar el préstamo', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}> {/* Cambiado de onChange a onSubmit */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
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
