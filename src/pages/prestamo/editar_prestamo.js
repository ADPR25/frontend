import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Select,
    MenuItem,
    Stack,
    InputLabel,
    TextField,
} from '@mui/material';
import { actualizarPrestamo } from '../../api/ac_prest.ts';
import { obtener_inplemeto } from '../../api/nombre-inplemento.ts';
import { estado_prestamo } from '../../api/estado_prestamo.ts';

const EditarPrestamo = ({ prestamo, open, onClose }) => {
    const [usuario, setUsuario] = useState({
        detalle : '',
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
                console.error('Error al obtener los nombres de los prestamos', error);
            }
        }
        fetchData();
    }, []);

    const [e_iData, setE_iData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const e_i = await estado_prestamo();
                setE_iData(e_i);
            } catch (error) {
                console.error('Error al obtener los estados de los implementos', error);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        if (prestamo) {
            const fechaInicio = new Date(prestamo.fecha_inicio);
            const fechaDevolucion = new Date(prestamo.fecha_fin);

            setUsuario({
                fechaInicio: fechaInicio.toISOString().split('T')[0],
                horaInicio: fechaInicio.toISOString().split('T')[1].substring(0, 5),
                fechaDevolucion: fechaDevolucion.toISOString().split('T')[0],
                horaDevolucion: fechaDevolucion.toISOString().split('T')[1].substring(0, 5),
            });
        }
    }, [prestamo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const handleGuardar = async () => {
        if (
            !usuario.fechaInicio ||
            !usuario.horaInicio ||
            !usuario.fechaDevolucion ||
            !usuario.horaDevolucion ||
            !usuario.estado 
        ) {
            console.error('Las fechas y horas no pueden estar vacías');
            return;
        }

        try {
            const fechaInicio = `${usuario.fechaInicio}T${usuario.horaInicio}`;
            const fechaDevolucion = `${usuario.fechaDevolucion}T${usuario.horaDevolucion}`;

            const prestamoData = {
                fecha_inicio: fechaInicio,
                fecha_fin: fechaDevolucion,
            };

            await actualizarPrestamo(prestamo.id, prestamoData); 
            setUsuario({
                fechaInicio: '',
                horaInicio: '',
                fechaDevolucion: '',
                horaDevolucion: '',
                estado: '',
            });

            onClose();
        } catch (error) {
            console.error('Error al enviar el préstamo', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Sanción</DialogTitle>
            <DialogContent>
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
                            <InputLabel htmlFor="horaInicio">Hora de inicio del préstamo</InputLabel>
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
                            <InputLabel htmlFor="horaDevolucion">Hora de devolución</InputLabel>
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
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleGuardar} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarPrestamo;
