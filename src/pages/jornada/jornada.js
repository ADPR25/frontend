import React, { useState, useEffect } from 'react';
import {
    Grid,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Stack,
    InputLabel,
    OutlinedInput,
    Button
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { crearjornada, eliminar_jornada, obtenerjornada } from '../../api/jornada.ts';
import EditarJornadaModal from './editar_jornada_modal.js';
import { EditOutlined } from '@mui/icons-material';

const Jornada = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [jornadaSeleccionado, setjornadaSeleccionado] = useState(null);
    const [jornadas, setJornadas] = useState([]);
    const [nuevaJornada, setNuevaJornada] = useState({
        nombre: '',
    });

    const cargarJornadas = () => {
        obtenerjornada()
            .then(data => setJornadas(data))
            .catch(error => console.error('Error al obtener jornada:', error));
    };

    useEffect(() => {
        cargarJornadas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaJornada({ ...nuevaJornada, [name]: value });
    };

    const handleCrearJornada = () => {
        crearjornada(nuevaJornada)
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                setNuevaJornada({ nombre: '' });
                cargarJornadas();
                window.location.reload();
            })
            .catch(error => console.error('Error al crear jornada:', error.message));
    };

    const handleEliminarJornada = (id) => {
        eliminar_jornada(id)
            .then(() => cargarJornadas())
            .catch(error => console.error('Error al eliminar jornada:', error));
    };
    const handleEditarjornada = (jornada) => {
        setjornadaSeleccionado(jornada);
        setModalOpen(true);
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <center><h2>Crear jornada</h2></center>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="nombre">Nombre</InputLabel>
                            <OutlinedInput
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={nuevaJornada.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Grid>
                    <br />
                    <br />
                    <Grid item xs={12} md={12}>
                        <center>
                            <Button variant="contained" color="primary" onClick={handleCrearJornada}>
                                Crear jornada
                            </Button>
                        </center>
                    </Grid>
                </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Eliminar</TableCell>
                            <TableCell>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jornadas.map((jornada) => (
                            <TableRow key={jornada._id}>
                                <TableCell></TableCell>
                                <TableCell>{jornada.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEliminarJornada(jornada._id)}>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditarjornada(jornada)}>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
            <EditarJornadaModal
                eps={jornadaSeleccionado}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onejornadaActualizado={() => obtenerjornada().then((data) => setJornadas(data))}
            />
        </>
    );
};

export default Jornada;
